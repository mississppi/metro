// src/index.js
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3000;

// ミドルウェアの設定
app.use(cors());
app.use(express.json());

// シンプルなエンドポイント例
app.get('/hello', (req, res) => {
    res.send('Hello, World!');
});

app.post('/newpost', (req, res) => {
    console.log('create!');
    res.status(201).send({message: 'Post crated!'});
})

// サーバー起動
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});