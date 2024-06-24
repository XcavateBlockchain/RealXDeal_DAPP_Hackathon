'use client';

import { ReactNode, useState } from 'react';
import { Sheet, SheetClose, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import GameMode from './game-mode';
import { GuessFail, GuessPass } from './success-failure';
import { getApi } from '@/lib/polkadot';
import { web3Enable, web3FromAddress } from '@polkadot/extension-dapp';
interface IGamePlaySection {
  [key: string]: ReactNode;
}

type Player = {
  Player: 1;
};

type Practice = {
  Practice: 0;
};

type GameType = Player | Practice;

export default function LiveGamePlay({ type }: { type: GameType }) {
  const [openGameSheet, setOpenGameSheet] = useState<boolean>(false);
  const [display, setDisplay] = useState<'play' | 'success' | 'fail'>('play');

  function closeGameSheet() {
    setOpenGameSheet(false);
  }

  const game: IGamePlaySection = {
    play: <GameMode setDisplay={setDisplay} close={closeGameSheet} />,
    success: <GuessPass close={closeGameSheet} />,
    fail: <GuessFail close={closeGameSheet} />
  };

  const address = '5CSFhuBPkG1SDyHseSHh23Kg89oYVysjRmXH5ea3F3fzEyx5';
  const playGame = async (gameType: GameType) => {
    try {
      const api = await getApi();
      const extensions = await web3Enable('RealXDEal');
      const injected = await web3FromAddress(address);
      const extrinsic = api.tx.gameModule.playGame(gameType);
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
  };

  return (
    <Sheet open={openGameSheet} onOpenChange={setOpenGameSheet}>
      <SheetTrigger asChild>
        <Button variant={'Player' in type ? 'secondary' : 'warning'} size={'md'}>
          {'Player' in type ? 'Live Mode' : '  Demo Mode'}
        </Button>
      </SheetTrigger>
      <SheetContent
        className="w-screen border-0"
        onInteractOutside={e => {
          e.preventDefault();
        }}
        onEscapeKeyDown={e => {
          e.preventDefault();
        }}
      >
        <div className="container mx-auto min-h-screen w-full max-w-screen-xl">
          {game[display]}
        </div>
      </SheetContent>
    </Sheet>
  );
}
