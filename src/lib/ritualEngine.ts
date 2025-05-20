// RitualEngine: programmable ceremonial flow for offerings, chants, invocations, and energy work
// This is a foundation for defining and executing ritual steps

export type RitualStep = {
  type: 'offering' | 'chant' | 'invocation' | 'transmutation' | 'elemental' | 'custom';
  content: string;
  duration?: number; // seconds
  metadata?: Record<string, any>;
};

export type Ritual = {
  id: string;
  name: string;
  description: string;
  steps: RitualStep[];
  triggers?: string[]; // e.g., dream, trauma, graphology
};

export class RitualEngine {
  private ritual: Ritual;
  private currentStep = 0;
  constructor(ritual: Ritual) {
    this.ritual = ritual;
  }
  getCurrentStep() {
    return this.ritual.steps[this.currentStep];
  }
  nextStep() {
    if (this.currentStep < this.ritual.steps.length - 1) {
      this.currentStep++;
      return this.getCurrentStep();
    }
    return null;
  }
  reset() {
    this.currentStep = 0;
  }
  isComplete() {
    return this.currentStep >= this.ritual.steps.length - 1;
  }
  getRitual() {
    return this.ritual;
  }
}

// Example: define a ritual
export const sampleRitual: Ritual = {
  id: 'revenge-transmutation',
  name: 'Revenge Transmutation',
  description: 'Transmute pain and injustice into power and protection.',
  steps: [
    { type: 'offering', content: 'Place a symbolic object before the altar.' },
    { type: 'chant', content: 'Recite the mantra: OM KALI DURGA NAMO.' },
    { type: 'invocation', content: 'Invoke the presence of the Divine Avenger.' },
    { type: 'transmutation', content: 'Visualize your pain as energy, channel it into the altar.' },
    { type: 'elemental', content: 'Witness the altar ignite with blue fire.' },
    { type: 'custom', content: 'Seal the ritual with a vow of protection.' },
  ],
  triggers: ['trauma', 'injustice'],
};
