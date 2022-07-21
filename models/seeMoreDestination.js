// pass along the connection 
const mongoose = require('../db/connection');

// creates the schema for the collections(aka table being created) 
const seeMoreDestinationSchema = new mongoose.Schema({
    destinationName: {type: String, required: true},
    destinationLocation: {type: String, required: true},
    imageUrl: {type: String, required: true}
})

// creates that model (aka collections "seeMoreDestination") in mongo db
// makes the name of the model all lowercase and adds a 's' at the end of the name
module.exports = mongoose.model('seeMoreDestination', seeMoreDestinationSchema)