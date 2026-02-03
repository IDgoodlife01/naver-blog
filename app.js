const express = require('express');
const session = require('express-session');
const path = require('path');
const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));

app.use(session({
  secret: 'my-secret-key',
  resave: false,
  saveUninitialized: false
}));

// 라우터 가져오기
const authRouter = require('./routes/auth');
const postRouter = require('./routes/post');

// 라우터 등록 - 순서와 경로가 중요합니다!
app.use('/', authRouter);      // -> /admin/users 담당
app.use('/post', postRouter);  // -> /post/list 담당

app.get('/', (req, res) => {
  res.render('home', { user: req.session.user || null });
});

app.listen(8080, () => {
  console.log('서버 실행: http://localhost:8080');
});