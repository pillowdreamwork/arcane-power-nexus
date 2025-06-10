
/**
 * Utility for monitoring and optimizing app performance
 */
import { useEffect, useRef } from "react";

type PerformanceMetric = {
  name: string;
  startTime: number;
  duration: number;
};

// Store performance metrics
const performanceMetrics: PerformanceMetric[] = [];

/**
 * Measure the performance of a specific operation
 * @param name Name of the operation to measure
 * @param callback Function to measure
 * @returns Result of the callback function
 */
export function measurePerformance<T>(name: string, callback: () => T): T {
  const startTime = performance.now();
  const result = callback();
  const endTime = performance.now();
  
  performanceMetrics.push({
    name,
    startTime,
    duration: endTime - startTime
  });
  
  if (process.env.NODE_ENV === 'development') {
    console.log(`Performance: ${name} took ${endTime - startTime}ms`);
  }
  
  return result;
}

/**
 * React hook to measure component render performance
 * @param componentName Name of the component to measure
 */
export function useRenderPerformance(componentName: string) {
  const renderCount = useRef(0);
  const lastRenderTime = useRef(performance.now());
  
  useEffect(() => {
    const now = performance.now();
    const timeSinceLastRender = now - lastRenderTime.current;
    renderCount.current += 1;
    
    if (process.env.NODE_ENV === 'development') {
      console.log(
        `Component ${componentName} rendered (${renderCount.current}) - ${timeSinceLastRender.toFixed(2)}ms since last render`
      );
    }
    
    lastRenderTime.current = now;
    
    return () => {
      if (process.env.NODE_ENV === 'development') {
        console.log(`Component ${componentName} unmounted after ${renderCount.current} renders`);
      }
    };
  });
}

/**
 * Get all collected performance metrics
 * @returns Array of performance metrics
 */
export function getPerformanceMetrics(): PerformanceMetric[] {
  return [...performanceMetrics];
}

/**
 * Clear all collected performance metrics
 */
export function clearPerformanceMetrics(): void {
  performanceMetrics.length = 0;
}
