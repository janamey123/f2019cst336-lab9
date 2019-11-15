const express = require("express");
const mysql = require("mysql");
const app = express();
app.set("view engine", "ejs");
app.use(express.static("public")); //folder for images, css, js

// routes
app.get("/", function (req, res) {
    res.send("it works!");
}); //root

app.get("/dbTest", function (req, res) {
   let conn = dbConnection();

   conn.connect(function (err) {
       if (err) throw err;
       console.log("Connected!");
       let sql = "SELECT * FROM l9_author";

       conn.query(sql, function (err, rows, fields) {
           if (err) throw err;
           res.send(rows);
       });
   });
});//dbTest

function dbConnection(){
    let conn = mysql.createConnection({
        host: "gmgcjwawatv599gq.cbetxkdyhwsb.us-east-1.rds.amazonaws.com\t",
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