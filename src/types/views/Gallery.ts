import { Product } from '../models';

export class Gallery {
	private container: HTMLElement;

	constructor(container: HTMLElement) {
		this.container = container;
	}

	renderProductCards(products: Product[]): void {
		this.container.innerHTML = '';

		products.forEach((product) => {
			const template = document.getElementById(
				'card-catalog'
			) as HTMLTemplateElement;
			const cardTemplate = template.content.cloneNode(true) as HTMLElement;

			cardTemplate.querySelector('.card__title')!.textContent = product.name;
			cardTemplate.querySelector('.card__description')!.textContent =
				product.description;
			cardTemplate.querySelector(
				'.card__price'
			)!.textContent = `$${product.price.toFixed(2)}`;

			const availabilityText = product.isAvailable
				? 'In Stock'
				: 'Out of Stock';
			cardTemplate.querySelector('.card__availability')!.textContent =
				availabilityText;

			this.container.appendChild(cardTemplate);
		});
	}
}
