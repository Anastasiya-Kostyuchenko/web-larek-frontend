// Определение интерфейса для продукта
interface ApiProduct {
	name: string;
	description: string;
	price: number;
	stock: number;
}

export class ProductCard {
	private element: HTMLElement;

	constructor() {
		// Создаем элемент карточки товара
		this.element = document.createElement('div');
		this.element.classList.add('product-card');
		// Добавляем обработчик клика
		this.element.addEventListener('click', () => this.onClick());
	}

	// Метод для обновления содержимого карточки товара
	update(product: ApiProduct) {
		if (!product) {
			console.error('Данные товара отсутствуют или некорректны');
			return;
		}

		this.element.innerHTML = `
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <p>Цена: $${product.price}</p>
            <p>В наличии: ${product.stock}</p>
        `;
	}

	// Метод для добавления элемента на страницу в определенный контейнер
	render(container: HTMLElement) {
		container.appendChild(this.element);
	}

	// Метод для обработки клика по карточке
	private onClick() {
		console.log('Карточка товара была нажата!');
	}
}
