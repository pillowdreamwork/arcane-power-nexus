
import { Triangle, Hexagon, Shield, Zap, Star, Circle } from "lucide-react";

export interface RitualData {
  id: string;
  title: string;
  description: string;
  icon: any; // Using any for simplicity, but ideally would be React.ElementType
  color: string;
  difficulty: string;
  grimoireLinkType?: 'category' | 'id' | 'search';
  grimoireLinkValue?: string;
}

export const ritualCards: RitualData[] = [
  {
    id: "psychic-prison",
    title: "Psychic Prison Break",
    description: "Sever energetic chains and reclaim lost power",
    icon: Triangle,
    color: "#EF4444", // Red
    difficulty: "Advanced",
    grimoireLinkType: 'search',
    grimoireLinkValue: 'liberation binding'
  },
  {
    id: "entity-summoning",
    title: "Entity Invocation",
    description: "Conjure and communicate with ethereal beings",
    icon: Hexagon,
    color: "#8B5CF6", // Purple
    difficulty: "Master",
    grimoireLinkType: 'category',
    grimoireLinkValue: 'invocation'
  },
  {
    id: "protection",
    title: "Protective Barrier",
    description: "Create an impenetrable energy shield",
    icon: Shield,
    color: "#3B82F6", // Blue
    difficulty: "Intermediate",
    grimoireLinkType: 'category',
    grimoireLinkValue: 'protection'
  },
  {
    id: "energy-harvest",
    title: "Energy Harvesting",
    description: "Collect and store ambient spiritual energy",
    icon: Zap,
    color: "#F59E0B", // Amber
    difficulty: "Intermediate",
    grimoireLinkType: 'search',
    grimoireLinkValue: 'elemental energy manifestation'
  },
  {
    id: "astral-projection",
    title: "Astral Projection",
    description: "Travel beyond physical limitations",
    icon: Star,
    color: "#10B981", // Emerald
    difficulty: "Advanced",
    grimoireLinkType: 'search',
    grimoireLinkValue: 'astral travel out of body projection'
  },
  {
    id: "reality-manipulation",
    title: "Reality Warping",
    description: "Bend the fabric of existence to your will",
    icon: Circle,
    color: "#6366F1", // Indigo
    difficulty: "Master",
    grimoireLinkType: 'search',
    grimoireLinkValue: 'transmutation reality bending'
  }
];
