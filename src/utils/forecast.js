const request = require('postman-request')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/2b686b856043277bf45c9970b1090722/' + encodeURIComponent(latitude) + ',' + encodeURIComponent(longitude) + ''

    request({ url, json: true }, (error, { body } = {}) => {
        if (error) {
            callback('unable to connect to weather services!', undefined)
        } else if (body.error) {
            callback('Unnable to find location. Try another search', undefined)
        } else {

            callback(undefined, body.daily.data[0].summary + ' It is currently ' + Math.round(body.currently.temperature - 32 * 9 / 5) + ' degress out. There is a ' + body.currently.precipProbability + '% chance of rain.')
        }
    })
}

module.exports = forecast