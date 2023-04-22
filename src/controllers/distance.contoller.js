const prototipo = require("../models/prototipo")

const getdata = async(req, res) => {
    const data = await prototipo.find()
    res.send(data)
}


module.exports = {getdata}