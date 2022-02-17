export interface Cart {
  id: string;
  items: Array<CartItem>;
}

export interface CartItem {
  article_id: string;
  quantity: number;
}
