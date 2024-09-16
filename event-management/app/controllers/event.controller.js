const db = require("../models");
const Event = db.event;
const Op = db.Sequelize.Op;

// Create and Save a new Event
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({
      message: "Title can not be empty!",
    });
    return;
  }

  if (!req.body.description) {
    res.status(400).send({
      message: "Description can not be empty!",
    });
    return;
  }
  if (!req.body.date) {
    res.status(400).send({
      message: "Date can not be empty!",
    });
    return;
  }
  if (!req.body.city_id) {
    res.status(400).send({
      message: "City can not be empty!",
    });
    return;
  }
  if (!req.body.participants) {
    res.status(400).send({
      message: "Participants can not be empty!",
    });
    return;
  }

  // Create a Event
  const event = {
    title: req.body.title,
    description: req.body.description,
    date: req.body.date,
    city_id: req.body.city_id,
    participants: req.body.participants,
  };

  // Save Event in the database
  Event.create(event)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Event.",
      });
    });
};

// testEvents
exports.testEvents = (req, res) => {
  //res.status(200).send({ message: "Get all events." });
  res.json({ message: "Get all events." });
};

// Retrieve all Events from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { [Op.iLike]: `%${title}%` } } : null;

  Event.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving events.",
      });
    });
};

// Find a single Event with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Event.findByPk(id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Event with id=" + id,
      });
    });
};

// Update a Event by the id in the request
exports.update = (req, res) => {
  // req.params.id - get id from route '/event/:id' parameter name is :id ('.../event/1')
  // req.body.id - get id from POST / PUT or JSON data
  // req.query.id - get id from url sent by ?key=value after a route '/event' query name is id with value 1 ('.../event?id=1')

  // from route '/event/:id'
  const id = req.params.id;

  // Validate request
  if (!req.params.id) {
    res.status(400).send({
      message: "Id can not be empty!",
    });
    return;
  }
  if (!req.body.title) {
    res.status(400).send({
      message: "Title can not be empty!",
    });
    return;
  }

  if (!req.body.description) {
    res.status(400).send({
      message: "Description can not be empty!",
    });
    return;
  }
  if (!req.body.date) {
    res.status(400).send({
      message: "Date can not be empty!",
    });
    return;
  }
  if (!req.body.city_id) {
    res.status(400).send({
      message: "City can not be empty!",
    });
    return;
  }
  if (!req.body.participants) {
    res.status(400).send({
      message: "Participants can not be empty!",
    });
    return;
  }

  Event.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Event was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Event with id=${id}. Maybe Event was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Event with id=" + id,
      });
    });
};

// Delete a Event with the specified id in the request
exports.delete = (req, res) => {
  // with route parameter "/event/:id"
  const id = req.params.id;

  // by form POST / PUT or json data
  //const id = req.body.id;

  Event.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Event was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Event with id=${id}. Maybe Event was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Event with id=" + id,
      });
    });
};

// find all events by city_id and date
exports.findAllEventsByCityIdAndDate = (req, res) => {
  // req.params.id - get id from route '/event/:id' parameter name is :id ('.../event/1')
  // req.body.id - get id from POST / PUT or JSON data
  // req.query.id - get id from url sent by ?key=value after a route '/event' query name is id with value 1 ('.../event?id=1')

  // req.body.city_id get city_id from POST/PUT or JSON data
  const city_id = req.body.city_id;
  const startDate = req.body.startDate;
  const endDate = req.body.endDate;

  Event.findAll({
    where: { city_id: city_id, date: { [Op.between]: [startDate, endDate] } },
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving events.",
      });
    });
};
