'use client';

// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from '@/components/ui/sheet';
import { Button } from './ui/button';
import { Icons } from './icons';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import Form, { useZodForm } from './ui/form';
import { gameSchema } from '@/lib/validations/game';
import { Input } from './ui/input';
import useLiveCountdown from '@/hooks/use-live-countdown';
import { useEffect } from 'react';

export function SheetDemo() {
  const { secondsLeft, startTimeout } = useLiveCountdown();

  useEffect(() => {
    startTimeout(60);
  }, [startTimeout]);

  const form = useZodForm({
    schema: gameSchema
  });

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Open</Button>
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
          <div className="space-y-[44px]">
            <div className="flex items-center justify-between">
              <Button variant={'text'}>
                {' '}
                <Icons.CaretLeft className="size-6" />
                Return
              </Button>
              <div className="space-x-[15px]">
                <span>points</span>
                <span>1500</span>
              </div>
            </div>
            <div className="inline-flex h-full w-full items-start gap-6 rounded-lg border border-primary bg-white/[0.20] p-6 backdrop-blur-[8px]">
              {/* image */}
              <div className="">
                <Image
                  src={'/images/Xleafgreen_property_NFT5_apartment.webp'}
                  alt=""
                  width={583}
                  height={574}
                  priority
                />
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
                  <Form form={form}>
                    <Input
                      placeholder="Enter your guess"
                      className="py-5 outline-none placeholder:text-center placeholder:text-[1rem] placeholder:font-medium placeholder:opacity-[0.5]"
                      {...form.register}
                    />
                    <Button fullWidth>Guess Now</Button>
                  </Form>
                </div>
              </div>
              {/* timer */}
              <div className="flex size-[147px] items-center justify-center rounded-full border-[2.94px] border-primary-200 bg-primary px-8 py-[40px] shadow-time">
                <span className="font-heading text-[2.84569rem] font-bold">
                  {secondsLeft > 0 && `${secondsLeft}`}
                </span>
              </div>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
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
