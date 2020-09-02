/*
 * Author: Samsul Ma'arif <samsulma828@gmail.com>
 * Copyright (c) 2020.
 */

const express = require('express')
const cors = require('cors')
const app = express()
const mongoose = require('mongoose')

const routes = require('./routes')
const PORT = 3001

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static('public'))

const mongoOptions = {
    useNewUrlParser: true,
}

function myFunc() {
    mongoose.connect("mongodb://127.0.0.1:27017/db_recipes", mongoOptions)
    console.log('try to connect database');
}

setTimeout(myFunc, 9000);

mongoose.connection.on('error', function(err) {
    console.log("error on connect database : ", err)
    myFunc()
    console.log('try to reconnect database');
});

mongoose.connection.on('connected', function () {
    console.log('succeed to connect database');
});


app.listen(PORT, () => {
    app.get('/', function (req, res) {
        console.log(req.files)
        let host = req.headers.host
        var fullUrl = req.protocol + '://' + req.get('host');
        res.json({ message: 'Welcome to sam tech :)'+host+fullUrl })
    })

    routes(app)

    console.log(`EXPRESS API-SERVER started on: ${PORT}`)
})