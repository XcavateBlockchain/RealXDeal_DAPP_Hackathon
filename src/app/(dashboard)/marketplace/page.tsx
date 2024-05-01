import { Card } from '@/components/cards/card';
import { Shell } from '@/components/shell';
import Image from 'next/image';

export default function Page() {
  return (
    <Shell>
      <Card title="Trending">
        <div className="grid grid-cols-4 gap-[13px]">
          <NFTCard />
          <NFTCard />
          <NFTCard />
          <NFTCard />
        </div>
      </Card>
    </Shell>
  );
}

const NFTCard = () => {
  return (
    <div className="relative flex w-[264px] flex-col gap-4 rounded-lg border border-primary-300/[0.32]">
      <Image
        src={'/images/nft.png'}
        alt="nft"
        width={264}
        height={184}
        priority
        className="rounded-t-lg"
      />

      <div className="flex flex-col gap-2.5 px-[17px] pb-[17px]">
        <div className=" space-x-1 text-[0.9rem]  font-light">
          <span>#164</span> | <span className="ml-[2px]">Blue</span>
        </div>

        <div className="flex items-center justify-between text-[0.9rem] font-light">
          <span>Victor X</span>
          <span className="text-primary-foreground">5 minutes ago</span>
        </div>
      </div>
    </div>
  );
};
