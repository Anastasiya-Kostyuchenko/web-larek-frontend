import { Order } from '../models';

export class OrderModel {
	private orders: Order[] = [];

	createOrder(order: Order): void {
		this.orders.push(order);
	}

	updateOrder(orderIndex: number, updatedOrder: Partial<Order>): boolean {
		if (orderIndex < 0 || orderIndex >= this.orders.length) {
			return false;
		}

		this.orders[orderIndex] = { ...this.orders[orderIndex], ...updatedOrder };
		return true;
	}

	removeOrder(orderIndex: number): boolean {
		if (orderIndex < 0 || orderIndex >= this.orders.length) {
			return false;
		}

		this.orders.splice(orderIndex, 1);
		return true;
	}

	getOrders(): Order[] {
		return this.orders;
	}
}
