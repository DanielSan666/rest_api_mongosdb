const mongoose = require("mongoose");
const habitacionSchema = require("./Habitacion").schema;

const casaSchema = mongoose.Schema({
  Calle: {
    type: String,
    required: true,
  },
  Numero: {
    type: String,
    required: true,
    min: [0, "El numero exterior no puede ser negativo"],
  },
  Colonia: {
    type: String,
    required: true,
  },
  CodigoPostal: {
    type: String,
    required: true,
  },
  Habitaciones: [{ type: habitacionSchema, ref: "habitacion" }],
});

module.exports = mongoose.model("casa", casaSchema);
