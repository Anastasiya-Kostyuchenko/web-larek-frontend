import { IProduct } from '../types';
import { fetchProducts } from './base/model';
import { API_URL, CDN_URL } from '../utils/constants';
const baseUrl = process.env.API_ORIGIN;

export function renderComponent(
	container: HTMLElement | null,
	component: HTMLElement
): void {
	if (!container) {
		console.error('Контейнер для отображения компонента отсутствует');
		return;
	}

	container.innerHTML = '';

	container.appendChild(component);
}

export function getImageUrl(product: IProduct): string {
	const url = `${product.image}`;
	console.log(url);
	return url;
}
export function createProductCard(product: IProduct): HTMLElement {
	const template = document.getElementById(
		'card-catalog'
	) as HTMLTemplateElement;
	if (!template) throw new Error('Template not found');

	const card = template.content.cloneNode(true) as HTMLElement;
	const category = card.querySelector('.card__category');
	const title = card.querySelector('.card__title');
	const price = card.querySelector('.card__price');
	const image = card.querySelector('.card__image');

	if (category) category.textContent = product.category;
	if (title) title.textContent = product.title;
	if (price) price.textContent = `${product.price} синапсов`;
	if (image) image.setAttribute('src', product.image);

	return card;
}

export function renderProductCards(p0: string, products: IProduct[]): void {
	const gallery = document.querySelector('.gallery') as HTMLElement;
	if (!gallery) throw new Error('Gallery container not found');

	gallery.innerHTML = '';

	products.forEach((product) => {
		const card = createProductCard(product);
		gallery.appendChild(card);
	});
}

const apiUrl = `${API_URL}/product/`;
fetchProducts(apiUrl).then((products) => {
	if (products.length > 0) {
		console.log('Продукты успешно загружены:', products);
		renderProductCards('.gallery', products);
	} else {
		console.error('Продукты не были загружены');
	}
});
