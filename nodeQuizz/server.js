const express = require("express");
var cors = require('cors')
const app = express();

app.use(express.json());
 
app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
 


const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb+srv://EmmaLoisel:toucan@cluster0.y10v2kc.mongodb.net/?retryWrites=true&w=majority';
const dbName = 'quizzApi';
let db
MongoClient.connect(url, function(err, client) {
  console.log("Connected successfully to server");
  db = client.db(dbName);
});

app.get('/quizz', cors(), async (req,res) => {
  try {
      const docs = await db.collection('quizz').find({}).toArray()
      res.status(200).json(docs)
  } catch (err) {
      console.log(err)
      throw err
  }
})

app.get('/quizz/:id', cors(), async (req,res) => {
  const id = parseInt(req.params.id)
  try {
      const docs = await db.collection('quizz').findOne({id})
      res.status(200).json(docs)
  } catch (err) {
      console.log(err)
      throw err
  }
})

app.post('/quizz', cors(), async (req,res) => {
  try {
      const quizzData = req.body
      const quizz = await db.collection('quizz').insertOne(quizzData)
      res.status(200).json(quizz)
  } catch (err) {
      console.log(err)
      throw err
  }
  
})
app.put('/quizz/:id', cors(), async (req,res) => {
  try {
      const id = parseInt(req.params.id)
      const replacementquizz = req.body
      const quizz = await db.collection('quizz').replaceOne({id},replacementquizz)
      res.status(200).json(quizz)
  } catch (err) {
      console.log(err)
      throw err
  }
})

app.patch('/quizz/:id', cors(), async (req,res) => {
  try {
      const id = parseInt(req.params.id)
      const replacementquizz = req.body
      const quizz = await db.collection('quizz').updateOne({id}, {$set: replacementquizz}, {upsert:true})
      res.status(200).json(quizz)
  } catch (err) {
      console.log(err)
      throw err
  } 
})

app.delete('/quizz/:id', cors(), async (req,res) => {
  try {
      const id = parseInt(req.params.id)
      const quizz = await db.collection('quizz').deleteOne({id})
      res.status(200).json(quizz)
  } catch (err) {
      console.log(err)
      throw err
  } 
})