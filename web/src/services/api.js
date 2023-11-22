import { httpClient } from './httpClient'

export function getSharableApiLink(latitude, longitude) {
    return new URL(httpClient.getUri() + 'weather?' + new URLSearchParams({ latitude, longitude }))
}

export async function loginApi(coordinates, email) {
    try {
        const { data } = await httpClient.post("login", {
            ...coordinates,
            email,
        })
        return data
    } catch (error) {
        return null
    }
}

export async function weatherApi(coordinates, email) {
    try {
        const { data } = await httpClient.get("weather", {
            params: {
                ...coordinates,
                email,
            }
        })
        return data
    } catch (error) {
        return null
    }
}

export async function latestWeatherApi(email) {
    try {
        const { data } = await httpClient.post("latest_weather", {
            email
        })
        return data
    } catch (error) {
        return null
    }
}