import { Product, Order } from '../model/models';

export interface ProductCatalogView {
	displayProducts(products: Product[]): void;
	onProductClick(handler: (productId: string) => void): void;
}

export interface CartView {
	updateCartContent(markup: string): void;
	onCartInteraction(handler: (event: Event) => void): void;
}

export interface OrderView {
	displayOrderForm(): void;
	onOrderSubmit(handler: (order: Order) => void): void;
	showOrderConfirmation(): void;
	showValidationError(message: string): void;
}

export interface ModalView {
	showModal(content: string): void;
	closeModal(): void;
}
