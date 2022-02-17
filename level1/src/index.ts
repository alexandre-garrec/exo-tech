import { getCarts, getArticles, getDeliveryFees, getDiscounts } from './api';

import { Article } from './interface/Article';
import { Discount } from './interface/Discount';

import { isBetween } from './utils';

interface ArticleById {
  [key: string]: Article;
}

interface DiscountByArticleId {
  [key: string]: Discount;
}

async function main() {
  const carts = await getCarts();
  const articles = await getArticles();
  const deliveryFees = await getDeliveryFees();
  const discounts = await getDiscounts();

  const discountByArticleId: DiscountByArticleId = discounts.reduce((memo, discont) => {
    return { ...memo, [discont.article_id]: discont };
  }, {});

  const articleById: ArticleById = articles.reduce((memo, article) => {
    return { ...memo, [article.id]: article };
  }, {});

  const expect = carts.map((cart) => {
    // lvl 2
    // const total = cart.items.reduce(
    //   (memo, { article_id, quantity }) => memo + articleById[`${article_id}`].price * quantity,
    //   0
    // );

    const total = cart.items.reduce((memo, { article_id, quantity }) => {
      const articlePrice = articleById[`${article_id}`].price;

      if (!discountByArticleId[`${article_id}`]) {
        return memo + articlePrice;
      }
      const { type, value } = discountByArticleId[`${article_id}`];

      switch (type) {
        case 'amount':
          return memo + (articlePrice - value) * quantity;
        case 'percentage':
          return memo + articlePrice - articlePrice * (value / 100) * quantity;
      }
    }, 0);

    const _deliveryFee =
      deliveryFees.find(({ eligible_transaction_volume }) =>
        isBetween(eligible_transaction_volume.min_price, eligible_transaction_volume.max_price, total)
      )?.price || 0;

    return {
      id: cart.id,
      total: total + _deliveryFee,
    };
  });

  console.log(expect);
}

main();
