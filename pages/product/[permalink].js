import ErrorPage from 'next/error';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { Collapse } from 'react-collapse';
import Footer from '../../components/common/Footer';
import Root from '../../components/common/Root';
import SocialMedia from '../../components/common/SocialMedia';
import TemplatePage from '../../components/common/TemplatePage';
import CarouselImages from '../../components/productAssets/CarouselImages';
import ClientReview from '../../components/productAssets/ClientReview';
import ExploreBanner from '../../components/productAssets/ExploreBanner';
import ProductDetail from '../../components/productAssets/ProductDetail';
import SuggestedProducts from '../../components/productAssets/SuggestedProducts';
import CategoryList from '../../components/products/CategoryList';
import commerce from '../../lib/commerce';
import reduceProductImages from '../../lib/reduceProductImages';
const detailView = `<p>
  Slightly textured fabric with tonal geometric design and a bit of shine
</p>`;

export default function Product() {
  const router = useRouter();
  const { permalink } = router.query;
  const [showShipping, setShowShipping] = useState(false);
  const [showFit, setShowFit] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const toggleShipping = () => {
    setShowShipping(!showShipping);
  }

  const toggleFit = () => {
    setShowFit(!showFit);
  }

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  }

  useEffect(() => {
    if (!permalink) {
      return;
    }

    const fetchProductByPermalink = async (permalink) => {
      try {
        const product = await commerce.products.retrieve(permalink, { type: 'permalink '});
        setProduct(product);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };

    fetchProductByPermalink(permalink);
  }, [permalink]);

  if (loading) {
    return <TemplatePage page={ {message: 'Loading...'} } />
  }

  if (product === null) {
    return <ErrorPage statusCode={404} />
  }

  const images = reduceProductImages(product);
  return (
    <Root>
      <Head>
        <title>{ product.name } | commerce</title>
      </Head>

      <div className="py-5 my-5">
      <div className="main-product-content">
        {/* Sidebar */}
        <div className="product-sidebar">
          <CategoryList
            className="product-left-aside__category-list"
            current={ product.categories[0] && product.categories[0].id }
          />
          <CarouselImages images={images} />
        </div>

        <div className="product-images">
          <div className="flex-grow-1">
            {Array.isArray(images) ? (images.map((image, i) => (
              <images
                key={i}
                src={image}
                className="w-400 mb-4 carousel-main-images"
              />
            ))) : (
              ''
            )}
          </div>
        </div>

        {/* Right Section - Product Details */}
        <div className="product-detail">
          <ProductDetail product={product} />

          <div
            onClick={toggleShipping}
            className="d-flex cursor-pointer py-3 justify-content-between font-weight-medium"
          >
            Shipping and returns
            <Image width="30" height="30"  alt="plus" src="/icon/plus.svg"  />
          </div>
          <Collapse isOpened={showShipping}>
            <div className="pb-4 font-color-medium">
              Arrives in 5 to 7 days, returns accepted within 30
              days. For more information, click here.
            </div>
          </Collapse>
          <div className="h-1 border-bottom border-color-black" />
          <div
onClick={toggleFit}
className="d-flex cursor-pointer py-3 justify-content-between font-weight-medium"
>
Fit 
<Image width="30" height="30"  alt="plus" src="/icon/plus.svg"  />
</div>
<Collapse isOpened={showFit}>
<div className="pb-4 font-color-medium">
APART FROM THE VAVSKINS PRODUCTION CENTER, 
IT CANNOT EVEN BE PRODUCED IN OTHER CONTRACT WORKSHOPS. 
THIS ALLOWS US TO OFFER MORE GUARANTEED SALES ALL THE TIME.
</div>
</Collapse>
<div className="h-1 border-bottom border-color-black" />
          <div
            onClick={toggleDetails}
            className="d-flex cursor-pointer py-3 justify-content-between font-weight-medium"
          >
            Details
            <Image width="30" height="30"  alt="plus" src="/icon/plus.svg" />
          </div>
          <Collapse isOpened={showDetails}>
            <div
              className="pb-4 font-color-medium"
              dangerouslySetInnerHTML={{
                __html: detailView
              }}
            />
          </Collapse>
          <div className="h-1 borderbottom border-color-black" />
        </div>
        
      </div>
    </div>

    <ClientReview />
    <SuggestedProducts />
    <ExploreBanner />
    <SocialMedia />
    <Footer />
  </Root>
  );
}
