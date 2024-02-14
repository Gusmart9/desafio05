const express = require ('express');
const { Server } = require ('socket.io');
const handlebars = require('express-handlebars');
const productsRouter = require('./routers/products.router.js');
const cartsRouter = require('./routers/carts.router.js');
const viewsRouter = require ('./routers/views.router.js');

const PORT = 8080; 
const app = express(); 
app.use(express.json()); 
app.use(express.static('./src/public')); 

const serverHttp = app.listen(PORT, () => console.log('server up')) 
const io = new Server(serverHttp) 

app.use((req, res, next) => {
    req.io = io
    next()
}) 
app.engine('handlebars', handlebars.engine());
app.set('views', './src/views');
app.set('view engine', 'handlebars');
app.get('/', (req, res) => res.render('index')); 
app.use('/products', viewsRouter); 
app.use('/api/products', productsRouter); 
app.use('/api/carts', cartsRouter); 

io.on('connection', socket => {
    console.log('Nuevo cliente conectado!')
    socket.on('updatedProducts', data => { 
        io.emit('productList', data) 
    }) 
}) 

