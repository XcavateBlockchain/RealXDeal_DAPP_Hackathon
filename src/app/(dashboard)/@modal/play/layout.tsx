import { Shell } from '@/components/shell';

export default function ModalLayout({ children }: React.PropsWithChildren) {
  return (
    <section className="h-screen w-full bg-primary">
      <Shell>{children}</Shell>
    </section>
  );
}
