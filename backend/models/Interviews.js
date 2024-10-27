import { DataTypes } from "sequelize";
import sequelize from "../config/dbConfig.js";

const Interviews = sequelize.define(
  "Interviews",
  {
    interview_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    application_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    interview_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    interview_stage: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    feedback: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    result: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    is_deleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    tableName: "interviews",
    timestamps: true,
  }
);

export default Interviews;
