const express = require('express');
const authenticateJWT = require('../middlewares/authentication');
const Wishlist = require('../models/Wishlist');

const wishlistRouter = express.Router();

/*wishlistRouter.get('/:id', authenticateJWT, (req, res) => {
    const id = req.params.id;
    Vinyl.findById(id, { __v: 0, updatedAt: 0, createdAt: 0 })
        .then((user) => {
            res.send(user)
        })
        .catch((error) => {
            res.status(500).send(error)
        })
});*/

wishlistRouter.post('/', authenticateJWT, (req, res) => {

    const album = req.body.album
    const artist = req.body.artist
    const year = req.body.year
    const genre = req.body.genre
    const cover = req.body.cover
    const userID = req.user.userID;

    const wishlist = new Wishlist()

    wishlist.album = album;
    wishlist.artist = artist
    wishlist.year = year;
    wishlist.genre = genre;
    wishlist.cover = cover;
    wishlist.user = userID;

    vinyl.save()
        .then((newWishlist) => {
            return res.json({ vinyl: newWishlist })
        })
        .catch((error) => {
            res.status(500).send(error);
        })
});

wishlistRouter.get('/mywishlist', authenticateJWT, (req, res) => {
    const id = req.user.userID;
    Wishlist.find({'user' : id})
        .then((vinyl) => {
            res.send(vinyl
            )
        })
        .catch((error) => {
            res.status(500).send(error)
        })
});

wishlistRouter.delete('/:id', (req, res) => {
    const id = req.params.id

    Wishlist.findByIdAndDelete(id)
        .then((deletedVinyl) => {
            res.status(200).send(deletedVinyl);
        })
        .catch((error) => {
            res.status(500).send(error);
        })
});

/*wishlistRouter.put('/', authenticateJWT, (req, res) => {
    const id = req.usuario.userID
    let camposActualizar = {};
    //if (req.body.contactoEmergencia){
    //	camposActualizar.contactoEmergencia = req.body.contactoEmergencia
    //}
    //camposActualizar.alimentos = req.body.alimentos ? req.body.alimentos : undefined;
    //camposActualizar.contactoEmergencia = req.body.contactoEmergencia ? req.body.contactoEmergencia : undefined;

    camposActualizar = { ...req.body };
    //recoge todos los puntos del objeto body y los mete en el objeto nuevo//

    Wishlist.findByIdAndUpdate(id, camposActualizar)
        .then(() => {
            return User.findById(id);
        })
        .then((usuarioGuardado) => {
            res.json(usuarioGuardado);
            /!console.log("Has guardado al usuario")!/
            console.log(usuarioGuardado);
        })
        .catch((error) => {
            /!console.log("error")!/
            console.log(error)
            res.status(500).send(error);
        })
});*/

module.exports = wishlistRouter;
