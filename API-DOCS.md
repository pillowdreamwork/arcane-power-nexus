# 🔮 Arcane Power Nexus - API Documentation

## 📋 Overview

The Arcane Power Nexus application provides a comprehensive API for spiritual practice management, AI-powered guidance, and 3D ritual environments. This document outlines all available endpoints, data structures, and integration patterns.

## 🏗️ Architecture

### Tech Stack
- **Frontend**: React 18.3.1 + TypeScript 5.5.3
- **State Management**: TanStack Query (React Query)
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **AI/ML**: TensorFlow.js + Universal Sentence Encoder
- **3D Graphics**: Three.js + React Three Fiber

### Data Flow
```
User Interface → React Components → TanStack Query → Supabase API
                                              ↓
AI Agents ← TensorFlow.js ← Performance Monitor ← Error Monitor
```

## 🛡️ Authentication

### Supabase Auth Integration

All API requests require authentication through Supabase. The application supports:

- **Email/Password Authentication**
- **OAuth Providers** (Google, GitHub, etc.)
- **JWT Token Management**
- **Session Persistence**

```typescript
// Authentication Example
import { supabase } from "@/integrations/supabase/client";

// Sign in
const { data, error } = await supabase.auth.signInWithPassword({
  email: 'user@example.com',
  password: 'password'
});

// Get current session
const { data: { session } } = await supabase.auth.getSession();
```

## 📊 Core APIs

### 1. User Profile Management

#### Get User Profile
```typescript
GET /api/users/profile
```

**Response:**
```json
{
  "id": "uuid",
  "email": "user@example.com",
  "spiritual_level": 1,
  "energy_points": 150,
  "completed_rituals": 12,
  "favorite_practices": ["meditation", "chakra-balancing"],
  "created_at": "2025-01-01T00:00:00Z",
  "updated_at": "2025-06-10T15:30:00Z"
}
```

#### Update Spiritual Progress
```typescript
POST /api/users/progress
Content-Type: application/json

{
  "ritual_id": "chakra-balancing",
  "duration": 1800, // seconds
  "energy_gained": 25,
  "notes": "Felt deep relaxation in heart chakra"
}
```

### 2. Ritual Management

#### Get All Rituals
```typescript
GET /api/rituals
```

**Response:**
```json
{
  "rituals": [
    {
      "id": "chakra-balancing",
      "title": "Chakra Balancing",
      "description": "Align and balance your energy centers",
      "duration": 1800,
      "difficulty": "Beginner",
      "category": "Energy Work",
      "steps": [
        {
          "id": 1,
          "title": "Grounding",
          "instruction": "Sit comfortably and connect with earth energy",
          "duration": 300
        }
      ],
      "benefits": ["Energy alignment", "Stress relief"]
    }
  ]
}
```

#### Get Ritual by ID
```typescript
GET /api/rituals/{ritual_id}
```

#### Create Custom Ritual
```typescript
POST /api/rituals
Content-Type: application/json

{
  "title": "Custom Morning Practice",
  "description": "Personal morning meditation",
  "steps": [
    {
      "title": "Breath Awareness",
      "instruction": "Focus on natural breathing",
      "duration": 600
    }
  ],
  "category": "Meditation",
  "is_public": false
}
```

### 3. AI Echo Assistant

#### Get AI Guidance
```typescript
POST /api/ai/guidance
Content-Type: application/json

{
  "query": "How can I improve my meditation practice?",
  "context": {
    "current_level": "beginner",
    "recent_practices": ["breathing", "mindfulness"],
    "goals": ["stress_relief", "spiritual_growth"]
  }
}
```

**Response:**
```json
{
  "response": "Based on your beginner level and recent practices...",
  "suggestions": [
    {
      "type": "ritual",
      "id": "guided-meditation",
      "title": "Guided Meditation for Beginners"
    },
    {
      "type": "tip",
      "content": "Try practicing at the same time each day"
    }
  ],
  "confidence": 0.89
}
```

#### Analyze Intent
```typescript
POST /api/ai/intent
Content-Type: application/json

{
  "text": "I'm feeling stressed and need to relax",
  "user_id": "uuid"
}
```

**Response:**
```json
{
  "intent": "stress_relief",
  "emotion": "anxious",
  "recommended_practices": ["breathing", "body_scan", "mindfulness"],
  "urgency": "medium"
}
```

### 4. Spiritual Armory

#### Get Mantras
```typescript
GET /api/armory/mantras
```

**Response:**
```json
{
  "mantras": [
    {
      "id": "om-namah-shivaya",
      "name": "Om Namah Shivaya",
      "description": "Universal mantra for transformation",
      "origin": "Shaivite",
      "power": "Dissolution of obstacles",
      "repetitions": 108,
      "audio_url": "/audio/om-namah-shivaya.mp3",
      "phonetic": "Aum Na-mah Shi-va-ya"
    }
  ]
}
```

#### Get Yantras
```typescript
GET /api/armory/yantras
```

**Response:**
```json
{
  "yantras": [
    {
      "id": "sri-yantra",
      "name": "Sri Yantra",
      "description": "Sacred geometry for abundance",
      "elements": "9 triangles, lotus petals",
      "power": "Manifestation and prosperity",
      "svg_data": "<svg>...</svg>",
      "meditation_guide": "Focus on the central point..."
    }
  ]
}
```

### 5. 3D Ritual Environment

#### Get 3D Scene Configuration
```typescript
GET /api/3d/scenes/{scene_id}
```

**Response:**
```json
{
  "scene": {
    "id": "ritual-temple",
    "name": "Sacred Temple",
    "environment": {
      "lighting": "ambient_mystical",
      "background": "star_field",
      "fog": { "color": "#1a1a2e", "density": 0.01 }
    },
    "objects": [
      {
        "type": "altar",
        "position": [0, 0, 0],
        "scale": [1, 1, 1],
        "interactive": true
      }
    ],
    "effects": [
      {
        "type": "particles",
        "count": 1000,
        "behavior": "floating"
      }
    ]
  }
}
```

#### Update Ritual Progress
```typescript
POST /api/3d/ritual-progress
Content-Type: application/json

{
  "scene_id": "ritual-temple",
  "ritual_id": "chakra-balancing",
  "step": 3,
  "energy_level": 75,
  "interactions": [
    {
      "object": "crystal_altar",
      "action": "activate",
      "timestamp": "2025-06-10T15:30:00Z"
    }
  ]
}
```

## 🔍 Monitoring APIs

### 1. Error Monitoring

#### Log Error
```typescript
POST /api/monitoring/errors
Content-Type: application/json

{
  "message": "Failed to load ritual data",
  "severity": "medium",
  "context": {
    "component": "RitualLibrary",
    "user_id": "uuid",
    "timestamp": "2025-06-10T15:30:00Z"
  },
  "stack_trace": "Error: Failed to fetch..."
}
```

#### Get Error Statistics
```typescript
GET /api/monitoring/errors/stats?timeframe=24h
```

**Response:**
```json
{
  "total_errors": 12,
  "by_severity": {
    "low": 8,
    "medium": 3,
    "high": 1,
    "critical": 0
  },
  "by_component": {
    "RitualLibrary": 5,
    "AIAssistant": 3,
    "3DRenderer": 4
  },
  "trends": {
    "last_hour": 2,
    "previous_hour": 1
  }
}
```

### 2. Performance Monitoring

#### Log Performance Metric
```typescript
POST /api/monitoring/performance
Content-Type: application/json

{
  "metric": "page_load_time",
  "value": 1250,
  "unit": "milliseconds",
  "page": "/rituals",
  "user_agent": "Mozilla/5.0...",
  "timestamp": "2025-06-10T15:30:00Z"
}
```

#### Get Performance Stats
```typescript
GET /api/monitoring/performance/stats
```

**Response:**
```json
{
  "metrics": {
    "avg_page_load_time": 1150,
    "p95_page_load_time": 2300,
    "total_page_views": 1847,
    "bounce_rate": 0.12
  },
  "core_web_vitals": {
    "lcp": 1.2,
    "fid": 45,
    "cls": 0.08
  }
}
```

## 🤖 AI Agent APIs

### 1. Content Quality Check

#### Analyze Content Quality
```typescript
POST /api/ai-agents/quality-check
Content-Type: application/json

{
  "content": "Meditation is good for relaxation",
  "type": "ritual_description",
  "context": {
    "target_audience": "beginners",
    "spiritual_tradition": "mindfulness"
  }
}
```

**Response:**
```json
{
  "quality_score": 0.75,
  "suggestions": [
    {
      "type": "enhancement",
      "message": "Consider adding specific breathing techniques"
    },
    {
      "type": "accuracy",
      "message": "Content is factually accurate"
    }
  ],
  "readability": {
    "grade_level": 8,
    "reading_time": 30
  }
}
```

### 2. System Status

#### Get AI Agent Status
```typescript
GET /api/ai-agents/status
```

**Response:**
```json
{
  "agents": [
    {
      "name": "ContentQualityAgent",
      "status": "active",
      "last_check": "2025-06-10T15:29:00Z",
      "performance": {
        "avg_response_time": 250,
        "accuracy_rate": 0.94
      }
    },
    {
      "name": "PerformanceMonitorAgent",
      "status": "active",
      "last_check": "2025-06-10T15:30:00Z",
      "alerts": []
    }
  ],
  "overall_health": "excellent"
}
```

## 🔐 Security

### Rate Limiting
All API endpoints are protected by rate limiting:
- **Standard endpoints**: 100 requests per minute
- **AI endpoints**: 30 requests per minute
- **Upload endpoints**: 10 requests per minute

### Error Handling
Standard error response format:
```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid ritual data provided",
    "details": {
      "field": "duration",
      "expected": "positive integer",
      "received": "-5"
    },
    "timestamp": "2025-06-10T15:30:00Z",
    "request_id": "req_abc123"
  }
}
```

### HTTP Status Codes
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `429` - Too Many Requests
- `500` - Internal Server Error

## 🧪 Testing

### API Testing Examples

```typescript
// Example test using fetch
const testRitualCreation = async () => {
  const response = await fetch('/api/rituals', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({
      title: "Test Meditation",
      description: "A simple test meditation",
      steps: [
        {
          title: "Breathe",
          instruction: "Focus on breathing",
          duration: 300
        }
      ]
    })
  });
  
  const result = await response.json();
  console.log('Created ritual:', result);
};
```

## 📝 Integration Examples

### React Component Integration
```typescript
// Using TanStack Query
import { useQuery, useMutation } from '@tanstack/react-query';

const useRituals = () => {
  return useQuery({
    queryKey: ['rituals'],
    queryFn: async () => {
      const response = await fetch('/api/rituals');
      return response.json();
    }
  });
};

const useCreateRitual = () => {
  return useMutation({
    mutationFn: async (ritualData) => {
      const response = await fetch('/api/rituals', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(ritualData)
      });
      return response.json();
    }
  });
};
```

## 🔄 Real-time Features

### WebSocket Connections
The application supports real-time features through Supabase Realtime:

```typescript
// Subscribe to ritual progress updates
const subscription = supabase
  .channel('ritual-progress')
  .on('postgres_changes', {
    event: 'UPDATE',
    schema: 'public',
    table: 'user_progress'
  }, (payload) => {
    console.log('Progress updated:', payload);
  })
  .subscribe();
```

## 📚 SDK and Libraries

### Recommended Client Libraries
- **JavaScript/TypeScript**: Native fetch or axios
- **React**: TanStack Query for state management
- **Vue**: Vue Query or Pinia
- **Angular**: Angular HTTP Client

### Helper Functions
```typescript
// API client helper
export const apiClient = {
  async get(endpoint: string) {
    const response = await fetch(`/api${endpoint}`, {
      headers: { 'Authorization': `Bearer ${getToken()}` }
    });
    return response.json();
  },
  
  async post(endpoint: string, data: any) {
    const response = await fetch(`/api${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getToken()}`
      },
      body: JSON.stringify(data)
    });
    return response.json();
  }
};
```

---

## 📞 Support

For API support and questions:
- Check the integrated System Status component
- Review error logs in the monitoring dashboard
- Consult the main [README](./README.md) for setup instructions

**Last Updated**: June 10, 2025  
**API Version**: 1.0.0  
**Documentation Status**: Complete
