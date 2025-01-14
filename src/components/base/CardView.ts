import { CardModel } from '../../types/model/CardModel';
import { Product } from '../../types/models';

export class CardView {
	container: HTMLElement;

	constructor(containerClass: string) {
		this.container = document.querySelector(containerClass) as HTMLElement;
	}
	renderComponent(items: Product[], totalPrice: number) {
		this.container.innerHTML = '';
		items.forEach((item) => {
			const productElement = document.createElement('div');
			productElement.classList.add('basket__item');
			productElement.innerHTML = `
				<span>${item.name}</span>
				<span>${item.price}</span>
			`;
			this.container.appendChild(productElement);
		});

		const totalElement = document.createElement('div');
		totalElement.classList.add('basket__total');
		totalElement.innerHTML = `Total: ${totalPrice}`;
		this.container.appendChild(totalElement);
	}
}
