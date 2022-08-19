import { NextPage } from "next";
import {
  BannerContent,
  BannerImage,
  BannerLayout,
} from "../components/ResultBanner";

const Success: NextPage = () => {
  return (
    <BannerLayout>
      <BannerImage source="/Happy Frank.png"/>
      <BannerContent success={true} />
    </BannerLayout>
  );
};

export default Success;
