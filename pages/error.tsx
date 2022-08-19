import { NextPage } from "next";
import {
  BannerContent,
  BannerImage,
  BannerLayout,
} from "../components/ResultBanner";

const Error: NextPage = () => {
  return (
    <BannerLayout>
      <BannerImage source="/Sad Frank.png"/>
      <BannerContent success={false} />
    </BannerLayout>
  );
};

export default Error;
