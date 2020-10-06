const express = require('express');
const userRoutes = require('./routes/users');
/*const vinylRoutes = require('./routes/vinyls');
const wishlistRoutes = require('./routes/wishlist');*/
const cors = require('cors');

require('dotenv').config();
require('./db.js');

const PORT = process.env.PORT;
const server = express();
server.use(express.static('public'));
server.use(cors());

server.use(express.json());
server.use(express.urlencoded({extended: false}));

server.use('/users', userRoutes);
/*server.use('/vinyls', vinylRoutes);
server.use('/wishlist', wishlistRoutes);*/


server.listen(PORT, () => {
    console.log(`Server running in http://localhost:${PORT}`);
});
