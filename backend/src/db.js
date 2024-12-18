// src/db.js
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// データベースファイルのパスを指定
const dbPath = path.resolve(__dirname, '../data/database.sqlite');
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error("Error connecting to the database:", err.message);
    } else {
        console.log("Connected to the SQLite database.");
    }
});

// 初期化メソッド
const init = () => {
    console.log("init");
    db.serialize(() => {
        db.run(`CREATE TABLE IF NOT EXISTS posts (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT,
            content TEXT,
            post_status TEXT CHECK(post_status IN ('active', 'deleted')) DEFAULT 'active',
            is_locked BOOLEAN DEFAULT 0,
            created_at TEXT DEFAULT CURRENT_TIMESTAMP
        )`, (err) => {
            if (err) {
                console.error("Error creating table:", err.message);
            } else {
                console.log("Table 'posts' is ready.");
            }
        });
    });
    console.log("init end");
};

module.exports = { db, init };