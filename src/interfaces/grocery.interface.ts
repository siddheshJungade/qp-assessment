export interface IGroceryItem {
  id?: number;
  name: string;
  price: number;
  inventory: number;
  category: string;
  description?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IGroceryItemResponse {
  code: number;
  success: boolean;
  message: string;
  data?: IGroceryItem | IGroceryItem[];
  error?: string;
}
