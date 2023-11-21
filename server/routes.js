exports.routes = function (app, db) {
    app.post("/login", async (request, response) => {
        const { email, latitude, longitude, } = request.body
        if (typeof email != "string" || email.length == 0 || typeof latitude != "number" || latitude < 1 || typeof longitude != "number" || longitude < 1) {
            response.statusCode = 400
            response.send("bad data")
            return
        }
        const dbPath = `/${email}`
        try {
            const lastLocation = await db.getData(dbPath)
            response.send(lastLocation)
        } catch (error) {
            try {
                const res = await fetch(`https://api.openweathermap.org/data/2.5/weather/?lat=${latitude}&lon=${longitude}&units=metric&APPID=${process.env.WEATHER_API_KEY}`)
                const data = await res.json()
                if (data.cod === 200) {
                    db.push(dbPath, data)
                    response.send(data)
                    return
                }
                response.statusCode = 500
                response.send("something went wrong")
            } catch (error) {
                console.log('error: ', error)
                response.statusCode = 500
                response.send("something went wrong")
            }
        }
    })
    app.get("/cords", async (request, response) => {
        console.log(request.query)
        const { email, latitude, longitude, } = request.query
        const isUser = typeof email != "string" || email.length == 0
        if (typeof latitude != "string" || latitude.length == 0 || typeof longitude != "string" || longitude.length == 0) {
            response.statusCode = 400
            response.send("bad data")
            return
        }
        try {
            const res = await fetch(`https://api.openweathermap.org/data/2.5/weather/?lat=${latitude}&lon=${longitude}&units=metric&APPID=${process.env.WEATHER_API_KEY}`)
            const data = await res.json()
            if (data.cod === 200) {
                if (isUser) {
                    db.push(`/${email}`, data)
                }
                response.send(data)
                return
            }
            response.statusCode = 500
            response.send("something went wrong")
        } catch (error) {
            response.statusCode = 500
            response.send("something went wrong")
        }
    })
    app.post("/prev", async (request, response) => {
        const { email } = request.body
        if (typeof email != "string" || email.length == 0) {
            response.statusCode = 400
            response.send("bad data")
            return
        }
        try {
            const lastLocation = await db.getData(`/${email}`)
            response.send(lastLocation)
        } catch (error) {
            response.statusCode = 500
            response.send("something went wrong")
        }
    })
}