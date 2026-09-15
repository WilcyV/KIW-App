export interface Profile {
  id: string;
  name: string;
  sleep_goal: number;
  theme: string;
  dark_mode: boolean;
  created_at: string;
}

export type EventCategory =
  | 'clase' | 'examen' | 'trabajo' | 'gym'
  | 'personal' | 'viaje' | 'reunión' | 'fiesta';

export const CATEGORY_COLORS: Record<EventCategory, string> = {
  clase: '#3D7A56', examen: '#C0392B', trabajo: '#4A7FA5',
  gym: '#1D9E75', personal: '#7063A8', viaje: '#E67E22',
  reunión: '#2C3E50', fiesta: '#D4537E',
};

export const CATEGORY_LABELS: Record<EventCategory, string> = {
  clase: 'Clase', examen: 'Examen', trabajo: 'Trabajo', gym: 'Gym',
  personal: 'Personal', viaje: 'Viaje', reunión: 'Reunión', fiesta: 'Fiesta',
};

export interface KiwEvent {
  id: string;
  user_id: string;
  title: string;
  description?: string;
  start_time: string;
  end_time: string;
  category: EventCategory;
  color: string;
  location?: string;
  created_at: string;
}

export type Priority = 'urgente' | 'media' | 'baja';

export const PRIORITY_COLORS: Record<Priority, { bg: string; text: string }> = {
  urgente: { bg: 'rgba(192,57,43,0.12)', text: '#8b2020' },
  media:   { bg: 'rgba(180,120,20,0.12)', text: '#7a5010' },
  baja:    { bg: 'rgba(100,100,100,0.10)', text: '#555555' },
};

export const PRIORITY_LABELS: Record<Priority, string> = {
  urgente: 'Urgente', media: 'Media', baja: 'Baja',
};

export interface Task {
  id: string;
  user_id: string;
  title: string;
  due_date?: string;
  priority: Priority;
  done: boolean;
  event_id?: string;
  created_at: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export type RootTabParamList = {
  Home: undefined;
  Chat: undefined;
  Calendar: undefined;
  Tasks: undefined;
  More: undefined;
};
