import { Card } from '@/components/cards/card';
import { Icons } from '@/components/icons';
import { Shell } from '@/components/shell';

type TaskCardProps = {
  type: string;
  title: string;
  description: string;
};

export default function Tasks() {
  return (
    <Shell>
      <Card
        title="Task"
        description=" Select any quest below to add on your community’s main quest board, This will
            enable your community to engage and provide continuous value."
      >
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

export const TaskCard = ({ type, title, description }: TaskCardProps) => {
  return (
    <div className="flex flex-col items-start justify-start gap-4 rounded-lg bg-[#3E4F6D] px-6 py-10 backdrop-blur-[8px] backdrop-filter">
      <dt className="flex items-start gap-2 ">
        <Icons.xLogo className="size-6" />{' '}
        <span className="font-heading text-[0.875rem]/[1.543m] font-medium">{title}</span>
      </dt>
      <dd className="text-[0.875rem]/[1.5rem] font-light">{description}</dd>
    </div>
  );
};
