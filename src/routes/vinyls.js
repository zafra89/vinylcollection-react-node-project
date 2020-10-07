const express = require('express');
/*const jwt = require('jsonwebtoken');*/
const authenticateJWT = require('../middlewares/authentication');
/*const bcrypt = require('bcryptjs');
const saltRounds = 10;*/
const Vinyl = require('../models/Vinyl');
/*let multer = require('multer');

const VALID_FILE_TYPES = ['image/png', 'image/jpg'];
const IMAGES_URL_BASE = "/profileImages";

const fileFilter = (req, file, cb) => {
    if (!VALID_FILE_TYPES.includes(file.mimetype)) {
        cb(new Error('Invalid file type'));
    } else {
        cb(null, true);
    }
}


let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public' + IMAGES_URL_BASE)
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})

let upload = multer({ storage: storage, fileFilter: fileFilter })*/

const vinylsRouter = express.Router();

/*vinylsRouter.get('/', authenticateJWT, (req, res) => {
    User.find({})
        .then((vinyl) => {
            res.send(vinyl);
        })
        .catch((error) => {
            res.status(500).send(error);
        })
});*/

vinylsRouter.post('/', authenticateJWT, (req, res) => {

    const album = req.body.album
    const artist = req.body.artist
    const year = req.body.year
    const genre = req.body.genre
    const cover = req.body.cover
    const id = req.user.userID;

    const vinyl = new Vinyl()

    vinyl.album = album;
    vinyl.artist = artist
    vinyl.year = year;
    vinyl.genre = genre;
    vinyl.cover = cover;
    vinyl.user = id;

    vinyl.save()
        .then((newVinyl) => {
            return res.json({ /*logged: false, token: accessToken,*/ vinyl: newVinyl }) /*quitar token????*/
        })
        .catch((error) => {
            res.status(500).send(error);
        })
});

/*vinylsRouter.post('/login', (req, res) => {
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
});*/

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

/*vinylsRouter.delete('/:id', (req, res) => {
    const id = req.params.id

    User.findByIdAndDelete(id)
        .then((deletedUsuario) => {
            res.send({ mensaje: `se ha borrado correctamente el usuario con id ${id}` });
        })
        .catch((error) => {
            res.status(500).send(error);
        })
});

vinylsRouter.put('/', authenticateJWT, (req, res) => {
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
});

vinylsRouter.post('/profileImage', authenticateJWT, upload.single('profileImage'), function (req, res, next) {

    User.findByIdAndUpdate(	req.user.userID,{

        profileImage: IMAGES_URL_BASE + "/" + req.file.filename
    })

        .then((err, updatedUser) => {
            if(err){
                res.status(500).send(err)
            } else{
                res.send("Updated profile image")
            }
        })


    const imageForm = document.getElementById('profileImageForm')
    imageForm.addEventListener('submit', (e)=> {
        e.preventDefault()
        const formData = new formData(imageForm)
        const userToken = localStorage.getItem('token')

        if (!userToken)
        {
            return window.location.href = "/User/login.html";
        }

        fetch('/users/profileImage', {
            method: 'POST',
            body: formData,
            headers: {
                "Authorization": "Bearer" + userToken
            }
        })
            .then(res => {
                console.log(res.status)
            })
            .catch(err => {
                console.log(err)
            })
    })
});*/

module.exports = vinylsRouter;
