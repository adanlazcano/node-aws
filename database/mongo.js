const { MongoClient } = require('mongodb');


const uri=process.env.URLDB;
const dbName=process.env.DBNAME;


module.exports = async ()=> {
  const client = new MongoClient(uri, 
    { 
      useNewUrlParser: true, 
      useUnifiedTopology: true 
    }
    );


    await client.connect(err => {
      // const collection = client.db("test").collection("devices");

    });  
    try {
      return client.db();
    } catch (error) {
      console.log(`> error ${error}`)
    }

}


