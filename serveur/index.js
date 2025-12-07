const express = require('express');
const mysql = require('mysql2');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app = express();
//app.use(cors()); // Permet au frontend d'appeler l'API depuis un autre port
app.use(express.json());

const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true, 
    connectionLimit: 10,
    queueLimit: 0
}).promise();


app.get('/api/tasks', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM tasks');
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: 'Erreur lors de la récupération des tâches' }); // on fais .json() car on veut renvoyer un JSON au client
    }
});


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`serveur écoute sur le port ${PORT}`));