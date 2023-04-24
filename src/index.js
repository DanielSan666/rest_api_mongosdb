const app = require("./app");
const port = 5000;
const mongoose = require("mongoose");
//asignacion del puerto y requerir el archivo app para iniciar el servidor

//conexion a mongodb atlas
const URI = app.get("DB_URI");

mongoose.set("strictQuery", true);

mongoose
  .connect(URI)
  .then(console.log("Conectado a mongo Atlas"))
  .catch((error) => console.log(error));

//arranque de la api
app.listen(port, "0.0.0.0", () => {
  console.log("Server on port", port);
});
