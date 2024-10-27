import Statuses from "../models/Statuses.js";

const seedStatuses = async () => {
  const existingStatuses = await Statuses.count();
  if (existingStatuses === 0) {
    await Statuses.bulkCreate([
      { status_name: "Applied" },
      { status_name: "Interview Scheduled" },
      { status_name: "Interview Completed" },
      { status_name: "Offer Extended" },
      { status_name: "Rejected" },
    ]);
    console.log("Default statuses added to the database.");
  }
};

export default seedStatuses;
