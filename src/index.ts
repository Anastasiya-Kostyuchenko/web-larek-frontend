export * from './types/api';
export * from './types/models';
export * from './types/views';
export * from './types/base';
export * from './types/events';

import './scss/styles.scss';

import { RealApiClient } from './types/api';
import { ProductModel } from './types/model/ProductModel';
import { ProductView } from './types/views/ProductView';
import { ProductPresenter } from './types/ ProductPresenter';
import { API_URL } from './utils/constants';

const apiClient = new RealApiClient(API_URL);

const productModel = new ProductModel();
const galleryContainer = document.querySelector('.gallery') as HTMLElement;
const productView = new ProductView(galleryContainer as HTMLElement);

const productPresenter = new ProductPresenter(productModel, productView);
productPresenter.init();
