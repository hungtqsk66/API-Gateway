const { createProxyMiddleware } = require('http-proxy-middleware');
const express = require('express');
const app = express();
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const {join}  = require('path');
const fs = require('fs');


app.use(helmet({crossOriginResourcePolicy: false}));
app.use(helmet.contentSecurityPolicy({
    directives: {
        defaultSrc: ["'self'","*.fontawesome.com"],
        scriptSrc:["'self'", "'unsafe-inline'","*.fontawesome.com"],
        styleSrc:["'self'", "'unsafe-inline'","*.fontawesome.com"]
    }
}));

app.use(cors({
    allowedHeaders: '*',
    origin: '*',
    credentials: true,
}
));

app.use(morgan('combined',{stream:fs.createWriteStream(join(__dirname,'./logs/access.log'), {flags:'a'})}));
app.use(express.static(join(__dirname, './public')));
app.use('/api/ml-server/*',createProxyMiddleware({target:'http://127.0.0.1:8000',changeOrigin:true}));
app.use('/api/audio-server/*',createProxyMiddleware({target:'http://127.0.0.1:4000',changeOrigin:true}));
app.get('*', (req,res) =>{
    res.sendFile(join(__dirname,'./public/index.html'));
});

app.listen(3000,()=>console.log('API gateway listen on port 3000'));



