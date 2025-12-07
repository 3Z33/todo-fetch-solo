const fs = require('fs');
const mysql = require('mysql2');

async function initDB() {
    const connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_user,
        password: process.env.DB_PASSWORD,
        multipleStatements: true
    });

    const sql = fs.readFileSync('./db.sql', 'utf8');

    console.log("Initialisation de la base de données...");
    await connection.query(sql);
    console.log("Base de données initialisée avec succès");
}

initDB().catch(err => console.error(err));