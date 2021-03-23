import React from 'react';
import { Link } from 'react-router-dom';
import { Col } from 'react-bootstrap';
import Skeleton from 'react-loading-skeleton';

import ProductImage from './ProductImage';

const ProductCard = ({ product }) => {
  return (
    <Col
      as={product ? Link : Col}
      to={product ? `/products/${product._id}` : null}
      xs={6}
      md={4}
      lg={3}
      xl={2}
      className='ProductCard text-reset text-decoration-none d-flex flex-column py-3'
    >
      <div className='ProductImageWrapper embed-responsive embed-responsive-1by1'>
        {product ? <ProductImage product={product} /> : <Skeleton delay={1} />}
      </div>
      <div className='product__info flex-grow-1 d-flex flex-column mt-1'>
        <div
          className='product__name flex-grow-1'
          // style={{
          //   whiteSpace: 'nowrap',
          //   overflow: 'hidden',
          //   textOverflow: 'ellipsis',
          // }}
          // style={{
          //   overflow: 'hidden',
          //   whiteSpace: 'nowrap',
          //   textOverflow: 'ellipsis',
          //   height: '3rem',
          // }}
          style={{
            display: '-webkit-box',
            WebkitBoxOrient: 'vertical',
            WebkitLineClamp: 1,
            overflow: 'hidden',
            fontSize: '0.8125rem',
          }}
        >
          {product ? product.name : <Skeleton count={1} delay={1} />}
        </div>
        <div
          className='product__price'
          style={{
            fontSize: '0.9375rem',
            fontWeight: '500',
            lineHeight: '1.5rem',
          }}
        >
          {product ? `${product.price}$` : <Skeleton width={40} delay={1} />}
        </div>
      </div>
    </Col>
  );
};

export default ProductCard;
