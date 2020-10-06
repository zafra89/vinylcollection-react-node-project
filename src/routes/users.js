const express = require('express');
const jwt = require('jsonwebtoken');
const authenticateJWT = require('../middlewares/authentication');
const bcrypt = require('bcryptjs');
const saltRounds = 10;
const User = require('../models/User');
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

usersRouter.post('/'/*, upload.single('picture')*/, (req, res) => {

    const fullName = req.body.fullName
    const userName = req.body.userName
    const email = req.body.email
    const password = req.body.password
    //const profileImage = IMAGES_URL_BASE + "/" + req.file.filename


    bcrypt.hash(password, saltRounds, function (err, hash) {
        const user = new User()

        user.fullName = fullName;
        user.userName = userName
        user.email = email;
        user.password = hash;
        //user.profileImage = profileImage;

        user.save()
            .then((newUser) => {
                /*const accessToken = jwt.sign(
                    { userID: newUser._id, userName: newUser.userName },
                    process.env.JWT_SECRET);*/
                return res.json({ /*logged: false, token: accessToken,*/ user: newUser }) /*quitar token????*/
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
});

usersRouter.post('/profileImage', authenticateJWT, upload.single('profileImage'), function (req, res, next) {

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

module.exports = usersRouter;
