import { api } from 'shared/api';
export async function getMyScore() {
  const { data } = await api.get('/api/score/me');
  return data;
}
export async function getMyHistory() {
  const { data } = await api.get('/api/score/me/history');
  return data as { id: number; result: 'WIN' | 'LOSS' | 'DRAW'; finished_at: string }[];
}
