import app from "./app.js";
import dotenv from "dotenv";
import sequelize from "./config/dbConfig.js";

import Users from "./models/Users.js";
import JobApplications from "./models/JobApplications.js";
import Statuses from "./models/Statuses.js";
import Reminders from "./models/Reminders.js";
import Interviews from "./models/Interviews.js";
import Contacts from "./models/Contacts.js";
import Companies from "./models/Companies.js";

import { setupAssociations } from "./models/associations.js";
import seedStatuses from "./utils/seedStatuses.js";

// import seedSuper from "./seedData/seedSuper.js";

dotenv.config();

setupAssociations();

const syncDatabase = async () => {
  try {
    await sequelize.sync(); // You can use { force: true } during development to reset the tables { alter: true } to alter
    seedStatuses();
    console.log("Database & tables created!");
  } catch (error) {
    console.error("Error creating database & tables:", error);
  }
};

const startServer = async () => {
  await syncDatabase();

  //   await seedSuper();

  app.listen(process.env.PORT_NUMBER, () => {
    console.log(
      `Non-Capstone Mini Project Three Backend Server running on port: ${process.env.PORT_NUMBER}`
    );
  });
};

startServer();
