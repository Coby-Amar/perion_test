import { Button, Paper, TextField, Typography } from '@mui/material';
import { useCallback, useContext, useEffect, useState } from 'react';

import { GlobalState } from '..';
import { useNavigate } from 'react-router-dom';
import { loginApi } from '../services/api';

export function Login() {
    const navigate = useNavigate();
    const [coordinates, setCoordinates] = useState({
        latitude: 0,
        longitude: 0
    })
    const state = useContext(GlobalState)
    useEffect(() => {
        if (typeof state.email == "string" && state.email.length > 0) {
            navigate("/home")
        } else {
            navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude, } }) =>
                setCoordinates({
                    latitude,
                    longitude,
                })
            )
        }
    }, [])
    const onLogin = useCallback(async (event) => {
        event.preventDefault()
        const email = event.target.email.value
        const data = await loginApi(coordinates, email)
        localStorage.setItem("email", email)
        state.email = email
        state.weatherData = data
        navigate("/home")
    }, [coordinates, navigate, state])
    return (
        <Paper style={{
            backgroundColor: "whitesmoke",
            width: "100vw",
            height: "100vh",
            paddingTop: "25vh"
        }}>
            <form onSubmit={onLogin}>
                <Paper style={{
                    margin: "0 25vw",
                    width: "50vw",
                    height: "50vh",
                    padding: 20,
                    display: "flex",
                    flexDirection: "column",
                    rowGap: 20,
                    justifyContent: "space-evenly"
                }}>
                    <Typography variant='h1' style={{ textAlign: "center" }} >Welcome</Typography>
                    <TextField
                        required
                        label="Email"
                        name='email'
                        variant="filled"
                    />
                    <Button type='submit' variant='contained' >Login</Button>
                </Paper>
            </form>
        </Paper>
    );
}