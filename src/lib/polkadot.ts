import { ApiPromise, WsProvider } from '@polkadot/api';

const wsProvider = new WsProvider(process.env.RPC);

const apiPromise = await ApiPromise.create({ provider: wsProvider });

export default apiPromise;
