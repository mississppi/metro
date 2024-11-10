// src/index.js
const express = require('express');
const cors = require('cors');
const { db, init } = require('./db'); // initメソッドをインポート

const app = express();
const PORT = 3000;

// データベースの初期化を呼び出し
init();

// ミドルウェアの設定
app.use(cors());
app.use(express.json());

// シンプルなエンドポイント例
app.get('/hello', (req, res) => {
    res.send('Hello, World!');
});

app.post('/newpost', (req, res) => {
    console.log('call from service!');

    const { title, content } = req.body;

    if (!title || !content) {
        return res.status(400).send({ message: 'Title and content are required' });
    }

    const query = `INSERT INTO posts (title, content) VALUES (?, ?)`;

    db.run(query, [title, content], function(err) {
        if (err) {
            console.error("Error creating post:", err.message);
            return res.status(500).send({ message: 'Failed to create post' });
        }
        console.log('Post created with ID:', this.lastID);
        res.status(201).send({ message: 'Post created!', postId: this.lastID });
    });
})

// サーバー起動
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});