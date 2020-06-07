const express = require("express");
const parties = express.Router();
const cors = require("cors");

const Party = require("../models/Party");
const Participation = require("../models/Participation");
parties.use(cors());

parties.post("/add", (req, res) => {
  const today = new Date();
  const party = {
    name: req.body.name,
    limit: req.body.limit,
    ownerId: req.body.uid,
    created: today,
  };

  Party.create(party)
    .then((party) => {
      const today = new Date();
      const data = {
        userId: req.body.uid,
        partyId: party.pid,
        created: today,
      };
      Participation.create(data)
        .then((result) => res.status(200).send("Succesful!"))
        .catch((err) => {
          res.status(400).send("error: " + err);
        });
    })
    .catch((err) => {
      res.status(400).send("error: " + err);
    });
});

parties.get("/all", (req, res) => {
  Party.findAll()
    .then((results) => {
      res.send(results);
    })
    .catch((err) => {
      res.status(400).send("error: " + err);
    });
});

parties.get("/:id", (req, res) => {
  Participation.findAll({
    where: {
      partyId: req.params.id,
    },
  })
    .then((results) => {
      res.send(results);
    })
    .catch((err) => {
      res.status(400).send("error: " + err);
    });
});

parties.post("/join", (req, res) => {
  const today = new Date();
  const data = {
    userId: req.body.userId,
    partyId: req.body.partyId,
    created: today,
  };
  Participation.create(data)
    .then((result) => res.status(200).send("Succesful!"))
    .catch((err) => {
      res.status(400).send("error: " + err);
    });
});

module.exports = parties;
