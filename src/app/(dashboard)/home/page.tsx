'use client';

import { Card, CardWithoutHeading, TaskCard } from '@/components/cards/card';
import { Shell } from '@/components/shell';

import Image from 'next/image';
import { PlayerStats } from '@/components/cards/player-stats-card';
import { LeadBoardCard } from '@/components/cards/leadboard-card';
import LiveGamePlay from './_components/live-game-container';
import { getLeadBoards, getUserData } from '@/lib/queries';
import ProfileHeader from './_components/profile-header';
import { useSubstrateContext } from '@/context/polkadot-contex';
import { useCallback, useEffect, useState } from 'react';

export default function App() {
  const { address } = useSubstrateContext();
  const [user, setUser] = useState<any>();
  const [lists, setLists] = useState<any>([]);

  async function fetchData(address: string) {
    const boardList = await getLeadBoards();
    const userData = await getUserData(address);

    if (userData !== null && boardList !== null) {
      return { boardList, userData };
    }
  }

  const fetchUserDetails = useCallback(async () => {
    const data = await fetchData(address);
    setUser(data?.userData);
    // TODO add loading state
    setLists(Array.isArray(data?.boardList) ? data?.boardList : []);
  }, [address]);

  useEffect(() => {
    fetchUserDetails();
  }, [fetchUserDetails]);

  return (
    <Shell>
      <ProfileHeader points={user?.points} />
      <section className=" flex w-full gap-[54px]">
        <CardWithoutHeading className="w-2/5">
          <PlayerStats title="Guesses" value={Number(user?.wins) + Number(user?.losses)} />
          <PlayerStats title="Correct " value={user?.wins} />
          <PlayerStats title="Failed " value={user?.losses} />
        </CardWithoutHeading>

        <div className="flex w-3/5 items-start gap-[29px]">
          <div className="flex h-full w-[172px] items-end justify-center rounded-lg border border-primary-400 bg-primary-400/[0.24] pb-2.5">
            <LiveGamePlay type={0} />
          </div>
          <div className="flex h-full w-[172px] items-end justify-center rounded-lg border border-primary-200 bg-primary-200/[0.24] pb-2.5">
            <LiveGamePlay type={1} />
          </div>
        </div>
      </section>
      <section className="flex items-start gap-[54px]">
        <Card className="w-2/5" title="Top 5 players">
          <div className="flex w-full flex-col gap-6">
            {/* TODO: create a skelton component */}
            {lists.map((list: any, index: number) => (
              <LeadBoardCard
                key={index}
                index={index + 1}
                user={list[0]}
                points={Number(list[1])}
                winner={index + 1 > 3 ? false : true}
              />
            ))}
          </div>
        </Card>
        <Card className="w-3/5" title="NFTs Collected">
          <div className="grid size-full grid-cols-4 gap-6">
            <NFTCard image="/images/nfts/x_orange.png" noOfNfts={user?.nfts?.xorange} />
            <NFTCard image="/images/nfts/x_pink.png" noOfNfts={user?.nfts?.xpink} />
            <NFTCard image="/images/nfts/x_blue.png" noOfNfts={user?.nfts?.xblue} />
            <NFTCard image="/images/nfts/x_cyan.png" noOfNfts={user?.nfts?.xorange} />
            <NFTCard image="/images/nfts/x_coral.png" noOfNfts={user?.nfts?.xcoral} />
            <NFTCard image="/images/nfts/x_purple.png" noOfNfts={user?.nfts?.xpurple} />
            <NFTCard image="/images/nfts/x_leaf_green.png" noOfNfts={user?.nfts?.xleafgreen} />
            <NFTCard image="/images/nfts/x_green.png" noOfNfts={user?.nfts?.xgreen} />
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

const NFTCard = ({ image, noOfNfts }: { image: string; noOfNfts: number }) => {
  return (
    <div className="relative w-full border border-primary-200 p-[6px]">
      <Image
        src={image}
        alt="nft"
        width={132}
        height={152}
        priority
        className="h-[152px] w-full"
      />{' '}
      <div className=" absolute bottom-0 left-[53px] flex items-center justify-center rounded-t bg-primary-200 px-2">
        <span className="text-[1rem]/[1.2rem] font-light">{noOfNfts}</span>
      </div>
    </div>
  );
};
