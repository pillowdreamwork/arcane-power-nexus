import { YourBackendService } from './services/YourBackendService';

// Register your backend
backendRegistry.register('default', new YourBackendService());

class BackendRegistry {
  private backends = new Map();
  
  register(name: string, backend: any) {
    this.backends.set(name, backend);
  }
  
  get(name: string) {
    const backend = this.backends.get(name);
    if (!backend) {
      throw new Error(`No backend found in registry for: ${name}`);
    }
    return backend;
  }
}

export const backendRegistry = new BackendRegistry();

const handleUnhandledRejection = (error: any) => {
  if (error.message?.includes('No backend found in registry')) {
    console.error('Backend configuration error:', error);
    // Show user-friendly message or redirect to setup
    return;
  }
  // ...existing code...
};

export const config = {
  backendUrl: process.env.VITE_BACKEND_URL || 'http://localhost:3000',
  // Add other backend configuration
};