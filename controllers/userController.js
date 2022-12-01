const mysql = require("mysql");
const { connect } = require("../routes/user");

//connection pool database
const pool = mysql.createPool({
  connectionLimit: 100,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

//view users

exports.view = (req, res) => {
  //connect to db
  pool.getConnection((err, connection) => {
    if (err) throw err; // not connected
    console.log(`Database is now connected as :` + connection.threadId);

    //user the connection
    connection.query("SELECT * FROM user", (err, rows) => {
      // when done with the connection , release it
      connection.release();
      if (!err) {
        res.render("home", { rows });
      } else {
        console.error(err);
      }
      console.log("the data from user table : \n", rows);
    });
  });
};

//find user by search
exports.find = (req, res) => {
  //connect to db
  console.log(req.body.search);
  pool.getConnection((err, connection) => {
    if (err) throw err; // not connected
    console.log(`Database is now connected as :` + connection.threadId);

    let searchTerm = req.body.search;
    console.log(searchTerm);
    //user the connection
    connection.query(
      "SELECT * FROM user WHERE first_name LIKE ? OR last_name LIKE ?",
      ["%" + searchTerm + "%", "%" + searchTerm + "%"],
      (err, rows) => {
        // when done with the connection , release it
        connection.release();
        if (!err) {
          res.render("home", { rows });
        } else {
          console.error(err);
        }
        // console.log("the data from user table : \n", rows);
      }
    );
  });
};

//add new user
exports.adduser = (req, res) => {
  const { first_name, last_name, email, phone, comments } = req.body;

  //connect to db
  console.log(req.body.search);
  pool.getConnection((err, connection) => {
    if (err) throw err; // not connected
    console.log(`Database is now connected as :` + connection.threadId);

    let searchTerm = req.body.search;
    console.log(searchTerm);
    //user the connection
    connection.query(
      "INSERT INTO user SET first_name = ? , last_name = ? , email = ? , phone = ? , comments = ?",
      (err, rows) => {
        // when done with the connection , release it
        connection.release();
        if (!err) {
          res.render("adduser", { rows });
        } else {
          console.error(err);
        }
        // console.log("the data from user table : \n", rows);
      }
    );
  });
};
