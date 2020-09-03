/*
 * Author: Samsul Ma'arif <samsulma828@gmail.com>
 * Copyright (c) 2020.
 */

exports.baseResponse = (res, code, message, data) => {
    res.statusMessage = message
    return res.status(code).json({
        code: code,
        message: message,
        data: data
    })
}