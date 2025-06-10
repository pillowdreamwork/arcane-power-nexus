
/**
 * Performance utilities for the application
 */

/**
 * Throttle function to limit how often a function can be called
 * @param callback The function to throttle
 * @param delay The minimum time between function calls
 */
export function throttle<T extends (...args: any[]) => any>(callback: T, delay: number): (...args: Parameters<T>) => void {
  let wait = false;
  let storedArgs: Parameters<T> | null = null;

  function checkStoredArgs() {
    if (storedArgs) {
      callback(...storedArgs);
      storedArgs = null;
      setTimeout(checkStoredArgs, delay);
      wait = true;
    } else {
      wait = false;
    }
  }

  return (...args: Parameters<T>) => {
    if (wait) {
      storedArgs = args;
      return;
    }

    callback(...args);
    wait = true;
    setTimeout(checkStoredArgs, delay);
  };
}

/**
 * Debounce function to delay function execution until after a period of inactivity
 * @param callback The function to debounce
 * @param wait The time to wait after the last call before executing
 */
export function debounce<T extends (...args: any[]) => any>(callback: T, wait: number): (...args: Parameters<T>) => void {
  let timeout: number | null = null;

  return (...args: Parameters<T>) => {
    if (timeout !== null) {
      window.clearTimeout(timeout);
    }
    timeout = window.setTimeout(() => callback(...args), wait);
  };
}

/**
 * Memoize function to cache results of expensive calculations
 * @param fn The function to memoize
 */
export function memoize<T extends (...args: any[]) => any>(fn: T): T {
  const cache = new Map();
  
  return ((...args: Parameters<T>): ReturnType<T> => {
    const key = JSON.stringify(args);
    if (cache.has(key)) {
      return cache.get(key);
    }
    
    const result = fn(...args);
    cache.set(key, result);
    return result;
  }) as T;
}

/**
 * Detect if the device is a mobile device
 */
export function isMobileDevice(): boolean {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

/**
 * Optimize rendering based on device capabilities
 */
export function getOptimalRenderingSettings() {
  const isMobile = isMobileDevice();
  const isLowEndDevice = navigator.hardwareConcurrency ? navigator.hardwareConcurrency <= 4 : true;
  
  return {
    particleCount: isMobile ? 1000 : isLowEndDevice ? 3000 : 5000,
    shadowQuality: isMobile ? 'low' : isLowEndDevice ? 'medium' : 'high',
    effectsIntensity: isMobile ? 0.5 : isLowEndDevice ? 0.8 : 1,
    maxAnimations: isMobile ? 5 : isLowEndDevice ? 10 : 15
  };
}
