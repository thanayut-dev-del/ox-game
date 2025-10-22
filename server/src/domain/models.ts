export type ID = number;
export interface User {
  id: ID;
  provider: string;
  provider_id: string;
  email: string;
  name?: string;
  avatar?: string;
  is_admin: boolean;
  created_at?: string;
}
export interface Stats {
  user_id: ID;
  score: number;
  win_streak: number;
  best_streak: number;
  updated_at?: string;
}
export type Result = 'WIN' | 'LOSS' | 'DRAW';
export interface Match {
  id: ID;
  user_id: ID;
  result: Result;
  moves: any;
  finished_at?: string;
}
