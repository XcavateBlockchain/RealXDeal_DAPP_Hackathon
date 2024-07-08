import { cn } from '@/lib/utils';
import { Icons } from '../icons';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  orientation?: 'vertical' | 'horizontal';
  description?: string;
}

export function Card({
  className,
  orientation = 'horizontal',
  title,
  description,
  children,
  ...props
}: CardProps) {
  return (
    <section
      className={cn(
        'flex w-full flex-col items-start gap-8 rounded-lg border border-border bg-black/[0.20] px-4 py-6 shadow-header backdrop-blur',
        className
      )}
      {...props}
    >
      <div
        className={cn(
          'flex w-full gap-[18px]',
          orientation === 'vertical' ? 'flex-col' : ' flex-row justify-between'
        )}
      >
        <h2 className="text-[1rem] font-medium">{title}</h2>
        {description ? (
          <p className="text-[0.875rem]/[1.5rem] font-light">{description}</p>
        ) : null}
      </div>
      {children}
    </section>
  );
}

export function CardWithoutHeading({
  className,
  children,
  ...props
}: Omit<CardProps, 'title' | 'description'>) {
  return (
    <section
      className={cn(
        'flex w-full items-start gap-8 rounded-lg border border-border bg-black/[0.20] px-4 py-6 shadow-header backdrop-blur',
        className
      )}
      {...props}
    >
      {children}
    </section>
  );
}

type TaskCardProps = {
  type: string;
  title: string;
  description: string;
};

export const TaskCard = ({ title, description }: TaskCardProps) => {
  return (
    <div className="flex flex-col items-start justify-start gap-4 rounded-lg bg-[#3E4F6D] px-6 py-10 backdrop-blur">
      <dt className="flex items-start gap-2 ">
        <Icons.xLogo className="size-6" />{' '}
        <span className="font-heading text-[0.875rem]/[1.543m] font-medium">{title}</span>
      </dt>
      <dd className="text-[0.875rem]/[1.5rem] font-light">{description}</dd>
    </div>
  );
};
