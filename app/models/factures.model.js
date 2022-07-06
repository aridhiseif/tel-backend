const mongoose = require("mongoose");

const FactureSchema = mongoose.Schema(
    {
        matricule: {
            type: String,
            required: true,
        },
        prix: {
            type: String,
            required: true,
        },
        dates: {
            type: String,
            required: true,
        },
        datef: {
            type: String,
            required: true,
        },
        tel: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Facture", FactureSchema);
