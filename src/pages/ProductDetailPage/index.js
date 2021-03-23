import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Container, Row } from 'react-bootstrap';
import Skeleton from 'react-loading-skeleton';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import { productActions } from '../../redux/actions';
import './style.css';
import ImageSkeleton from '../../components/ImageSkeleton';

const ProductDetailPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const product = useSelector((state) => state.product.selectedProduct);
  // const loading = useSelector((state) => state.product.loading);
  const error = useSelector((state) => state.product.error);

  // const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    dispatch(productActions.getOneProduct(id));
  }, [dispatch, id]);

  const slickSettings = {
    slidesToShow: 1,
    slidesToScroll: 1,
    className: 'center',
    // centerMode: true,
    // centerPadding: '60px',
    swipeToSlide: true,
    focusOnSelect: true,
    lazyLoad: true,
    infinite: false,
    // autoplay: true,
    // autoplayspeed: 3000,
    // pauseOnHover: true,
    speed: 0,
    dots: true,
    dotsClass: 'slick-dots slick-thumb',
    customPaging: function (i) {
      const thumbnailPath =
        console.log(product) ||
        (product?.images?.length > 0 &&
          product?.images[i] &&
          product?.images[i]['imageUrl']);
      return (
        <div className='Slider__thumbnail ratio ratio-1x1'>
          <div className='ratio-inner'>
            {thumbnailPath ? (
              <img src={thumbnailPath} alt='' />
            ) : (
              <ImageSkeleton />
            )}
          </div>
        </div>
      );
    },
  };

  return (
    <Container className='ProductDetailPage pt-3'>
      {!error && (
        <>
          <Row>
            <Col xs={12} sm={5}>
              <div className='SliderWrapper'>
                <Slider {...slickSettings}>
                  {product?.images.map((image, index) => {
                    const imagePath = image && image.imageUrl;
                    return (
                      <div key={index} className='Slider__item ratio ratio-1x1'>
                        <div className='ratio-inner'>
                          {imagePath ? (
                            <img src={imagePath} alt='' />
                          ) : (
                            <ImageSkeleton />
                          )}
                        </div>
                      </div>
                    );
                  })}
                </Slider>
              </div>
            </Col>
            <Col xs={12} sm={7}>
              <div>
                <h4>{product?.name ? product.name : <Skeleton />}</h4>
                {/* <div>Rating</div> */}
              </div>
              <div>
                {product?.price ? product.price : <Skeleton width={40} />}
              </div>
              {/* <div>Quatity:</div> */}
              {/* <div>Add to Card</div> */}
            </Col>
          </Row>
        </>
      )}
    </Container>
  );
};

export default ProductDetailPage;
