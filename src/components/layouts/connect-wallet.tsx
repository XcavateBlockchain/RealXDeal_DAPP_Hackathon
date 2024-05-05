'use client';

import { useState, useEffect } from 'react';
import { web3Accounts, web3Enable, web3FromSource } from '@polkadot/extension-dapp';
import { InjectedExtension, InjectedAccountWithMeta } from '@polkadot/extension-inject/types';
import { AlertDialog, AlertDialogContent, AlertDialogTrigger } from '../ui/alert-dialog';
import { ConnectWalletIcon, WalletIcon, WalletIconType } from '../wallet-icon';
import { Icons } from '../icons';
import { formatAddress } from '@/lib/utils';

export default function ConnectWallet() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState<InjectedAccountWithMeta>();

  const handleConnect = async (walletName: string) => {
    try {
      const extensions = await web3Enable('RealXChange');
      const extension = extensions.find(
        ext => ext.name.toLowerCase() === walletName.toLowerCase()
      );
      if (!extension) {
        alert(`Please install the ${walletName} extension.`);
        return;
      }

      const injected = await web3FromSource(extension.name);
      if (!injected) {
        throw new Error(`Failed to connect with ${walletName}`);
      }

      const accounts = await web3Accounts();
      if (accounts.length === 0) {
        throw new Error('No accounts found in the wallet.');
      }

      setSelectedAccount(accounts[0]);
      console.log('Connected with account:', accounts[0]);

      alert(`Connected successfully with ${walletName}`);
      setIsDialogOpen(false);
    } catch (error) {
      console.error('Error connecting to wallet:', error);
      alert(`Failed to connect the wallet: ${error}`);
    }
  };

  return (
    <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <AlertDialogTrigger asChild>
        <button className="flex max-w-[250px] items-center gap-2 overflow-hidden text-ellipsis whitespace-nowrap rounded-lg border border-primary-300 px-[45px] py-4 font-heading text-[1rem] font-medium text-primary-300 hover:border-white hover:text-white">
          {selectedAccount ? (
            <span className="">{formatAddress(selectedAccount.address)}</span>
          ) : (
            <>
              Connect <ConnectWalletIcon className="h-4 w-[21px]" />
            </>
          )}
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
          <WalletButton
            icon="talismanWallet"
            name="Talisman"
            isRecommended
            onClick={() => handleConnect('Talisman')}
          />
          <WalletButton
            icon="subWallet"
            name="Subwallet"
            onClick={() => handleConnect('Subwallet')}
          />
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
