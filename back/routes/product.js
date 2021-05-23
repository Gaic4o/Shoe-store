const express = require('express');
const fs = require('fs');
const multer = require('multer');
const path = require('path');
const { Op } = require('sequelize');
const { Product, Image, User, Comment} = require('../models')
const { isLoggedIn } = require('./middleware');

const router = express.Router();
 


try {
    fs.accessSync('uploads');
  } catch (error) {
    console.log('uploads 폴더가 없으므로 생성합니다.');
    fs.mkdirSync('uploads');
  }
  
 
  var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
      cb(null, `${Date.now()}_${file.originalname}`)
    }
  })

  var upload = multer({ storage: storage }).single('file')



router.post('/image',  (req, res ) => { 

    upload(req, res, err => {
        if(err) {
            return req.json({ success: false, err })
        }
        return res.json({ success: true, filePath: res.req.file.path, fileName: res.req.file.filename})
} ) } );







router.post('/info/:productId/comment', isLoggedIn, async (req, res, next) => {
    try {
        const product = await Product.findOne({
            where: { id: req.params.productId }, 
        });
        if (!product) {
            return res.status(403).send('존재하지 않은 상품목록 입니다!');
        }
        const comment = await Comment.create({
            content: req.body.content,
            ProductId: parseInt(req.params.productId, 10),
            UserId: req.user.id,
        })
        const fullComment = await Comment.findOne({
            where: { id: comment.id },
            include: [{
                model: User,
                attributes: ['id', 'regid'],
            }],
        })
        res.status(201).json(fullComment);
    } catch(error) {
        console.error(error);
        next(error);
    }
})




router.get('/search/:name', async (req, res, next) => {
    try {
        const where = {};
        if (parseInt(req.query.lastId, 10)) {
            where.id = { [Op.lt]: parseInt(req.query.lastId, 10)}
        } // 21 20 19 18 17 16 15 14 13 12 11 10 9 8 7 6 5 4 3 2 1
        const product = await Product.findAll({
            where, 
            limit: 20,
            where: { Title: {
                [Op.like]: "%" + req.params.name + "%"
            }},
            include: [  
               {
                model: Image,
                attributes: ['src']
            },
            ]
        });
        res.json(product)
    } catch(e) {
        console.error(e);
        next(e);
    }
})


router.patch('/info/:productId/basket', isLoggedIn, async (req, res, next) => {
    try {
        const product = await Product.findOne({ where: { id: req.params.productId }});
        if(!product) {
            return res.status(403).send('해당 상품이 존재하지 않습니다');
        }
        await product.addCarts(req.user.id);
        res.json({ ProductId: product.id, UserId: req.user.id });
    } catch (error) {
        console.error(error);
        next(error);
    }
})




router.delete('/info/:productId/basket', isLoggedIn, async (req, res, next) => {
    try {
        const product = await Product.findOne({ where: { id: req.params.productId }});
        if(!product) {
            return res.status(403).send('해당 상품이 존재하지 않습니다');
        }
        await product.removeCarts(req.user.id);
        res.json({ ProductId: product.id, UserId: req.user.id });
    } catch (error) {
        console.error(error);
        next(error);
    }
})



router.get('/info/:productId', async (req, res, next) => {
    try {
        const product = await Product.findOne({
            where: { id: req.params.productId },
            include: [
                // {
                //     model: User,
                //     attributes: ['id', 'regid'],
                // },      
                {
                    model: Image,
                    attributes: ['src']
                },
                {
                    model: Comment,
                    include: [{
                        model: User,
                        attributes: ['id', 'regid'],
                        order: [['createdAt',  'DESC']],
                    }]
                }, {
                    model: User, 
                    as: 'Carts',
                    attributes: ['id'],
                }
            ],
        });
        res.status(200).json(product);
    } catch (err) {
        console.log(err);
        next(err);
    }
})

// axios.get(`http://localhost:3060/product/products_by_id?id=${productId}&type=single`)







router.post('/AllLists', async (req, res, next ) => {
    let limit = req.body.limit ? parseInt(req.body.limit) : 20; // parseInt 는 숫자로 바꿔줌. 
    let skip = req.body.skip ? parseInt(req.body.skip) : 0; 
    let findArgs = {};

    for(let key in req.body.filters) {
        if(req.body.filters[key].length > 0) {
            findArgs[key] = req.body.filters[key];
        }
    }
    console.log('findArgs', findArgs);
    try {
        const productInfo = await Product.findAll({
            findArgs,
            limit: limit,
            offset: skip,
            include: [
                {
                    model: Image,
                    attributes: ['src']
                },
                
            ],
        });
        res.status(200).json({ success: true,  productInfo, postSize: productInfo.length});
    } catch (err) {
        console.error(err);
        next(err);
    }
})








router.route('/') 
.get(async (req, res, next) => {
    try {
        const productinfo = await Product.findAll();
        res.json(productinfo);
    } catch (err) {
        console.error(err);
        next(err);
    }
})

.post(  async (req, res, next ) => {
     try { 
         const product = await Product.create({
            Title: req.body.Title,
            Contents: req.body.Contents,
            Price: req.body.Price,
            ShoesNames: req.body.ShoesName,
            Cody: req.body.Cody,
            Brand: req.body.Brand,
    })
    if (req.body.Images) {
        if (Array.isArray(req.body.Images)) {
          const images = await Promise.all(req.body.Images.map((Images) => Image.create({ src: Images })));
          await product.addImages(images);
        } else {
           const image = await Image.create({ src: req.body.Images });
           await product.addImages(image);
        }
    }
    const fullProduct = await Product.findOne({
        where: { id: product.id },
        include: [{
            model: Image,
        }, {
            model: Comment,
            include: [{
                model: User,
                attributes: ['id', 'regid'],
            }],
        }, {
            model: User,
            as: 'Carts',
            attributes: ['id'],
        }]
    })

   res.status(201).json(fullProduct);
} catch (error) {
    console.error(error)
    next(error);
}
})














router.route('/new')
    .get(async (req, res, next) => {
        try {
            const productinfo = await Product.findAll({
                limit: 4,
                order: [
                [ 'createdAt', 'DESC'],
                ],
                include: [
                    {
                        model: Image,
                        attributes: ['src']
                    }
                ],
            });
            res.json(productinfo);
        } catch (err) {
            console.log(err);
            next(err);
        }
    })








router.route('/heap')
    .get(async (req, res, next) => {
        try {
            const productinfo = await Product.findAll({
                limit: 7,
                include: [
                    {
                        model: Image,
                        attributes: ['src']
                    }
                ],
                where: {
                    Cody: '2'
                }
            });
            res.json(productinfo);
        } catch (err) {
            console.error(err);
            next(err);
        }
    })

router.route('/Casual')
    .get(async (req, res, next) => {
        try {
            const productinfo = await Product.findAll({
                limit: 7,
                include: [
                    {
                        model: Image,
                        attributes: ['src']
                    }
                ],
                where: {
                    Cody: '1'
                }
            });
            res.json(productinfo);
        } catch (err) {
            console.error(err);
            next(err);
        }
    })

router.route('/Exercise') 
.get(async (req, res, next) => {
    try {
        const productinfo = await Product.findAll({
            limit: 7,
            include: [
                {
                    model: Image,
                    attributes: ['src']
                }
            ],
            where: {
                Cody: '3'
            }
        });
        res.json(productinfo);
    } catch (err) {
        console.error(err);
        next(err);
    }
})

















module.exports = router;