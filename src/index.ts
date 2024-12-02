export * from './types/model/api';
export * from './types/model/models';
export * from './types/views/views';
export * from './types/base';
export * from './types/events';

import './scss/styles.scss';

interface Product {
	id: string;
	name: string;
	description: string;
	price: number;
	stock: number;
}

interface Order {
	items: Product[];
	address: string;
	email: string;
	phone: string;
	paymentMethod: string;
}
interface Cart {
	items: Product[];
	totalPrice: number;
}
