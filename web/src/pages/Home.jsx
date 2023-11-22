import { Button, Card, Paper, Typography } from '@mui/material';
import { useCallback, useContext, useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';
import { GlobalState } from '..';
import { GoogleAutocomplete } from '../components/Autocomplete';
import { getSharableApiLink, latestWeatherApi, weatherApi } from '../services/api';

export function Home() {
    const navigate = useNavigate();
    const { email, weatherData } = useContext(GlobalState)
    const [currentWeatherData, setCurrentWeatherData] = useState(weatherData)
    const { lat = 0, lon = 0 } = currentWeatherData?.coord ?? {}
    const shareableLink = getSharableApiLink(lat, lon)
    useEffect(() => {
        if (email == null || email.length < 1) {
            navigate("/")
        } else if (weatherData == null) {
            latestWeatherApi(email).then((data) => {
                setCurrentWeatherData(data)
            })
        }
    }, [])
    const onPlaceSelected = useCallback(async (cords) => {
        const data = await weatherApi(cords, email)
        console.log(data)
        setCurrentWeatherData(data)
    }, [email])
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
                {currentWeatherData && <Card style={{ padding: 20 }}>
                    <Typography variant='h3'> Name: {currentWeatherData.name}</Typography>
                    <p>Temprature: {currentWeatherData.main.temp} &deg;C</p>
                    <p>Sunrise: {new Date(currentWeatherData.sys.sunrise * 1000).toLocaleTimeString('en-IN')}</p>
                    <p>Sunset: {new Date(currentWeatherData.sys.sunset * 1000).toLocaleTimeString('en-IN')}</p>
                    <p>Description: {currentWeatherData.weather[0].main}</p>
                    <p>Humidity: {currentWeatherData.main.humidity} %</p>
                    <Button variant='contained' href={shareableLink.href} target="_blank">Share</Button>
                </Card>}
            </Paper>
        </Paper>
    );
}