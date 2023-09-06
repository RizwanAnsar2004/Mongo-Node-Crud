// IMPORTING THE MONGO CLIENT
const {MongoClient} = require("mongodb");

// SAVING CONNECTION STRING OF DATABASE
const ConnectionString = "mongodb://127.0.0.1:27017";

// PASSING THE CONNECTION STRING TO MONGOCLIENT
const Client = new MongoClient(ConnectionString);

// const http = require('http');

// --------------------------------------------------------------------------------------------

// FUNCTION TO GET ALL DOCUMENTS IN THE COLLECTION OF DATABASE
const get=async function() {
  try {
    // PROMISE TO CONNECT THE DATABASE
    await Client.connect();
    console.log("Successfully formed connection with database");

    // GETTING COLLECTION IN VARAIABLE
    const DB = Client.db("nodeDB");

    // ALSO GETTING THE COLLECTION OF DATABASE
    var collection = DB.collection("Students");

    // FUNCTION TO GET ALL RECORDS
    const documents = await collection.find({}).toArray();

    // PRINTING ALL DOCUMENTS IN THE COLLECTION
    console.log(documents);
    } catch (error) {
        console.log("An Error occured while Connection with DB");
    }
}
// ---------------------------------------------------------------------------
    // ___________
    // ___________      ||======          ||         ||       || =  =
    // ||               ||       =        ||         ||       ||       =
    // ||               ||        =       ||         ||       ||         =
    // ||               ||       =        ||         ||       ||          =
    // ||               || =  =  =        ||         ||       ||         =
    // ||               ||\\              ||         ||       ||        =
    // -----------      ||  \\            ||         ||       ||     =
    // -----------      ||   \\             ==========        ||  =
// ---------------------------------------------------------------------------

const insert=async function(){
    try{
        await Client.connect();

        console.log("CONNECTION ESTABLISHED SUCCESSFULLY");

        const DB=Client.db("nodeDB");

        const collection=DB.collection("Students");

        const documents=await collection.insertOne({stId:1,name:"rizwan",class:"BSE-2b",enrollment:18});

        console.log("RECORD INSERTED SUCCESSFULLY");
    }
    catch(error){
        console.log("An error occured while connecting "+error);
    }
}

async function update(){
    try{
        await Client.connect();

        console.log("CONNECTION ESTABLISHED SUCCESSFULLY");

        const DB=Client.db("nodeDB");

        const collection=DB.collection("Students");

        const documents=await collection.updateOne({stId:1},{$set:{enrollment:21}});

        console.log("RECORD UPDATED SUCCESSFULLY");

    }
    catch(error){
        console.log("An Error occured while connecting "+error);
    }
}

async function deleteRecord(){
    try{

        await Client.connect();

        console.log("Connection established Successfully");

        const DB=Client.db("nodeDB");

        const collection=DB.collection("Students");

        const documents=await collection.deleteOne({stId:1});

        console.log("RECORD DELETE SUCCESSFULLY");

    }
    catch(error){
        console.log("An Error occured while connecting "+error);
    }
}

get();

