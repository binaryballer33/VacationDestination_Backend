const express = require("express");
const app = express();
const vacationDestinationsController = require("./controllers/destinationController");
const cors = require("cors");
const ejs = require("ejs");

app.set('view engine', 'ejs');
app.use(express.static('public'))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    credentials: true
}));
app.use("/destinations", vacationDestinationsController);


app.listen(process.env.PORT || 3000, () => {
    console.log(`Server Up!!!`)
})



