const express = require('express')
const router = express.Router();
const { Pool } = require('pg');
// const POSTGRES_QUERIES_JSON = require('./postgres-queries.json');
const POOL = new Pool({
    user:process.env.DATABASE_USER,
    host:process.env.DATABASE_HOST,
    database:process.env.DATABASE,
    password:process.env.DATABASE_PASSWORD,
    port:process.env.DATABASE_PORT,
    ssl:{rejectUnauthorized:false}
});

var movies=[{"movie_name":"movie 1","suggested_by":"kedar","votes":1,"link":"link","review":"gg"}];

router.get('/movies',async (req,res)=>{
    let client = await POOL.connect();
    let data=await client.query('SELECT * FROM MOVIES',[]);
    client.release();
    let movies= data;
    res.send(movies).status(200);
})
router.get('/',(req,res)=>{
    res.send('hi');
})
router.post('/movie',async (req,res)=>{
    console.log(req.body.movie);
    console.log("movie_name is "+req.body.movie.movie_name);
    // movies.push(req.body.movie);
    let params=[];
    params[0]=req.body.movie.movie_name;
    params[1]=req.body.movie.suggested_by;
    params[2]=req.body.movie.votes;
    params[3]=req.body.movie.link;
    params[4]=req.body.movie.review;
    console.log("params is "+params+" "+typeof(params));
    let client = await POOL.connect();
    let data=await client.query('INSERT INTO movies VALUES($1,$2,$3,$4,$5)',params);
    client.release();
    let movies=data;
    console.log("after inserting"+movies.rows);
    res.send(movies.rows).status(200);
})

module.exports=router;
