const express = require('express');
const { MongoClient } = require('mongodb');
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
        // Project view get Request 
        app.get('/project', async(req, res) => {
          const result =await collection.find({}).toArray();
          console.log(result)
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
