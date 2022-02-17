import { Article, ArticleById } from './interface/Article';
import { Discount, DiscountByArticleId } from './interface/Discount';
import { DeliveryFee } from './interface/DeliveryFee';
import { Cart } from './interface/Cart';

export function isBetween(a: number, b: number, val: number = Math.max()): boolean {
  const min = Math.min(a, b);
  const max = Math.max(a, b);
  return val >= min && val < max;
}

// export function twoDecimal(num: number) {
//   return Math.round(num * 100) / 100;
// }

export function sortDiscountByArticleId(discounts: Array<Discount>): DiscountByArticleId {
  return discounts.reduce((memo, discont) => {
    return { ...memo, [discont.article_id]: discont };
  }, {});
}

export function sortArticleById(articles: Array<Article>): ArticleById {
  return articles.reduce((memo, article) => {
    return { ...memo, [article.id]: article };
  }, {});
}

export function getDeliveryFee(deliveryFees: Array<DeliveryFee>, total: number) {
  return (
    deliveryFees.find(({ eligible_transaction_volume: { min_price, max_price } }) =>
      isBetween(min_price, max_price, total)
    )?.price || 0
  );
}

export function getArticlePriceSum(cart: Cart, articleById: ArticleById, discountByArticleId: DiscountByArticleId) {
  return cart.items.reduce((memo, { article_id, quantity }) => {
    const articlePrice = articleById[`${article_id}`].price;

    if (!discountByArticleId[`${article_id}`]) {
      return memo + articlePrice * quantity;
    }
    const { type, value } = discountByArticleId[`${article_id}`];

    switch (type) {
      case 'amount':
        return memo + (articlePrice - value) * quantity;
      case 'percentage':
        return memo + Math.round(articlePrice - articlePrice * (value / 100)) * quantity;
    }
  }, 0);
}
