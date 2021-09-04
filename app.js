const express = require('express')
const https = require('https')
const bodyParser = require('body-parser')

const app = express()

const port = 80

app.use(express.urlencoded({
    extended: true
}))

app.get('/', (req, res) => {

    res.sendFile(__dirname + '/index.html')
})

app.post('/', (req, res) => {
    
const query = req.body.cityInput
const apiKey = 'fbd7a54bb67a3ecd7f57d7913fedbd8a'
const unit = 'metric'
const url = `https://api.openweathermap.org/data/2.5/weather?q=${query}&units=${unit}&appid=${apiKey}`
https.get(url, (response) => {
    response.on('data', (data) => {
        const weatherData = JSON.parse(data)
        const temp = weatherData.main.temp
        const description = weatherData.weather[0].description
        const icon = weatherData.weather[0].icon
        const location = `${weatherData.name}, ${weatherData.sys.country}`
        res.write(`<img src='http://openweathermap.org/img/wn/${icon}@2x.png' style='background-color: black;'>`)
        res.write(`<h2>The weather is currently ${description} in ${location}</h2>`)
        res.write(`<h3>And it's ${temp} Degrees Celcius</h3>`)
        res.send()
    })
})

})



// const query = "Christchurch"
// const apiKey = 'fbd7a54bb67a3ecd7f57d7913fedbd8a'
// const unit = 'metric'
// const url = `https://api.openweathermap.org/data/2.5/weather?q=${query}&units=${unit}&appid=${apiKey}`
// https.get(url, (response) => {
//     response.on('data', (data) => {
//         const weatherData = JSON.parse(data)
//         const temp = weatherData.main.temp
//         const description = weatherData.weather[0].description
//         const icon = weatherData.weather[0].icon
//         const location = `${weatherData.name}, ${weatherData.sys.country}`
//         res.write(`<img src='http://openweathermap.org/img/wn/${icon}@2x.png' style='background-color: black;'>`)
//         res.write(`<h2>The weather is currently ${description} in ${location}</h2>`)
//         res.write(`<h3>And it's ${temp} Degrees Celcius</h3>`)
//         res.send()
//     })
// })



app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
})

