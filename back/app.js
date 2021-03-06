const express = require('express');
const cors = require('cors');
const db = require('./models');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const productRouter = require('./routes/product');
const userRouter = require('./routes/user');
const passport = require('passport');
const dotenv = require('dotenv');
const morgan = require('morgan');
const path = require('path');
const hpp = require('hpp');
const helmet = require('helmet');
const passportConfig = require('./passport');


dotenv.config();
const app = express();
db.sequelize.sync()
  .then(() => {
    console.log('db 연결 성공');
  })
  .catch(console.error);
passportConfig();

if (process.env.NODE_ENV === 'production') {
  app.use(morgan('combined'));
  app.use(hpp());
  app.use(helmet());
  app.use(cors({
    origin: [ 'http://minsusu.shop'],
    credentials: true,
  }));
  
} else {
  app.use(morgan('dev'));
  app.use(cors({
    origin: true,
    credentials: true,
  }));
  
}





// cors 오류가 나는 이유. 3000 -> 3065 보낼 떄 access control origial 를 해줘야 함 - 라이브러리 cors 를 사용.
app.use(express.json()); // front 해석해서 받을려면 필요.
app.use(express.urlencoded({ extended: true })); 

app.use(cookieParser(process.env.COOKIE_SECRET)); // alstntn alstntn1 alstntn@naver.com -> cxlhy cookie 
app.use(session({ // 00 60 다른 서버 데이터가 공유 저절로 되는 게 직접 받아옴. login 했을 떄 누가 로그인 했는지 프로트로 보내줌.
  saveUninitialized: false,
  resave: false,
  secret: process.env.COOKIE_SECRET,
  cookie: {
    httpOnly: true,
    secure: false,
    domain: process.env.NODE_ENV === 'production' && '.minsusu.shop'
  }
})); 
app.use(passport.initialize());
app.use(passport.session());


app.get('/', (req, res) => {
  res.send('hello express');
});

app.use('/user', userRouter);
app.use('/product', productRouter);
app.use('/uploads', express.static('uploads'));

app.listen(80, () => {
  console.log('서버 실행 중!');
});
