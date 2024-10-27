import { DataTypes } from "sequelize";
import sequelize from "../config/dbConfig.js";

const Statuses = sequelize.define(
  "Statuses",
  {
    status_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    status_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    is_deleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    tableName: "statuses",
    timestamps: true,
  }
);

export default Statuses;
