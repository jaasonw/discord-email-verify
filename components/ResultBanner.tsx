import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

type layoutPtops = {
  children?: React.ReactNode;
};

export const BannerLayout: React.FC<layoutPtops> = (props) => {
  const { children } = props;
  return (
    <section className=" flex bg-[#3b4f62] p-4 rounded-xl justify-center items-center md:p-8">
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
};

export const BannerContent: React.FC<contentProps> = (props) => {
  const { success } = props;
  return (
    <div className="flex flex-col items-center md:ml-[2rem] text-center ml-[1rem]">
      {success ? (
        <div>
          <h1 className="mb-[1rem] text-[1.5rem] font-semibold text-emerald-400 md:text-[2rem]">
            You are now registered!
          </h1>
          <button className="mt-[1rem] bg-[#5f7386] p-2 rounded-md hover:bg-[#6c7f90] transition-all duration-300">
            <Link href="https://acmcsuf.com/discord">
              Continue to the server
            </Link>
          </button>
        </div>
      ) : (
        <div>
          <h1 className="mb-[1rem] text-[1.5rem] font-semibold text-red-500 md:text-[2rem]">
            Uh oh! Register Failed
          </h1>
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
          <button className="mt-[1rem] bg-[#5f7386] p-2 rounded-md hover:bg-[#6c7f90] transition-all duration-300">
            <Link href="https://acmcsuf.com/discord">
              Continue to the server
            </Link>
          </button>
        </div>
      )}
    </div>
  );
};

export const ErrorMessage: React.FC = () => {
  const { query } = useRouter();
  return (
    <div className="flex flex-col justify-center items-center">
      <p className="text-[1.25rem]">Error Code</p>
      <div className="my-4 w-[300px] overflow-x-scroll">
        eyJxdWVyeSI6eyJ2ZXJpZmljYXRpb25Db2RlIjoiZWFiM2NhYTktYmNlOS00ODYyLTkwOWMtYjRmZTk3ODE3YTZhIn0sImVycm9yIjp7Im1lc3NhZ2UiOiJSZXF1ZXN0IGZhaWxlZCB3aXRoIHN0YXR1cyBjb2RlIDQwMSIsIm5hbWUiOiJBeGlvc0Vycm9yIiwiY29uZmlnIjp7InRyYW5zaXRpb25hbCI6eyJzaWxlbnRKU09OUGFyc2luZyI6dHJ1ZSwiZm9yY2VkSlNPTlBhcnNpbmciOnRydWUsImNsYXJpZnlUaW1lb3V0RXJyb3IiOmZhbHNlfSwidHJhbnNmb3JtUmVxdWVzdCI6W251bGxdLCJ0cmFuc2Zvcm1SZXNwb25zZSI6W251bGxdLCJ0aW1lb3V0IjowLCJ4c3JmQ29va2llTmFtZSI6IlhTUkYtVE9LRU4iLCJ4c3JmSGVhZGVyTmFtZSI6IlgtWFNSRi1UT0tFTiIsIm1heENvbnRlbnRMZW5ndGgiOi0xLCJtYXhCb2R5TGVuZ3RoIjotMSwiZW52Ijp7fSwiaGVhZGVycyI6eyJBY2NlcHQiOiJhcHBsaWNhdGlvbi9qc29uLCB0ZXh0L3BsYWluLCAqLyoiLCJDb250ZW50LVR5cGUiOiJhcHBsaWNhdGlvbi9qc29uIiwiQXV0aG9yaXphdGlvbiI6IkJvdCB1bmRlZmluZWQiLCJVc2VyLUFnZW50IjoiYXhpb3MvMC4yNy4yIiwiQ29udGVudC1MZW5ndGgiOjczfSwibWV0aG9kIjoicGF0Y2giLCJ1cmwiOiJodHRwczovL2Rpc2NvcmQuY29tL2FwaS92MTAvZ3VpbGRzLzU2OTMyMjc4OTg4MjgyMjY1Ny9tZW1iZXJzL251bGwiLCJkYXRhIjoie1wibmlja1wiOlwidW5kZWZpbmVkIHVuZGVmaW5lZCAodW5kZWZpbmVkKVwiLFwicm9sZXNcIjpbXCI2MDU4Mjg2MzUxMTAxNDYwOTlcIl19In0sImNvZGUiOiJFUlJfQkFEX1JFUVVFU1QiLCJzdGF0dXMiOjQwMX19
        {query.code}
      </div>
    </div>
  );
};
