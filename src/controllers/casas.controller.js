const mongoose = require("mongoose");
const Casa = require("../models/Casa");
const User = require("../models/Users");
const Habitacion = require("../models/Habitacion");

const getAllCasas = async (req, res) => {
  const { userId } = req;

  const user = await User.findById(userId).populate({
    path: "Casas",
    populate: {
      path: "Habitaciones",
    },
  });

  return res.status(200).json({
    casas: user.Casas,
  });
};

const getCasa = async (req, res) => {
  const { userId } = req;
  const { id } = req.params;
  try {
    const user = await User.findById(userId).populate({
      path: "Casas",
      populate: {
        path: "Habitaciones",
      },
    });

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
  try {
    const casa = await Casa.create(req.body);

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        error: "Usuario no encontrado",
      });
    }

    await casa.save();

    user.Casas.push(casa);

    await user.save();

    return res.status(201).json({
      casa,
    });
  } catch (error) {
    console.error(error);
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
    const user = await User.findById(userId);

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
    const user = await User.findById(userId);

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
    const user = await User.findById(userId).populate("Casas");

    const casa = user.Casas.find((casa) => casa._id == id);

    if (!casa) {
      return res.status(404).json({
        error: "Casa no encontrada",
      });
    }

    const habitacion = await Habitacion.create({
      Nombre,
      Medidas,
    });

    casa.Habitaciones.push(habitacion);

    await casa.save();

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
