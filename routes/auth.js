const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const db = require('../db');

// 회원가입
router.get('/register', (req, res) => res.render('register'));
router.post('/register', async (req, res) => {
  const { username, password } = req.body;
  const hash = await bcrypt.hash(password, 10);
  await db.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, hash]);
  res.redirect('/login');
});

// 로그인
router.get('/login', (req, res) => res.render('login'));
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const [rows] = await db.query('SELECT * FROM users WHERE username = ?', [username]);
  if (rows.length === 0) return res.send('로그인 실패');
  const ok = await bcrypt.compare(password, rows[0].password);
  if (!ok) return res.send('로그인 실패');
  req.session.user = { id: rows[0].id, username: rows[0].username };
  res.redirect('/');
});

// 로그아웃
router.get('/logout', (req, res) => {
  req.session.destroy(() => res.redirect('/'));
});

// [관리자 전용] 회원 관리 페이지
router.get('/admin/users', async (req, res) => {
  if (!req.session.user || req.session.user.username !== 'admin') {
    return res.send('<script>alert("관리자 전용입니다."); location.href="/";</script>');
  }
  const [users] = await db.query('SELECT id, username, password FROM users');
  res.render('admin_users', { users, user: req.session.user });
});

// [관리자 전용] 회원 삭제
router.post('/admin/user/delete/:id', async (req, res) => {
  if (!req.session.user || req.session.user.username !== 'admin') return res.send('권한 없음');
  await db.query('DELETE FROM users WHERE id = ?', [req.params.id]);
  res.redirect('/admin/users');
});

module.exports = router;