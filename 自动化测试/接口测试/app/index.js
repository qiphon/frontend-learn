const express = require("express")

const app = express()

app.get('/',(req,res)=>{
    res.send({
        data: "hello qiphon"
    })
})

app.listen(3000,()=>{
    console.log("server start at port 3000")
})

module.exports = app