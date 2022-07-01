const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

const app = express();
const port = process.env.PORT || 5000;

//? middle were
app.use(cors());
app.use(express.json());

//? database connection
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@power-hack.wkslpae.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

//? server stablish
const server = async () => {
    try {
        client.connect();
        const database = client.db('power-hack');
        const billCollection = database.collection('bills');

        //? get all bill
        app.get('/billing-list', async (req, res) => {
            const query = {};
            const cursor = billCollection.find(query);
            const result = await cursor.toArray();
            res.send(result);
        })

        //? post a new bill
        app.post('/add-billing', async (req, res) => {
            const data = req.body;
            const result = await billCollection.insertOne(data);
            res.send(result);
        })

        //? delete a bill
        app.delete('/delete-billing/:id', async (req, res) => {
            const id = req.params.id;
            const query = {_id: ObjectId(id)};
            const result = await billCollection.deleteOne(query);
            res.send(result);
        })

        //? update a bill
        app.put('/update-billing/:id', async (req, res) => {
            const id = req.params.id;
            const data = req.body;
            const filter = {_id: ObjectId(id)};
            const option = {upsert: true};
            const updateDoc = {
                $set: {
                    fullName: data.fullName,
                    email: data.email,
                    phone: data.phone,
                    paidAmount: data.paidAmount
                }
            }
            const result = await billCollection.updateOne(filter, updateDoc, option);
            res.send(result)
        })
    }
    
    finally {
        //// client.close()
    }
}

server().catch(console.dir)


//? listen to port
app.get('/', (req, res) => {
    res.send("Server is running");
})

app.listen(port, () => {
    console.log('Listening to port', port);
})