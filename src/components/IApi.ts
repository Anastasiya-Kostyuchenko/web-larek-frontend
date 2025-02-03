import { Api, ApiListResponse } from './base/api';
import { IProduct, Order, OrderResult } from '../types';

export interface IWebLarekAPI {
	getProductList: () => Promise<IProduct[]>;
	getProduct: (id: string) => Promise<IProduct>;
	createOrder: (order: Order) => Promise<OrderResult>;
}

export class WebLarekAPI extends Api implements IWebLarekAPI {
	readonly cdn: string;

	constructor(cdn: string, baseUrl: string, options?: RequestInit) {
		super(baseUrl, options);
		this.cdn = cdn;
	}

	getProductList(): Promise<IProduct[]> {
		return this.get('/product').then((data: ApiListResponse<IProduct>) =>
			data.items.map((item) => ({
				...item,
				image: this.cdn + item.image,
			}))
		);
	}

	getProduct(id: string): Promise<IProduct> {
		return this.get(`/product/${id}`).then((item: IProduct) => ({
			...item,
			image: this.cdn + item.image,
		}));
	}

	createOrder(order: Order): Promise<OrderResult> {
		return this.post('/order', order).then((data: OrderResult) => data);
	}
}
