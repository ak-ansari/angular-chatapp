const express= require('express');
const app= express();
const path = require('path');
const port= process.env.PORT || 5000

app.use(express.static(__dirname+'/dist/prectice'));

app.get('/*',(req,res)=>{
    res.sendFile(__dirname+'/dist/prectice/index.html')
})



app.listen(port, ()=>console.log(`listening on ${port}`));