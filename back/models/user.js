const DataTypes = require('sequelize');
const { Model } = DataTypes; 

module.exports = class User extends Model {
    static init(sequelize) {
        return super.init({
            name: {
                type: DataTypes.STRING(15),
                allowNull: false,
            },
            email: {
                type: DataTypes.STRING(30),
                allowNull: false,
            },
            regid: {
                type: DataTypes.STRING(10),
                allowNull: false,
                unique: true,
            },
            password: {
                type: DataTypes.STRING(100),
                allowNull: false,
            }, 
        },
      
         {
                modelName: 'User',
                tableName: 'users',
                charset: 'utf8',
                collate: 'utf8_general_ci',
                sequelize,
        });
    }
    static associate(db) {
        db.User.hasMany(db.Comment);
        db.User.belongsToMany(db.Product, { through: 'Cart', as: 'Cartd' })
        db.User.belongsToMany(db.Product, { through: 'Love', as: 'Loved' }) // 찜.
        db.User.belongsToMany(db.Image, { through: 'OpImage', as: 'Imaged' }) // 이미지
    }
}
    
