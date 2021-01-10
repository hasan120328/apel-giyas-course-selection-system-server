const express =require ('express');
var bodyParser = require('body-parser')
var cors = require('cors')
const ObjectId=require('mongodb').ObjectID;

const app=express();


app.get('/', (req, res) => {
    res.send('I  AM sohanur')
  })
  


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors());
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://courseSelection:2W7IFVdyMZ80rk5h@cluster0.dne7s.mongodb.net/apelGiyasName?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true ,useUnifiedTopology: true });

client.connect(err => {
  const totalSubject = client.db("apelGiyasName").collection("apelGiyasCollection");
 
app.post('/addCourse',(req,res)=>{
    const newBooking=req.body;
    totalSubject.insertOne(newBooking)
    .then(result=>{
      //  res.send(result.insertedCount >0)
      res.send('success')
        console.log(result);
    })
})


app.get('/course',(req,res)=>{
    totalSubject.find({})
    .toArray((err,documents)=>{
     res.send(documents);
    
      })
})

});


app.listen(5000,()=>console.log('i am listening'))