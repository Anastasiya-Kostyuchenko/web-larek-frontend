// ProductModel.ts
import { Product } from './models';
import { RealApiClient } from './api';

export class ProductModel {
	private apiClient: RealApiClient;
	private products: Product[] = [];

	constructor(apiClient: RealApiClient) {
		this.apiClient = apiClient;
	}

	// Загрузка продуктов с сервера
	async loadProducts(): Promise<void> {
		const apiProducts = await this.apiClient.getProducts();
		this.products = apiProducts.map((product) => ({
			id: product.id,
			name: product.name,
			description: product.description,
			price: product.price,
			isAvailable: product.stock > 0,
		}));
	}

	getProducts() {
		return this.products;
	}

	getProductById(id: string): Product | undefined {
		return this.products.find((product) => product.id === id);
	}
}

// ProductView.ts
export class ProductView {
	private container: HTMLElement;

	constructor(containerId: string) {
		this.container = document.getElementById(containerId)!;
	}

	renderProducts(products: Product[]) {
		this.container.innerHTML = ''; // Очищаем контейнер перед рендерингом
		products.forEach((product) => {
			const productCard = document.createElement('div');
			productCard.className = 'product-card';
			productCard.innerHTML = `
        <h2>${product.name}</h2>
        <p>${product.description}</p>
        <span>${product.price} синапсов</span>
      `;
			this.container.appendChild(productCard);
		});
	}
}

// ProductPresenter.ts
class ProductPresenter {
	private model: ProductModel;
	private view: ProductView;

	constructor(model: ProductModel, view: ProductView) {
		this.model = model;
		this.view = view;
	}

	async init() {
		await this.model.loadProducts(); // Загружаем продукты
		const products = this.model.getProducts();
		this.view.renderProducts(products); // Отображаем продукты
	}
}

// Главный скрипт
(async () => {
	// Создаем экземпляр API-клиента
	const apiClient = new RealApiClient('https://larek-api.nomoreparties.co');

	// Создаем модель и представление
	const productModel = new ProductModel(apiClient);
	const productView = new ProductView('gallery'); // ID блока для отображения

	// Создаем презентер
	const productPresenter = new ProductPresenter(productModel, productView);

	// Инициализируем и отображаем продукты
	await productPresenter.init();
})();
