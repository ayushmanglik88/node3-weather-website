const request = require('request')

const forecast=(latitude,longitude,callback)=>{
    const url = 'http://api.weatherstack.com/current?access_key=0b466e37cb29a8f61167199066002e8d&query=' + latitude +','+ longitude +'&units=s' 

    request({url,json:true},(error,{body})=>{
        if (error){
            callback('unable to connect to weather services',undefined)
        }else if(body.error){ 
            callback('unable to find location',undefined)
        }else {
            callback(undefined,body.current.weather_descriptions + ' it is currently '+ body.current.temperature+' degrees out.It feels like '+body.current.feelslike+' degrees out'+'the humidity in  weather is'+body.current.humidity+'the cloud covers the sky'+body.current.cloudcover)
        }
    })
}
module.exports=forecast