export interface IProduct {
	id: string;
	title: string;
	description: string;
	price: number;
	image: string;
	isAvailable: boolean;
	category: string;
}

export type CartItem = {
	id: string;
	title: string;
	price: string;
	quantity: number;
	imageUrl: string;
};

export type PaymentMethod = 'cash' | 'card';
export interface Order {
	payment: PaymentMethod;
	email: string;
	phone: string;
	address: string;
	items: string[];
	total: number;
}

export interface OrderResult {
	id: string;
	total: number;
}

export interface Success {
	total: number;
}

export interface IModalState {
	isOpen: boolean;
	title?: string;
	content?: string;
}

export interface CustomerData {
	email: string;
	phone: string;
}

//интерфейс отображений
export interface ProductCardProps {
	product: IProduct;
	onAddToCart: (productId: string) => void;
	onViewDetails: (productId: string) => void;
}

//корзина
export interface Basket {
	items: CartItem[];
	onRemoveItem: (productId: string) => void;
	onCheckout: () => void;
}

//оформление заказа
export interface CheckoutFormProps {
	customerData: CustomerData;
	address: string;
	paymentMethod: string;
	onSubmit: (order: Order) => void;
	onValidationError: (error: string) => void;
}
