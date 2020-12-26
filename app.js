const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const _ = require("lodash");
const dotenv = require("dotenv").config();
const sql = require("mssql/msnodesqlv8");
const { request } = require("express");
const { reduce } = require("lodash");
const { resolveInclude } = require("ejs");

const app = express();

// const main = async () => {
//     const pool = new sql.ConnectionPool({
//       server: process.env.SERVER,
//       database: process.env.DATABASE,
//       options: {
//         trustedConnection: true
//       }
//     });
  
//     await pool.connect();
  
//     const request = new sql.Request(pool);
  
//     const query = `SELECT * from Materials1`;
  
//     const result = await request.query(query);
  
//     console.dir(result);
    
//   };
//   main();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));



app.get("/", function(req,res){
    function getCord() {

        var config = {
            server: process.env.SERVER,
            database: process.env.DATABASE,
            options: {
              trustedConnection: true
            }};
        return new Promise((resolve, reject) => {
            // Create instence of connection
            var conn = new sql.ConnectionPool(config);
            var req = new sql.Request(conn);
            // Connecting to database
            conn.connect(function(err){
                if(err){
                console.log(err);
                   return;
             }
             // Getting result
             var queryString = "SELECT * FROM  Materials1";
             req.query(queryString, function(err, recordset){
                 if(err){
                     console.log(err);
                     return;
                 }
                 else{
                     //console.log(JSON.stringify(recordset));
                     table = recordset.recordset;
                 }
                 conn.close();
                 resolve(true);
             });
          });
     });
 }
 getCord().then(() => console.log(table));
    
    
 res.render("materials");

    
    // var tbl = "";
    // sql.connect({
    //     server: process.env.SERVER,
    //     database: process.env.DATABASE,
    //     options: {
    //       trustedConnection: true
    //     }}, function (err) {
    //         if (err) {console.log(err);}
    //         var request = new sql.Request();
    //         request.query('select * from Materials1', function(err, recordset){
    //             if (err) {console.log(err);}

    //             res.send(recordset.recordset);
    //             tbl = recordset.recordset;
    //             console.log(tbl);
    //         });
            
                    
    //     });

});

app.listen(3000, function(){
    console.log("Server has successfully started");
});