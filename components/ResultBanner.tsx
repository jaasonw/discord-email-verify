import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { useResponsive } from '../hooks/useResponsive';

type layoutProps = {
  children?: React.ReactNode;
};

export const BannerLayout: React.FC<layoutProps> = (props) => {
  const { children } = props;
  const [isDesktop] = useResponsive();

  return (
    <section
      className={`flex ${
        !isDesktop && 'flex-col'
      } bg-acm-canvas p-4 rounded-xl justify-center items-center md:p-8`}
    >
      {children}
    </section>
  );
};

type imageProps = {
  src: string;
};

export const BannerImage: React.FC<imageProps> = (props) => {
  const { src } = props;
  return (
    <div>
      <Image src={src} objectFit="cover" width={129} height={92} alt={src} />
    </div>
  );
};

type contentProps = {
  success: boolean;
  header: string;
};

export const BannerContent: React.FC<contentProps> = (props) => {
  const { success, header } = props;
  return (
    <div className="flex flex-col items-center md:ml-[2rem] text-center ml-[1rem]">
      {success ? (
        <div>
          <BannerHeader header={header} success={success} />
          <BannerButton />
        </div>
      ) : (
        <div>
          <BannerHeader header={header} success={success} />
          <div className="text-center">
            <p className="mb-[1rem] text-[1rem]">
              Contact an administrator by clicking the link below and asking in
              <span className="font-bold text-acm-light-blue">
                &nbsp; #register-help &nbsp;
              </span>
            </p>
            <ErrorMessage />
          </div>
          <BannerButton />
        </div>
      )}
    </div>
  );
};

//Sub-components from BannerContent
type headerProps = {
  header: string;
  success: boolean;
};

export const BannerHeader: React.FC<headerProps> = (props) => {
  const { header, success } = props;
  return (
    <>
      {success ? (
        <h1 className="text-center mb-[0.5rem] text-[1.5rem] font-bold text-emerald-400 md:text-[2rem]">
          {header}
        </h1>
      ) : (
        <h1 className="text-center mb-[1rem] text-[1.5rem] font-semibold text-red-500 md:text-[2rem]">
          {header}
        </h1>
      )}
    </>
  );
};

export const BannerButton = () => {
  return (
    <button className="mt-[1rem] bg-acm-gray p-2 rounded-md hover:bg-button-hover transition-all duration-300">
      <Link href="https://acmcsuf.com/discord">Continue to the server</Link>
    </button>
  );
};

export const ErrorMessage: React.FC = () => {
  const { query } = useRouter();
  return (
    <div className="flex flex-col justify-center items-center">
      <p className="text-[1.25rem]">Error Code</p>
      <div className="my-4 w-[300px] overflow-x-scroll">{query.code}</div>
    </div>
  );
};
