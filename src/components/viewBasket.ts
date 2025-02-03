import { IProduct } from '../types';

let cartItems: IProduct[] = [];

export function addToCart(product: IProduct): void {
	cartItems.push(product);
	updateCartView();
}

export function createBasketCard(
	product: IProduct,
	index: number
): HTMLElement {
	const template = document.getElementById(
		'card-basket'
	) as HTMLTemplateElement;
	if (!template) throw new Error('Template not found');

	const card = template.content.cloneNode(true) as HTMLElement;
	const itemIndex = card.querySelector('.basket__item-index');
	const title = card.querySelector('.card__title');
	const price = card.querySelector('.card__price');
	const deleteButton = card.querySelector('.basket__item-delete');

	if (itemIndex) itemIndex.textContent = `${index + 1}`;
	if (title) title.textContent = product.title;
	if (price) price.textContent = `${product.price} синапсов`;
	if (deleteButton) {
		deleteButton.addEventListener('click', () => removeFromCart(index));
	}

	return card;
}

export function renderBasket(): void {
	const template = document.getElementById('basket') as HTMLTemplateElement;
	if (!template) throw new Error('Basket template not found');

	const basketContainer = template.content.cloneNode(true) as HTMLElement;
	const list = basketContainer.querySelector('.basket__list') as HTMLElement;
	const totalPrice = basketContainer.querySelector('.basket__price');

	if (!list || !totalPrice) throw new Error('Basket elements not found');

	list.innerHTML = '';

	cartItems.forEach((product, index) => {
		const basketCard = createBasketCard(product, index);
		list.appendChild(basketCard);
	});

	const total = cartItems.reduce((sum, item) => sum + item.price, 0);
	totalPrice.textContent = `${total} синапсов`;

	const modalContent = document.querySelector('.modal__content');
	if (modalContent) {
		modalContent.innerHTML = '';
		modalContent.appendChild(basketContainer);
	}
}

export function removeFromCart(index: number): void {
	cartItems.splice(index, 1);
	updateCartView();
}
function updateCartView(): void {
	renderBasket();
}
const modalContainer = document.getElementById('modal-container');

export function openBasketModal(): void {
	if (modalContainer) {
		modalContainer.classList.add('modal_active');
		renderBasket();
	}
}

export function closeBasketModal(): void {
	if (modalContainer) {
		modalContainer.classList.remove('modal_active');
	}
}

// Пример навешивания событий
document
	.querySelector('.header__basket')
	?.addEventListener('click', openBasketModal);
document
	.querySelector('.modal__close')
	?.addEventListener('click', closeBasketModal);
