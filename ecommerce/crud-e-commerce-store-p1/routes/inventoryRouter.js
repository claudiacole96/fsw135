const express = require("express")
const inventoryRouter = express.Router()
const Item = require("../models/inventory.js")

//get request
inventoryRouter.get("/", (req, res, next) => {
    Item.find((err, inventory) => {
        if (err) {
            res.status(500)
            return next(err)
        }
        return res.status(200).send(inventory)
    })
})

//post new item
inventoryRouter.post("/", (req, res, next) => {
    const newItem = new Item(req.body)
    newItem.save((err, savedItem) => {
        if(err) {
            res.status(500)
            return next(err)
        }
        return res.status(200).send(savedItem)
    })
})

//delete item by id
inventoryRouter.delete("/:itemId", (req, res, next) => {
    Item.findOneAndDelete({ _id: req.params.itemId }, (err, deletedItem) => {
        if(err) {
            res.status(500)
            return next(err)
        }
        return res.status(200).send(`Successfully deleted ${deletedItem} from the database`)
    })
})

//update item by id
inventoryRouter.put("/:itemId", (req, res, next) => {
    Item.findOneAndUpdate( 
        { _id: req.params.itemId },
        req.body,
        { new: true },
        (err, updatedItem) => {
            if(err) {
                res.status(500)
                return next(err)
            }
            return res.status(200).send(updatedItem)
        }
    )
})

module.exports = inventoryRouter