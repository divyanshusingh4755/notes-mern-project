const express = require('express')
// Configuring the database
const dbConfig = require('./config/databse.config')
const mongoose = require('mongoose')


mongoose.promise = global.Promise

// Connnecting to the database
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Connection connected to the databse")
}).catch(err => {
    console.log("Could not connect to the database. Exiting now...", err)
    process.exit()
})

// create express app
const app = express()

app.use(express.urlencoded()); //Parse URL-encoded bodies

app.use(express.json()); //Used to parse JSON bodies

// define a simple route
app.get('/', (req, res) => {
    res.json({ "message": "Welcome to node express application" });
});

// Require Notes Routes
require('./app/routes/note.routes')(app)

// listen for requests
app.listen(5000, () => {
    console.log("Server is listening at port 5000")
});