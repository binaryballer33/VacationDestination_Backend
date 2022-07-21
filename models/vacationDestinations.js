// pass along the connection 
const mongoose = require('../db/connection');

// creates the schema for the collections(aka table being created) 
const vacationDestinationsSchema = new mongoose.Schema({
    destinationName: {type: String, required: true},
    destinationLocation: {type: String, required: true},
    imageUrl: {type: String, required: true}
})

// creates that model (aka collections "vacationdestinations") in mongo db
// makes the name of the model all lowercase and adds a 's' at the end of the name
// if it doesn't already have one
module.exports = mongoose.model('vacationDestinations', vacationDestinationsSchema)