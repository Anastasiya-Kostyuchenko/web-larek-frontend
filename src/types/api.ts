export interface ApiProduct {
	id: string;
	name: string;
	description: string;
	price: number;
	stock: number;
}

export interface ApiOrder {
	id: string;
	items: ApiProduct[];
	address: string;
	email: string;
	phone: string;
	paymentMethod: string;
}

export type ApiListResponse<Type> = {
	total: number;
	items: Type[];
};

export type ApiPostMethods = 'POST' | 'PUT' | 'DELETE';

export class Api {
	readonly baseUrl: string;
	protected options: RequestInit;

	constructor(baseUrl: string, options: RequestInit = {}) {
		this.baseUrl = baseUrl;
		this.options = {
			headers: {
				'Content-Type': 'application/json',
				...((options.headers as object) ?? {}),
			},
		};
	}

	protected handleResponse(response: Response): Promise<object> {
		if (response.ok) return response.json();
		return response
			.json()
			.then((data) => Promise.reject(data.error ?? response.statusText));
	}

	get(uri: string) {
		return fetch(this.baseUrl + uri, {
			...this.options,
			method: 'GET',
		}).then(this.handleResponse);
	}

	post(uri: string, data: object, method: ApiPostMethods = 'POST') {
		return fetch(this.baseUrl + uri, {
			...this.options,
			method,
			body: JSON.stringify(data),
		}).then(this.handleResponse);
	}
}

export class RealApiClient extends Api {
	constructor(baseUrl: string) {
		super(baseUrl);
	}

	async getProducts(): Promise<ApiProduct[]> {
		const response = await this.get('/products');
		return (response as ApiListResponse<ApiProduct>).items;
	}

	async getProductById(id: string): Promise<ApiProduct> {
		return this.get(`/products/${id}`) as Promise<ApiProduct>;
	}

	async createOrder(order: ApiOrder): Promise<void> {
		await this.post('/orders', order, 'POST');
	}
}
