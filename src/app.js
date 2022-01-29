const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode =require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express() || 3000
const port = process.env.PORT
//define paths for Express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials') 

//Setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath ))

app.get('',(req,res)=>{
    res.render('index',{
        title:'weather ',
        name:'ayush manglik'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'about me',
        name:'ayush manglik'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        helpText :'this is some help text',
        title:'help',
        name:'ayush'
    })
})

app.get('',(req,res)=>{
    res.send('<h1>Hello World</h1>')
})


app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:'please provide location'
        })
    }

    geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
        if(error){
            return res.send({ error })
        }

        forecast(latitude,longitude,(error,forecastData)=>{
            if (error){
                return res.send({ error })
            }
            res.send({
                forecast:forecastData,location,
                address:req.query.address
            })
        })
    })
})
app.get('/products',(req,res)=>{
    if (!req.query.search){
        return res.send({
            error:'you must provide a search term'
        })
    } 
    
    console.log(req.query.search)
    res.send({
        products:[]
    })
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'ayush manglik',
        errorMessage:'help article not found'
    })
})

app.get('*',(req,res) =>{ 
    res.render('404',{
        title:'404',
        name:'ayush manglik',
        errorMessage:'page not found'
    })
})

app.listen(port,()=>{
    console.log('serve is on port 3000')
})