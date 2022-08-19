import { PrismaClient } from "@prisma/client";
import { NextPage, NextPageContext } from "next";

const VerifyPage: NextPage = ({ user }: any) => {
  if (!user) {
    return (
      <h1>
        Uh oh!, something went wrong, verify that your registration link is
        correct and try again
      </h1>
    );
  }
  return (
    <>
      <h1>Hi {user.firstName}! Welcome to ACM at CSUF</h1>
      <div>
        Click{" "}
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            window.location.href = `${process.env.DEPLOYMENT_URL}/api/verify?verificationCode=${user.verificationCode}`;
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
