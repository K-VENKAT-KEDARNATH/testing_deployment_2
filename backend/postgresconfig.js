const { Pool } = require('pg');
const POSTGRES_QUERIES_JSON = require('./postgres-queries.json');
const POOL = new Pool({
    user:process.env.DATABASE_USER,
    host:process.env.DATABASE_HOST,
    database:process.env.DATABASE,
    password:process.env.DATABASE_PASSWORD,
    port:process.env.DATABASE_PORT,
    ssl:{rejectUnauthorized:false}
});
module.exports={
    query: async (query_id,values) => {
       try{
        let query_details = POSTGRES_QUERIES_JSON.find(query=>query.query_id==query_id);
        let value_index=0;
        let newList=[];
        if(values.length>0){
            for await(let value of values){
                if(value==null){
                    query_details.query_value[value_index]='';
                }
                else{
                    newList[value_index]=value;
                }
                
                value_index++;
            }
        }
        // console.log("new list is "+newList);
        query_details.query_value=newList;
        // console.log("values are "+query_details.query_value);
        let client = await POOL.connect();
        let data=await client.query(query_details.query_statement,query_details.query_values);
        client.release();
        return data;
       }catch(err){
           throw new Error("Error executing query: "+err);
       }
    },
    customquery: async (query) => {
        try{
         let client = await POOL.connect();
         let data=await client.query(query);
         client.release();
         return data;
        }catch(err){
            throw new Error("Error executing query: "+err);
        }
     }
}