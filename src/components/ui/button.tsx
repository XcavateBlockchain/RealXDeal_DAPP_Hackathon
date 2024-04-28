import { cva, type VariantProps } from 'class-variance-authority';
import { BaseButton, BaseButtonProps } from './base-button';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'flex items-center justify-center gap-2 rounded-lg font-heading font-medium',
  {
    variants: {
      variant: {
        default:
          'bg-primary-300 hover:bg-primary-300/85 text-foreground  disabled:opacity-50 disabled:pointer-events-none transition-colors'
      },
      size: {
        default: 'py-[18px] px-6 text-[1rem]/[1.2rem]',
        lg: 'py-4 px-[45px] text-[1rem]'
      },
      fullWidth: {
        true: 'w-full'
      }
    },
    defaultVariants: {
      variant: 'default',
      size: 'default'
    }
  }
);

export interface ButtonProps extends BaseButtonProps, VariantProps<typeof buttonVariants> {}

const Button = ({ variant, size, fullWidth, className, ...props }: ButtonProps) => {
  return (
    <BaseButton
      className={cn(buttonVariants({ variant, size, fullWidth, className }))}
      {...props}
    />
  );
};

Button.displayName = 'Button';

export { Button, buttonVariants, BaseButton };
