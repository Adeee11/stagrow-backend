import { Request, Response } from 'express';
import request from 'superagent';

export const getFollowers = (req: Request, res: Response) => {
  try {
    const id = req.params.instaId;
    const url = `https://www.instagram.com/${id}/?__a=1&__d=dis`;
    request
      .get(url)
      .query('')
      .set('Accept', 'application/json')
      .end((err, response) => {
        console.log(err);
        if (err || JSON.stringify(response.body) == '{}') {
          res.status(404).json({ msg: 'Something went wrong!' });
          return;
        }
        const followers = response.body?.graphql?.user?.edge_followed_by?.count;
        res.status(200).json({ followers_count: followers });
      });
  } catch (err: any) {
    res.status(err?.response?.status).json({ msg: 'Something went wrong!' });
  }
};
