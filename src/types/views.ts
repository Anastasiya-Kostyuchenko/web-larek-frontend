import { Product, Order } from './models';

export interface ProductCatalogView {
    displayProducts(products: Product[]): void;
    onProductClick(productId: string): void;
}

export interface CartView {
    displayCartItems(items: Product[]): void;
    onAddToCart(productId: string): void;
    onRemoveFromCart(productId: string): void;
}

export interface OrderView {
    displayOrderForm(): void;
    onOrderSubmit(order: Order): void;
    showOrderConfirmation(): void;
    showValidationError(message: string): void;
}

export interface ModalView {
    showModal(content: string): void;
    closeModal(): void;
}
