const mongoose = require("mongoose");

const getAllCasas = async (req, res) => {
  const { userId } = req;

  const user = await mongoose.model("User").findById(userId);

  return res.status(200).json({
    casas: user.Casas,
  });
};

const getCasa = async (req, res) => {
  const { userId } = req;
  const { id } = req.params;
  try {
    const user = await mongoose.model("User").findById(userId);

    const casa = user.Casas.find((casa) => casa._id == id);

    if (!casa) {
      return res.status(404).json({
        error: "Casa no encontrada",
      });
    }

    return res.status(200).json({
      casa,
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};

const createCasa = async (req, res) => {
  const { userId } = req;
  const { Calle, Numero, Colonia } = req.body;
  try {
    const casa = await mongoose.model("casa").create({
      Calle,
      Numero,
      Colonia,
    });

    const user = await mongoose.model("User").findById(userId);

    user.Casas.push(casa);

    await user.save();

    return res.status(201).json({
      casa,
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};

const updateCasa = async (req, res) => {
  const { userId } = req;
  const { id } = req.params;
  const { Calle, Numero, Colonia } = req.body;
  try {
    const user = await mongoose.model("User").findById(userId);

    const casa = user.Casas.find((casa) => casa._id == id);

    casa.Calle = Calle;
    casa.Numero = Numero;
    casa.Colonia = Colonia;

    await user.save();

    return res.status(200).json({
      casa,
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};

const deleteCasa = async (req, res) => {
  const { userId } = req;
  const { id } = req.params;
  try {
    const user = await mongoose.model("User").findById(userId);

    const casa = user.Casas.find((casa) => casa._id == id);

    await casa.remove();

    await user.save();

    return res.status(200).json({
      casa,
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};

const createHabitacion = async (req, res) => {
  const { userId } = req;
  const { id } = req.params;
  const { Nombre, Medidas } = req.body;

  try {
    const user = await mongoose.model("User").findById(userId);

    const casa = user.Casas.find((casa) => casa._id == id);

    if (!casa) {
      return res.status(404).json({
        error: "Casa no encontrada",
      });
    }

    const habitacion = await mongoose.model("habitacion").create({
      Nombre,
      Medidas,
    });

    casa.Habitaciones.push(habitacion);

    habitacion.validate();

    await user.save();

    return res.status(201).json({
      habitacion,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: error.message,
    });
  }
};

module.exports = {
  getAllCasas,
  getCasa,
  createCasa,
  updateCasa,
  deleteCasa,
  createHabitacion,
};
