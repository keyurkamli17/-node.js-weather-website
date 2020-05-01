const request = require('postman-request')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/2b686b856043277bf45c9970b1090722/' + encodeURIComponent(latitude) + ',' + encodeURIComponent(longitude) + ''

    request({ url, json: true }, (error, { body } = {}) => {
        if (error) {
            callback('unable to connect to weather services!', undefined)
        } else if (body.error) {
            callback('Unnable to find location. Try another search', undefined)
        } else {

            callback(undefined,
                'Current Temperature is ' + Math.round(body.currently.temperature - 32 * 9 / 5) + ' C degrees. ' +
                'Minimum Temparature is ' + Math.round(body.daily.data[0].temperatureMin - 32 * 9 / 5) + ' C degrees and ' +
                'Maximum Temparature is ' + Math.round(body.daily.data[0].temperatureMax - 32 * 9 / 5) + ' C degrees. ' +
                ' It is ' + body.currently.precipProbability + '% chance of rain. ' +
                body.hourly.summary
            )
        }
    })
}

module.exports = forecast