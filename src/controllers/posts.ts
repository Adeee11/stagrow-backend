import axios from 'axios';
import { Request, Response } from 'express';
import request from 'superagent';
const blockHotlinks = require('connect-block-hotlinks');
const getPosts = async (req: Request, res: Response) => {
  const id = req.params.instaId;
  try {
    const url = `https://www.instagram.com/${id}/channel/?__a=1&__d=dis&count=4`;
    request
      .get(url)
      .query(null)
      .set('Accept', 'application/json')
      .end((err, response) => {
        if (err || JSON.stringify(response.body) == '{}') {
          res.status(404).json({ msg: 'Something went wrong!', err });
          return;
        }
        const Posts = response.body?.graphql?.user?.edge_owner_to_timeline_media?.edges.map((a: any) => {
          return { id: a.node.id, img: a.node.display_url };
        });
        const userProfilePic = response.body?.graphql?.user?.profile_pic_url_hd;
        const userName = response.body?.graphql?.user?.username;
        res.send({ Posts, userProfilePic, userName });
      });
  } catch (error) {
    if (error.response) {
      res.status(error?.response?.status).json({ err: 'Something went wrong!' });
    }
  }
};

const showPosts = async (req: any, res: any, next: any) => {
  try {
    const Url = req?.params?.url;
    const referrer = req.get('Referrer');
    const userAgent = req.headers['user-agent'];
    console.log(req.headers['user-agent']);
    
   if ((["PostmanRuntime/7.29.2"].includes(userAgent)) || ([process.env.FRONT_END_URL].includes(referrer))) {
      const value = await axios.get(`${Url}`, { responseType: 'stream' });
      res.setHeader('content-type', 'image/png');
      value.data.pipe(res);
    }else{
      res.status(403).send('You are not allowed to view this photo!'); // block the request
      next(); // referrer is an optional http header, it may not exis
    }
  } catch (error) {
    if (error.response) {
      res.status(error?.response?.status).json({ err: 'Something went wrong!' });
    }
  }
};

export { getPosts, showPosts };
