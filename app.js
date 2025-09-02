const express = require('express');
const path = require('path');

const app = express();
const port = 3333;

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`)
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
})

app.use('/styles', express.static(path.join(__dirname, 'src/partials/components/styles')));
app.use('/script', express.static(path.join(__dirname)));
app.use('/img', express.static(path.join(__dirname, 'src/img')));