import { TextField } from '@mui/material';

import { Loader, } from "@googlemaps/js-api-loader"
import { useCallback, useEffect, useRef, useState } from 'react';
const loader = new Loader({
    apiKey: process.env.REACT_APP_GOOGLE_API_KEY,
    version: "weekly",
    libraries: ["places"]
});
async function initPlaces(inputRef, onPlaceSelected) {
    const { Autocomplete } = await loader.importLibrary("places")
    const autocomplete = new Autocomplete(inputRef.current, {
        types: ['(cities)'],
        fields: ["geometry", "name"],
        componentRestrictions: { country: "il" }
    })
    autocomplete.addListener("place_changed", async () => {
        const placeFound = await autocomplete.getPlace()
        const city = placeFound.name
        const location = placeFound.geometry.location
        const latitude = location.lat()
        const longitude = location.lng()
        onPlaceSelected({
            city,
            latitude,
            longitude,
        })
    })
}
export function GoogleAutocomplete({ onPlaceSelected }) {
    const inputRef = useRef(null);
    useEffect(() => {
        if (inputRef != null) {
            initPlaces(inputRef, onPlaceSelected)
        }
    }, [])
    return (
        <TextField
            inputRef={inputRef}
        />
    );
}