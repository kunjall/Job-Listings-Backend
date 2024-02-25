const mongoose = require('mongoose')


const url = process.env.URL

mongoose.connect(url)
    .then(res => console.log("connected to db"))
    .catch(err => console.log(err));
