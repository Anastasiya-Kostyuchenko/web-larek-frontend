import { IEvents } from './events';
import { API_URL, CDN_URL } from '../../utils/constants';
import { IProduct } from '../../types';
import { EventEmitter } from './events';
import { Api, ApiListResponse } from './api';

// Абстрактный класс Model продукта
export abstract class Model<T> {
	constructor(data: Partial<T>, protected events: IEvents) {
		Object.assign(this, data);
	}

	// Метод для генерации изменений (событий)
	emitChanges(event: string, payload?: object) {
		this.events.emit(event, payload ?? {});
	}
}

// Модель продукта
export class ProductModel extends Model<IProduct> {
	id: string;
	title: string;
	description: string;
	price: number;
	image: string;
	isAvailable: boolean;
	category: string;

	constructor(data: Partial<IProduct>, events: IEvents) {
		super(data, events);
		this.id = data.id || '';
		this.title = data.title || 'Без названия';
		this.description = data.description || '';
		this.category = data.category || 'Без категории';
		this.price = data.price ?? 0;
		this.image =
			data.image ||
			`${process.env.API_ORIGIN}/content/weblarek/product/${this.id}`;
	}

	public getEvents(): IEvents {
		return this.events;
	}
}

// Добавляем функцию fetchProducts для получения данных с API
export function fetchProducts(apiUrl: string): Promise<IProduct[]> {
	return fetch(apiUrl)
		.then((response) => {
			if (!response.ok) {
				throw new Error(`Ошибка сети: ${response.statusText}`);
			}
			return response.json();
		})
		.then((data: ApiListResponse<IProduct>) => {
			// Предполагаем, что ответ имеет поле items с массивом продуктов
			return data.items;
		})
		.catch((error) => {
			console.error('Ошибка при загрузке продуктов:', error);
			return [];
		});
}
