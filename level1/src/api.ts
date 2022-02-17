import fetch from 'node-fetch';

import { Article } from './interface/Article';
import { DeliveryFee } from './interface/DeliveryFee';
import { Cart } from './interface/Cart';
import { Discount } from './interface/Discount';

const BASE_URL = 'http://localhost:3000';

export function getArticles(): Promise<Article[]> {
  return fetch(`${BASE_URL}/articles`)
    .then((res: any) => res.json())
    .then((res: any) => {
      return res as Article[];
    });
}

export function getCarts(): Promise<Cart[]> {
  return fetch(`${BASE_URL}/carts`)
    .then((res: any) => res.json())
    .then((res: any) => {
      return res as Cart[];
    });
}

export function getDeliveryFees(): Promise<DeliveryFee[]> {
  return fetch(`${BASE_URL}/delivery_fees`)
    .then((res: any) => res.json())
    .then((res: any) => {
      return res as DeliveryFee[];
    });
}

export function getDiscounts(): Promise<Discount[]> {
  return fetch(`${BASE_URL}/discounts`)
    .then((res: any) => res.json())
    .then((res: any) => {
      return res as Discount[];
    });
}
