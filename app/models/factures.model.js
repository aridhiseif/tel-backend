const mongoose = require("mongoose");
const moment = require("moment");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const FactureSchema = mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    montant: {
      type: String,
      required: true,
    },
    dates: {
      type: Date,
      required: true,
    },
    datef: {
      type: Date,
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

FactureSchema.plugin(AutoIncrement, { inc_field: "facture" });

FactureSchema.pre("save", function (next) {
  console.log("Processing Dates...");
  this.dates = moment(this.dates, "YYYY-MM-DD").format("MM-DD-YYYY");
  this.datef = moment(this.datef, "YYYY-MM-DD").format("MM-DD-YYYY");
  console.log("Processing Dates End");
  next();
});

module.exports = mongoose.model("Facture", FactureSchema);
