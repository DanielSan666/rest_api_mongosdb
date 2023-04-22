const app = require("./app");
const port = 5000;
const mongoose = require("mongoose");
//asignacion del puerto y requerir el archivo app para iniciar el servidor

//conexion a mongodb atlas
const URI =
  "mongodb+srv://daniel:mHtgntSeZZRkwEMe@cluster0.d8pn2uf.mongodb.net/API?retryWrites=true&w=majority";

mongoose.set("strictQuery", false);

mongoose
  .connect(URI)
  .then(console.log("Conectado a mongo Atlas"))
  .catch((error) => console.log(error));

//arranque de la api
app.listen(port, "0.0.0.0",  () => {
  console.log("Server on port", port);
});
