const express=require('express')

const app=express();
var cors=require('cors')
app.use(cors())
app.use(express.json())
var movies=[{"movie_name":"movie 1","suggested_by":"kedar","votes":1,"link":"link","review":"gg"}];
app.get('/movies',(req,res)=>{
    res.send(movies).status(200);
})
app.get('/',(req,res)=>{
    res.send('hi');
})
app.post('/movie',(req,res)=>{
    console.log(req.body.movie);
    movies.push(req.body.movie);
    res.send(movies).status(200);
})

app.listen(9000,()=>{
    console.log("listening at 9000");
})