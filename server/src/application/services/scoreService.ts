import { StatsRepo } from '../../infra/repositories/statsRepo.js';
import { UserRepo } from '../../infra/repositories/userRepo.js';
import { MatchRepo } from '../../infra/repositories/matchRepo.js';
export const ScoreService = {
  async me(userId: number) {
    return await StatsRepo.getForUser(userId);
  },
  async myHistory(userId: number) {
    return await MatchRepo.historyForUser(userId, 50);
  },
  async adminLeaderboard() {
    return await UserRepo.findAllWithStats();
  },
  async adminUserHistory(userId: number) {
    return await MatchRepo.historyForUser(userId, 200);
  },
};
