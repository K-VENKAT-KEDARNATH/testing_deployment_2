const express = require('express')
const router = express.Router();

var movies=[{"movie_name":"movie 1","suggested_by":"kedar","votes":1,"link":"link","review":"gg"}];

router.get('/movies',(req,res)=>{
    res.send(movies).status(200);
})
router.get('/',(req,res)=>{
    res.send('hi');
})
router.post('/movie',(req,res)=>{
    console.log(req.body.movie);
    movies.push(req.body.movie);
    res.send(movies).status(200);
})

module.exports=router;
