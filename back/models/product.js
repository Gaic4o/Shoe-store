const DataTypes = require('sequelize');
const { Model } = DataTypes;


module.exports = class Product extends Model {
    static init(sequelize) {
        return super.init({
            Title: {
                type: DataTypes.STRING(70),
                allowNull: false,
            },
            Contents: {
                type: DataTypes.STRING(200),
                allowNull: false,
            },
            Price: {
                type: DataTypes.STRING(60),
                allowNull: false,
            },
            ShoesNames: {
                type: DataTypes.STRING(10),
                allowNull: false,
            },   
            Cody: {
                type: DataTypes.STRING(30),
                allowNull: false,
            },
            Brand: {
                type: DataTypes.STRING(30),
                allowNull: false,
            },
       
        },
        {
            modelName: 'Product',
            tableName: 'products',
            charset: 'utf8',
            collate: 'utf8_general_ci',
            sequelize,
    });
}
static associate(db) {
    db.Product.hasMany(db.Image); // addImages, getImages
    db.Product.hasMany(db.Comment);
    db.Product.belongsToMany(db.User, { through: 'Cart', as: 'Carts' }) // Cart 
    db.Product.belongsToMany(db.User, { through: 'Love', as: 'Loves' }) // 찜.
}
}

