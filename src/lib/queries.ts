import { getApi } from './polkadot';

export async function getAvailableNFTs(collectionId?: number) {
  const api = await getApi();
  const result = await api.query.gameModule.collectionColor(collectionId);
  const output = result.toHuman();
  return output;
}

export async function getLeadBoards() {
  const api = await getApi();
  const result = await api.query.gameModule.leaderboard();
  const output = result.toHuman();
  return output;
}

export async function getCurrentRoundID() {
  const api = await getApi();
  const result = await api.query.gameModule.currentRound();
  const output = result.toHuman();
  return output;
}
export async function getGameInfo(gameId: number) {
  const api = await getApi();
  const result = await api.query.gameModule.gameInfo(gameId);
  const output = result.toHuman();
  return output;
}
