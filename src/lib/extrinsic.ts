import { web3Enable, web3FromAddress } from '@polkadot/extension-dapp';
import { getApi } from './polkadot';
import { toast } from 'sonner';
import { getGameInfo } from './queries';
import { fetchPropertyForDisplay } from '@/app/actions';

interface GameInfo {
  property: {
    id: number;
    [key: string]: any;
  };
}

export async function playGame(gameType: 0 | 1 | 2, address: string) {
  try {
    const api = await getApi();
    const extensions = await web3Enable('RealXDEal');
    const injected = await web3FromAddress(address);
    const extrinsic = api.tx.gameModule.playGame(gameType);
    const signer = injected.signer;

    let eventProcessed = false;

    const unsub = await extrinsic.signAndSend(
      address,
      { signer },
      async ({ status, events = [], dispatchError }) => {
        if (status.isInBlock && !eventProcessed) {
          eventProcessed = true;
          const gameStartedEvent = events.find(({ event }) =>
            api.events.gameModule.GameStarted.is(event)
          );

          if (gameStartedEvent) {
            const gameId = gameStartedEvent.event.data[1].toString();
            console.log(`GameStarted event found with game_id: ${gameId}`);
            const gameInfo = (await getGameInfo(parseInt(gameId))) as unknown as GameInfo;
            console.log('The game info is: ', gameInfo);

            const propertyDisplay = await fetchPropertyForDisplay(139361966);

            console.log(propertyDisplay);

            toast.success(status.asInBlock.toString());
            console.log(`Completed at block hash #${status.asInBlock.toString()}`);
          } else if (dispatchError) {
            // display a warning and prompt to retry
            toast.warning('Broadcasting the game...');
            console.log('Broadcasting the game...');
          }
        }
      }
    );
    console.log('Transaction sent:', unsub);
  } catch (error) {
    console.error('Failed to submit guess:', error);
  }
}

export async function submitGameAnswer(address: string, gameId: number, guess: any) {
  try {
    const api = await getApi();
    const injected = await web3FromAddress(address);
    const extrinsic = api.tx.gameModule.submitAnswer(gameId, guess);
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

export type GameResultType = {
  guess: any;
  gameId: number;
  price: any;
};
// export async function checkGameResult(address: string, value: GameResultType) {
//   try {
//     const api = await getApi();
//     const injected = await web3FromAddress(address);
//     const extrinsic = api.tx.gameModule.checkResult(
//       value.guess,
//       value.gameId,
//       value.price,
//       value.secret
//     );
//     const signer = injected.signer;

//     const unsub = await extrinsic.signAndSend(address, { signer }, result => {
//       if (result.status.isInBlock) {
//         console.log(`Completed at block hash #${result.status.asInBlock.toString()}`);
//       } else if (result.status.isBroadcast) {
//         console.log('Broadcasting the guess...');
//       }
//     });

//     console.log('Transaction sent:', unsub);
//   } catch (error) {
//     console.error('Failed to submit guess:', error);
//   }
// }

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
