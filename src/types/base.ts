export interface Controller {
    init(): void;
}

export interface View {
    render(): void;
    bindEvents(): void;
}
