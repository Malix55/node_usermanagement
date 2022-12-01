const express = require("express");
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const path = require("path");

require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// body parser middleware
// parse applicaion/x-www-form-urlencoded
// app.use(bodyParser.urlencoded({ extended: false }));

// parse application
// app.use(bodyParser.json());

//express body parse
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//static folder
app.use(express.static(path.join(__dirname, "public")));

//templating engine
//handlebars
app.engine(".hbs", exphbs.engine({ extname: ".hbs" }));
app.set("view engine", ".hbs");
app.set("views", "./views");

//routes
const routes = require("./routes/user");
app.use("/", routes);

app.listen(PORT, () => {
  console.log(`server is running on port : ${PORT}`);
});
