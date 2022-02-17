export const TYPE_AMOUNT = 'amount';
export const TYPE_PERCENTAGE = 'percentage';

export interface Discount {
  article_id: string;
  type: typeof TYPE_AMOUNT | typeof TYPE_PERCENTAGE;
  value: number;
}

export interface DiscountByArticleId {
  [key: string]: Discount;
}
