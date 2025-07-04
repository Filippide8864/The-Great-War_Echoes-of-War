// Game Types for The Great War - Echoes of War
export interface Position {
  x: number;
  y: number;
}

export interface Resources {
  manpower: number;
  food: number;
  materials: number;
  morale: number;
}

export interface Nation {
  id: string;
  name: string;
  color: string;
  resources: Resources;
  isPlayer: boolean;
  alliance: 'entente' | 'central-powers';
  researchedTechs: string[];
  currentResearch?: {
    techId: string;
    progress: number;
    totalTime: number;
  };
}

export type UnitType = 'infantry' | 'artillery' | 'cavalry' | 'tank' | 'engineer';

export interface Unit {
  id: string;
  type: UnitType;
  position: Position;
  nation: string;
  health: number;
  attack: number;
  defense: number;
  movement: number;
  morale: number;
  isSelected: boolean;
}

export interface Trench {
  id: string;
  position: Position;
  nation: string;
  type: 'frontline' | 'communication' | 'reserve';
  health: number;
  level: number;
}

export interface Technology {
  id: string;
  name: string;
  category: 'weapons' | 'aviation' | 'naval' | 'engineering';
  year: number;
  prerequisites: string[];
  effects: {
    unitUpgrades?: Record<UnitType, Partial<Unit>>;
    newUnits?: UnitType[];
    resourceBonus?: Partial<Resources>;
  };
  researchCost: {
    materials: number;
    time: number;
  };
}

export interface HistoricalEvent {
  id: string;
  name: string;
  description: string;
  date: { year: number; month: number };
  triggerConditions?: {
    year?: number;
    month?: number;
    nations?: string[];
  };
  effects: {
    nations?: Record<string, {
      resources?: Partial<Resources>;
    }>;
  };
}

export interface GameState {
  currentTurn: number;
  currentYear: number;
  currentMonth: number;
  selectedNation: string;
  nations: Record<string, Nation>;
  units: Record<string, Unit>;
  trenches: Record<string, Trench>;
  isPaused: boolean;
  gameSpeed: number;
  mapZoom: number;
  mapCenter: Position;
  selectedUnits: string[];
  triggeredEvents: string[];
  notifications: Array<{
    id: string;
    message: string;
    type: 'info' | 'warning' | 'success' | 'combat';
    timestamp: number;
  }>;
}

export const NATIONS = {
  FRANCE: 'france',
  GERMANY: 'germany',
  BRITAIN: 'britain',
  RUSSIA: 'russia',
  AUSTRIA: 'austria',
  ITALY: 'italy',
  USA: 'usa'
} as const;