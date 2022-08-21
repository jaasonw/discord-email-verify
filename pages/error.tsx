import { NextPage } from "next";
import {
  BannerContent,
  BannerImage,
  BannerLayout,
} from "../components/ResultBanner";

const Error: NextPage = () => {
  return (
    <BannerLayout>
      <BannerImage source="/Sad Frank.svg"/>
      <BannerContent success={false} header="Uh oh! Register Failed" />
    </BannerLayout>
  );
};

export default Error;
