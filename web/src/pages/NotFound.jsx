import { Paper, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function NotFound() {
    const [counter, setCounter] = useState(5)
    const navigate = useNavigate()
    useEffect(() => {
        const intervalId = setInterval(() => {
            setCounter(prev => {
                const newCounter = prev - 1
                if (newCounter <= 0) {
                    setTimeout(() => {
                        navigate("/", { replace: true })
                    })
                }
                return newCounter
            })
        }, 1000)
        return () => {
            clearInterval(intervalId)
        }
    }, [])
    return (
        <Paper style={{
            backgroundColor: "whitesmoke",
            width: "100vw",
            height: "100vh",
            paddingTop: "25vh"
        }}>
            <Typography variant='h2'>Sorry, Dont know how you got hear but there is nothing here. you will be redirected in {counter}</Typography>
        </Paper>
    );
}