
const express = require("express");

const Client = require("mongodb").MongoClient;

const ConnectionString = "mongodb://127.0.0.1:27017";

const client = new Client(ConnectionString);

const app = express();

app.use(express.json());

client
  .connect()
  .then((res) => {
    console.log("SUCCESSFULLY CONNECTED TO DATABASE");
  })
  .catch((err) => {
    console.log("AN ERROR OCCURED WHILE CONNECTING TO db" + err);
  });

const db = "nodeDB";
const collection = "Students";

app.get("/get", async (req, res) => {
  try {
    const DB = client.db(db);
    const table = DB.collection(collection);
    const documents = await table.find({}).toArray();
    res.json(documents);
    console.log(documents);
  } catch (error) {
    console.log("AN ERROR OCCURED WHILE GETTING THE DATA" + error);
  }
});

app.put("/put",async (req,res)=>{
  try{
    const DB=client.db(db);
    const table=DB.collection(collection);
    await table.updateOne({name:req.body.name},{$set:{enrollment:req.body.enrollment}})
    .then(()=>{
      res.json({message:"RECORD UPDATED SUCCESSFULLY"});
    }).catch((error)=>{
      res.json({message:error});
    });
  }
  catch(error){
    res.json({message:"AN ERROR OCCURED WHILE CONNECTING TO DB"});
  }
});

app.post("/post", async (req, res) => {
  try {
    const DB = client.db(db);
    const table = DB.collection(collection);

    await table
      .insertOne(req.body)
      .then(() => {
        res.json({ message: "DATA INSERTED SUCCESSFULLY" });
      })
      .catch((error) => {
        console.log(error);
      });
  } catch (error) {
    res.status(500).json({ message: "DATA insertion failed" });
  }
});

app.delete("/delete", async (req, res) => {
  try {
    const DB = client.db(db);
    const table = DB.collection(collection);
    await table.deleteOne({ name: req.body.name }).then(()=>{
      res.json({ message: "DATA DELETED SUCCESSFULLY" });
    })
    .catch((error)=>{
      res.json(error);
    });  
  } catch (error) {
    res.json({ message: "AN ERROR OCCUREED WHILE DELETION" });
  }
});

app.listen(3000, () => {
  console.log("SERVER IS LIVE AT 3000");
});
