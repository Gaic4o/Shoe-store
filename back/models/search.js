const DataTypes = require('sequelize');
const { Model } = DataTypes;

module.exports = class Search extends Model {
    static init(sequelize) {
        return super.init({
            name: {
                type: DataTypes.STRING(20),
            }
        })
    }
}

videoMp: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },