const express = require('express');
const { MongoClient } = require('mongodb');
const ObjectId = require('mongodb').ObjectId; 
const cors = require('cors')
require('dotenv').config()
const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors())
// MongoDB Connection 
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.rtuf5.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
async function runDB(){
    try {
        await client.connect();
        console.log('Connected to MongoDB');
        const collection = client.db("personal-portfolio").collection("projects");
        // perform actions on the collection object
        // Project view id get Request 
        app.get('/project/:id', async(req, res) => {
          const id = req.params.id
          const query = {_id:ObjectId(id)}
          const result =await collection.findOne(query);
          res.send(result);
        });
        // Project view get Request 
        app.get('/project', async(req, res) => {
          const result =await collection.find({}).toArray();
          res.send(result);
        });
  
    } finally{
      // client.close();
    }
}
runDB().catch(console.dir);



// Defaults Route
app.get('/', (req, res) => {
  res.send('Hello World!');
});


app.listen(PORT,() =>  console.log('Portolio Server is running on port ' + PORT));
