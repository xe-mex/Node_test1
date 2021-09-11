const express = require("express");
const fs = require("fs");

const app = express();
app.use(function(request, response, next){

    let now = new Date();
    let hour = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();
    let data = `${hour}:${minutes}:${seconds} ${request.method} ${request.url} ${request.get("user-agent")}`;
    console.log(data);
    //fs.appendFile("server.log", data + "\n", function(){});
    next();
});

const mysql = require("mysql2");

const connection = mysql.createPool(
    {
        connectionLimit: 5,
        host: 'localhost',
        user: 'root',
        database: 'usersdb',
        password: 'qqqq'
    }
).promise();

// connection.connect(function (err) {
//     if (err){
//         return console.error("Ошибка: " + err.message);
//     }
//     else{
//         console.log("Подключение успешно");
//     }
// })

function callSelect() {
    connection.query("select * from users")
        .then(result =>{
            console.log(result[0]);
        })
        .catch(function (err) {
            console.log(err);
        });
}

function call()
{
    connection.query("select * from users",
        function (err, dataRow, data) {
            if (err) {
                console.error(err);
                //return err;
            }
            else{
                //console.log(data);
                return new Promise(function (resolve, reject){
                        //console.log(dataRow)
                        for (let i=0;i<dataRow.length;i++)
                        {
                            console.log(dataRow[i].firstname, dataRow[i].age);
                        }
                        resolve();

                    }
                );
            }
        });

}

// let promise = new Promise((resolve, reject) => {
//     connection.query("select * from users", function (err, row) {
//     if (err)
//     {
//         console.log(err);
//     }
//     resolve();
//     return row;
//     });
// });

function processing(dataRow)
{

}

// connection.end(function (err) {
//     if (err){
//         console.error("Ошибка: "+ err.message);
//     }
//     else{
//         console.log("Подключение закрыто");
//     }
// })

app.get("/", function(request, response){

    callSelect();
    // promise.then(row => {
    //     for (let i=0;i<row.length;i++){
    //         console.log(row[i].firstname, row[i].age);
    //     }
    //
    // });
    response.send("Hello");




    // for (let i =0;i<arr.length;i++)
    // {
    //     let rowId = arr[i];
    //     console.log(rowId.id);
    // }
    //response.send();
});
app.listen(3000);
