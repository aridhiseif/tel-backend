const Facture = require("../models/factures.model");

// Create and Save a new facture
exports.create = (req, res) => {
  // Validate request
  if (!req.body.fullName) {
    return res.status(400).send({
      message: "facture content can not be empty",
    });
  }

  // Create a facture
  const facture = new Facture({
    fullName: req.body.fullName,
    montant: req.body.montant,
    dates: req.body.dates,
    datef: req.body.datef,
    tel: req.body.tel,
  });

  // Save facture in the database
  facture
    .save()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the facture.",
      });
    });
};

// Retrieve and return all facture from the database.
exports.findAll = (req, res) => {
  Facture.find()
    .then((factures) => {
      res.send(factures);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving factures.",
      });
    });
};

// Find a single facture with a factureId
exports.findOne = (req, res) => {
  Facture.findById(req.params.factureId)
    .then((facture) => {
      if (!facture) {
        return res.status(404).send({
          message: "facture not found with id " + req.params.factureId,
        });
      }
      res.send(facture);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "facture not found with id " + req.params.factureId,
        });
      }
      return res.status(500).send({
        message: "Error retrieving facture with id " + req.params.factureId,
      });
    });
};
// login with credantials

// Update a facture identified by the factureId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body.fullName) {
    return res.status(400).send({
      message: "facture content can not be empty",
    });
  }

  // Find facture and update it with the request body
  Facture.findByIdAndUpdate(
    req.params.factureId,
    {
      fullName: req.body.fullName, 
      montant: req.body.montant,
      dates: req.body.dates,
      datef: req.body.datef,
      tel: req.body.tel,
    },
    { new: true }
  )
    .then((facture) => {
      if (!facture) {
        return res.status(404).send({
          message: "facture not found with id " + req.params.factureId,
        });
      }
      res.send(facture);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "facture not found with id " + req.params.factureId,
        });
      }
      return res.status(500).send({
        message: "Error updating facture with id " + req.params.factureId,
      });
    });
};

// Delete a facture with the specified factureId in the request
exports.delete = (req, res) => {
  Facture.findByIdAndRemove(req.params.factureId)
    .then((facture) => {
      if (!facture) {
        return res.status(404).send({
          message: "facture not found with id " + req.params.factureId,
        });
      }
      res.send({ message: "facture deleted successfully!" });
    })
    .catch((err) => {
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        return res.status(404).send({
          message: "facture not found with id " + req.params.factureId,
        });
      }
      return res.status(500).send({
        message: "Could not delete facture with id " + req.params.factureId,
      });
    });
};
