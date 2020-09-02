/*
 * Author: Samsul Ma'arif <samsulma828@gmail.com>
 * Copyright (c) 2020.
 */

const express = require('express');
const router = express.Router();
const controller = require('../controllers/recipeController')


router.route('/')
    .get(controller.getAll)
    .post(controller.store)

router.route('/:id')
    .get(controller.show)
    .put(controller.update)
    .delete(controller.delete)

module.exports = router