import { json } from "body-parser"
import express, {Express} from "express"
import dotenv from 'dotenv'
import cors from "cors"

import routes from "./routes"

const app: Express = express();
const port = process.env.PORT || 8000;

dotenv.config()

app.use(cors({ allowedHeaders: 'Content-Type', origin: ['localhost:3000'] }));
app.options('*', cors());  // enable pre-flight
app.use(json())

app.use("/api", routes)

app.listen(port, () => {
    console.log(`Listening on localhost:${port}`)
})