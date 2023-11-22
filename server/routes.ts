import express from 'express'

import { DB } from "./db"
import { HTTP_OK } from './consts'
import { getWeather } from './weatherClient'
import { badRequestResponse, internalServerError } from './errors'
import { isStringAndNotEmpty, isNumberAndNotZero } from './validations'

const router = express.Router();

router.post("/login", async (request, response) => {
    const { email, latitude, longitude, } = request.body
    if (isStringAndNotEmpty(email) || isNumberAndNotZero(latitude, longitude)) {
        badRequestResponse(response)
        return
    }
    const dbPath = `/${email}`
    try {
        const lastLocation = await DB.getData(dbPath)
        response.send(lastLocation)
    } catch (error) {
        try {
            const { data } = await getWeather(latitude, longitude)
            if (data.cod === HTTP_OK) {
                DB.push(dbPath, data)
                response.send(data)
                return
            }
            internalServerError(response)
        } catch (error) {
            internalServerError(response)
        }
    }
})

router.get("/weather", async (request, response) => {
    console.log(request.query)
    const { email, latitude, longitude, } = request.query
    const isUser = isStringAndNotEmpty(email)
    if (isStringAndNotEmpty(latitude, longitude)) {
        badRequestResponse(response)
        return
    }
    try {
        const { data } = await getWeather(latitude as string, longitude as string)
        if (data.cod === HTTP_OK) {
            if (isUser) {
                DB.push(`/${email}`, data)
            }
            response.send(data)
            return
        }
        internalServerError(response)
    } catch (error) {
        internalServerError(response)
    }
})

router.post("/latest_weather", async (request, response) => {
    const { email } = request.body
    if (isStringAndNotEmpty(email)) {
        badRequestResponse(response)
        return
    }
    try {
        const lastLocation = await DB.getData(`/${email}`)
        response.send(lastLocation)
    } catch (error) {
        internalServerError(response)
    }
})

export default router;