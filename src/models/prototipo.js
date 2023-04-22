const mongoose = require("mongoose");



const prototipochema = mongoose.Schema({
    sensors:{
        distance: {
            type: Number
        }
    }    
  },
);

module.exports = mongoose.model("prototipo", prototipochema);
