const express = require("express");
const users = express.Router();
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const User = require("../models/User");
users.use(cors());

process.env.SECRET_KEY = "secret";

users.post("/register", (req, res) => {
  const today = new Date();
  const userData = {
    email: req.body.email,
    password: req.body.password,
    created: today,
  };

  User.findOne({
    where: {
      email: req.body.email,
    },
  })
    .then((email) => {
      if (!email) {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          userData.password = hash;
          User.create(userData)
            .then((user) => {
              res.status(200).json({ status: user.email + " Registered!" });
            })
            .catch((err) => {
              res.status(400).send("error: " + err);
            });
        });
      } else {
        res.status(403).send("User already exists!")
      }
    })
    .catch((err) => {
      res.status(400).send("error: " + err);
    });
});

users.post("/login", (req, res) => {
  console.log(req.body.email)
  User.findOne({
    where: {
      email: req.body.email,
    },
  })
    .then((user) => {
      if (user) {
        if (bcrypt.compareSync(req.body.password, user.password)) {
          let token = jwt.sign(user.dataValues, process.env.SECRET_KEY, {
            expiresIn: 1440,
          });
          res.send(token);
        } else {
            res.status(403).send("Invalid password!")
        }
      } else {
        res.status(403).send("User does not exist!");
      }
    })
    .catch((err) => {
      res.status(400).json({ error: err });
    });
});

module.exports = users;