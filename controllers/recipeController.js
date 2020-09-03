/*
 * Author: Samsul Ma'arif <samsulma828@gmail.com>
 * Copyright (c) 2020.
 */

const domain = require("../database/domains/recipesDomain")
const responseHelper = require("../helpers/response")
const helper = require("../helpers")

const multer = require("multer")
let path = require("path")
let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/images/recipes')
    },
    filename: function (req, file, cb) {
        let tail = path.extname(file.originalname)
        cb(null, Date.now() + tail)
    }
})
let upload = multer({storage: storage, fileFilter: helper.imageFilter}).single("image")

exports.getAll = async(req, res) => {
    try {
        let data = await domain.getAll()
        return responseHelper.baseResponse(res, 200, "success", data)
    } catch (error) {
        console.log("Error in recipeController@getAll : ", error)
        return responseHelper.baseResponse(res, 400, error.message, "")
    }
}

exports.store = async(req, res) => {
    try {
        let uploadImage = new Promise((resolve, reject) => {
            upload(req, res, err => {
                if(req.fileValidationError){
                    reject(req.fileValidationError)
                }
                if(err) reject(err)
                let data = Object.assign({}, req.body)
                if(res.req.file){
                    let baseUrl = req.protocol + '://' + req.get('host');
                    data.image = baseUrl + (res.req.file.path.replace("public", ""))
                }
                resolve(data)
            })
        })

        resUploadedImage = await uploadImage
        let model = await domain.store(resUploadedImage)
        return responseHelper.baseResponse(res, 201, "success", model)

    } catch (err) {
        console.log("Error in recipeController@store : ", err)
        return responseHelper.baseResponse(res, 400, err.message, "")
    }
}

exports.update = async(req, res) => {
    try {

        let uploadImage = new Promise((resolve, reject) => {
            upload(req, res, err => {
                let data = Object.assign({}, req.body)
                if(req.fileExistedValidation){
                    delete data.image
                    resolve(data)
                }
                if(err) reject(err)
                if(res.req.file){
                    let baseUrl = req.protocol + '://' + req.get('host');
                    data.image = baseUrl + (res.req.file.path.replace("public", ""))
                } else {
                    delete data.image
                }
                resolve(data)
            })
        })

        resUploadedImage = await uploadImage
        let model = await domain.update(req.params.id, resUploadedImage)
        return responseHelper.baseResponse(res, 200, "success", model)
    } catch (error) {
        console.log("Error in recipeController@update : ", error)
        return responseHelper.baseResponse(res, 400, error.message, "")
    }
}

exports.show = async(req, res) => {
    try{
        let data = await domain.show(req.params.id)
        return responseHelper.baseResponse(res, 200, "success", data)
    } catch (err){
        console.log("Error in recipeController@show : ", err)
        return responseHelper.baseResponse(res, 400, err.message, "")
    }
}

exports.delete = async(req, res) => {
    try {
        let data = await domain.delete(req.params.id)
        return responseHelper.baseResponse(res, 201, "success", data)
    } catch (err) {
        console.log("Error in recipeController@delete : ", err)
        return responseHelper.baseResponse(res, 400, err.message, "")
    }
}