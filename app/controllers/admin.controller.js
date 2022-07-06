const Admin = require("../models/admin.model");

// Create and Save a new admin
exports.create = (req, res) => {
  // Validate request
  if (!req.body.firstname) {
    return res.status(400).send({
      message: "admin content can not be empty",
    });
  }

  // Create a admin
  const admin = new Admin({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    password: req.body.password,
  });

  // Save admin in the database
  admin
    .save()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the admin.",
      });
    });
};

// Retrieve and return all admin from the database.
exports.findAll = (req, res) => {
  Admin.find()
    .then((admins) => {
      res.send(admins);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving admins.",
      });
    });
};

// Find a single admin with a adminId
exports.findOne = (req, res) => {
  Admin.findById(req.params.adminId)
    .then((admin) => {
      if (!admin) {
        return res.status(404).send({
          message: "admin not found with id " + req.params.adminId,
        });
      }
      res.send(admin);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "admin not found with id " + req.params.adminId,
        });
      }
      return res.status(500).send({
        message: "Error retrieving admin with id " + req.params.adminId,
      });
    });
};
// login with credantials

exports.findbycredantials = (req, res) => {
  // res.send("hello world");
    console.log("/login activated");
    if(!req.body.email || !req.body.password){
        res.send("fields are empty!!!");
        return 0;
    }


  Admin.find(
    {
      email: req.body.email,
      password: req.body.password,
    },
    function (err, admin) {
      if (admin === []) {
        res.send("admin not found");
        console.log(err);
      } else {
        console.log(admin);
        res.send(admin);
      }
    }
  );
};

// Update a admin identified by the adminId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body.firstname) {
    return res.status(400).send({
      message: "admin content can not be empty",
    });
  }

  // Find admin and update it with the request body
  Admin.findByIdAndUpdate(
    req.params.adminId,
    {
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      password: req.body.password,
    },
    { new: true }
  )
    .then((admin) => {
      if (!admin) {
        return res.status(404).send({
          message: "admin not found with id " + req.params.adminId,
        });
      }
      res.send(admin);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "admin not found with id " + req.params.adminId,
        });
      }
      return res.status(500).send({
        message: "Error updating admin with id " + req.params.adminId,
      });
    });
};

// Delete a admin with the specified adminId in the request
exports.delete = (req, res) => {
  Admin.findByIdAndRemove(req.params.adminId)
    .then((admin) => {
      if (!admin) {
        return res.status(404).send({
          message: "admin not found with id " + req.params.adminId,
        });
      }
      res.send({ message: "admin deleted successfully!" });
    })
    .catch((err) => {
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        return res.status(404).send({
          message: "admin not found with id " + req.params.adminId,
        });
      }
      return res.status(500).send({
        message: "Could not delete admin with id " + req.params.adminId,
      });
    });
};
