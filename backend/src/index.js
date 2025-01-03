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
    const query = `INSERT INTO posts (title, content, post_status, is_locked) VALUES (?, ?, 'active', 0)`;
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
    const query = `SELECT * FROM posts WHERE post_status='active' ORDER BY created_at ASC`;
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

app.delete('/posts/:id', async (req, res) => {
    const postId = req.params.id;
    try {
        const result = await db.run(
            `UPDATE posts SET post_status = 'deleted' WHERE id = ?`,
            [postId]
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
})

app.patch('/posts/:id', async(req, res) => {
    console.log("db")
    const { id } = req.params;
    const updates = req.body;
    console.log(updates);

    if (!updates || Object.keys(updates).length === 0) {
        return res.status(400).json({ message: 'No updates provided' });
    }

    const validFields = ['is_locked'];
    const updateEntries = Object.entries(updates)
        .filter(([key]) => validFields.includes(key));

    if (updateEntries.length === 0) {
        return res.status(400).json({ message: 'Invalid fields provided' });
    }

    const setClause = updateEntries.map(([key]) => `${key} = ?`).join(', ');
    const values = updateEntries.map(([_, value]) => value);

    console.log(setClause);
    try{
        const result = await db.run(
            `UPDATE posts SET ${setClause} WHERE id = ?`,[...values, id]
        );

        if(result.changes === 0) {
            return res.status(404).json({ message: 'Post not found or no changes made' });
        }

        res.json({message: 'Post updated successfully', updates});
    } catch (error) {
        console.error('Error updating post:', error);

    }

});

// サーバー起動
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});