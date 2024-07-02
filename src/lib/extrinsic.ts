import { web3Enable, web3FromAddress } from '@polkadot/extension-dapp';
import { getApi } from './polkadot';
import { toast } from 'sonner';

export async function playGame(gameType: 0 | 1 | 2, address: string) {
  try {
    const api = await getApi();
    // const extensions = await web3Enable('RealXDEal');
    const injected = await web3FromAddress(address);
    const extrinsic = api.tx.gameModule.playGame(gameType);
    const signer = injected.signer;

    const unsub = await extrinsic.signAndSend(address, { signer }, result => {
      if (result.status.isInBlock) {
        toast.success(result.status.asInBlock.toString());
        console.log(`Completed at block hash #${result.status.asInBlock.toString()}`);
      } else if (result.status.isBroadcast) {
        toast.warning('Broadcasting the game...');
        console.log('Broadcasting the game...');
      }
      console.log('Play Result', result);
    });

    console.log('Transaction sent:', unsub);
  } catch (error) {
    console.error('Failed to submit guess:', error);
  }
}

export async function submitGameAnswer(address: string, guess: any, gameId: number) {
  try {
    const api = await getApi();
    const injected = await web3FromAddress(address);
    const extrinsic = api.tx.gameModule.submitAnswer(guess, gameId);
    const signer = injected.signer;

    const unsub = await extrinsic.signAndSend(address, { signer }, result => {
      if (result.status.isInBlock) {
        console.log(`Completed at block hash #${result.status.asInBlock.toString()}`);
      } else if (result.status.isBroadcast) {
        console.log('Broadcasting the guess...');
      }
      console.log(result);
    });

    console.log('Transaction sent:', unsub);
  } catch (error) {
    console.error('Failed to submit guess:', error);
  }
}

type GameResultType = {
  guess: any;
  gameId: number;
  price: any;
  secret: any;
};
export async function checkGameResult(address: string, value: GameResultType) {
  try {
    const api = await getApi();
    const injected = await web3FromAddress(address);
    const extrinsic = api.tx.gameModule.checkResult(
      value.guess,
      value.gameId,
      value.price,
      value.secret
    );
    const signer = injected.signer;

    const unsub = await extrinsic.signAndSend(address, { signer }, result => {
      if (result.status.isInBlock) {
        console.log(`Completed at block hash #${result.status.asInBlock.toString()}`);
      } else if (result.status.isBroadcast) {
        console.log('Broadcasting the guess...');
      }
    });

    console.log('Transaction sent:', unsub);
  } catch (error) {
    console.error('Failed to submit guess:', error);
  }
}

export async function listNFT(senderAddress: string, collectionId: number, nftId: number) {
  try {
    const api = await getApi();
    const injected = await web3FromAddress(senderAddress);
    const extrinsic = api.tx.gameModule.listNFT(collectionId, nftId);
    const signer = injected.signer;

    const unsub = await extrinsic.signAndSend(senderAddress, { signer }, result => {
      if (result.status.isInBlock) {
        console.log(`Completed at block hash #${result.status.asInBlock.toString()}`);
      } else if (result.status.isBroadcast) {
        console.log('Broadcasting the guess...');
      }
    });

    console.log('Transaction sent:', unsub);
  } catch (error) {
    console.error('Failed to submit guess:', error);
  }
}
