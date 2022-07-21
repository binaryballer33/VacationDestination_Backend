const express = require('express');
const router = express.Router();
// the collection name is actually vacationdestinations, 
// just named it vacationDestinationsCollections for readability
const vacationDestinationsCollections = require("../models/vacationDestinations");

// HTTP READ
router.get("/", async (req, res) => {
    setTimeout(async () => {
        const destinations = await vacationDestinationsCollections.find({});
        res.render("index.ejs", {destinations: destinations}) 
    }, 50)   
})

// HTTP CREATE
router.post("/", async (req, res) => {
    const createDestination = await vacationDestinationsCollections.create(req.body);
    res.status(200).json({status: 201, response: createDestination});
})

// HTTP UPDATE
router.put("/", async (req, res) => {
    const updateDestination = await vacationDestinationsCollections.findByIdAndUpdate(req.body.id, req.body, {
        new: true
    })
    res.status(200).json({status: 200, response: updateDestination})
})

// HTTP DELETE
router.delete("/", async (req, res) => {
    const deleteDestination =  await vacationDestinationsCollections.findByIdAndDelete(req.body.id);
    res.status(204).json({status: 204, response: deleteDestination});
})

module.exports = router

