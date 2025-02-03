import { IProduct } from '../types';
import { IEvents } from './base/events';

export class Basket {
	items: IProduct[] = [];
	total: number = 0;

	constructor(private events: IEvents) {
		this.events.on('basket:change', this.updateBasket.bind(this));
	}

	addItem(item: IProduct) {
		this.items.push(item);
		this.calculateTotal();
		this.events.emit('basket:change');
	}

	removeItem(item: IProduct) {
		const index = this.items.findIndex((i) => i.id === item.id);
		if (index !== -1) {
			this.items.splice(index, 1);
			this.calculateTotal();
			this.events.emit('basket:change');
		}
	}

	// Метод обновления корзины
	updateBasket() {
		console.log('Корзина обновлена:', this.items, 'Общая сумма:', this.total);
	}

	calculateTotal() {
		this.total = this.items.reduce((sum, item) => sum + item.price, 0);
	}

	render(): HTMLElement {
		const basketContainer = document.createElement('div');
		basketContainer.classList.add('basket');

		const title = document.createElement('h2');
		title.textContent = `Корзина (${this.items.length} товаров)`;
		basketContainer.appendChild(title);

		const list = document.createElement('ul');
		this.items.forEach((item) => {
			const li = document.createElement('li');
			li.textContent = `${item.title} - ${item.price} руб.`;
			list.appendChild(li);
		});
		basketContainer.appendChild(list);

		const total = document.createElement('p');
		total.textContent = `Общая сумма: ${this.total} руб.`;
		basketContainer.appendChild(total);

		return basketContainer;
	}
}
