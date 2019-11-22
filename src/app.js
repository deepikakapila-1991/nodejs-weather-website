const path = require('path')
const mExpress = require('express')
const hbs = require('hbs')

const request = require('request')
const geoCode = require('./utils/geoCode')
const foreCast = require('./utils/forecast')

const mApp = mExpress()
const port = process.env.PORT || 3000

// Define paths for express connfig
const publicDirectory = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialPAth = path.join(__dirname, '../templates/partials')

//setup handlerbars engine and views location
mApp.set('view engine', 'hbs')
mApp.set('views', viewsPath)
hbs.registerPartials(partialPAth)


//Setup static directory to server
mApp.use(mExpress.static(publicDirectory))


mApp.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Deepika Kapila'
    })
})

mApp.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Deepika Kapila'
    })
})

mApp.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        helpTxt: 'This is some helpful text here!',
        name: 'Deepika kapila'
    })
})

mApp.get('/weather',  (req, res) => {

    if(!req.query.address){
        return res.send({
            error: 'You must provide a address.'
        })
    }

    geoCode(req.query.address, (error, {latitude, longitude, placeName} ={}) => {

        if(error){
            return res.send({error})
        }

        foreCast(latitude, longitude, (error, forCastResponse) => {
            if(error){
                return res.send({error})
            }

            res.send({
                forecast: forCastResponse,
                location: placeName,
                address: req.query.address
            })
        })
    })
  
})



mApp.get('/products', (req, res) => {

    if(!req.query.search){
        return  res.send({
            error: 'You must provide a search term'
        })
    }

    console.log(req.query.search)
    res.send({
        productos: []
    })
})

mApp.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Deepika KApila',
        errorMessage: ('Help article not found')
        
    })

})

mApp.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Deepika Kapila',
        errorMessage:  'Page not found'
    })
})


// mApp.listen(3000, () => {
//     console.log('Server is up on port 3000')
// })

mApp.listen(port, () => {
    console.log('Server is up on port' + port)
})

