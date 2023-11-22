import { JsonDB, Config } from "node-json-db"

export const DB = new JsonDB(new Config("weather_DB", true, false, '/'));