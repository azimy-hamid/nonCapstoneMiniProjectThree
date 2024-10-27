import { DataTypes } from "sequelize";
import sequelize from "../config/dbConfig.js";

const JobApplications = sequelize.define(
  "JobApplications",
  {
    application_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    company_id: {
      type: DataTypes.UUID,
      allowNull: true,
    },
    contact_id: {
      type: DataTypes.UUID,
      allowNull: true,
    },
    job_title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    application_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    is_deleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    tableName: "job_applications",
    timestamps: true,
  }
);

export default JobApplications;
