const { createProxyMiddleware } = require('http-proxy-middleware');
const express = require('express');
const app = express();
const cors = require('cors');
const helmet = require('helmet');
const {join}  = require('path');


app.use(helmet({crossOriginResourcePolicy: false}));

app.use(cors({
    allowedHeaders: '*',
    origin: '*',
    credentials: true,
}
));

app.use('/ml-server/*',createProxyMiddleware({target:'http://127.0.0.1:8000',changeOrigin:true}));
app.use('/audio-server/*',createProxyMiddleware({target:'http://127.0.0.1:4000',changeOrigin:true}));


app.listen(3000,()=>console.log('API gateway listen on port 3000'));



