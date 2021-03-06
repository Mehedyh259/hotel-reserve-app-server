const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');


const app = express();
const port = process.env.PORT || 5000;


// middleware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.1pxy4.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


const run = async () => {

    try {
        await client.connect();
        console.log('db connected');
        const bookingCollection = client.db("hotel-reserve").collection("booking");

        app.post('/booking', async (req, res) => {
            const booking = req?.body;
            const result = await bookingCollection.insertOne(booking);
            res.status(201).send(result);
        });

        app.get('/booking', async (req, res) => {
            const bookings = await bookingCollection.find().toArray();
            res.status(200).send(bookings);
        })


    } finally {

    }

}
run().catch(console.dir);

app.get('/', (req, res) => {
    res.send("Hotel Reserve app server");
});

app.listen(port, () => console.log('Server Running port: ', port));

