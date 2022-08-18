import { NextPage } from "next";
import { useRouter } from "next/router";

const Home: NextPage = () => {
  const { query } = useRouter();
  return (
    <>
      <h1>
        Uh oh! We weren&apos;t able to verify you, double check that you arent
        already registered and contact an administrator and include the code
        below if the problem persists after trying the verification link again
      </h1>
      <pre>{query.code}</pre>
    </>
  );
};

export default Home;
