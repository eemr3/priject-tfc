import { Model, STRING, INTEGER } from 'sequelize';
import db from '.';
import Matche from './matche';

class Team extends Model {
  public id!: number;
  public teamName!: string;
}

Team.init(
  {
    id: {
      type: INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    teamName: {
      type: STRING,
      allowNull: false,
    },
  },
  {
    // ... Outras configs
    underscored: true,
    sequelize: db,
    modelName: 'teams',
    timestamps: false,
  },
);

/**
 * `Workaround` para aplicar as associations em TS:
 * Associations 1:N devem ficar em uma das instâncias de modelo
 * */

Matche.belongsTo(Team, { foreignKey: 'id', as: 'homeTeams' });
Matche.belongsTo(Team, { foreignKey: 'id', as: 'awayTeams' });

Team.hasMany(Matche, { foreignKey: 'homeTeam', as: 'homeTeams' });
Team.hasMany(Matche, { foreignKey: 'awayTeam', as: 'awayTeams' });

export default Team;
