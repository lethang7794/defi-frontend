import React from 'react';
// import FadeLoader from 'react-spinners/FadeLoader';

// const LoadingFallback = () => {
//   return (
//     <div
//       className='d-flex justify-content-center align-items-center'
//       style={{
//         position: 'absolute',
//         top: '0',
//         right: '0',
//         bottom: '0',
//         left: '0',
//         backgroundColor: 'white',
//         zIndex: '2',
//       }}
//     >
//       <FadeLoader color={'gray'} loading={true} size={50} />
//     </div>
//   );
// };

function ProductImage({ product }) {
  const primaryImageSrc = product.images[0].imageUrl;
  const secondaryImageSrc =
    product.images.length > 1 && product.images[1].imageUrl;

  return (
    <>
      {secondaryImageSrc && (
        <div
          className='product__image product__image--secondary'
          style={{
            position: 'absolute',
            top: '0',
            right: '0',
            bottom: '0',
            left: '0',
            backgroundImage: `url('${secondaryImageSrc}')`,
          }}
        />
      )}

      <div
        className='product__image__wrapper product__image__wrapper--primary embed-responsive-item d-flex justify-content-center'
        style={{
          opacity: !secondaryImageSrc && '1',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: '0',
            right: '0',
            bottom: '0',
            left: '0',
            backgroundColor: 'white',
            zIndex: '1',
          }}
        ></div>
        <img
          className='product__image product__image--primary'
          style={{
            maxWidth: '100%',
            objectFit: 'contain',
            zIndex: '2',
          }}
          loading='lazy'
          src={primaryImageSrc}
          alt=''
        />
      </div>
    </>
  );
}

export default ProductImage;
