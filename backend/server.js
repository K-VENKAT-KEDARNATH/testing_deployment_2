const express=require('express')
const path=require('path')
const app=express();
var cors=require('cors')
app.use(cors())
app.use(express.json())
const PORT=process.env.PORT || 3000;
const buildPath = path.join(__dirname, '..', 'build');
app.use(express.static(buildPath));
const routerURL=require('./route');
app.use('/v1',routerURL)

app.listen(PORT,()=>{
    console.log("listening at "+PORT);
})