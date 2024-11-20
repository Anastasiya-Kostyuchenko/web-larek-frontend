// Типы данных, приходящих через API
export interface ApiProduct {
    id: string;
    name: string;
    description: string;
    price: number;
    stock: number;
}

export interface ApiOrder {
    id: string;
    items: ApiProduct[];
    address: string;
    email: string;
    phone: string;
    paymentMethod: string;
}

// Интерфейс API-клиента
export interface ApiClient {
    getProducts(): Promise<ApiProduct[]>;
    getProductById(id: string): Promise<ApiProduct>;
    createOrder(order: ApiOrder): Promise<void>;
}
