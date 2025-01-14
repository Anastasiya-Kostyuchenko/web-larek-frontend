import { Product } from '../models';

export class ProductModel {
	private products: Product[] = [];

	setProducts(products: Product[]): void {
		this.products = products;
	}

	getAllProducts(): Product[] {
		return this.products;
	}

	addProduct(product: Product): void {
		this.products.push(product);
	}

	removeProduct(productId: string): void {
		this.products = this.products.filter((product) => product.id !== productId);
	}

	getProductById(productId: string): Product | undefined {
		return this.products.find((product) => product.id === productId);
	}
}
