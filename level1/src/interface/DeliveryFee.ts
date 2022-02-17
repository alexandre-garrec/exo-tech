export interface DeliveryFee {
  eligible_transaction_volume: DeliveryFeeRange;
  price: number;
}

export interface DeliveryFeeRange {
  min_price: number;
  max_price: number;
}
