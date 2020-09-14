const express = require('express')
const indexRoute = require('./routes/index')
const accountRoutes = require('./routes/account')
const bodyParser = require("body-parser");
const port = 4000


const app = express()

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(express.json())
app.use(indexRoute)
app.use(accountRoutes)

app.use(express.static(__dirname + '/public'));

//set up EJS
app.set("view engine", "ejs");


app.listen(port, () => {
    console.log('Server is up on port' + port)
})