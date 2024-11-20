// Список событий, которые может обрабатывать EventEmitter
export enum AppEvent {
    ProductAddedToCart = 'productAddedToCart',
    ProductRemovedFromCart = 'productRemovedFromCart',
    OrderPlaced = 'orderPlaced',
}

export interface EventPayloads {
    [AppEvent.ProductAddedToCart]: { productId: string };
    [AppEvent.ProductRemovedFromCart]: { productId: string };
    [AppEvent.OrderPlaced]: { orderId: string };
}

export interface EventEmitter {
    on<K extends keyof EventPayloads>(event: K, listener: (payload: EventPayloads[K]) => void): void;
    off<K extends keyof EventPayloads>(event: K, listener: (payload: EventPayloads[K]) => void): void;
    emit<K extends keyof EventPayloads>(event: K, payload: EventPayloads[K]): void;
}
