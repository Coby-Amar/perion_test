require('dotenv').config()
const bodyParser = require("body-parser")
var cors = require('cors');
const app = require("express")()
const { JsonDB, Config } = require('node-json-db')

const { routes } = require("./routes")

const db = new JsonDB(new Config("weather_DB", true, false, '/'));

const port = 8000

app.use(cors({ allowedHeaders: 'Content-Type' }));
app.options('*', cors());  // enable pre-flight
app.use(bodyParser.json())

routes(app, db)

app.listen(port, () => {
    console.log(`Listening on localhost:${port}`)
})
