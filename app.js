const express = require("express");
const mysql = require("mysql");
const app = express();
app.set("view engine", "ejs");
app.use(express.static("public")); //folder for images, css, js

// routes
app.get("/", async function (req, res) {
    let categories = await getCategories();
    console.log(categories);
    res.render("index", {"categories": categories});
}); //root

app.get("/quotes", async function (req, res) {
    let rows = await getQuotes(req.query);

    res.render("quotes", {"records": rows});
});//quotes

function getQuotes(query) {
    let keyword = query.keyword;
    let conn = dbConnection();

    return new Promise(function (resolve, reject) {
        conn.connect(function (err) {
            if (err) throw err;
            console.log("Connected!");
            let sql = `SELECT quote, firstName, lastName, category
                    FROM l9_quotes
                    NATURAL JOIN l9_author
                    WHERE quote LIKE '%${keyword}%'
                    `;
            conn.query(sql, function (err, rows, fields) {
                if (err) throw err;
                //res.send(rows);
                resolve(rows);
            });
        });//connect
    });//promise
}//getQuotes

function getCategories() {
    let conn = dbConnection();

    return new Promise(function (resolve, reject) {
        conn.connect(function (err) {
            if (err) throw err;
            console.log("Connected!");
            let sql = `SELECT DISTINCT category
                    FROM l9_quotes
                    ORDER BY category
                    `;
            conn.query(sql, function (err, rows, fields) {
                if (err) throw err;
                //res.send(rows);
                resolve(rows);
            });
        });//connect
    });//promise
}//getCategories

app.get("/dbTest", function (req, res) {
    let conn = dbConnection();

    conn.connect(function (err) {
        if (err) throw err;
        console.log("Connected!");
        let sql = "SELECT * FROM l9_author WHERE sex = 'F'";

        conn.query(sql, function (err, rows, fields) {
            if (err) throw err;
            res.send(rows);
        });
    });
});//dbTest

function dbConnection() {
    let conn = mysql.createConnection({
        host: "gmgcjwawatv599gq.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
        user: "vr51fr35ztycmd35",
        password: "pfoyhzg1z1yusckl",
        database: "s0potvjirbd4ea7f"
    });//createConnection
    return conn;
}


// starting server
app.listen(process.env.PORT || 3000, process.env.IP, function () {
    console.log("Express server is running...");
});