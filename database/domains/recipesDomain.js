/*
 * Author: Samsul Ma'arif <samsulma828@gmail.com>
 * Copyright (c) 2020.
 */

const model = require("../models/recipeModel")

exports.getAll = () => {
    return new Promise((resolve, reject) => {
        model.find({}, (err, data) => {
            if(err) reject(err)
            resolve(data)
        })
    })
}

exports.store = data => {
    return new Promise((resolve, reject) => {
        model.create(data, (err, res) => {
            if(err) reject(err)
            resolve(res)
        })
    })
}

exports.show = id => {
    return new Promise((resolve, reject) => {
        model.findById(id, (err, res) => {
            if(err) reject(err)
            resolve(res)
        })
    })
}

exports.update = (id, data) => {
    return new Promise((resolve, reject) => {
        console.log("data yng dikirm domain : ", data)
        model.findOneAndUpdate({_id: id}, data, {new: true}, (err, res) => {
            if(err){
                console.log("error in domain : ", err)
                reject(err)
            }
            console.log("hasil di domain : ", res)
            resolve(res)
        })
    })
}

exports.delete = id => {
    return new Promise((resolve, reject) => {
        model.findByIdAndDelete(id, (err, data) => {
            if(err) reject(err)
            resolve(data)
        })
    })
}