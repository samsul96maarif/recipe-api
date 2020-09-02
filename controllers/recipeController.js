/*
 * Author: Samsul Ma'arif <samsulma828@gmail.com>
 * Copyright (c) 2020.
 */

const domain = require("../database/domains/recipesDomain")
const baseResponse = require("../helpers/response")
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
        return baseResponse.success(res, 200, "success", data)
    } catch (error) {
        console.log("error ", error)
        return baseResponse.errorBadParam(res, error.message)
        // return res.status(400).json({"error":error})
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
        return res.status(201).json({message: "Succeed", "data": model, code: 201})

    } catch (err) {
        console.log("error in productController@store : ", err)
        return res.status(400).json({"error": err})
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

        return res.status(200).json({message: "Success", "data": model, code: 200})

    } catch (error) {
        console.log("error : ", error)
        return res.status(400).json({error: error})
    }
}

exports.show = async(req, res) => {
    try{
        let data = await domain.show(req.params.id)
        return res.status(201).json({message: "success", "data": data, code: 200})
        // return res.status(200).json({message:"success", data:data})
    } catch (err){
        console.log("error : ", err)
        return res.status(400).json({message:err.message})
    }
}

exports.delete = async(req, res) => {
    try {
        let data = await domain.delete(req.params.id)
        return res.status(201).json({message: "success", "data": data, code: 201})
        // return res.status(201).json({message: "Succeed", data: data})
    } catch (err) {
        return res.status(400).json({error: err})
    }
}