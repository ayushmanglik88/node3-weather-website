const request = require('request')

const geocode = (address,callback) =>{
    const url  = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address)+ '.json?access_token=pk.eyJ1IjoiYXl1c2htYW5nbGlrIiwiYSI6ImNreWZsd2k1bTFrdHoyeG84bjk5ZDB5cTkifQ.-yOjVuxuRWOOS_1Hsu84Rg&limit=1'
    request({url,json:true},(error,{body})=>{
        if (error){
            callback('unable to connect to location service',undefined)
        }else if (body.features.length === 0) {
            callback('unable to find location . try another search',undefined)
        } else {
            callback(undefined,{
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports=geocode