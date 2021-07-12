const express=require('express')
const path=require('path')
const app=express();
var cors=require('cors')
app.use(cors())
app.use(express.json())
const PORT=process.env.PORT || 3000;
const buildPath = path.join(__dirname, '..', 'build');
app.use(express.static(buildPath));

var movies=[{"movie_name":"movie 1","suggested_by":"kedar","votes":1,"link":"link","review":"gg"}];
app.get('/v1/movies',(req,res)=>{
    res.send(movies).status(200);
})
app.get('/v1/',(req,res)=>{
    res.send('hi');
})
app.post('/v1/movie',(req,res)=>{
    console.log(req.body.movie);
    movies.push(req.body.movie);
    res.send(movies).status(200);
})

app.listen(PORT,()=>{
    console.log("listening at "+PORT);
})