'use client';
import { Card, CardWithoutHeading } from '@/components/cards/card';
import { Shell } from '@/components/shell';
import { TaskCard } from '../tasks/page';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { PlayerStats } from '@/components/cards/player-stats-card';
import { LeadBoardCard } from '@/components/cards/leadboard-card';
import Link from 'next/link';
import { getApi } from '@/lib/polkadot';
import { web3Enable, web3FromAddress } from '@polkadot/extension-dapp';

type Player = {
  Player: 1;
};

type Practice = {
  Practice: 0;
};

type GameType = Player | Practice;

export default function App() {
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
    <Shell>
      <section className=" flex w-full gap-[54px]">
        <CardWithoutHeading className="w-[40%]">
          <PlayerStats title="Guesses" value={10} />
          <PlayerStats title="Correct " value={6} />
          <PlayerStats title="Failed " value={0} />
        </CardWithoutHeading>

        <div className="flex w-[60%] items-start gap-[29px]">
          <div className="flex h-full w-[172px] items-end justify-center rounded-lg border border-primary-400 bg-primary-400/[0.24] pb-2.5">
            <Button variant={'warning'} size={'md'} onClick={() => playGame({ Practice: 0 })}>
              Demo Mode
            </Button>
          </div>
          <div className="flex h-full w-[172px] items-end justify-center rounded-lg border border-primary-200 bg-primary-200/[0.24] pb-2.5">
            {/* <Link href={`/gameplay`}> */}
            <Button variant={'secondary'} size={'md'} onClick={() => playGame({ Player: 1 })}>
              Live Mode
            </Button>
            {/* </Link> */}
          </div>
        </div>
      </section>
      <section className="flex items-start gap-[54px]">
        <Card className="w-[40%]" title="Top 5 players">
          <div className="flex w-full flex-col gap-6">
            <LeadBoardCard points={2000} winner />
            <LeadBoardCard points={2000} winner />
            <LeadBoardCard points={2000} winner />
            <LeadBoardCard points={2000} />
            <LeadBoardCard points={2000} />
            <LeadBoardCard points={2000} />
          </div>
        </Card>
        <Card className="w-[60%]" title="NFTs Collected">
          <div className="grid h-full w-full grid-cols-4 gap-6">
            <NFTCard />
            <NFTCard />
            <NFTCard />
            <NFTCard />
            <NFTCard />
            <NFTCard />
            <NFTCard />
            <NFTCard />
          </div>
        </Card>
      </section>
      <Card title="Task">
        <div className="grid w-full grid-cols-3 gap-[14px]">
          <TaskCard
            type="x"
            title="Social media"
            description="Follow, retweet, like a tweet, or create memes with a hashtag."
          />
          <TaskCard
            type="x"
            title="Social media"
            description="Follow, retweet, like a tweet, or create memes with a hashtag."
          />
          <TaskCard
            type="x"
            title="Social media"
            description="Follow, retweet, like a tweet, or create memes with a hashtag."
          />
        </div>
      </Card>
    </Shell>
  );
}

const NFTCard = () => {
  return (
    <div className="relative w-full border border-primary-200 p-[6px]">
      <Image
        src={'/images/Xpurple_property_NFT9_apartment.webp'}
        alt="nft"
        width={132}
        height={152}
        priority
      />{' '}
      <div className=" absolute bottom-0 left-[53px] flex items-center justify-center rounded-t bg-primary-200 px-2">
        <span className="text-[1rem]/[1.2rem] font-light">10</span>
      </div>
    </div>
  );
};
