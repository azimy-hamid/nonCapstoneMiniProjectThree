import Users from "./Users.js";
import JobApplications from "./JobApplications.js";
import Statuses from "./Statuses.js";
import Companies from "./Companies.js";
import Interviews from "./Interviews.js";
import Contacts from "./Contacts.js";
import Reminders from "./Reminders.js";

const setupAssociations = () => {
  try {
    // Users to JobApplications
    Users.hasMany(JobApplications, {
      foreignKey: "user_id",
      sourceKey: "user_id",
      constraints: false,
    });
    JobApplications.belongsTo(Users, {
      foreignKey: "user_id",
      targetKey: "user_id",
      constraints: false,
    });

    // JobApplications to Companies
    JobApplications.belongsTo(Companies, {
      foreignKey: "company_id",
      targetKey: "company_id",
      constraints: false,
    });
    Companies.hasMany(JobApplications, {
      foreignKey: "company_id",
      sourceKey: "company_id",
      constraints: false,
    });

    // JobApplications to Statuses
    JobApplications.belongsTo(Statuses, {
      foreignKey: "status_id",
      targetKey: "status_id",
      constraints: false,
    });
    Statuses.hasMany(JobApplications, {
      foreignKey: "status_id",
      sourceKey: "status_id",
      constraints: false,
    });

    // JobApplications to Interviews
    JobApplications.hasMany(Interviews, {
      foreignKey: "application_id",
      sourceKey: "application_id",
      constraints: false,
    });
    Interviews.belongsTo(JobApplications, {
      foreignKey: "application_id",
      targetKey: "application_id",
      constraints: false,
    });

    // JobApplications to Contacts
    JobApplications.belongsTo(Contacts, {
      foreignKey: "contact_id", // The foreign key in JobApplications
      targetKey: "contact_id", // The primary key in Contacts
    });

    // Contacts to JobApplications
    Contacts.hasOne(JobApplications, {
      foreignKey: "contact_id", // The foreign key in JobApplications
      sourceKey: "contact_id", // The primary key in Contacts
    });
    // JobApplications to Reminders
    JobApplications.hasMany(Reminders, {
      foreignKey: "application_id",
      sourceKey: "application_id",
      constraints: false,
    });
    Reminders.belongsTo(JobApplications, {
      foreignKey: "application_id",
      targetKey: "application_id",
      constraints: false,
    });

    // Users to Reminders
    Users.hasMany(Reminders, {
      foreignKey: "user_id",
      sourceKey: "user_id",
      constraints: false,
    });
    Reminders.belongsTo(Users, {
      foreignKey: "user_id",
      targetKey: "user_id",
      constraints: false,
    });
  } catch (error) {
    console.log("Error setting up associations:", error);
  }
};

export { setupAssociations };
