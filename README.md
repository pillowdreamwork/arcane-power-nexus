# 🔮 Arcane Power Nexus

A mystical spiritual dashboard combining ancient wisdom with modern technology for exploration, rituals, and personal transformation.

![Arcane Power Nexus](https://img.shields.io/badge/Status-Live%20%26%20Ready-green?style=for-the-badge)
![React](https://img.shields.io/badge/React-18.3.1-blue?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.5.3-blue?style=for-the-badge&logo=typescript)
![Vite](https://img.shields.io/badge/Vite-5.4.1-purple?style=for-the-badge&logo=vite)

## ✨ Features

### 🎯 Core Functionality

- **Mystical Dashboard**: Interactive 3D ritual temple with immersive experiences
- **AI Echo Assistant**: Intelligent spiritual companion powered by TensorFlow.js
- **Ritual Library**: Comprehensive guided meditation and spiritual practices
- **Energy Visualization**: Real-time particle effects and sacred geometry
- **Progress Tracking**: Spiritual development monitoring and analytics
- **Yantra & Mantra Tools**: Sacred geometric patterns and sound vibrations

### 🛡️ Advanced Features

- **3D Environments**: Interactive ritual spaces with Three.js
- **AI-Powered Guidance**: Machine learning for personalized spiritual insights
- **Encrypted Ritual Logs**: Secure personal practice records
- **PWA Support**: Offline functionality and mobile optimization
- **Real-time Monitoring**: Performance and error tracking systems
- **Responsive Design**: Seamless experience across all devices

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ (recommended: install with [nvm](https://github.com/nvm-sh/nvm))
- npm or yarn package manager

### Installation

```bash
# Clone the repository
git clone <YOUR_GIT_URL>
cd arcane-power-nexus

# Install dependencies
npm install

# Start development server
npm run dev:stable

# Build for production
npm run build
```

### Development Scripts

```bash
# Start with hot reload (stable)
npm run dev:stable

# Regular development server
npm run dev

# Start persistent background server
npm run start

# Build for production
npm run build

# Preview production build
npm run preview

# Clean cache and dependencies
npm run clean

# Lint code
npm run lint
```

## 🏗️ Architecture

### Tech Stack

- **Frontend**: React 18.3.1 + TypeScript 5.5.3
- **Build Tool**: Vite 5.4.1 with SWC
- **UI Framework**: Tailwind CSS + shadcn/ui components
- **3D Graphics**: Three.js + React Three Fiber + Drei
- **AI/ML**: TensorFlow.js + Universal Sentence Encoder
- **State Management**: TanStack Query (React Query)
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Deployment**: Vercel/Netlify/Railway ready

### Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # shadcn/ui base components
│   ├── home/           # Dashboard-specific components
│   ├── rituals/        # Ritual practice components
│   └── *.tsx           # Layout and utility components
├── pages/              # Route components
├── lib/                # Core business logic
│   ├── ritualEngine.ts # Ritual orchestration
│   ├── tantricMentorAI.ts # AI guidance system
│   └── encryption.ts   # Security utilities
├── utils/              # Utility functions
│   ├── ai-agents.ts    # AI monitoring agents
│   ├── error-monitor.ts # Error tracking
│   └── performance-*.ts # Performance monitoring
├── integrations/       # External service integrations
└── hooks/              # Custom React hooks
```

## 🎮 Usage Guide

### Getting Started

1. **Launch the Application**: Navigate to the home dashboard
2. **Explore the Codex**: Browse spiritual knowledge and teachings
3. **Begin a Ritual**: Choose from guided practices in the Rituals section
4. **Use the Armory**: Access mantras, yantras, and spiritual tools
5. **Consult Echo**: Interact with the AI assistant for guidance

### Key Components

#### 🏠 Dashboard (Index)

- Current spiritual status overview
- Quick access to all major features
- Daily wisdom and insights
- Recent practice history

#### 📚 Codex

- Spiritual knowledge repository
- Sacred texts and teachings
- Search functionality
- Bookmarking system

#### 🔮 Rituals

- Guided meditation practices
- Interactive 3D ritual environments
- Progress tracking
- Custom ritual creation

#### ⚔️ Armory

- Mantra collection with audio playback
- Sacred geometry (Yantras) visualization
- Protective symbols and tools
- Downloadable resources

#### 🗣️ Echo Assistant

- AI-powered spiritual guidance
- Natural language processing
- Personalized recommendations
- Context-aware responses

## 🔧 Configuration

### Environment Variables

```bash
# Supabase Configuration
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

# Optional: Analytics
VITE_GA_MEASUREMENT_ID=your_google_analytics_id
```

### Deployment Options

#### Vercel (Recommended)

```bash
npx vercel --prod
```

#### Netlify

```bash
npm run build
# Upload dist/ folder to netlify.com/drop
```

#### Railway

```bash
# Connect GitHub repository to Railway
# Auto-deploys on push to main branch
```

#### Docker

```bash
docker build -t arcane-nexus .
docker run -p 8080:8080 arcane-nexus
```

## 🛠️ Development

### Code Style

- TypeScript strict mode enabled
- ESLint + Prettier for code formatting
- Consistent component structure with proper typing
- Performance optimization with React best practices

### Testing

```bash
# Run linting
npm run lint

# Type checking
npx tsc --noEmit

# Build test
npm run build
```

### Performance Monitoring

The application includes built-in performance monitoring:

- Real-time error tracking
- Performance metrics collection
- User experience monitoring
- Automatic crash reporting

## 🎨 Customization

### Theming

The application uses CSS custom properties for theming:

- Primary colors: Purple/indigo gradient
- Dark mode optimized
- Mystical particle effects
- Sacred geometry patterns

### Adding New Rituals

1. Define ritual data in `src/components/home/ritualData.ts`
2. Create ritual component in `src/components/rituals/`
3. Add route in `App.tsx` or `AnimatedRoutes.tsx`
4. Update navigation in `GrimoireSidebar.tsx`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Commit changes: `git commit -am 'Add new feature'`
4. Push to branch: `git push origin feature/new-feature`
5. Submit a Pull Request

### Development Guidelines

- Follow TypeScript best practices
- Maintain component modularity
- Add proper error handling
- Include performance considerations
- Test across different devices

## 📄 License

This project is created with [Lovable](https://lovable.dev) and follows their terms of service.

## 🆘 Support

### Troubleshooting

- **Port Issues**: Use `npm run clean` then `npm run dev:stable`
- **Dependencies**: Try `rm -rf node_modules package-lock.json && npm install`
- **Build Errors**: Check TypeScript errors with `npx tsc --noEmit`

### Resources

- [Project URL](https://lovable.dev/projects/e0d95039-1c94-4653-93d2-40e47b5f89fe)
- [Deployment Status](./DEPLOYMENT-STATUS.md)
- [Lovable Documentation](https://docs.lovable.dev)

### Get Help

- Create an issue in this repository
- Consult the built-in System Status component
- Check the deployment status dashboard

---

**Built with 💜 using Lovable, React, and modern web technologies**
