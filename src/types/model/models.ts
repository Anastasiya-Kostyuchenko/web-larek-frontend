export interface Product {
	id: string;
	name: string;
	description: string;
	price: number;
	isAvailable: boolean;
}

export interface CartItem {
	product: Product;
	quantity: number;
}

export interface Order {
	items: CartItem[];
	address: string;
	email: string;
	phone: string;
	paymentMethod: string;
}
