export interface Article {
  id: number;
  name: string;
  price: number;
}

export interface ArticleById {
  [key: string]: Article;
}
