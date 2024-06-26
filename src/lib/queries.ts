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

export async function getNextGameID() {
  const api = await getApi();
  const result = await api.query.gameModule.gameId();
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

export async function getUserData(address: string) {
  const api = await getApi();
  const result = await api.query.gameModule.users(address);
  const output = result.toHuman();
  return output;
}

export async function getListings() {
  const api = await getApi();
  const result = await api.query.gameModule.listings();
  const output = result.toHuman();
  return output;
}
