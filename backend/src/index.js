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

app.post('/posts', (req, res) => {
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
        res.status(201).send({ message: 'Post created!', postId: this.lastID });
    });
})

app.put('/posts/:id', async (req, res) => {
    const { id } = req.params;
    const { title, content } = req.body;
    try {
        const result = await db.run(
            `UPDATE posts SET title = ?, content = ? WHERE id = ?`,
            [title, content, id]
        );
        if(result.changes === 0){
            console.log('No rows updated.');
            return; 
        }
        res.json({ message: 'Post updated successfully' });
    } catch (error) {
        console.error('Error updating post:', error);
        res.status(500).json({ message: 'Failed to update post' });
    }
});

app.get('/posts', (req, res) => {
    const query = `SELECT * FROM posts ORDER BY created_at ASC`;
    db.all(query, (err, rows) => {
        if (err) {
            console.error("Error retrieving posts:", err.message);
            return res.status(500).send({ message: 'Failed to retrieve posts' });
        }
        res.status(200).json(rows);
    });
});

app.get('/posts/:id', (req, res) => {
    const postId = req.params.id;
    const query = `SELECT * FROM posts WHERE id = ?`;
    db.get(query, [postId], (err, row) => {
        if (err) {
            console.error("Error retrieving post:", err.message);
            return res.status(500).send({ message: 'Failed to retrieve post' });
        }
        if (!row) {
            return res.status(404).send({ message: 'Post not found' });
        }
        res.status(200).json(row);
    });
});

app.delete('/posts/:id', (req, res) => {
    const postId = req.params.id;
    const query = `DELETE FROM posts WHERE id = ?`;
    db.run(query, [postId], function (err) {
        if (err) {
            console.error("Error deleting post:", err.message);
            return res.status(500).send({ message: 'Failed to delete post' });
        }

        if (this.changes === 0) {
            return res.status(404).send({ message: 'Post not found' });
        }

        res.status(200).send({ message: 'Post deleted successfully' });
    });
})

// サーバー起動
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});