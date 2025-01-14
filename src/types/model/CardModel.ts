import { Product } from '../models';

export class CardModel {
	private items: Product[] = [];
	private totalPrice: number = 0;

	addItem(product: Product) {
		this.items.push(product);
		this.calculateTotal();
	}

	removeItem(productId: string) {
		this.items = this.items.filter((item) => item.id !== productId);
		this.calculateTotal();
	}

	getItems() {
		return this.items;
	}

	getTotalPrice() {
		return this.totalPrice;
	}

	private calculateTotal() {
		this.totalPrice = this.items.reduce((total, item) => total + item.price, 0);
	}
}
