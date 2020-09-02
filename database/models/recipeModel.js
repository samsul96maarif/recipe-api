/*
 * Author: Samsul Ma'arif <samsulma828@gmail.com>
 * Copyright (c) 2020.
 */

const mongoose = require('mongoose')

const model = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "can't be blank"]
    },
    description: {
        type: String,
        required: [true, "can't be blank"]
    },
    image: {
        type: String,
        required: [true, "can't be blank"]
    },
}, {
    timestamps: true
})

module.exports = mongoose.model('recipe', model)