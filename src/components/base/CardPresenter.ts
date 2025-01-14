import { CardView } from './CardView';
import { CardModel } from '../../types/model/CardModel';

export class CardPresenter {
	private model: CardModel;
	private view: CardView;

	constructor(model: CardModel, containerClass: string) {
		this.model = model;
		this.view = new CardView(containerClass);
		this.setupEventListeners();
	}

	private setupEventListeners() {
		this.view.container.addEventListener('click', (event) => {
			const target = event.target as HTMLElement;
			if (target.classList.contains('basket__item-delete')) {
				const productId = target.dataset.id!;
				this.removeProductFromCard(productId);
			}
		});
	}

	private removeProductFromCard(productId: string) {
		this.model.removeItem(productId);
		this.updateCard();
	}

	public updateCard() {
		const items = this.model.getItems();
		const totalPrice = this.model.getTotalPrice();
		this.view.renderComponent(items, totalPrice);
	}
}
