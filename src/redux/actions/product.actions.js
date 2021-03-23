import * as types from '../constants/product.constants';
import api from '../../apiService/api';
// import { routeActions } from './route.actions';
import { toast } from 'react-toastify';

const getAllProducts = (
  pageNum = 1,
  limit = 10,
  query = null,
  sortBy = null
) => async (dispatch) => {
  dispatch({ type: types.GET_ALL_PRODUCTS_REQUEST, payload: null });
  try {
    let queryString = '';
    if (query) {
      queryString = `&title[$regex]=${query}&title[$options]=i`;
    }
    let sortByString = '';
    if (sortBy?.key) {
      sortByString = `&sortBy[${sortBy.key}]=${sortBy.ascending}`;
    }
    const res = await api.get(
      `/products?page=${pageNum}&limit=${limit}${queryString}${sortByString}`
    );

    setTimeout(() => {
      dispatch({
        type: types.GET_ALL_PRODUCTS_SUCCESS,
        payload: res.data.data,
      });
    }, 1000);
  } catch (error) {
    dispatch({ type: types.GET_ALL_PRODUCTS_FAILURE, payload: error });
  }
};

const getOneProduct = (productId) => async (dispatch) => {
  dispatch({ type: types.GET_ONE_PRODUCT_REQUEST, payload: null });
  try {
    const res = await api.get(`/products/${productId}`);
    setTimeout(() => {
      dispatch({
        type: types.GET_ONE_PRODUCT_SUCCESS,
        payload: res.data.data,
      });
    }, 1000);
  } catch (error) {
    dispatch({
      type: types.GET_ONE_PRODUCT_FAILURE,
      payload: error,
    });
  }
};

const createProduct = (title, content, images) => async (dispatch) => {
  dispatch({ type: types.CREATE_PRODUCT_REQUEST, payload: null });
  try {
    // For uploading file manually
    // const formData = new FormData();
    // formData.append("title", title);
    // formData.append("content", content);
    // if (images && images.length) {
    //   for (let index = 0; index < images.length; index++) {
    //     formData.append("images", images[index]);
    //   }
    // }
    // const res = await api.post("/products", formData);

    // Upload images using cloudinary already
    const res = await api.post('/products', { title, content, images });

    dispatch({
      type: types.CREATE_PRODUCT_SUCCESS,
      payload: res.data.data,
    });
    // dispatch(routeActions.redirect('__GO_BACK__'));
    toast.success('New product has been created!');
  } catch (error) {
    dispatch({ type: types.CREATE_PRODUCT_FAILURE, payload: error });
  }
};

const updateProduct = (productId, title, content, images) => async (
  dispatch
) => {
  dispatch({ type: types.UPDATE_PRODUCT_REQUEST, payload: null });
  try {
    // let formData = new FormData();
    // formData.set("title", title);
    // formData.set("content", content);
    const res = await api.put(`/products/${productId}`, {
      title,
      content,
      images,
    });

    dispatch({
      type: types.UPDATE_PRODUCT_SUCCESS,
      payload: res.data.data,
    });
    // dispatch(routeActions.redirect('__GO_BACK__'));
    toast.success('The product has been updated!');
  } catch (error) {
    dispatch({ type: types.UPDATE_PRODUCT_FAILURE, payload: error });
  }
};

const deleteProduct = (productId) => async (dispatch) => {
  dispatch({ type: types.DELETE_PRODUCT_REQUEST, payload: null });
  try {
    const res = await api.delete(`/products/${productId}`);
    console.log(res);
    dispatch({
      type: types.DELETE_PRODUCT_SUCCESS,
      payload: res.data,
    });
    // dispatch(routeActions.redirect('__GO_BACK__'));
    toast.success('The product has been deleted!');
  } catch (error) {
    dispatch({ type: types.DELETE_PRODUCT_FAILURE, payload: error });
  }
};

export const productActions = {
  getAllProducts,
  getOneProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};
