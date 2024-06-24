// 'use client';
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
import LiveGamePlay from './_components/live-game-container';
import { getAvailableNFTs } from '@/lib/queries';

type Player = {
  Player: 1;
};

type Practice = {
  Practice: 0;
};

type GameType = Player | Practice;

export default async function App() {
  // getAvailableNFTs(1);

  // console.log(process.env.NEXT_PUBLIC_RPC);

  return (
    <Shell>
      <div className="flex w-full items-center justify-between">
        <div className="space-x-[17px]">
          {/* <Image
            src={'/images/profile/profile.png'}
            alt="profile"
            width={53}
            height={53}
            priority
          /> */}
          <div>
            <span className="rounded-3xl bg-[#DC7DA6]/[0.25] px-2 py-[2px] text-[0.875rem]/[0.025rem] font-extralight">
              1Ay00011DY...
            </span>
          </div>
        </div>
        <div className="space-x-[15px]">
          <span>Points</span>
          <span className="text-primary-400">1500</span>
        </div>
      </div>
      <section className=" flex w-full gap-[54px]">
        <CardWithoutHeading className="w-[40%]">
          <PlayerStats title="Guesses" value={10} />
          <PlayerStats title="Correct " value={6} />
          <PlayerStats title="Failed " value={0} />
        </CardWithoutHeading>

        <div className="flex w-[60%] items-start gap-[29px]">
          <div className="flex h-full w-[172px] items-end justify-center rounded-lg border border-primary-400 bg-primary-400/[0.24] pb-2.5">
            <LiveGamePlay type={{ Practice: 0 }} />

            {/* <Button variant={'warning'} size={'md'} onClick={() => playGame({ Practice: 0 })}>
              Demo Mode
            </Button> */}
          </div>
          <div className="flex h-full w-[172px] items-end justify-center rounded-lg border border-primary-200 bg-primary-200/[0.24] pb-2.5">
            <LiveGamePlay type={{ Player: 1 }} />
            {/* <Button variant={'secondary'} size={'md'} onClick={() => playGame({ Player: 1 })}>
              Live Mode
            </Button> */}
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
