import { NextPage } from 'next';
import {
  BannerContent,
  BannerImage,
  BannerLayout,
} from '../components/ResultBanner';

const Success: NextPage = () => {
  return (
    <BannerLayout>
      <BannerImage src="/Happy Frank.svg" />
      <BannerContent success={true} header="You are now registered!" />
    </BannerLayout>
  );
};

export default Success;
