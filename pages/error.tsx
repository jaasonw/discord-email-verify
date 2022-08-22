import { NextPage } from 'next';
import {
  BannerContent,
  BannerImage,
  BannerLayout,
} from '../components/ResultBanner';

const Error: NextPage = () => {
  return (
    <BannerLayout>
      <BannerImage src="/Sad Frank.svg" />
      <BannerContent success={false} header="Uh oh! Registration Failed" />
    </BannerLayout>
  );
};

export default Error;
