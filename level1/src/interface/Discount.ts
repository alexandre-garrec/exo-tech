export interface Discount {
  article_id: string;
  type: 'amount' | 'percentage';
  value: number;
}
