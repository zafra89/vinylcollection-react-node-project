const express = require('express');
const authenticateJWT = require('../middlewares/authentication');
const Vinyl = require('../models/Vinyl');

const vinylsRouter = express.Router();

/*vinylsRouter.get('/:id', authenticateJWT, (req, res) => {
    const id = req.params.id;
    Vinyl.findById(id, { __v: 0, updatedAt: 0, createdAt: 0 })
        .then((user) => {
            res.send(user)
        })
        .catch((error) => {
            res.status(500).send(error)
        })
});*/

vinylsRouter.post('/', authenticateJWT, (req, res) => {

    const album = req.body.album
    const artist = req.body.artist
    const year = req.body.year
    const genre = req.body.genre
    const cover = req.body.cover
    const userID = req.user.userID;

    const vinyl = new Vinyl()

    vinyl.album = album;
    vinyl.artist = artist
    vinyl.year = year;
    vinyl.genre = genre;
    vinyl.cover = cover;
    vinyl.user = userID;

    vinyl.save()
        .then((newVinyl) => {
            return res.json({ /*logged: false, token: accessToken,*/ vinyl: newVinyl }) /*quitar token????*/
        })
        .catch((error) => {
            res.status(500).send(error);
        })
});

vinylsRouter.get('/mycollection', authenticateJWT, (req, res) => {
    const id = req.user.userID;
    Vinyl.find({'user' : id})
        .then((vinyl) => {
            res.send(vinyl
            )
        })
        .catch((error) => {
            res.status(500).send(error)
        })
});

vinylsRouter.delete('/:id', (req, res) => {
    const id = req.params.id

    Vinyl.findByIdAndDelete(id)
        .then((deletedVinyl) => {
            res.status(200).send(deletedVinyl);
        })
        .catch((error) => {
            res.status(500).send(error);
        })
});

/*vinylsRouter.put('/', authenticateJWT, (req, res) => {
    const id = req.usuario.userID
    let camposActualizar = {};
    //if (req.body.contactoEmergencia){
    //	camposActualizar.contactoEmergencia = req.body.contactoEmergencia
    //}
    //camposActualizar.alimentos = req.body.alimentos ? req.body.alimentos : undefined;
    //camposActualizar.contactoEmergencia = req.body.contactoEmergencia ? req.body.contactoEmergencia : undefined;

    camposActualizar = { ...req.body };
    //recoge todos los puntos del objeto body y los mete en el objeto nuevo//

    User.findByIdAndUpdate(id, camposActualizar)
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

module.exports = vinylsRouter;
