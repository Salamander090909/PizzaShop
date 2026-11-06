const mongoose = require("mongoose");

const foodSchema = mongoose.Schema({
    bildeurl: String,
    tittel: String,
    beskrivelse: String,
    ingredienser: String,
    kategori: String,
    pris: Number
})

const food = mongoose.model("food", foodSchema);

module.exports = food;