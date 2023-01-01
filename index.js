const express =require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');
const port = process.env.PORT || 5000;


//middle ware
app.use(cors());
app.use(express.json());


// mongoDB uri
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.f6i98.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

//mongoDB connection 
async function run(){
    try{
        const doctorsPortal =client.db('doctorsPortal');
        const appointmentOptions =doctorsPortal.collection('appointmentOptions');

        // get all appointment options
        app.get('/appointmentOptions', async(req, res)=>{
            const query ={};

            const appOptions = await appointmentOptions.find(query).toArray();
            res.send(appOptions)
        })
    }
    finally{

    }

}

run().catch(console.dir)







app.get('/', (req, res)=>{
    res.send('The doctors portal')
})


app.listen(port, ()=>{
    console.log(`the server is running on ${port}`)
})