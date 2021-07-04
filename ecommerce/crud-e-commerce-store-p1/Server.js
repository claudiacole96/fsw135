const express = require("express")
const app = express()
const morgan = require("morgan")
const mongoose = require("mongoose")
const data = require("./models/inventory")

app.use(express.json())
app.use(morgan("dev"))

mongoose.connect("mongodb://localhost:27017/moviedb",
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
    },
    () => console.log("Connected to the DB")
)

app.get("/data", (req, res) => {
    data.find((err, items) => {
        if (err) {
            res.status(500);
            return next (err);
        } else {
            return res.status(200).send(items);
        }
    })
})

app.listen(3000, () => {
    console.log("The app is listening on port 3000")
})