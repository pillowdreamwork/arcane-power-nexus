# 🧩 Arcane Power Nexus - Component Documentation

## 📋 Overview

This document provides comprehensive documentation for all React components in the Arcane Power Nexus application, including their props, usage examples, and integration patterns.

## 🏗️ Component Architecture

### Component Categories
1. **🎨 UI Components** - Basic reusable interface elements
2. **🏠 Layout Components** - Page structure and navigation
3. **🔮 Feature Components** - Spiritual practice functionality
4. **🤖 AI Components** - Machine learning integrations
5. **🎮 3D Components** - Three.js and WebGL elements
6. **📊 Monitor Components** - Performance and error tracking

---

## 🎨 UI Components (`src/components/ui/`)

### Button
Basic button component with multiple variants.

```typescript
interface ButtonProps {
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  asChild?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}

// Usage
<Button variant="outline" size="sm" onClick={handleClick}>
  Click Me
</Button>
```

### Card
Container component for content sections.

```typescript
interface CardProps {
  className?: string;
  children: React.ReactNode;
}

// Usage
<Card>
  <CardHeader>
    <CardTitle>Ritual Practice</CardTitle>
    <CardDescription>Daily meditation session</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Content goes here...</p>
  </CardContent>
  <CardFooter>
    <Button>Start Practice</Button>
  </CardFooter>
</Card>
```

### Tabs
Tab navigation component with content panels.

```typescript
interface TabsProps {
  defaultValue: string;
  className?: string;
  children: React.ReactNode;
}

// Usage
<Tabs defaultValue="rituals">
  <TabsList>
    <TabsTrigger value="rituals">Rituals</TabsTrigger>
    <TabsTrigger value="mantras">Mantras</TabsTrigger>
  </TabsList>
  <TabsContent value="rituals">
    <RitualLibrary />
  </TabsContent>
  <TabsContent value="mantras">
    <MantraCollection />
  </TabsContent>
</Tabs>
```

### Dialog
Modal dialog component for overlays.

```typescript
interface DialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
}

// Usage
<Dialog open={isOpen} onOpenChange={setIsOpen}>
  <DialogTrigger asChild>
    <Button>Open Dialog</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Ritual Configuration</DialogTitle>
      <DialogDescription>
        Customize your practice settings
      </DialogDescription>
    </DialogHeader>
    <RitualForm />
  </DialogContent>
</Dialog>
```

---

## 🏠 Layout Components

### GrimoireLayout
Main layout wrapper for the application.

```typescript
interface GrimoireLayoutProps {
  children: React.ReactNode;
}

const GrimoireLayout: React.FC<GrimoireLayoutProps> = ({ children }) => {
  const [energyLevel, setEnergyLevel] = useState(0);
  
  return (
    <SidebarProvider>
      <div className="flex w-full min-h-screen bg-grimoire-background">
        <GrimoireSidebar />
        <main className="flex-1 overflow-auto yantra-background relative">
          <EnergyParticles />
          <SpiritualProgress />
          {children}
          <SystemStatus />
        </main>
      </div>
    </SidebarProvider>
  );
};

// Usage
<GrimoireLayout>
  <YourPageContent />
</GrimoireLayout>
```

### GrimoireSidebar
Navigation sidebar with spiritual themed menu items.

```typescript
interface NavItem {
  title: string;
  url: string;
  icon: React.ElementType;
}

const GrimoireSidebar: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  
  // Features:
  // - Collapsible sidebar
  // - User authentication status
  // - Sacred geometry icons
  // - Responsive design
  
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarMenu>
          {sidebarItems.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild>
                <NavLink to={item.url}>
                  <item.icon />
                  <span>{item.title}</span>
                </NavLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
};
```

---

## 🔮 Feature Components

### RitualLibrary
Display and manage spiritual practices.

```typescript
interface RitualData {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  color: string;
  difficulty: string;
  duration?: number;
  steps?: RitualStep[];
}

interface RitualLibraryProps {
  onRitualSelect?: (ritual: RitualData) => void;
  filter?: string;
}

const RitualLibrary: React.FC<RitualLibraryProps> = ({ 
  onRitualSelect, 
  filter 
}) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [favorites, setFavorites] = useState<string[]>([]);
  
  // Features:
  // - Category filtering
  // - Difficulty levels
  // - Favorite marking
  // - Progress tracking
  // - Search functionality
  
  return (
    <div className="ritual-library">
      <div className="filters">
        <CategoryFilter 
          selected={selectedCategory}
          onChange={setSelectedCategory}
        />
      </div>
      <div className="ritual-grid">
        {filteredRituals.map(ritual => (
          <RitualCard
            key={ritual.id}
            ritual={ritual}
            isFavorite={favorites.includes(ritual.id)}
            onSelect={() => onRitualSelect?.(ritual)}
            onToggleFavorite={() => toggleFavorite(ritual.id)}
          />
        ))}
      </div>
    </div>
  );
};

// Usage
<RitualLibrary 
  onRitualSelect={(ritual) => startRitual(ritual)}
  filter="meditation"
/>
```

### EchoAssistant
AI-powered spiritual guidance chat interface.

```typescript
interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface EchoAssistantProps {
  className?: string;
  initialMessage?: string;
}

const EchoAssistant: React.FC<EchoAssistantProps> = ({
  className,
  initialMessage
}) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  // Features:
  // - Natural language processing
  // - Context-aware responses
  // - Spiritual guidance
  // - Practice recommendations
  // - Progress analysis
  
  const sendMessage = async (content: string) => {
    setIsLoading(true);
    try {
      const response = await aiAgents.getGuidance(content, {
        user_context: getUserContext(),
        spiritual_level: getSpiritualLevel()
      });
      
      setMessages(prev => [...prev, {
        id: generateId(),
        role: 'assistant',
        content: response.message,
        timestamp: new Date()
      }]);
    } catch (error) {
      console.error('Echo Assistant error:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <Card className={cn("echo-assistant", className)}>
      <CardHeader>
        <CardTitle>Echo Assistant</CardTitle>
        <CardDescription>Your AI spiritual companion</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="messages">
          {messages.map(message => (
            <MessageBubble key={message.id} message={message} />
          ))}
          {isLoading && <TypingIndicator />}
        </div>
        <div className="input-area">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask for spiritual guidance..."
            onKeyDown={(e) => e.key === 'Enter' && sendMessage(input)}
          />
          <Button onClick={() => sendMessage(input)}>Send</Button>
        </div>
      </CardContent>
    </Card>
  );
};
```

### SpiritualProgress
Track and display spiritual development metrics.

```typescript
interface ProgressData {
  level: number;
  experience: number;
  experienceToNext: number;
  completedRituals: number;
  energyPoints: number;
  streakDays: number;
  achievements: Achievement[];
}

interface SpiritualProgressProps {
  userId?: string;
  compact?: boolean;
}

const SpiritualProgress: React.FC<SpiritualProgressProps> = ({
  userId,
  compact = false
}) => {
  const [progress, setProgress] = useState<ProgressData | null>(null);
  const [isVisible, setIsVisible] = useState(true);
  
  // Features:
  // - Level progression system
  // - Experience points tracking
  // - Achievement badges
  // - Practice streaks
  // - Energy visualization
  
  const progressPercentage = progress 
    ? (progress.experience / progress.experienceToNext) * 100 
    : 0;
  
  if (compact) {
    return (
      <div className="spiritual-progress-compact">
        <div className="level-indicator">Level {progress?.level}</div>
        <Progress value={progressPercentage} className="w-full" />
      </div>
    );
  }
  
  return (
    <Card className="spiritual-progress">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Spiritual Progress</span>
          <Badge variant="outline">Level {progress?.level}</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="progress-stats">
          <div className="stat">
            <label>Experience</label>
            <Progress value={progressPercentage} />
            <span>{progress?.experience} / {progress?.experienceToNext}</span>
          </div>
          <div className="stat">
            <label>Rituals Completed</label>
            <span>{progress?.completedRituals}</span>
          </div>
          <div className="stat">
            <label>Current Streak</label>
            <span>{progress?.streakDays} days</span>
          </div>
        </div>
        <div className="achievements">
          {progress?.achievements.map(achievement => (
            <AchievementBadge key={achievement.id} achievement={achievement} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
```

---

## 🎮 3D Components

### RitualTemple3D
Immersive 3D ritual environment with interactive elements.

```typescript
interface RitualTemple3DProps {
  ritual?: RitualData;
  onInteraction?: (interaction: Interaction) => void;
  energyLevel?: number;
}

const RitualTemple3D: React.FC<RitualTemple3DProps> = ({
  ritual,
  onInteraction,
  energyLevel = 0
}) => {
  const [score, setScore] = useState(0);
  const [powerUps, setPowerUps] = useState(POWER_UPS);
  const [activePowerUps, setActivePowerUps] = useState<PowerUpType[]>([]);
  
  // Features:
  // - Interactive 3D temple environment
  // - Weapon altars for energy shooting
  // - Power-up system
  // - Particle effects
  // - Dynamic lighting
  // - Physics simulation
  
  return (
    <div className="ritual-temple-3d">
      <Canvas
        camera={{ position: [0, 5, 10], fov: 60 }}
        gl={{ antialias: true }}
      >
        <ambientLight intensity={0.3} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        
        <Stars radius={300} depth={60} count={1000} factor={7} />
        
        <WarScene 
          onHit={() => setScore(s => s + 10)}
          activePowerUps={activePowerUps}
        />
        
        <OrbitControls
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          minDistance={5}
          maxDistance={50}
        />
        
        <EffectComposer>
          <Bloom 
            intensity={0.5}
            luminanceThreshold={0.4}
            luminanceSmoothing={0.9}
          />
          <ChromaticAberration offset={[0.002, 0.002]} />
        </EffectComposer>
      </Canvas>
      
      <UI3DOverlay
        score={score}
        powerUps={powerUps}
        onPowerUpToggle={togglePowerUp}
      />
    </div>
  );
};
```

### EnergyParticles
Animated particle system for mystical effects.

```typescript
interface EnergyParticlesProps {
  count?: number;
  energyLevel?: number;
  color?: string;
  className?: string;
}

const EnergyParticles: React.FC<EnergyParticlesProps> = ({
  count = 100,
  energyLevel = 50,
  color = "#9333ea",
  className
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!containerRef.current) return;
    
    // Initialize particle system using tsparticles
    const options = {
      particles: {
        number: { value: count },
        color: { value: color },
        move: {
          enable: true,
          speed: energyLevel / 20,
          direction: "none",
          outModes: { default: "out" }
        },
        size: {
          value: { min: 1, max: 3 }
        },
        opacity: {
          value: { min: 0.3, max: 0.8 },
          animation: {
            enable: true,
            speed: 2
          }
        }
      }
    };
    
    initParticles(containerRef.current, options);
  }, [count, energyLevel, color]);
  
  return (
    <div 
      ref={containerRef}
      className={cn("energy-particles", className)}
    />
  );
};
```

---

## 📊 Monitor Components

### SystemStatus
Real-time application monitoring dashboard.

```typescript
interface SystemStatusProps {
  position?: 'fixed' | 'relative';
  compact?: boolean;
}

const SystemStatus: React.FC<SystemStatusProps> = ({
  position = 'fixed',
  compact = false
}) => {
  const [errorStats, setErrorStats] = useState(getErrorStats());
  const [suggestions, setSuggestions] = useState<ContentSuggestion[]>([]);
  const [isVisible, setIsVisible] = useState(true);
  
  // Features:
  // - Real-time error monitoring
  // - Performance metrics
  // - AI quality suggestions
  // - System health indicators
  // - Expandable details
  
  const getHealthScore = () => {
    const errorWeight = Math.max(0, 100 - (errorStats.total * 5));
    const performanceWeight = 90; // Placeholder
    return Math.round((errorWeight + performanceWeight) / 2);
  };
  
  if (!isVisible) return null;
  
  return (
    <div className={cn(
      "system-status",
      position === 'fixed' && "fixed bottom-4 right-4 z-50"
    )}>
      <Card className="w-80">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm flex items-center">
              <Activity className="h-5 w-5 mr-2 text-grimoire-primary" />
              System Status
            </CardTitle>
            <Badge 
              variant={getHealthScore() > 80 ? 'default' : 'destructive'}
              className="text-xs"
            >
              {getHealthScore()}% Health
            </Badge>
          </div>
        </CardHeader>
        
        {!compact && (
          <CardContent>
            <Tabs defaultValue="overview">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="errors">Errors</TabsTrigger>
                <TabsTrigger value="performance">Perf</TabsTrigger>
                <TabsTrigger value="ai">AI</TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview">
                <OverviewPanel errorStats={errorStats} />
              </TabsContent>
              
              <TabsContent value="errors">
                <ErrorPanel errorStats={errorStats} />
              </TabsContent>
              
              <TabsContent value="performance">
                <PerformancePanel />
              </TabsContent>
              
              <TabsContent value="ai">
                <AIPanel suggestions={suggestions} />
              </TabsContent>
            </Tabs>
          </CardContent>
        )}
      </Card>
    </div>
  );
};
```

---

## 🎯 Usage Patterns

### Common Component Combinations

#### Dashboard Layout
```typescript
const Dashboard = () => (
  <GrimoireLayout>
    <div className="container mx-auto px-4 py-8">
      <SpiritualProgress />
      <SearchBar className="mb-6" />
      <Tabs defaultValue="rituals">
        <TabsList>
          <TabsTrigger value="rituals">Rituals</TabsTrigger>
          <TabsTrigger value="assistant">Echo</TabsTrigger>
        </TabsList>
        <TabsContent value="rituals">
          <RitualLibrary />
        </TabsContent>
        <TabsContent value="assistant">
          <EchoAssistant />
        </TabsContent>
      </Tabs>
    </div>
  </GrimoireLayout>
);
```

#### Ritual Practice Page
```typescript
const RitualPractice = () => {
  const [selectedRitual, setSelectedRitual] = useState<RitualData | null>(null);
  
  return (
    <GrimoireLayout>
      <div className="ritual-practice-container">
        {selectedRitual ? (
          <div className="practice-view">
            <RitualTemple3D 
              ritual={selectedRitual}
              onInteraction={handleInteraction}
            />
            <RitualController ritual={selectedRitual} />
          </div>
        ) : (
          <RitualLibrary onRitualSelect={setSelectedRitual} />
        )}
      </div>
    </GrimoireLayout>
  );
};
```

### State Management Patterns

#### Using TanStack Query
```typescript
// Custom hooks for data fetching
const useRituals = () => {
  return useQuery({
    queryKey: ['rituals'],
    queryFn: fetchRituals,
    staleTime: 5 * 60 * 1000
  });
};

const useUserProgress = (userId: string) => {
  return useQuery({
    queryKey: ['progress', userId],
    queryFn: () => fetchUserProgress(userId),
    enabled: !!userId
  });
};

// Component usage
const MyComponent = () => {
  const { data: rituals, isLoading } = useRituals();
  const { data: progress } = useUserProgress(user?.id);
  
  if (isLoading) return <LoadingSpinner />;
  
  return (
    <div>
      <SpiritualProgress progress={progress} />
      <RitualLibrary rituals={rituals} />
    </div>
  );
};
```

#### Error Handling
```typescript
// Error boundary component
const RitualErrorBoundary: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  return (
    <ErrorBoundary
      fallback={<RitualErrorFallback />}
      onError={(error, errorInfo) => {
        errorMonitor.logError({
          message: error.message,
          severity: 'high',
          context: { errorInfo }
        });
      }}
    >
      {children}
    </ErrorBoundary>
  );
};
```

---

## 🎨 Styling Guidelines

### CSS Custom Properties
```css
:root {
  --grimoire-primary: #9333ea;
  --grimoire-background: #0f0f23;
  --grimoire-foreground: #e2e8f0;
  --grimoire-muted: #1e1e2e;
  --grimoire-border: #374151;
}
```

### Component Styling Patterns
```typescript
// Using cn utility for conditional classes
const MyComponent = ({ variant, size, className }) => (
  <div className={cn(
    "base-styles",
    {
      "variant-primary": variant === "primary",
      "variant-secondary": variant === "secondary",
      "size-sm": size === "small",
      "size-lg": size === "large"
    },
    className
  )}>
    Content
  </div>
);
```

### Animation Patterns
```typescript
// Using Framer Motion
const AnimatedCard = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.3 }}
  >
    {children}
  </motion.div>
);
```

---

## 🧪 Testing Components

### Component Testing Examples
```typescript
// Example test with React Testing Library
import { render, screen, fireEvent } from '@testing-library/react';
import { RitualCard } from './RitualCard';

describe('RitualCard', () => {
  const mockRitual = {
    id: 'test-ritual',
    title: 'Test Meditation',
    description: 'A test meditation practice',
    difficulty: 'Beginner',
    duration: 600
  };
  
  it('renders ritual information correctly', () => {
    render(<RitualCard ritual={mockRitual} />);
    
    expect(screen.getByText('Test Meditation')).toBeInTheDocument();
    expect(screen.getByText('Beginner')).toBeInTheDocument();
    expect(screen.getByText('10 min')).toBeInTheDocument();
  });
  
  it('calls onSelect when clicked', () => {
    const handleSelect = jest.fn();
    render(<RitualCard ritual={mockRitual} onSelect={handleSelect} />);
    
    fireEvent.click(screen.getByRole('button'));
    expect(handleSelect).toHaveBeenCalledWith(mockRitual);
  });
});
```

---

## 📝 Best Practices

### Component Design Principles
1. **Single Responsibility**: Each component should have one clear purpose
2. **Prop Interfaces**: Always define TypeScript interfaces for props
3. **Error Boundaries**: Wrap risky components in error boundaries
4. **Performance**: Use React.memo for expensive components
5. **Accessibility**: Include proper ARIA labels and keyboard navigation

### Code Organization
```
components/
├── ui/                 # Basic reusable components
├── feature/           # Feature-specific components
├── layout/            # Layout and navigation
├── forms/             # Form-related components
└── specialized/       # 3D, AI, and other specialized components
```

### Performance Optimization
```typescript
// Memoize expensive components
const ExpensiveComponent = React.memo(({ data }) => {
  // Expensive rendering logic
  return <div>{/* Complex UI */}</div>;
});

// Use useMemo for expensive calculations
const MyComponent = ({ items }) => {
  const processedItems = useMemo(() => {
    return items.map(item => expensiveTransform(item));
  }, [items]);
  
  return <ItemList items={processedItems} />;
};
```

---

## 📞 Support

For component-related questions:
- Check the TypeScript definitions in each component file
- Review the Storybook documentation (if available)
- Consult the main [README](./README.md) for setup instructions
- Use the integrated System Status component for debugging

**Last Updated**: June 10, 2025  
**Component Library Version**: 1.0.0  
**Documentation Status**: Complete
