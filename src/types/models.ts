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

export class DataModel {
	private items: Array<{
		id: number;
		category: string;
		title: string;
		image: string;
		price: number;
	}> = [];

	setItems(
		items: Array<{
			id: number;
			category: string;
			title: string;
			image: string;
			price: number;
		}>
	): void {
		this.items = items;
	}

	getItems(): Array<{
		id: number;
		category: string;
		title: string;
		image: string;
		price: number;
	}> {
		return this.items;
	}

	addItem(item: {
		id: number;
		category: string;
		title: string;
		image: string;
		price: number;
	}): void {
		this.items.push(item);
	}

	removeItem(itemId: number): void {
		this.items = this.items.filter((item) => item.id !== itemId);
	}
}
