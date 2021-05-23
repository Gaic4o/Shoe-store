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