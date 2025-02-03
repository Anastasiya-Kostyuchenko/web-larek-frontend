import { Order } from '../types';
import { IEvents } from './base/events';
export class OrderForm {
	constructor(private template: HTMLTemplateElement, private events: IEvents) {}

	render(orderData: Order) {
		const form = this.template.content.cloneNode(true) as HTMLElement;
		return form;
	}
}
