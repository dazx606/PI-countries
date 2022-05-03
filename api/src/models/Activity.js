const { DataTypes, Op } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('activity', {
    name: {
      type: DataTypes.STRING,
      unique: true
    },
    length:{
        type: DataTypes.STRING,
    },
    difficulty:{
        type: DataTypes.INTEGER,
        validate: {
          min:1,
          max:5
        }
    },
    season:{
        type: DataTypes.STRING,
    }

  },{timestamps: false});
};