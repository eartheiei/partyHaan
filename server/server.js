const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

var Users = require("./routes/Users");
app.use("/users", Users);

var Parties = require("./routes/Parties");
app.use("/parties", Parties);

app.listen(4000, () => {
  console.log("Listening on port 4000");
});
