const express = require('express');
const bcrypt = require('bcrypt'); // 비밀번호 암호화.
const { User, Product, Image } = require('../models');
const passport = require('passport');
const { isLoggedIn, isNotLoggedIn } = require('./middleware')

const router = express.Router();


// 로그인.
router.get('/',  async (req, res, next) => {
    console.log(req.headers);
    try {
        if (req.user) {
            const UserInfomation = await User.findOne({
                where: { regid: req.user.regid },
                attributes: {
                    exclude: ['password']
                },
            })
            res.status(200).json(UserInfomation)
        } else {
            res.status(200).json(null);
        }
    } catch (error) {
        console.error(error);
        next(error);
    }
})


// 로그인 라우터
router.post('/login', isNotLoggedIn, (req, res, next) => {
    passport.authenticate('local', (err, user, info) => { //  1. 서버 에러 2. 성공  3. 클라이언트 에러
    if (err) {
        console.error(err);
        return next(err);
    }
    if (info) {  // 클라이언트 에러. 
        return res.status(401).send(info.reason);
    }
    return req.login(user, async (loginErr) => { // passport error 
        if (loginErr) {
            console.error(loginErr);
            return next(loginErr);
            // 세션 쿠키를 브라우저로 보내줍니다.
        }
        const UserInfomation = await User.findOne({
            where: { id: user.id },
            attributes: {
                exclude: ['password']
            }
        })
        return res.status(200).json(UserInfomation); // front 로 user 넘겨 줌.
    })
})(req, res, next);
}); // user/login


// 회원가입 
router.post('/', isNotLoggedIn, async (req, res, next) => {
    try {
        const exUser = await User.findOne({
            where: {
                email: req.body.email,
            }
        });
        if (exUser) {
            return res.status(403).send('이미 사용 중인 이메일 입니다!');
        }
     const hashedPassword = await bcrypt.hash(req.body.password, 12);
     await User.create({
        name: req.body.name, // Front 에서 받아옴.
        email: req.body.email,
        regid: req.body.regid,
        password: hashedPassword,
    })
    res.status(201).send('ok');
} catch (error) {
    console.error(error)
    next(error);

}
});


// 장바구니 데이터 가져 옵니다.
router.get('/Carts', isLoggedIn, async (req, res, next) => { // GET /user/Carts 
    try {
        const user = await User.findOne({
            where: { id: req.user.id }, 
            include: [{
                model: Product,
                as: 'Cartd',
            },
    ]
        });
        res.status(200).json(user);
    } catch (error) {
        console.error(error);
        next(error);
    }
})



// 닉네임 수정 
router.patch('/regid', isLoggedIn, async (req, res, next) => {
    try {
      await User.update({
        regid: req.body.regid,
      }, {
        where: { id: req.user.id },
      });
      res.status(200).json({ regid: req.body.regid });
    } catch (error) {
      console.error(error);
      next(error);
    }
  });

  // 이름 수정.
  router.patch('/name', isLoggedIn, async (req, res, next) => {
    try {
      await User.update({
        name: req.body.name,
      }, {
        where: { id: req.user.id },
      });
      res.status(200).json({ name: req.body.name });
    } catch (error) {
      console.error(error);
      next(error);
    }
  });




  router.patch('/email', isLoggedIn, async (req, res, next) => {
    try {
      await User.update({
        email: req.body.email,
      }, {
        where: { id: req.user.id },
      });
      res.status(200).json({ email: req.body.email});
    } catch (error) {
      console.error(error);
      next(error);
    }
  });



// 로그아웃
router.post('/logout', isLoggedIn, (req, res) => {
    req.logout();
    req.session.destroy(); 
    res.send('ok');
})



module.exports = router; 