const express = require("express");
const { getSessionFromJWT } = require("../middleware");

//Obtener los controladores
const casaCtrl = require("../controllers/casas.controller");

//ejecucion de router para crear las rutas
const router = express.Router();

router.get("/", getSessionFromJWT, casaCtrl.getAllCasas);

router.get("/:id", getSessionFromJWT, casaCtrl.getCasa);

router.post("/", getSessionFromJWT, casaCtrl.createCasa);

router.post("/:id/habitacion", getSessionFromJWT, casaCtrl.createHabitacion);

router.put("/:id", getSessionFromJWT, casaCtrl.updateCasa);

router.delete("/:id", getSessionFromJWT, casaCtrl.deleteCasa);

module.exports = router;
