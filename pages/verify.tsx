import { PrismaClient } from '@prisma/client';
import { NextPage, NextPageContext } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { useState } from 'react';
import LoadingSpinner from '../components/LoadingSpinner';

import {
  BannerButton,
  BannerHeader,
  BannerImage,
  BannerLayout,
} from '../components/ResultBanner';
import { useResponsive } from '../Hooks/useResponsive';

const VerifyPage: NextPage = ({ user }: any) => {
  const [isClicked, setClick] = useState(false);
  const [isDesktop] = useResponsive();
  if (!user) {
    return (
      <BannerLayout>
        <BannerImage src="/Sad Frank.svg" />
        <section className="flex flex-col items-center">
          <BannerHeader header="Uh oh! something went wrong" success={false} />
          <p className="ml-4 text-center">
            You may already be registered. Verify that your registration link is
            correct or ask for help in
            <span className="font-bold text-[#aed5fa] ">
              &nbsp; #register-help &nbsp;
            </span>
            if the problem persists
          </p>
          <BannerButton />
        </section>
      </BannerLayout>
    );
  }
  return (
    <BannerLayout>
      <Head>
        <title>Verify your email</title>
      </Head>
      <section className="flex flex-col items-center">
        <Image
          src="/Frank Wave.svg"
          objectFit="cover"
          width={isDesktop ? 200 : 160}
          height={isDesktop ? 100 : 80}
          alt="frank wave"
        />
        <h1 className="text-center my-[0.5rem] text-[1.5rem] font-bold  md:text-[2rem]">
          {`Hi ${user.firstName} ! Welcome to ACM at`}{' '}
          <span className="text-[#2C91C6]"> CSUF </span>
        </h1>
        <p className="text-center">
          Click the button below to verify this is you
        </p>
        <button
          className="mt-[1rem] font-semibold px-[2rem] bg-[#292c2f] p-2 rounded-md hover:bg-[#3d4043] transition-all duration-300"
          type="button"
          onClick={(e) => {
            e.preventDefault();
            setClick(() => true);
            window.location.href = `../api/verify?verificationCode=${user.verificationCode}`;
          }}
        >
          {isClicked ? <LoadingSpinner /> : 'Verify'}
        </button>
      </section>
    </BannerLayout>
  );
};

export async function getServerSideProps(context: NextPageContext) {
  const code = (context.query['code'] as string) ?? '';
  const prisma = new PrismaClient();
  // const user = {};
  const user = await prisma.user.findFirst({
    where: {
      verificationCode: code,
    },
  });
  console.log(user);
  return {
    props: { user },
  };
}

export default VerifyPage;
