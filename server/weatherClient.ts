import axios from "axios"

const instance = axios.create({
    baseURL: "https://api.openweathermap.org/data/2.5/weather/",
})

export function getWeather(latitude: string | number, longitude: string | number) {
    return instance.get("",{
        params: {
            units: 'metric',
            APPID: process.env.WEATHER_API_KEY,
            lat: latitude,
            lon: longitude
        }
    })
}