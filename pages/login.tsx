import Head from 'next/head';
import styles from '@/styles/Login.module.css';
import Auth from '@/components/Auth';
import { useState } from 'react';
import Image from 'next/image';
import Yeti from '../public/Yeti.png';

export default function Login() {
  const [authType, setAuthType] = useState<'login' | 'register'>('login');

  return (
    <>
      <Head>
        <title>FrostCord</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="bg-grey-700">
        <div
          className={` ${styles.loginMD} items-center overflow-auto h-screen w-full `}
        >
          <div className="col-start-4 col-end-10 row-start-2 row-end-3 flex w-full h-full">
            <div className=" w-full hidden xl:flex xl:flex-col  h-full ">
              <div className="h-full flex justify-center items-center text-8xl font-extrabold">
                <div className={`${styles.frostCord}`}>FrostCord</div>
              </div>
              <div className="h-13 relative">
                <Image
                  // eslint-disable-next-line quotes
                  className="w-13 "
                  src={Yeti}
                  alt="Yeti"
                  priority
                />
              </div>
            </div>
            <div
              className={`flex flex-col w-full  items-center bg-gradient-to-t from-frost-300 to-frost-600 xl:rounded-3xl ${styles.rightSide}`}
            >
              <div className="basis-1/4 flex items-center relative mt-8">
                <Image
                  // eslint-disable-next-line quotes
                  className={`rounded-full shadow-2xl shadow-white `}
                  src="/favicon.ico"
                  alt="FrostCord Logo"
                  width={120}
                  height={37}
                  priority
                />
              </div>
              <Auth type={authType} setAuthType={setAuthType} />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
