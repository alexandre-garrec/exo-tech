export interface Discount {
  article_id: string;
  type: 'amount' | 'percentage';
  value: number;
}

export interface DiscountByArticleId {
  [key: string]: Discount;
}
