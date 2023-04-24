//Configuracion de express para inicializar el servidor
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
//uso de las rutas creadas con express router
const userRoutes = require("./routes/users.routes");
const prototipoRoutes = require("./routes/prototipo.routes");
const casasRoutes = require("./routes/casa.routes");
require("dotenv").config();

const app = express();
//Midelwares
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.send("Si");
});

for (let env in process.env) {
  app.set(env, process.env[env]);
}

//el "/api/..." es para saber como esta formada la URL
app.use("/api/users", userRoutes);
app.use("/api/data", prototipoRoutes);
app.use("/api/casas", casasRoutes);

module.exports = app;
