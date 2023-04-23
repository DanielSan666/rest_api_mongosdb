const mongoose = require("mongoose");

const medidaSchema = mongoose.Schema({
  tipo: {
    type: String,
    enum: ["Largo", "Alto"],
  },
  valor: {
    type: Number,
    max: [400, "El valor maximo es 400"],
    min: [0, "El valor minimo es 0"],
    required: [true, "El valor es requerido"],
  },
});

const habitacionSchema = mongoose.Schema({
  Nombre: String,
  Medidas: [
    {
      type: medidaSchema,
      ref: "medida",
    },
  ],
});

module.exports = mongoose.model("habitacion", habitacionSchema);
