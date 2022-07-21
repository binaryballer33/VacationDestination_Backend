const express = require('express');
const router = express.Router();
const vacationDestinations = require("../models/vacationDestinations");

//TODO: FIX ME!!!!
router.get("/seeMore/", async (req, res) => {
    const document = vacationDestinations.findById()
    res.render("seeMore.ejs", {}) 
})

router.put("/seeMore", async (req, res) => {
    const updateDestination = await vacationDestinations.findByIdAndUpdate(req.body.id, req.body, {
        new: true
    })
    res.status(200).json({status: 200, response: updateDestination})
})

router.delete("/seeMore", async (req, res) => {
    const deleteDestination =  await vacationDestinations.findByIdAndDelete(req.body.id);
    res.status(204).json({status: 204, response: deleteDestination});
})

module.exports = router

