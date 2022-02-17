export interface Cart {
  id: string;
  items: Array<CartItem>;
}

export interface UserCart {
  id: string;
  total: number;
}

export interface CartItem {
  article_id: string;
  quantity: number;
}
