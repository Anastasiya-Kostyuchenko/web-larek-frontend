// Типы данных, приходящих через API
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

// Интерфейс для работы с API-клиентом
export interface ApiClient {
	getProducts(): Promise<ApiProduct[]>;
	getProductById(id: string): Promise<ApiProduct>;
	createOrder(order: ApiOrder): Promise<void>;
}

// Типы для POST-запросов
export type ApiPostMethods = 'POST' | 'PUT' | 'DELETE';

// Базовый класс для работы с API
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

	// Обработчик ответа от API
	protected handleResponse(response: Response): Promise<object> {
		if (response.ok) return response.json();
		else
			return response
				.json()
				.then((data) => Promise.reject(data.error ?? response.statusText));
	}

	// GET-запрос
	get(uri: string) {
		return fetch(this.baseUrl + uri, {
			...this.options,
			method: 'GET',
		}).then(this.handleResponse);
	}

	// POST-запрос
	post(uri: string, data: object, method: ApiPostMethods = 'POST') {
		return fetch(this.baseUrl + uri, {
			...this.options,
			method,
			body: JSON.stringify(data),
		}).then(this.handleResponse);
	}
}

// Реализация API-клиента
export class RealApiClient implements ApiClient {
	private baseUrl: string;

	constructor(baseUrl: string) {
		this.baseUrl = baseUrl;
	}

	// Получаем список продуктов
	async getProducts(): Promise<ApiProduct[]> {
		const response = await fetch(`${this.baseUrl}/products`);
		if (!response.ok) {
			throw new Error('Failed to fetch products');
		}
		return response.json();
	}

	// Получаем продукт по ID
	async getProductById(id: string): Promise<ApiProduct> {
		const response = await fetch(`${this.baseUrl}/products/${id}`);
		if (!response.ok) {
			throw new Error('Failed to fetch product');
		}
		return response.json();
	}

	// Создаем заказ
	async createOrder(order: ApiOrder): Promise<void> {
		const response = await fetch(`${this.baseUrl}/orders`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(order),
		});
		if (!response.ok) {
			throw new Error('Failed to create order');
		}
	}
}
