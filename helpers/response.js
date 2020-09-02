/*
 * Author: Samsul Ma'arif <samsulma828@gmail.com>
 * Copyright (c) 2020.
 */

function generate(code, message, data) {
    let result = {
        code: code,
        message: message,
        data: data
    }
    return result
}

exports.success = function (res, code, message, data) {
    let result = generate(code, message, data)
    res.statusMessage = message
    return res.status(200).json(result)
}

exports.errorBadParam = function (res, message) {
    return res.status(400).json({ message: message })
}