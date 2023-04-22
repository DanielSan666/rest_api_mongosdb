const Users = require("../models/Users");
const bcrypt = require("bcrypt");
const salytRounds = 10;
var jwt = require("jsonwebtoken");

const login = async (req, res) => {
  const someUser = await Users.findOne({ Email: req.body.Email });
  if (someUser) {
    const cmp = await bcrypt.compare(req.body.Password, someUser.Password);
    if (cmp) {
      var token = jwt.sign(
        { email: someUser.email, _id: someUser._id },
        "Secret",
        {
          expiresIn: "2h",
        }
      );
      res.send({
        user: someUser.Email,
        id: someUser._id,
        token: token,
        auth: true,
        name: someUser.Nombre,
        lastName: someUser.Apellido,
        phone: someUser.Telefono
      });
    } else {
      res.send("Usuario o contraseña incorrectos");
    }
  } else {
    res.send("Usuario o contraseña incorrectos");
  }
};

const verifyJWT = (req, res, next) => {
  const token = req.headers["x-access-token"];
  if (!token) {
    res.send({
      status: 403,
      mensaje: "No se encontro el token",
    });
  } else {
    jwt.verify(token, "Secret", (err, decoded) => {
      if (err) {
        res.send({
          status: 402,
          resultado: { mensaje: "Fallo la autentificación" },
          error: err,
        });
      } else {
        req.userEmail = decoded.email;
        req.userId = decoded._id;
        next();
      }
    });
  }
};

//FUNCIONES CRUD

const findAllUsers = async (req, res) => {
  const users = await Users.find();
  res.json(users);
};

const saveUser = async (req, res) => {
  const hashedPwd = await bcrypt.hash(req.body.Password, salytRounds);
  //la linea de arriba solo es para encriptar la contraseña
  const newUser = new Users({
    Nombre: req.body.Nombre,
    Apellido: req.body.Apellido,
    Email: req.body.Email,
    Telefono: req.body.Telefono,
    Password: hashedPwd,
    
  });
  const userSaved = await newUser.save();
  res.json(userSaved);
};

const findOneUser = async (req, res) => {
  const user = await Users.findById(req.params.id);
  res.json(user);
};

const deleteUser = async (req, res) => {
  await Users.findByIdAndDelete(req.params.id);
  res.json({
    mensaje: "El usuario se ha eliminado",
  });
};

const updateUser = async (req, res) => {
  const updatedUser = await Users.findByIdAndUpdate(req.params.id, req.body);
  res.json({
    mensaje: "El usuario se actualizo :D",
  });
};

module.exports = {
  findAllUsers,
  saveUser,
  findOneUser,
  deleteUser,
  updateUser,
  login,
  verifyJWT,
};
