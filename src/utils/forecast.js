const mRequest = require('request')

const forecast = (lat, long, callback) =>{
    const foreCastUrl = 'https://api.darksky.net/forecast/f203bd4844c2737c3f9c15cff95843b0/'+lat+','+long+'?units=si'

    mRequest({url: foreCastUrl, json: true}, (error, {body} ) => {

        if(error){
            callback('unable to connect to weather service!')
        } else if(body.error){
            callback('unable to find location!')
        } else {
            // callback(undefined, {
            //     summary: body.daily.data[0].summary,
            //     temperature: body.currently.temperature,
            //     precipProbability: body.currently.precipProbability
            // })
            callback(undefined, body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degress out. There is a ' + body.currently.precipProbability + '% chance of rain.')

        }
    })
}

module.exports = forecast


// const mURL = 'https://api.darksky.net/forecast/f203bd4844c2737c3f9c15cff95843b0/28.4380642,77.3209443?units=si&lang=es'
// mRequest({ url: mURL, json: true}, (error, response) => {
//     if(error){
//         console.log('unable to connect to weather service!')
//     } else if(response.body.error){
//         console.log('unable to find location!')
//     } else{
//         console.log( response.body.daily.data[0].summary +
//         ' It is currenlty '+ response.body.currently.temperature+
//         ' degrees out. There is '+response.body.currently.precipProbability+
//         '% chance of rain.')
//     }
// }) 