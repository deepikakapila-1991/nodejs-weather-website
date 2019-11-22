const mRequest = require('request')

const goeCode = (address, callback) => {
    
    const mGeocodeURL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' 
    + address + '.json?access_token=pk.eyJ1IjoiZGVlcGlrYWthcGlsYSIsImEiOiJjazM1czA1eW8xZHJ4M2lxdXRkbHJ1cnVpIn0.vqEBAG2z-q5EneGWky0-uw&limit=1'
    
    mRequest({url: mGeocodeURL, json: true}, (error,  { body } ) => {
        if (error){
            callback('unable to connect to geolocation service!', undefined)
        }else if (body.features.length === 0){
            callback('unable to find the geolocation! Try another search!', undefined)
        }else{
            callback(undefined,{
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                placeName: body.features[0].place_name
            }) 
        }
    })
}

module.exports =  goeCode