const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// sample only
const db = mysql.createPool({
    host: "localhost",
    user: "test",
    password: "test",
    database: "test",
});

// read
app.get("/api/get", (req, res) => {
    const sqlSelect = "SELECT * FROM movie_review";
    db.query(sqlSelect, (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});

// create
app.post("/api/insert", (req, res) => {
    const movieName = req.body.movieName;
    const movieReview = req.body.movieReview;

    const sqlInsert =
        "INSERT INTO movie_review(movieName, movieReview) VALUES(?,?)";
    db.query(sqlInsert, [movieName, movieReview], (err, result) => {
        if (err) throw err;
        console.log("all good");
    });
});

// delete
app.delete("/api/delete/:movieName", (req, res) => {
    const movieName = req.params.movieName;
    const sqlDelete = "DELETE FROM movie_review WHERE movieName=?;";
    db.query(sqlDelete, movieName, (err, result) => {
        if (err) throw err;
        console.log(`${movieName} deleted successfuly.`);
    });
});

// update
app.put("/api/update", (req, res) => {
    const movieName = req.body.movieName;
    const movieReview = req.body.movieReview;
    const sqlUpdate =
        "UPDATE movie_review SET movieReview=? WHERE movieName=?;";
    db.query(sqlUpdate, [movieReview, movieName], (err, result) => {
        if (err) throw err;
        console.log(`${movieName} updated successfuly.`);
    });
});

app.listen(3001, () => {
    console.log("Running on port 3001");
});
