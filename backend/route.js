const express = require('express')
const router = express.Router();
const { Pool } = require('pg');
// const POSTGRES_QUERIES_JSON = require('./postgres-queries.json');
const POOL = new Pool({
    connectionString: process.env.DATABASE_URL || 'postgresql://postgres:037a33536f396d9666d714f9355ad0d5e799a4d62de75eeee366b80a0fec93fb@localhost:5432/d7a76r87ce9iqr',
    // user: process.env.DATABASE_USER,
    // host: process.env.DATABASE_HOST,
    // database: process.env.DATABASE,
    // password: process.env.DATABASE_PASSWORD,
    // port: process.env.DATABASE_PORT,
    ssl:{
        rejectUnauthorized:false
    }
});

var movies=[{"movie_name":"movie 1","suggested_by":"kedar","votes":1,"link":"link","review":"gg"}];

router.get('/movies',async (req,res)=>{
    try{
        let client = await POOL.connect();
        let data=await client.query('SELECT * FROM MOVIES');
        client.release();
        let movies= data;
        res.send(movies).status(200);
    }
    catch(err){
        res.send("Error :"+err);
    }
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
router.post('/upvote',async (req,res)=>{
    let client = await POOL.connect();
    let votesBack=await client.query('SELECT votes FROM MOVIES WHERE movie_name='+req.body);
    let votes=votesBack.rows["votes"];
    let datatemp=await client.query('UPDATE MOVIES SET votes=',votes+1,' where movie_name='+req.body);
    let data=await client.query('SELECT * FROM MOVIES');
    client.release();
    res.send(data).status(200);
})
router.post('/downvote',async (req,res)=>{
    let client = await POOL.connect();
    let votesBack=await client.query('SELECT votes FROM MOVIES WHERE movie_name='+req.body);
    let votes=votesBack.rows["votes"];
    let datatemp=await client.query('UPDATE MOVIES SET votes=',votes-1,' where movie_name='+req.body);
    let data=await client.query('SELECT * FROM MOVIES');
    client.release();
    res.send(data).status(200);
})

module.exports=router;
