const express = require('express');
const router = express.Router();
const vacationDestinations = require("../models/vacationDestinations");

//TODO: FIX ME!!!!
// when loading the endpoint it calls the main.js script because it is attached
// to the seeMore.ejs file (how do i stop that from happening)
// the way I currently have it setup prevents the weather and other functions
// from executing from within seeMore.ejs

// exact error below:
// ================================================
//  Failed to load module script: Expected a JavaScript module
//  script but the server responded with a MIME type of "".
//  Strict MIME type checking is enforced for module scripts 
//  per HTML spec.
router.get("/seeMore/:id", async (req, res) => {
    const id = await req.params.id;
    console.log(`The id is: ${id}`);
    if(id.split("").length === 24) {
        const document = await vacationDestinations.findById(req.params.id)
        res.render("seeMore.ejs", {document: document}) 
    } else {
        res.end()
    }
})


module.exports = router

