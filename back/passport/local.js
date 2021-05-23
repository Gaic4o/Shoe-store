const passport = require('passport');
const { Strategy: LocalStrategy } = require('passport-local');
const bcrypt = require('bcrypt');
const { User } = require('../models');

module.exports = () => {
  passport.use(new LocalStrategy({ // regid, password 만으로 로그인 local
    usernameField: 'regid',
    passwordField: 'password',
  }, async (regid, password, done) => {
    try {
      const user = await User.findOne({
        where: { regid }
      });
      if (!user) {
        return done(null, false, { reason: '존재하지 않는 아이디입니다!' }); // 1. 서버 에러 2. 성공  3. 클라이언트 에러
      }
      const result = await bcrypt.compare(password, user.password);
      if (result) {
        return done(null, user);
      }
      return done(null, false, { reason: '비밀번호가 틀렸습니다.' });
    } catch (error) {
      console.error(error);
      return done(error);
    }
  }));
};
