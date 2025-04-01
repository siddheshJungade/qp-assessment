export interface IOrderItem {
    groceryItemId: number;
    quantity: number;
}

export interface IOrderItemResponse {
    groceryItemId: number;
    name: string;
    quantity: number;
    price: number;
    subtotal: number;
}

export interface IOrderRequest {
    items: IOrderItem[];
}

export interface IOrderResponse {
    orderId: number;
    userId: number;
    items: IOrderItemResponse[];
    total: number;
    status: string;
    createdAt: string;
} 