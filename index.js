const app = require('./app');
const db = require('./configurations/db.js') //mongo imported

const port = 3000;

app.get('/', (req, res) => {
    res.send("Hello USSSSSer")
})

app.listen(port, () => {
    console.log(`Server listening on Port http://localhost:${port}`);
    
})