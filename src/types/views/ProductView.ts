import { Gallery } from './Gallery';
import { Product } from '../models';

export class ProductView {
	private container: HTMLElement;

	constructor(container: HTMLElement) {
		this.container = container;
	}
	renderProducts(products: Product[]): void {
		this.container.innerHTML = '';
		products.forEach((product) => {
			const productCard = this.createProductCard(product);
			this.container.appendChild(productCard);
		});
	}
	private createProductCard(product: Product): HTMLElement {
		const card = document.createElement('div');
		card.classList.add('card');
		card.innerHTML = `
		  <h3 class="card__title">${product.name}</h3>
		  <p class="card__description">${product.description}</p>
		  <p class="card__price">${product.price}</p>
		`;
		return card;
	}
}
