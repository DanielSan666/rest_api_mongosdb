const prototipo = require("../models/prototipo");

const getdata = async (req, res) => {
  const data = await prototipo.find();
  res.send(data);
};

const getSingleData = async (req, res) => {
  const data = await prototipo.find({}, null, { limit: 30 });
  const medida =
    data.reduce((acc, cur) => {
      console.log(acc, cur);
      return acc + cur.sensors.distance;
    }, 0) / 10;
  res.json({ medida: medida });
};
module.exports = { getdata, getSingleData };
