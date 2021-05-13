const express = require('express')
const fileUpload = require('express-fileupload')
//const model = require('model.js')

const app = express()
app.use(express.urlencoded({
    extended: false
}))

app.use(fileUpload())
app.use(express.static("."))

app.get('/', (req,res)=> {
    res.sendFile("./index.html")
})

app.post("/detect", (req,res)=>{
    if (req.files) {
        var csvNoError = req.files.csv1
        var csvError = req.files.csv2

        var result = model.find(csvNoError.data.toString(), csvError.data.toString())
        app.sendFile(result)
        //view.showJSON(result)
    }
})


app.listen(8080)