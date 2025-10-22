import { api } from 'shared/api';
export async function getLeaderboard() {
  const { data } = await api.get('/api/admin/leaderboard');
  return data;
}
export async function getUserHistory(userId: number) {
  const { data } = await api.get(`/api/admin/user/${userId}/history`);
  return data;
}
