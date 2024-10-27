# Job Application Management Project

This project is a Node.js-based API for managing job applications. It allows you to create, read, update, and delete (CRUD) job application data using endpoints.

## Table of Contents

- [Project Structure](#project-structure)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
  - [Contacts](#contacts)
  - [Companies](#companies)
  - [Application Stages](#application-stages)
- [License](#license)

## Project Structure

```
job-application-project/
├── controllers/
│   ├── contactsController.js
│   ├── companiesController.js
│   ├── applicationStagesController.js
├── models/
│   ├── Contacts.js
│   ├── Companies.js
│   ├── ApplicationStages.js
├── routes/
│   ├── contactsRoutes.js
│   ├── companiesRoutes.js
│   ├── applicationStagesRoutes.js
├── app.js
└── README.md
```

## Technologies Used

- Node.js
- Express.js
- Sequelize ORM
- UUID
- MySQL (or any SQL database supported by Sequelize)
- CORS
- JavaScript (ES6+)

## Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd job-application-project
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up the database by creating a `.env` file in the root directory with the following variables:

   ```bash
   DB_NAME=<database_name>
   DB_USER=<username>
   DB_PASS=<password>
   DB_HOST=<host>
   ```

4. Run the application:
   ```bash
   npm start
   ```

The application should now be running on `http://localhost:3000`.

## Usage

### Creating, Reading, Updating, and Deleting Data

1. **Contacts:** Manage contact details of individuals associated with job applications.
2. **Companies:** Track companies related to the job applications.
3. **Application Stages:** Manage application stages and statuses for job applications.

## API Endpoints

### Contacts

- **Create Contact**  
  `POST /api/contacts`
  - Request Body: `application_id`, `name`, `role`, `email`, `phone`, `notes`
  - Response: New contact created
- **Get All Contacts**  
  `GET /api/contacts`
  - Response: List of all contacts
- **Get Contact by ID**  
  `GET /api/contacts/:id`
  - Response: Contact with specified ID
- **Update Contact**  
  `PUT /api/contacts/:id`
  - Request Body: Any field to update (e.g., `name`, `email`)
  - Response: Updated contact data
- **Delete Contact**  
  `DELETE /api/contacts/:id`
  - Response: Success message

### Companies

- **Create Company**  
  `POST /api/companies`
  - Request Body: `company_name`, `location`, `website`, `industry`
  - Response: New company created
- **Get All Companies**  
  `GET /api/companies`
  - Response: List of all companies
- **Get Company by ID**  
  `GET /api/companies/:id`
  - Response: Company with specified ID
- **Update Company**  
  `PUT /api/companies/:id`
  - Request Body: Any field to update (e.g., `company_name`, `location`)
  - Response: Updated company data
- **Delete Company**  
  `DELETE /api/companies/:id`
  - Response: Success message

### Application Stages

- **Create Application Stage**  
  `POST /api/applicationStages`
  - Request Body: `application_id`, `stage_name`, `start_date`, `end_date`, `status`
  - Response: New application stage created
- **Get All Application Stages**  
  `GET /api/applicationStages`
  - Response: List of all application stages
- **Get Application Stage by ID**  
  `GET /api/applicationStages/:id`
  - Response: Application stage with specified ID
- **Update Application Stage**  
  `PUT /api/applicationStages/:id`
  - Request Body: Any field to update (e.g., `stage_name`, `status`)
  - Response: Updated stage data
- **Delete Application Stage**  
  `DELETE /api/applicationStages/:id`
  - Response: Success message

<small>This is a temp. readme which will then be moved for the backend once the frontend is created!</small>
