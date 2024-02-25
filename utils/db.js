const mongoose = require('mongoose')


const url = 'mongodb+srv://kunjallal:uxq6Qmab9BbWC98K@kunjal.yys6gnq.mongodb.net/?retryWrites=true&w=majority&appName=Kunjal'

mongoose.connect(url)
    .then(res => console.log("connected to db"))
    .catch(err => console.log(err));