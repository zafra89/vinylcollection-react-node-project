const express = require('express');
const jwt = require('jsonwebtoken');
const authenticateJWT = require('../middlewares/authentication');
const bcrypt = require('bcryptjs');
const saltRounds = 10;
const User = require('../models/User');

const usersRouter = express.Router();

/*usersRouter.get('/', authenticateJWT, (req, res) => {
    User.find({})
        .then((usuario) => {
            res.send(usuario);
        })
        .catch((error) => {
            res.status(500).send(error);
        })
});*/

usersRouter.post('/', (req, res) => {

    const fullName = req.body.fullName
    const userName = req.body.userName
    const email = req.body.email
    const password = req.body.password


    bcrypt.hash(password, saltRounds, function (err, hash) {
        const user = new User()

        user.fullName = fullName;
        user.userName = userName
        user.email = email;
        user.password = hash;

        user.save()
            .then((newUser) => {
                return res.json({ user: newUser })
            })
            .catch((error) => {
                res.status(500).send(error);
            })
    });
});

usersRouter.post('/login', (req, res) => {
    const userName = req.body.userName;
    const password = req.body.password;
    User.findOne({ userName: userName })
        .then((user) => {
            if (user) {
                bcrypt.compare(password, user.password, function (err, result) {
                    if (result) {
                        const accessToken = jwt.sign(
                            { userID: user._id, fullName: user.fullName },
                            process.env.JWT_SECRET);
                        return res.json({ logged: true, token: accessToken })
                    }
                    else {
                        return res.status(404).json({ logged: false })
                    }
                });
            }
            else {
                return res.status(404).json({ logged: false })
            }
        })
        .catch((err) => {
            return res.status(404).json({ logged: false })
        })
});

usersRouter.get('/singleUser', authenticateJWT, (req, res) => {
    const id = req.user.userID;
    User.findById(id, { __v: 0, updatedAt: 0, createdAt: 0 })
        .then((user) => {
            res.send(user)
        })
        .catch((error) => {
            res.status(500).send(error)
        })
});

/*usersRouter.delete('/:id', (req, res) => {
    const id = req.params.id

    User.findByIdAndDelete(id)
        .then((deletedUsuario) => {
            res.send({ mensaje: `se ha borrado correctamente el usuario con id ${id}` });
        })
        .catch((error) => {
            res.status(500).send(error);
        })
});

usersRouter.put('/', authenticateJWT, (req, res) => {
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

module.exports = usersRouter;
