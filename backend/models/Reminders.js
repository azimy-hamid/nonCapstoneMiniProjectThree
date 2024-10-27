import { DataTypes } from "sequelize";
import sequelize from "../config/dbConfig.js";

const Reminders = sequelize.define(
  "Reminders",
  {
    reminder_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    application_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    reminder_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    is_deleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    tableName: "reminders",
    timestamps: true,
  }
);

export default Reminders;
