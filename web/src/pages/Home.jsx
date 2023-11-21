import { Button, Card, Paper, Typography } from '@mui/material';
import { useCallback, useContext, useEffect, useState } from 'react';

import { httpClient } from '../httpClient';
import { useNavigate } from 'react-router-dom';
import { GlobalState } from '..';
import { GoogleAutocomplete } from '../components/Autocomplete';

export function Home() {
    const navigate = useNavigate();
    const state = useContext(GlobalState)
    const [weatherData, setWeatherData] = useState(state.weatherData)
    const email = state.email
    useEffect(() => {
        if (email == null || email.length < 1) {
            navigate("/")
        } else if (state.weatherData == null) {
            httpClient.post("prev", { email }).then(({ data }) => {
                setWeatherData(data)
            })
        }
    }, [])
    const onPlaceSelected = useCallback(async (cords) => {
        const { data } = await httpClient.get('cords', { params: { ...cords, email } })
        setWeatherData(data)
    }, [])
    const { lat = 0, lon = 0 } = weatherData?.coord ?? {}
    const shareableLink = `${httpClient.getUri()}cords?latitude=${lat}&longitude=${lon}`
    return (
        <Paper style={{
            backgroundColor: "whitesmoke",
            width: "100vw",
            height: "100vh",
            display: "flex",
            flexFlow: 'column',
            paddingTop: 20
        }}>
            <Paper style={{
                margin: "0 25vw",
                padding: 20,
                display: "flex",
                flexDirection: "column",
                rowGap: 20,
                justifyContent: "space-evenly"
            }}>
                <Typography variant='h2' style={{ textAlign: "center" }}>Find the weather...</Typography>
                <GoogleAutocomplete onPlaceSelected={onPlaceSelected} />
                {weatherData && <Card style={{ padding: 20 }}>
                    <Typography variant='h3'> Name: {weatherData.name}</Typography>
                    <p>Temprature: {weatherData.main.temp} &deg;C</p>
                    <p>Sunrise: {new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString('en-IN')}</p>
                    <p>Sunset: {new Date(weatherData.sys.sunset * 1000).toLocaleTimeString('en-IN')}</p>
                    <p>Description: {weatherData.weather[0].main}</p>
                    <p>Humidity: {weatherData.main.humidity} %</p>
                    <Button variant='contained' href={shareableLink} target="_blank">Share</Button>
                </Card>}
            </Paper>
        </Paper>
    );
}