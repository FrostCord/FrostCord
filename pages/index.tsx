import Head from 'next/head';
import styles from '@/styles/Home.module.css';
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react';
import { useRouter } from 'next/router';
import BottomNav from '@/components/home/mobile/BottomNav';
import { MobileViewProvider } from '@/context/MobileViewCtx';
import RenderMobileView from '@/components/home/mobile/RenderMobileView';
import { ChatCtxProvider } from '@/context/ChatCtx';

export default function Home() {
  const user = useUser();
  const supabase = useSupabaseClient();
  const router = useRouter();

  //TODO: Server list view, create server form, Server view, create server invite form, join server via invite
  //TODO: fix the positioning of the logout button

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) console.log(error);
    router.push('/login');
  };

  return (
    <>
      <Head>
        <title>FrostCord</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ChatCtxProvider>
        <MobileViewProvider>
          <main
            className={`${styles.main} flex flex-col h-full overflow-hidden `}
          >
            <div className="topside h-screen bg-grey-800">
              <div className="bg-grey-800  flex flex-col relative h-[85%]">
                <RenderMobileView />
              </div>
              <div>
                {!user ? (
                  ''
                ) : (
                  <button
                    className=" bg-grey-600 hover:bg-grey-700 font-bold py-2 px-4 fixed right-[20px] top-[20px] rounded-xl tracking-wide text-frost-100"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                )}
              </div>
            </div>
            <div
              className={`${styles.bottomNav} bg-grey-950  w-full flex  fixed bottom-[0px]  `}
            >
              <BottomNav />
            </div>
          </main>
        </MobileViewProvider>
      </ChatCtxProvider>
    </>
  );
}

{
  /* <div
              className={`${styles.bottomNav} bg-grey-950 fixed bottom-[0px] w-full h-8 flex`}
            ></div> */
}
