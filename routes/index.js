/*
 * Author: Samsul Ma'arif <samsulma828@gmail.com>
 * Copyright (c) 2020.
 */

const recipeRoute = require('./recipeRoute')


module.exports = (app) => {
    app.use('/recipes', recipeRoute)
}