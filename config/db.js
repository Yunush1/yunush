const mongoose = require('mongoose');

const connect = async()=>{
    const conn = await mongoose.connect(process.env.MONGO_URI);

    // we use tilt single cotation cause we provide host variable and there color cyan
    console.log(`MongoDb connected: ${conn.connection.host}`.cyan.bold)
}

// we exports the connect function cause we are using it in the main server
module.exports = connect;