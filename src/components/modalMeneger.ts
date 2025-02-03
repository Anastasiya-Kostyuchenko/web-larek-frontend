import { IEvents, EventEmitter } from './base/events';
import { IProduct } from '../types';
import { OrderForm } from './order';
import { Basket } from './basket';

export class ModalManager {
	private modal: HTMLElement;
	private modalBody: HTMLElement;
	private closeButton: HTMLElement;

	constructor(private events: IEvents) {
		console.log('ModalManager инициализирован');

		this.modal = document.querySelector('.modal')!;
		this.modalBody = document.querySelector('.modal__container')!;
		this.closeButton = document.querySelector('.modal__close')!;

		if (!this.modal || !this.modalBody || !this.closeButton) {
			console.error('Не найдены элементы модального окна!');
			return;
		}
		console.log('Закрывающая кнопка:', this.closeButton);

		this.closeButton.addEventListener('click', () => this.close());
		this.modal.addEventListener('click', (event) => {
			if (event.target === this.modal) this.close();
		});

		this.events.on('modal:open', (data: { content: string | HTMLElement }) => {
			console.log(
				'📢 Событие modal:open получено, открываем окно с контентом:',
				data.content
			);
			this.open(data.content);
		});
	}

	open(content: string | HTMLElement) {
		console.log('Открытие модального окна');
		this.modalBody.innerHTML = '';

		if (this.closeButton) {
			console.log('Кнопка перед добавлением:', this.closeButton);
			this.modalBody.appendChild(this.closeButton);
		}

		if (typeof content === 'string') {
			this.modalBody.innerHTML += content;
		} else {
			this.modalBody.appendChild(content);
		}

		this.modal.classList.add('modal_active');
	}

	close() {
		console.log('Функция close вызвана');
		this.modal.classList.remove('modal_active');
	}
}

const events = new EventEmitter();

const modal = new ModalManager(events);
const basket = new Basket(events);

const basketButton = document.querySelector('.header__basket');
if (basketButton) {
	basketButton.addEventListener('click', () => {
		events.emit('modal:open', { content: basket.render() });
	});
} else {
	console.error('Кнопка корзины не найдена!');
}

events.on('basket:add', (item: IProduct) => {
	basket.addItem(item);
	events.emit('header__basket', { content: basket.render() });
});

events.on('basket:remove', (item: IProduct) => {
	basket.removeItem(item);
	modal.open(basket.render());
});
