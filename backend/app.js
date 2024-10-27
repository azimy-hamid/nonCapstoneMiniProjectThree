import express, { response } from "express";
import cors from "cors";

import userRoutes from "./routes/userRoutes.js";
import jobApplicationsRoutes from "./routes/jobApplicationsRoutes.js";
import statusesRoutes from "./routes/statusesRoutes.js";
import remindersRoutes from "./routes/remindersRoutes.js";
import interviewsRoutes from "./routes/interviewsRoutes.js";
import contactsRoutes from "./routes/contactsRoutes.js";
import companiesRoutes from "./routes/companiesRoutes.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get("/", async (req, res) => {
  try {
    res.status(200).json({
      response:
        "This is the root end point for Non Capstone 3rd mini project app",
    });
  } catch (error) {
    res.status(500).json({ rootEndpointError: error });
  }
});

app.use("/users", userRoutes);
app.use("/statuses", statusesRoutes);
app.use("/reminders", remindersRoutes);
app.use("/job-applications", jobApplicationsRoutes);
app.use("/interviews", interviewsRoutes);
app.use("/contacts", contactsRoutes);
app.use("/companies", companiesRoutes);

export default app;
