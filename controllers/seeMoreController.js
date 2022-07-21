const express = require('express');
const router = express.Router();
// the collection name is actually seemoredestinations, 
// just named it vacationDestinationsCollections for readability
const seeMoreDestinationCollection = require("../models/seeMoreDestination");

router.get("/seeMore", async (req, res) => {
    const destination = await seeMoreDestinationCollection.find({});
    res.render("seeMore.ejs", {document: destination})
})

router.put("/seeMore", async (req, res) => {
    const createDestination = await seeMoreDestinationCollection.findByIdAndUpdate(
        req.body.id,
        { $set: req.body },
        // POST to the db if the object with that id doesn't already exist
        { upsert: true }
         
    );
    res.status(201).json({status: 201, document: createDestination});
})

module.exports = router

