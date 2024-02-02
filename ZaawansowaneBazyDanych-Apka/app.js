const express = require('express');
const { Pool } = require('pg');
const app = express();
const port = 3000;


app.use(express.json());
app.use(express.static('public'));


app.post('/testConnection', async (req, res) => {
    const { dbname, user, password, host, port } = req.body;

    const pool = new Pool({
        user: user,
        host: host,
        database: dbname,
        password: password,
        port: port,
    });

    try {
        await pool.query('SELECT NOW()');
        res.send('Połączono z bazą danych.');
    } catch (error) {
        res.status(500).send(`Błąd ${error.message}`);
    }
});


app.listen(port, () => {
    console.log(`Serwer dostępny na porcie ${port}`);
});
