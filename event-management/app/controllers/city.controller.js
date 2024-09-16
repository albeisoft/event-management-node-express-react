const db = require("../models");
const City = db.city;
const Op = db.Sequelize.Op;

// Retrieve all cities from the database.
exports.findAll = (req, res) => {
  City.findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving events.",
      });
    });
};
