import { Product } from '../../types/models';

export class CatalogView {
	private container: HTMLElement;

	constructor(containerId: string) {
		const container = document.getElementById(containerId);
		if (!container) {
			throw new Error(`Container with ID "${containerId}" not found.`);
		}
		this.container = container;
	}

	render(products: Product[]): void {
		this.container.innerHTML = products
			.map(
				(product) => `
          <div class="product-card">
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <span>${product.price} zł</span>
          </div>
        `
			)
			.join('');
	}
}
