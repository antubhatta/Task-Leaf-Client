const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 5000;

require('dotenv').config()
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const jwt = require('jsonwebtoken');
// middleware


app.use(cors());
app.use(express.json());


// ::::::::: mongo start :::::::

const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.imav3gf.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();



    const reviewscollection = client.db('TaskLeaf').collection('reviews');
    const contactinfocollection = client.db('TaskLeaf').collection('contactinfo');
    // user infocollections
    const usercollection = client.db('TaskLeaf').collection('users');
    const taskcollection = client.db('TaskLeaf').collection('tasklist');



    // :::JWT :::::

    app.post('/jwt', async (req, res) => {
      const user = req.body;
      const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });
      console.log('Generated Token:', token);
      res.send({ token });
    })



    // middlewares 
    const verifyToken = (req, res, next) => {
      console.log('inside verify token', req.headers.authorization);
      if (!req.headers.authorization) {
        return res.status(401).send({ message: 'unauthorized access' });
      }
      const token = req.headers.authorization.split(' ')[1];
      jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) {
          return res.status(401).send({ message: 'unauthorized access' })
        }
        req.decoded = decoded;
        next();
      })
    }




    // :::JWT :::::


    // dashboard ::: admin   ::::
    // user related api 



    // add users
    app.post('/users', async (req, res) => {
      const user = req.body;

      // check email uniuqe

      const query = { email: user.email }
      const existingUser = await usercollection.findOne(query);
      if (existingUser) {
        return res.send({ message: 'alredy exist', insertedId: null })
      }


      const result = await usercollection.insertOne(user);
      res.send(result);
    })

    // get user
    app.get('/users', verifyToken, async (req, res) => {
      console.log(req.headers);

      const result = await usercollection.find().toArray();
      res.send(result);
    })








    //delete users by id
    app.delete('/users/:id', verifyToken, async (req, res) => {

      const id = req.params.id;
      const query = { _id: new ObjectId(id) }
      const result = await usercollection.deleteOne(query)
      res.send(result)

    })


    // patch
    app.patch('/users/admin/:id', verifyToken, async (req, res) => {

      const id = req.params.id;
      const filter = { _id: new ObjectId(id) }

      const updatedDoc = {
        $set: {
          role: 'hr'

        }
      }
      const result = await usercollection.updateOne(filter, updatedDoc)
      res.send(result)

    })







    //get all reviws

    app.get('/reviews', async (req, res) => {
      const result = await reviewscollection.find().toArray();
      res.send(result);
    })

    // post contact info
    app.post('/contact-us', async (req, res) => {

      const contactinfo = req.body;
      console.log(contactinfo);
      const result = await contactinfocollection.insertOne(contactinfo);
      res.send(result);

    })


    // :::user Dashboard::::


    // task adding




    app.post('/tasklist', async (req, res) => {

      const taskinfo = req.body;
      console.log(taskinfo);
      const result = await taskcollection.insertOne(taskinfo);
      res.send(result);

    })


    // Get specific booking data by email


    app.get('/tasklist', async (req, res) => {
      console.log(req.query.email);


      let query = {};

      if (req.query?.email) {
        query = { email: req.query.email };
      }

      // Query the database with the specified query
      const result = await taskcollection.find(query).toArray();
      res.send(result);
    });

    //get all tasklist

    app.get('/tasklist', async (req, res) => {

      const result = await taskcollection.find().toArray();
      res.send(result);
    })


    app.get('/tasklist/:id', async (req, res) => {

      const id=req.params.id;
      const query = { _id: new ObjectId(id) }
      const result = await taskcollection.findOne(query);
      res.send(result);
    })


   //delete task by id
   app.delete('/tasklist/:id',  async (req, res) => {

    const id = req.params.id;
    console.log(id);
    const query = { _id: new ObjectId(id) }
    const result = await taskcollection.deleteOne(query)
    res.send(result)

  })


   // patch
   app.patch('/tasklist/:id',  async (req, res) => {

    const id = req.params.id;
    const filter = { _id: new ObjectId(id) }

    const options = {upsert:true};
    
    const updatedDoc= req.body;
    console.log(updatedDoc);

    const task = {
      $set: {
       title:updatedDoc.title

      }
    }
    const result = await taskcollection.updateOne(filter, task,options)
    res.send(result)

  })



    // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });
    // console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

//:::::::::: mongo end   ::::::::
app.get('/', (req, res) => {
  res.send('TaskLeaf server running ')
})

app.listen(port, () => {
  console.log(`running on port ${port}`);
})