import axios from 'axios';
import { Request, Response } from 'express';
import request from 'superagent';

export const getVideos = async (req: Request, res: Response) => {
  const id = req.params.instaId;
  const url = `https://www.instagram.com/${id}/?__a=1&__d=dis`;
  request
    .get(url)
    .query('')
    .set('Accept', 'application/json')
    .end((err, response) => {
      if (err || JSON.stringify(response.body) == '{}') {
        res.status(404).json({ msg: 'Something went wrong!' });
        return;
      }
      const videos = response.body?.graphql?.user?.edge_felix_video_timeline?.edges;
      res.send(videos);
    });
};

export const showVideos = async (req: Request, res: Response) => {
  try {
    const Url = req?.params?.url; // video url
    const value = await axios.get(`${Url}`, { responseType: 'stream' });
    res.setHeader('content-type', 'video/mp4');
    res.setHeader("Content-Security-Policy", "img-src 'self' http://localhost:8000");
    value.data.pipe(res);
  } catch (err: any) {
    console.log(err.message);
    if (err.response) {
      res.status(err?.response?.status).json({ err: 'Something went wrong!' });
    }
  }
};
