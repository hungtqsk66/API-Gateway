const { createProxyMiddleware } = require('http-proxy-middleware');
const express = require('express');
const app = express();
const cors = require('cors');
const helmet = require('helmet');

app.use(helmet({crossOriginResourcePolicy: false}));

app.use(cors({
    allowedHeaders: '*',
    origin: '*',
    credentials: true,
}
));


app.use('*',createProxyMiddleware({target:'http://127.0.0.1:8000',changeOrigin:true}));


app.listen(3000,()=>console.log(`API gateway started on port 3000`));


