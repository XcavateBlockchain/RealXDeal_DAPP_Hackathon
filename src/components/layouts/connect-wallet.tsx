'use client';

import { useState } from 'react';
import { AlertDialog, AlertDialogContent, AlertDialogTrigger } from '../ui/alert-dialog';
import { ConnectWalletIcon, WalletIcon, WalletIconType } from '../wallet-icon';
import { Icons } from '../icons';

export default function ConnectWallet() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <AlertDialogTrigger asChild>
        <button className="flex items-center gap-2 rounded-lg border border-primary-300 px-[45px] py-4 font-heading text-[1rem] font-medium text-primary-300 hover:border-white hover:text-white">
          Connect <ConnectWalletIcon className="h-4 w-[21px]" />
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent className="gap-6">
        <div className="flex items-center justify-between">
          <h1 className="text-[1.0625rem]/[1.5rem] font-medium ">Connect wallet</h1>
          <button onClick={() => setIsDialogOpen(false)}>
            <Icons.close className="size-6 stroke-white hover:stroke-primary-foreground" />
          </button>
        </div>
        <div className="flex w-full flex-col gap-6">
          <WalletButton icon="tailsManWallet" name="Tailsman" isRecommended />
          <WalletButton icon="subWallet" name="Subwallet" />
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}

interface WalletButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  name: string;
  icon: WalletIconType;
  isRecommended?: boolean;
}

export function WalletButton({ name, icon, isRecommended, ...props }: WalletButtonProps) {
  const Icon = WalletIcon[icon];
  return (
    <button
      className="flex w-full items-center justify-between rounded-lg border border-white px-4 py-2 transition-colors duration-300 hover:border-primary-foreground"
      {...props}
    >
      <div className="flex items-center gap-2">
        <Icon className="size-[42px]" />
        <span className="text-[1rem]/[1.5rem]">{name}</span>
      </div>
      {isRecommended ? (
        <span className="rounded-lg bg-primary px-2 text-center text-[0.75rem]/[1.5rem] font-light text-primary-300">
          Recommended
        </span>
      ) : null}
    </button>
  );
}
