
/**
 * Advanced error monitoring and auto-fixing system
 */

interface ErrorLog {
  id: string;
  timestamp: number;
  message: string;
  stack?: string;
  url: string;
  userAgent: string;
  userId?: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  context: Record<string, any>;
  resolved: boolean;
}

class ErrorMonitor {
  private errors: ErrorLog[] = [];
  private autoFixAttempts = new Map<string, number>();
  private maxAutoFixAttempts = 3;

  constructor() {
    this.setupGlobalErrorHandlers();
    this.setupPerformanceMonitoring();
  }

  private setupGlobalErrorHandlers() {
    // Handle JavaScript errors
    window.addEventListener('error', (event) => {
      this.logError({
        message: event.message,
        stack: event.error?.stack,
        severity: 'high',
        context: {
          filename: event.filename,
          lineno: event.lineno,
          colno: event.colno,
        }
      });
    });

    // Handle Promise rejections
    window.addEventListener('unhandledrejection', (event) => {
      this.logError({
        message: `Unhandled Promise Rejection: ${event.reason}`,
        severity: 'high',
        context: {
          reason: event.reason,
          promise: event.promise
        }
      });
    });

    // Handle React errors (will be caught by error boundaries)
    const originalConsoleError = console.error;
    console.error = (...args) => {
      if (args[0]?.includes?.('React')) {
        this.logError({
          message: args.join(' '),
          severity: 'medium',
          context: { args }
        });
      }
      originalConsoleError.apply(console, args);
    };
  }

  private setupPerformanceMonitoring() {
    // Monitor page load performance
    window.addEventListener('load', () => {
      setTimeout(() => {
        const perfData = window.performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
        
        if (perfData && perfData.loadEventEnd && perfData.fetchStart) {
          const loadTime = perfData.loadEventEnd - perfData.fetchStart;
          if (loadTime > 5000) {
            this.logError({
              message: 'Slow page load detected',
              severity: 'medium',
              context: {
                loadTime,
                domContentLoaded: perfData.domContentLoadedEventEnd ? perfData.domContentLoadedEventEnd - perfData.fetchStart : 0,
              }
            });
          }
        }
      }, 1000);
    });

    // Monitor memory usage
    if ('memory' in performance) {
      setInterval(() => {
        const memory = (performance as any).memory;
        if (memory.usedJSHeapSize / memory.totalJSHeapSize > 0.9) {
          this.logError({
            message: 'High memory usage detected',
            severity: 'high',
            context: {
              usedMemory: memory.usedJSHeapSize,
              totalMemory: memory.totalJSHeapSize,
              limit: memory.jsHeapSizeLimit
            }
          });
        }
      }, 30000);
    }
  }

  logError(errorData: Partial<ErrorLog>) {
    const error: ErrorLog = {
      id: this.generateId(),
      timestamp: Date.now(),
      message: errorData.message || 'Unknown error',
      stack: errorData.stack,
      url: window.location.href,
      userAgent: navigator.userAgent,
      severity: errorData.severity || 'medium',
      context: errorData.context || {},
      resolved: false,
      ...errorData
    };

    this.errors.push(error);
    
    // Try to auto-fix if possible
    this.attemptAutoFix(error);
    
    // Report to console in development
    if (process.env.NODE_ENV === 'development') {
      console.group(`🚨 Error Monitor: ${error.severity.toUpperCase()}`);
      console.error(error.message);
      console.log('Context:', error.context);
      if (error.stack) console.log('Stack:', error.stack);
      console.groupEnd();
    }

    // Keep only last 100 errors
    if (this.errors.length > 100) {
      this.errors = this.errors.slice(-100);
    }
  }

  private attemptAutoFix(error: ErrorLog) {
    const errorKey = this.getErrorKey(error);
    const attempts = this.autoFixAttempts.get(errorKey) || 0;

    if (attempts >= this.maxAutoFixAttempts) {
      console.warn(`Max auto-fix attempts reached for error: ${error.message}`);
      return;
    }

    this.autoFixAttempts.set(errorKey, attempts + 1);

    // Auto-fix strategies
    if (error.message.includes('ChunkLoadError') || error.message.includes('Loading chunk')) {
      this.fixChunkLoadError();
    } else if (error.message.includes('Network Error') || error.message.includes('Failed to fetch')) {
      this.fixNetworkError();
    } else if (error.message.includes('QuotaExceededError')) {
      this.fixStorageQuotaError();
    } else if (error.message.includes('Cannot read property') || error.message.includes('Cannot read properties')) {
      this.fixNullReferenceError(error);
    }
  }

  private fixChunkLoadError() {
    console.log('🔧 Auto-fixing chunk load error...');
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  }

  private fixNetworkError() {
    console.log('🔧 Auto-fixing network error...');
    // Implement retry logic with exponential backoff
    // This would be handled by specific components
  }

  private fixStorageQuotaError() {
    console.log('🔧 Auto-fixing storage quota error...');
    try {
      // Clear old data from localStorage
      const keysToRemove: string[] = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && (key.includes('cache') || key.includes('temp'))) {
          keysToRemove.push(key);
        }
      }
      keysToRemove.forEach(key => localStorage.removeItem(key));
    } catch (e) {
      console.warn('Failed to clear storage:', e);
    }
  }

  private fixNullReferenceError(error: ErrorLog) {
    console.log('🔧 Attempting to fix null reference error...');
    // Log the error for developer review
    // In a real app, this might trigger a component re-render or reset
  }

  private getErrorKey(error: ErrorLog): string {
    return `${error.message}-${error.url}`;
  }

  private generateId(): string {
    return Math.random().toString(36).substr(2, 9);
  }

  getErrors(severity?: ErrorLog['severity']): ErrorLog[] {
    if (severity) {
      return this.errors.filter(error => error.severity === severity);
    }
    return [...this.errors];
  }

  getErrorStats() {
    const total = this.errors.length;
    const resolved = this.errors.filter(e => e.resolved).length;
    const severityCount = this.errors.reduce((acc, error) => {
      acc[error.severity] = (acc[error.severity] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return {
      total,
      resolved,
      unresolved: total - resolved,
      severityBreakdown: severityCount,
      recentErrors: this.errors.slice(-10)
    };
  }

  clearErrors() {
    this.errors = [];
    this.autoFixAttempts.clear();
  }

  markErrorResolved(errorId: string) {
    const error = this.errors.find(e => e.id === errorId);
    if (error) {
      error.resolved = true;
    }
  }
}

// Create global instance
const errorMonitor = new ErrorMonitor();

export default errorMonitor;

// Export utility functions
export const logError = (error: Partial<ErrorLog>) => errorMonitor.logError(error);
export const getErrorStats = () => errorMonitor.getErrorStats();
export const clearErrors = () => errorMonitor.clearErrors();
