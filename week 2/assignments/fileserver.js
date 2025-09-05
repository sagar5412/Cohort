const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

const fileDir=path.join(__dirname,'files');

app.get('/file',(req,res)=>{
    fs.readdir(fileDir,(err,files)=>{
        if(err){
            return res.status(500).send('Error reading files');
        }
        res.json(files);
    });
});

app.get('/file/:fileName',(req,res)=>{

    const filepath=path.join(fileDir,req.params.fileName);
    fs.readFile(filepath,'utf8',(err,data)=>{
        res.send(data);
    })
    // res.json({});
})


app.listen(3000);

// module.exports = app;