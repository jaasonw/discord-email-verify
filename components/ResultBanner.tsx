import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { useResponsive } from "../Hooks/useResponsive";

type layoutPtops = {
  children?: React.ReactNode;
};

export const BannerLayout: React.FC<layoutPtops> = (props) => {
  const { children } = props;
  const [isDesktop] = useResponsive();

  return (
    <section
      className={`flex ${!isDesktop && "flex-col"} bg-[#161b22] p-4 rounded-xl justify-center items-center md:p-8`}
    >
      {children}
    </section>
  );
};

type imageProps = {
  source: string;
};

export const BannerImage: React.FC<imageProps> = (props) => {
  const { source } = props;
  return (
    <div>
      <Image
        src={source}
        objectFit="cover"
        width={129}
        height={92}
        alt={source}
      />
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
              Please contact admin by clicking the link below and ask in
              <span className="font-bold text-[#aed5fa] ">
                &nbsp; #register-help &nbsp;
              </span>
              channel
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
    <button className="mt-[1rem] bg-[#292c2f] p-2 rounded-md hover:bg-[#3d4043] transition-all duration-300">
      <Link href="https://acmcsuf.com/discord">Continue to the server</Link>
    </button>
  );
};

export const ErrorMessage: React.FC = () => {
  const { query } = useRouter();
  return (
    <div className="flex flex-col justify-center items-center">
      <p className="text-[1.25rem]">Error Code</p>
      <div className="my-4 w-[300px] overflow-x-scroll">
        {query.code}
      </div>
    </div>
  );
};
