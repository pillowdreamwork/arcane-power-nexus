
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.e0d950391c94465393d240e47b5f89fe',
  appName: 'arcane-power-nexus',
  webDir: 'dist',
  server: {
    url: 'https://e0d95039-1c94-4653-93d2-40e47b5f89fe.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: "#121218",
      splashFullScreen: true,
      splashImmersive: true
    }
  }
};

export default config;
