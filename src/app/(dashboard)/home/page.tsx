import { Card } from '@/components/cards/card';
import { Shell } from '@/components/shell';
import { TaskCard } from '../tasks/page';
import Image from 'next/image';
import { Icons } from '@/components/icons';
import { cn } from '@/lib/utils';

export default function App() {
  return (
    <Shell>
      <section className=" flex w-full gap-[54px]">
        <div className="flex h-full w-[40%] items-start gap-8 rounded-lg border border-[#3B4F74] bg-black/[0.20] px-4 py-6 shadow backdrop-blur-[8px] backdrop-filter">
          <PlayerStats title="Guesses" value={10} />
          <PlayerStats title="Correct " value={6} />
          <PlayerStats title="Failed " value={0} />
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
          <div className="grid grid-cols-4 gap-6">
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
      <Image src={'/images/nft.png'} alt="nft" width={132} height={152} priority />{' '}
      <div className=" absolute bottom-0 left-[53px] flex items-center justify-center rounded-t bg-primary-200 px-2">
        <span className="text-[1rem]/[1.2rem] font-light">10</span>
      </div>
    </div>
  );
};

type LeadProps = {
  points: number;
  winner?: boolean;
};

const LeadBoardCard = ({ points, winner }: LeadProps) => {
  return (
    <div
      className={cn(
        'flex w-full items-center justify-between rounded-lg p-2',
        winner && 'bg-primary-300/[0.32] backdrop-blur-[2px] backdrop-filter'
      )}
    >
      <div className="flex items-center gap-6">
        {winner ? (
          <Icons.goldMedal className="size-6" />
        ) : (
          <span className="text-[0.875rem] text-primary-foreground">1</span>
        )}
        <div className="flex items-center gap-2">
          <div className="size-6 rounded-full bg-primary-foreground" />
          <span className="text-[0.875rem] text-primary-foreground">Victor X</span>
        </div>
      </div>

      <span className="text-[0.875rem] text-primary-foreground">{points} PTS</span>
    </div>
  );
};

const PlayerStats = ({ title, value }: { title: string; value: number }) => {
  return (
    <div className="flex flex-col gap-2">
      <span className="text-[0.9ren]/[1.5rem] flex w-full rounded bg-[#4F6542]/[0.24] px-4 text-[#4F6542] backdrop-blur-[2px]">
        {title}
      </span>

      <div className="flex size-full items-center justify-center rounded-lg border border-[#4F6542] bg-[#4F6542]/[0.24] p-4">
        <span className="">{value}</span>
      </div>
    </div>
  );
};
