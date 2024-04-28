import { Wallet, XLogo, DiscordLogo, TelegramLogo } from '@phosphor-icons/react/dist/ssr';

export type IconType = keyof typeof Icons;

export const Icons = {
  wallet: Wallet,
  xLogo: XLogo,
  discord: DiscordLogo,
  telegram: TelegramLogo
};
