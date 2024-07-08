const mongoose = require('mongoose');

//Database Connection
//mongodb://localhost:27017/EASYHR
const connectDatabase = () => {
    mongoose.connect("mongodb+srv://screeningUser:zEH8TQpXB72AtQ1L@samunnati-screening-clu.lsyxsc2.mongodb.net/", {

        //For avoid Warnings
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    }).then(con => {
        console.log(`MongoDb Database connect with HOST : ${con.connection.host}`)
    })
}

module.exports = connectDatabase
