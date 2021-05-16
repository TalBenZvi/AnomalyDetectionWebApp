const express = require('express')
const fileUpload = require('express-fileupload')
const model = require('./model/anomalyDetectionModel')
const path = require('path');

const app = express()
app.use(express.urlencoded({
    extended: false
}))

app.use(fileUpload())
app.use(express.static("."))

app.get('/', (req,res)=> {
    res.sendFile(path.join(__dirname, "./view/index.html"))
})

app.post("/detect", (req,res)=>{
    if (req.files) {
        var csvNoError = req.files.csv1
        var csvError = req.files.csv2

        var result = model.detect(csvNoError.data.toString(), csvError.data.toString(), req.body.algorithm)
        res.write(result)
        //view.showJSON(result)
    }
})


app.listen(8080)