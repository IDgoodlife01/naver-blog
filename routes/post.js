const express = require('express');
const router = express.Router();
const db = require('../db');

// 글 목록
router.get('/list', async (req, res) => {
  try {
    // [posts] 처럼 대괄호가 있어야 데이터 배열만 posts 변수에 담깁니다.
    const [posts] = await db.query(`
      SELECT posts.*, users.username 
      FROM posts 
      JOIN users ON posts.user_id = users.id 
      ORDER BY posts.id DESC
    `);

    res.render('list', { 
      posts: posts, // 이제 1이 아니라 실제 데이터 배열이 전달됩니다.
      user: req.session.user 
    });
  } catch (err) {
    console.error(err);
    res.send("데이터 로딩 실패");
  }
});

// 글쓰기 처리 (기존 코드 유지)
router.post('/write', async (req, res) => {
  if (!req.session.user) return res.redirect('/login');
  const { title, content } = req.body;
  await db.query('INSERT INTO posts (title, content, user_id) VALUES (?, ?, ?)', 
    [title, content, req.session.user.id]);
  res.redirect('/post/list');
});

// 삭제 처리 (관리자 권한 추가)
router.post('/delete/:id', async (req, res) => {
  if (!req.session.user) return res.redirect('/login');
  const postId = req.params.id;
  const userId = req.session.user.id;
  
  // 본인이거나 admin인 경우만 삭제
  if (req.session.user.username === 'admin') {
    await db.query('DELETE FROM posts WHERE id = ?', [postId]);
  } else {
    await db.query('DELETE FROM posts WHERE id = ? AND user_id = ?', [postId, userId]);
  }
  res.redirect('/post/list');
});

module.exports = router;