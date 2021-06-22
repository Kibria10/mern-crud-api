const express = require('express')
const app = express();
const mysql = require("mysql");
const bodyParser = require('body-parser');
const cors = require('cors');
// app.get("/", (req, res) => {
//     res.send("Hello World");
// });


const db = mysql.createPool({
 host: 'localhost',
 user:"root",
 password:"",
 database:"crudjs"
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}))

// app.get("/", (req, res)=>{
//     const sqlInsert = "INSERT INTO movie_reviews (movie, review, rate ) VALUES ('INCEPTION','GOOD MOVIE', '10');"
//     db.query(sqlInsert, (err, result)=>{
//         res.send("yo its working nigga");
//     });

// });


app.get('/api/get',(req, res)=>{
    const sqlSelect = "SELECT * FROM movie_reviews";
    db.query(sqlSelect, (err, result)=>{
        // console.log(result);
        res.send(result);
    });
});

app.post("/api/insert", (req, res)=>{
    const movieName = req.body.movieName
    const review = req.body.review
    const rate = req.body.rate

    const sqlInsert = "INSERT INTO movie_reviews (movie, review, rate) VALUES (?,?,?);"
    db.query(sqlInsert, [movieName, review, rate], (err, result)=>{
        console.log(err);
    });
});

app.listen(3001, ()=>{
    console.log("running on port 3001");
});
