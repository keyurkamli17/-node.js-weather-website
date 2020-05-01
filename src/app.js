const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

const pathDir = path.join(__dirname, '../public')
const Tempath = path.join(__dirname, '../template/views')
const partialpath = path.join(__dirname, '../template/partials')

app.set('view engine', 'hbs')
app.set('views', Tempath)
hbs.registerPartials(partialpath)
app.use(express.static(pathDir))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        temprature: 45,
        name: 'Keyur Kamli',
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        about: "Hi, Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente, quo quia aperiam dolorem eveni Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente, quo quia aperiam dolorem eveni Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente, quo quia aperiam dolorem eveni Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente, quo quia aperiam dolorem eveni Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente, quo quia aperiam dolorem eveni Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente, quo quia aperiam dolorem eveni Lorem ipsum dolor sit amet consectetur adipisicing elit.",
        name: 'Keyur Kamli',
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        help: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente, quo quia aperiam dolorem eveni Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente, quo quia aperiam dolorem eveni Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente, quo quia aperiam dolorem eveni Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente, quo quia aperiam dolorem eveni Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente, quo quia aperiam dolorem eveni Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente, quo quia aperiam dolorem eveni Lorem ipsum dolor sit amet consectetur adipisicing elit.Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente, quo quia aperiam dolorem eveni Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente, quo quia aperiam dolorem eveni Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente, quo quia aperiam dolorem eveni Lorem ipsum dolor sit amet consectetur adipisicing elit.',
        name: 'Keyur Kamli',
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address!'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
})

app.get('/help/*', (req, res) => {
    res.render('4O4', {
        title: '404',
        name: 'Keyur Kamli',
        error: 'Oops! Help artical not found',
    })
})

app.get('*', (req, res) => {
    res.render('4O4', {
        title: '404',
        name: 'Keyur Kamli',
        error: 'Oops! Page Not found',
    })
})

app.listen(port, () => {
    console.log('Server is Running on ' + port);

})