import { getCarts, getArticles, getDeliveryFees, getDiscounts } from './api';

import { getArticlePriceSum, getDeliveryFee, sortArticleById, sortDiscountByArticleId } from './utils';

import { writeFile } from './fs';
import { UserCart } from './interface/Cart';

async function main() {
  const carts = await getCarts();
  const articles = await getArticles();
  const deliveryFees = await getDeliveryFees();
  const discounts = await getDiscounts();

  const discountByArticleId = sortDiscountByArticleId(discounts);
  const articleById = sortArticleById(articles);

  const expect: Array<UserCart> = carts.map((cart) => {
    const total = getArticlePriceSum(cart, articleById, discountByArticleId);
    const deliveryFee = getDeliveryFee(deliveryFees, total);

    return {
      id: cart.id,
      total: total + deliveryFee,
    } as UserCart;
  });

  console.log(expect);

  writeFile(expect);
}

main();
