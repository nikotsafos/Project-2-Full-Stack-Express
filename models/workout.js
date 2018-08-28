'use strict';
module.exports = (sequelize, DataTypes) => {
  var workout = sequelize.define('workout', {
    name: DataTypes.STRING,
    reps: DataTypes.INTEGER,
    sets: DataTypes.INTEGER,
    date: DataTypes.DATE,
    weight: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  }, {});
  workout.associate = function(models) {
    models.workout.belongsTo(models.user)
  };
  return workout;
};
