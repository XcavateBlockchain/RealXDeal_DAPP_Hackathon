import SidebarNav from '@/components/layouts/sidebar-nav';
// import dynamic from 'next/dynamic';

// const SubstrateContextProvider = dynamic(() => import('@/context/polkadot-contex'), {
//   ssr: false
// });

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    // <SubstrateContextProvider>
    <section className="min-h-screen w-full overflow-hidden">
      <div className="flex min-h-screen">
        <SidebarNav />
        <section className="relative ml-[214px] box-border flex min-h-min w-full basis-auto flex-col">
          {/* <MainNav /> */}
          <main className="container mx-auto box-border flex min-h-0 flex-auto flex-col">
            <div className="overflow-y-auto">
              {children}
              {/* {modal} */}
            </div>
          </main>
        </section>
      </div>
    </section>
    // </SubstrateContextProvider>
  );
}
