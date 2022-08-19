import { PrismaClient } from "@prisma/client";
import { NextPage, NextPageContext } from "next";
import Head from "next/head";

const VerifyPage: NextPage = ({ user }: any) => {
  if (!user) {
    return (
      <h1>
        Uh oh!, something went wrong. You may already be registered. Verify that
        your registration link is correct or ask for help in register help if
        the problem persists
      </h1>
    );
  }
  return (
    <>
      <Head>
        <title>Verify your email</title>
      </Head>
      <h1>Hi {user.firstName}! Welcome to ACM at CSUF</h1>
      <div>
        Click{" "}
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            window.location.href = `../api/verify?verificationCode=${user.verificationCode}`;
          }}
        >
          here
        </button>{" "}
        to continue to the server
      </div>
      <div>If this is not you, you may close this window</div>
    </>
  );
};
export async function getServerSideProps(context: NextPageContext) {
  const code = (context.query["verificationCode"] as string) ?? "";
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
