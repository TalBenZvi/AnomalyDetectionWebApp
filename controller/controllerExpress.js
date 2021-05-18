const express = require('express')
const fileUpload = require('express-fileupload')
const path = require('path');
const model = require(path.join(__dirname, './model/anomalyDetectionModel'))

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
        var csvNoError = req.files.file_without_anomalies
        var csvError = req.files.file_anomalies

        var result = model.detect(csvNoError.data.toString(), csvError.data.toString(), req.body.algorithm)
        res.write(result)
        //view.showJSON(result)
    }
    res.end()
})


app.listen(9876)