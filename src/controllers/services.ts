import { Request, Response } from 'express';

export const getProduct = (req: Request, res: Response) => {
  const { type } = req.params;
  let product: { like: number; price: number; actualPrice: number; }[] | { view: number; price: number; actualPrice: number; }[] ;
  try {
    if (type === 'like_service') {
      product = [
        { like: 50, price: 1.47, actualPrice: 1.99 },
        { like: 100, price: 2.97, actualPrice: 3.98 },
        { like: 250, price: 5.49, actualPrice: 9.95 },
        { like: 500, price: 7.99, actualPrice: 19.9 },
        { like: 1000, price: 12.99, actualPrice: 39.8 },
        { like: 2500, price: 28.99, actualPrice: 99.51 },
        { like: 5000, price: 49.99, actualPrice: 199.02 },
        { like: 10000, price: 88.99, actualPrice: 398.05 },
      ];
    } else if (type === 'view_service') {
      product = [
        { view: 500, price: 1.99, actualPrice: 2.21 },
        { view: 2500, price: 6.99, actualPrice: 9.08 },
        { view: 5000, price: 14.99, actualPrice: 23.42 },
        { view: 10000, price: 21.99, actualPrice: 49.0 },
        { view: 25000, price: 49.99, actualPrice: 131.55 },
        { view: 50000, price: 74.99, actualPrice: 299.96 },
      ];
    } else if (type === 'follower_service') {
      product = [
        { view: 100, price: 2.97, actualPrice: 2.21 },
        { view: 250, price: 5.49, actualPrice: 9.08 },
        { view: 500, price: 7.99, actualPrice: 23.42 },
        { view: 1000, price: 13.09, actualPrice: 49.0 },
        { view: 2500, price: 28.99, actualPrice: 131.55 },
        { view: 5000, price: 49.99, actualPrice: 299.96 },
      ];
    }
    res.send(product);
  } catch (err: any) {
    res.status(err.message);
  }
};
