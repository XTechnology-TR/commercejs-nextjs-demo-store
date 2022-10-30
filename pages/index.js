import Head from 'next/head';
import React from 'react';
import Footer from '../components/common/Footer';
import Root from '../components/common/Root';
import SocialMedia from '../components/common/SocialMedia';
import CategoryBanner from '../components/homepage/CategoryBanner';
import HeroSection from '../components/homepage/HeroSection';
import HomeBanner from '../components/homepage/HomeBanner';
import ProductsBanner from '../components/homepage/ProductsBanner';
import ExploreBanner from '../components/productAssets/ExploreBanner';

const Home = () => (
  <Root transparentHeader={true}>
    <Head>
      <title>Home | commerce</title>
    </Head>

    <HeroSection />
    <HomeBanner />
    <CategoryBanner />
    <ProductsBanner />
    <ExploreBanner />
    <SocialMedia />
    <Footer />
  </Root>
);

export default Home;
