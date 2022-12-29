const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
require("dotenv").config();
const port = process.env.PORT || 5000;
const app = express();
app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.9t60goe.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
async function run(){
    try{
        const usersCollection = client.db('users').collection("usersAccount");
        const storiesCollection = client.db('users').collection("stories");
        const postCollection = client.db('users').collection("posts");
        
        // get
        app.get("/users", async(req, res) => {
            const query = {};
            const option = await usersCollection.find(query).toArray();
            res.send(option);
        });
        app.get("/stories", async(req, res) => {
            const query = {};
            const option = await storiesCollection.find(query).toArray();
            res.send(option);
        });
        app.get("/posts", async(req, res) => {
            const query = {};
            const option = await postCollection.find(query).toArray();
            res.send(option);
        });

        // post
        app.post("/user", async(req, res) => {
            const data = req.body;
            const option = await usersCollection.insertOne(data);
            res.send(option);
        });
        app.post("/story", async(req, res) => {
            const data = req.body;
            const option = await storiesCollection.insertOne(data);
            res.send(option);
        });
        app.post("/post", async(req, res) => {
            const data = req.body;
            const option = await postCollection.insertOne(data);
            res.send(option);
        });
    }
    finally{

    }
}

run().catch(error => console.error(err));

app.get("/", async(req, res) => {
    res.send("Facebook server is running");
});

app.listen(port, async() => {
    console.log(`Server is running on ${port}`);
})