const express = require("express");
const app = express();
const { Pool } = require('pg');
const cors = require('cors');

app.use(express.json());
app.use(cors({
    origin: '*',
  }));

const pool = new Pool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

pool.on('connect', () => {
    console.log('Connected to the database');
});

app.post('/user', async (req, res) => {
    const { name } = req.body;
    try {
        await pool.query('INSERT INTO users(name) VALUES($1)', [name]);
        res.send('User added');
    } catch (error) {
        console.error('Error inserting user:', error);
        res.status(500).send('Error inserting user');
    }
});
  
app.get('/users', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM users');
        res.json(result.rows);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).send('Error fetching users');
    }
});

app.get("/test", (req, res) => {
    res.send("Server is working correctly")
})

app.listen(8080, () => {
    console.log("Api-service is working")
})