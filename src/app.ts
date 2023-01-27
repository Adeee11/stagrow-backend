// const express = require("express");
// const morgan = require("morgan");
// const { createProxyMiddleware } = require("http-proxy-middleware");
// const cors = require("cors");
// require("dotenv").config();

// // Create Express Server
// const app = express();

// // Configuration
// const PORT = 3000;
// const HOST = "localhost";

// // Logging the requests
// app.use(morgan("dev"));

// const whitelist = ["http://localhost:8000"];
// const corsOptions = {
//   origin: function (origin, callback) {
//     if (!origin || whitelist.indexOf(origin) !== -1) {
//       callback(null, true);
//     } else {
//       callback(new Error("Not allowed by CORS"));
//     }
//   },
//   credentials: true,
// };

// app.use(cors(corsOptions));

// // Proxy Logic :  Proxy endpoints
// app.use("/posts/:url", (req, res, next) => {
//   createProxyMiddleware({
//     target: req.params.url,
//     changeOrigin: true,
//   })(req, res, next);
// });

// // Starting our Proxy server
// app.listen(PORT, HOST, () => {
//   console.log(`Starting Proxy at ${HOST}:${PORT}`);
// });

import express from 'express';
import posts_routes from './routes/posts';
import videos_routes from './routes/videos';
import followers_routes from './routes/followers';
// import user_routes from './routes/user';
import service_routes from './routes/services';
import payment_routes from './routes/checkout';
// import {getDatabase} from './database';
import cors from 'cors';
const { createProxyMiddleware } = require('http-proxy-middleware');
const bodyParser = require('body-parser');

const app = express();

app.use(cors());
const PORT = process.env.PORT || 3000;
app.use(bodyParser());
app.use(express.json());

app.use('/api', videos_routes);
app.use('/api', posts_routes);
app.use('/api', followers_routes);
app.use('/api', service_routes);
// app.use('/payment', payment_routes);
// app.use('/user', user_routes);
app.listen(PORT, () => {
  console.log(`Starting server at ${PORT}`);
  // getDatabase()
});
