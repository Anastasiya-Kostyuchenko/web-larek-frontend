import { ProductModel } from './model/ProductModel';
import { ProductView } from './views/ProductView';
import { Product } from './models';

export class ProductPresenter {
	private model: ProductModel;
	private view: ProductView;

	constructor(model: ProductModel, view: ProductView) {
		this.model = model;
		this.view = view;
	}

	async init() {
		console.log('Initializing ProductPresenter...');

		const newProduct: Product = {
			id: '123',
			name: 'Sample Product',
			description: 'This is a sample product',
			price: 99.99,
			isAvailable: true,
		};
		this.model.addProduct(newProduct);
		console.log('Product added.');
		const products = this.model.getAllProducts();
		console.log('Products in presenter:', products);
		this.view.renderProducts(products);
	}
}
