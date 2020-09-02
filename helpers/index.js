/*
 * Author: Samsul Ma'arif <samsulma828@gmail.com>
 * Copyright (c) 2020.
 */
const fs = require('fs')
const path = './file.txt'

exports.imageFilter = (req, file, cb) => {
    // Accept images only
    if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
        req.fileValidationError = 'Only image files are allowed!';
        return cb(new Error('Only image files are allowed!'), false);
    }
    let baseStorage = "../public/images/recipes/"
    let data = baseStorage + file.originalname
    console.log("data : ",data)
    console.log("hasil : ", fs.existsSync(data))
    if(fs.existsSync(data)){
        console.log("masuk")
        req.fileExistedValidation = 'File Exist';
        return cb(new Error('File exist'), false);
    }
    cb(null, true);
};