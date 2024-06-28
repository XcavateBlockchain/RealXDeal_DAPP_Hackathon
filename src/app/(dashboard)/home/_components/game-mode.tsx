import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';
import Form, { useZodForm } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import useLiveCountdown from '@/hooks/use-live-countdown';
import { cn } from '@/lib/utils';
import { gameSchema } from '@/lib/validations/game';
import Image from 'next/image';
import {
  Carousel,
  CarouselMainContainer,
  CarouselNext,
  CarouselPrevious,
  SliderMainItem,
  CarouselThumbsContainer,
  SliderThumbItem
} from '@/components/ui/extension-carousel';
import { Dispatch, SetStateAction, useEffect, useTransition } from 'react';

interface GameProps {
  setDisplay: Dispatch<SetStateAction<'start' | 'play' | 'success' | 'fail'>>;
  close: () => void;
}

export default function GameMode({ setDisplay, close }: GameProps) {
  const [isPending, startTransition] = useTransition();

  const { seconds } = useLiveCountdown(60);

  const form = useZodForm({
    schema: gameSchema
  });

  function onSubmit(data: any) {
    startTransition(() => {
      setDisplay('success');
    });
  }

  useEffect(() => {
    if (seconds <= 0) {
      setDisplay('fail');
    }
  });

  return (
    <div className="space-y-[44px]">
      <div className="flex items-center justify-between">
        <Button variant={'text'} onClick={close} className="p-0" disabled={isPending}>
          <Icons.CaretLeft className="size-6" />
          Return
        </Button>
        <div className="space-x-[15px]">
          <span>points</span>
          <span className="text-primary-400">1500</span>
        </div>
      </div>
      <div className="inline-flex h-full w-full items-start gap-6 rounded-lg border border-primary bg-white/[0.20] p-6 backdrop-blur-[8px]">
        {/* image */}
        <div className="">
          {/* <Image
            src={'/images/Xleafgreen_property_NFT5_apartment.webp'}
            alt=""
            width={583}
            height={574}
            priority
          /> */}
          <Carousel>
            <CarouselMainContainer className="h-[474px] w-[583px]">
              {Array.from({ length: 5 }).map((_, index) => (
                <SliderMainItem key={index} className="bg-transparent">
                  <Image
                    src={'/images/Xleafgreen_property_NFT5_apartment.webp'}
                    alt=""
                    width={583}
                    height={474}
                    priority
                    className="h-full"
                  />
                </SliderMainItem>
              ))}
            </CarouselMainContainer>
            <CarouselThumbsContainer>
              {Array.from({ length: 5 }).map((_, index) => (
                <SliderThumbItem
                  key={index}
                  index={index}
                  className="size-[130px] bg-transparent"
                >
                  <Image
                    src={'/images/Xleafgreen_property_NFT5_apartment.webp'}
                    alt=""
                    width={130}
                    height={130}
                    className="size-full"
                    priority
                  />
                </SliderThumbItem>
              ))}
              <Image
                src={'/images/Xleafgreen_property_NFT5_apartment.webp'}
                alt=""
                width={130}
                height={130}
                priority
              />
            </CarouselThumbsContainer>
          </Carousel>
        </div>
        {/* data */}
        <div className="flex w-full max-w-[439px] flex-col gap-6 px-4">
          <div className="space-y-[18px]">
            <h1 className="text-[0.875rem] font-medium">Property 1</h1>
            <DescriptionList title="Type" description="Apartment" />
            <p>One bed luxury apartment,</p>
            <div className="flex w-full items-center">
              <DescriptionList title="Bedrooms" description="1" />
              <DescriptionList title="Bathrooms" description="1" />
            </div>
            <DescriptionList title="Size" description="552 sqft / 51 sqm" />
            <DescriptionList title="Town/city" description="Hertford" />
            <DescriptionList title="Post code" description="SG235TH" />
          </div>
          <div className="space-y-[18px]">
            <h1 className="text-[0.875rem] font-medium">Key features</h1>
            <p>
              Private balcony. Communal roof terrace. Resident's concierge service. Close
              proximity to green spaces. 999 year lease with peppercorn ground rent
            </p>
          </div>
          <div className="space-y-5">
            <Form form={form} onSubmit={form.handleSubmit(onSubmit)}>
              <Input
                type="number"
                placeholder="Enter your guess"
                className="py-5 outline-none placeholder:text-center placeholder:text-[1rem] placeholder:font-medium placeholder:opacity-[0.5]"
                {...form.register('price')}
              />
              <Button
                type="submit"
                fullWidth
                disabled={!form.formState.isDirty || !form.formState.isValid || isPending}
              >
                Guess Now
              </Button>
            </Form>
          </div>
        </div>
        {/* timer */}
        <div>
          <div className="flex size-[147px] items-center justify-center rounded-full border-[2.94px] border-primary-200 bg-primary px-[31px] py-10 shadow-time">
            <span className="font-heading text-[2.84569rem] font-bold">
              {seconds > 0 && `${seconds}`}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

interface DescriptionProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  description?: string;
}

const DescriptionList = ({ className, title, description }: DescriptionProps) => {
  return (
    <div className="text-0.875rem flex items-center gap-1 font-sans">
      <dt>{title}:</dt>
      <dd className={cn('font-light', className)}>{description}</dd>
    </div>
  );
};
