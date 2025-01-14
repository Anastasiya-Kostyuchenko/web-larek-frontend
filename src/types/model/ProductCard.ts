import { ApiProduct } from '../api';

export class ProductCard {
	private element: HTMLElement;

	constructor() {
		this.element = document.createElement('div');
		this.element.classList.add('card');
		this.element.addEventListener('click', () => this.onClick());
	}

	update(product: ApiProduct) {
		if (!product) {
			console.error('Данные товара отсутствуют или некорректны');
			return;
		}

		this.element.innerHTML = `
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <p>Цена: $${product.price}</p>
            <p>В наличии: ${product.stock}</p>
        `;
	}

	render(container: HTMLElement) {
		container.appendChild(this.element);
	}

	private onClick() {
		console.log('Карточка товара была нажата!');
	}
}
