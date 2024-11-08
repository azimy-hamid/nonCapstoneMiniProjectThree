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

## Project Structure

```
job-application-project/
├── controllers/
│   ├── contactsController.js
│   ├── companiesController.js
├── models/
│   ├── Contacts.js
│   ├── Companies.js
├── routes/
│   ├── contactsRoutes.js
│   ├── companiesRoutes.js
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
  `POST /contacts/contacts`
  - Request Body: `name`, `role`, `email`, `phone`, `notes`
  - Response: New contact created
- **Get All Contacts**  
  `GET /contacts/contacts`
  - Response: List of all contacts
- **Get Contact by ID**  
  `GET /contacts/contacts/:id`
  - Response: Contact with specified ID
- **Update Contact**  
  `PUT /contacts/contacts/:id`
  - Request Body: Any field to update (e.g., `name`, `email`)
  - Response: Updated contact data
- **Delete Contact**  
  `DELETE /contacts/contacts/:id`
  - Response: Success message

### Companies

- **Create Company**  
  `POST /companies/companies`
  - Request Body: `company_name`, `location`, `website`, `industry`
  - Response: New company created
- **Get All Companies**  
  `GET /companies/companies`
  - Response: List of all companies
- **Get Company by ID**  
  `GET /companies/companies/:id`
  - Response: Company with specified ID
- **Update Company**  
  `PUT /companies/companies/:id`
  - Request Body: Any field to update (e.g., `company_name`, `location`)
  - Response: Updated company data
- **Delete Company**  
  `DELETE /companies/companies/:id`
  - Response: Success message

### Interviews

- **Create Interview**  
  `POST /interviews/interviews`

  - Request Body: `application_id`, `interview_date`, `interview_stage`, `feedback`, `result`
  - Response: New interview created

- **Get All Interviews**  
  `GET /interviews/interviews`

  - Response: List of all interviews that are not marked as deleted

- **Get Interview by ID**  
  `GET /interviews/interviews/:id`

  - Response: Interview with specified `id` that is not marked as deleted

- **Update Interview**  
  `PUT /interviews/interviews/:id`

  - Request Body: Any field to update (`application_id`, `interview_date`, `interview_stage`, `feedback`, `result`)
  - Response: Updated interview data

- **Delete Interview** (Soft Delete)  
  `DELETE /interviews/interviews/:id`
  - Response: Success message indicating the interview has been soft-deleted

### Job Applications

- **Create Job Application**  
  `POST /create-job-application`

  - Request Body:
    ```json
    {
      "user_id": "string",
      "job_title": "string",
      "application_date": "string",
      "notes": "string",
      "company_name": "string",
      "location": "string",
      "website": "string",
      "industry": "string",
      "contact_name": "string",
      "contact_role": "string",
      "contact_email": "string",
      "contact_phone": "string",
      "contact_notes": "string"
    }
    ```
  - Response: New job application created

- **Update Job Application Company by Only ID**  
  `PUT /update-job-application-company-by-only-id`

  - Request Body:
    ```json
    {
      "company_id": "string"
    }
    ```
  - Response: Updated job application with new company ID

- **Update Job Application Company by Providing the Company**  
  `PUT /update-job-application-company-by-providing-the-company`

  - Request Body:
    ```json
    {
      "company_name": "string",
      "location": "string",
      "website": "string",
      "industry": "string"
    }
    ```
  - Response: Updated job application with new company details

- **Get All Job Applications**  
  `GET /get-all-job-applications`

  - Query Parameters:
    - `page`: The page number (optional)
    - `limit`: Number of records per page (optional)
  - Response: List of all job applications

- **Get Job Application by ID**  
  `GET /get-job-application-by-id/:id`

  - Response: Job application with specified `id`

- **Update Job Application**  
  `PUT /update-job-application/:id`

  - Request Body:
    ```json
    {
      "company_id": "string",
      "job_title": "string",
      "status_id": "string",
      "application_date": "string",
      "notes": "string"
    }
    ```
  - Response: Updated job application data

- **Soft Delete Job Application**  
  `DELETE /delete-job-application/:id`
  - Response: Success message indicating the job application has been soft-deleted

### Reminders

- **Create Reminder**  
  `POST /create-reminder`

  - Request Body:
    ```json
    {
      "user_id": "string",
      "application_id": "string",
      "reminder_date": "string",
      "description": "string",
      "status": "string"
    }
    ```
  - Response:
    ```json
    {
      "success": true,
      "data": {
        "reminder_id": "uuid",
        "user_id": "string",
        "application_id": "string",
        "reminder_date": "string",
        "description": "string",
        "status": "string",
        "is_deleted": false
      }
    }
    ```
  - Description: Creates a new reminder for a user with the provided details.

- **Get All Reminders**  
  `GET /get-all-reminders`

  - Response:
    ```json
    {
      "success": true,
      "data": [
        {
          "reminder_id": "uuid",
          "user_id": "string",
          "application_id": "string",
          "reminder_date": "string",
          "description": "string",
          "status": "string",
          "is_deleted": false
        },
        ...
      ]
    }
    ```
  - Description: Retrieves a list of all reminders that are not marked as deleted.

- **Get Reminder by ID**  
  `GET /get-reminder-by-id/:id`

  - Response:
    ```json
    {
      "success": true,
      "data": {
        "reminder_id": "uuid",
        "user_id": "string",
        "application_id": "string",
        "reminder_date": "string",
        "description": "string",
        "status": "string",
        "is_deleted": false
      }
    }
    ```
  - Description: Retrieves a specific reminder by its ID, ensuring it is not deleted.

- **Update Reminder**  
  `PUT /update-reminder/:id`

  - Request Body:
    ```json
    {
      "user_id": "string",
      "application_id": "string",
      "reminder_date": "string",
      "description": "string",
      "status": "string"
    }
    ```
  - Response:
    ```json
    {
      "success": true,
      "data": {
        "reminder_id": "uuid",
        "user_id": "string",
        "application_id": "string",
        "reminder_date": "string",
        "description": "string",
        "status": "string",
        "is_deleted": false
      }
    }
    ```
  - Description: Updates a reminder's details. At least one field (user_id, application_id, reminder_date, description, status) must be provided for the update.

- **Soft Delete Reminder**  
  `DELETE /delete-reminder/:id`

  - Response:
    ```json
    {
      "success": true,
      "message": "Reminder deleted successfully"
    }
    ```
  - Description: Soft deletes the reminder by marking it as deleted (`is_deleted: true`).

  ### Statuses

- **Create Status**  
  `POST /create-status`

  - Request Body:
    ```json
    {
      "status_name": "string"
    }
    ```
  - Response:
    ```json
    {
      "success": true,
      "data": {
        "status_id": "uuid",
        "status_name": "string",
        "is_deleted": false
      }
    }
    ```
  - Description: Creates a new status with the provided status name.

- **Get All Statuses**  
  `GET /get-all-statuses`

  - Response:
    ```json
    {
      "success": true,
      "data": [
        {
          "status_id": "uuid",
          "status_name": "string",
          "is_deleted": false
        },
        ...
      ]
    }
    ```
  - Description: Retrieves a list of all statuses that are not marked as deleted.

- **Get Status by ID**  
  `GET /get-status-by-id/:id`

  - Response:
    ```json
    {
      "success": true,
      "data": {
        "status_id": "uuid",
        "status_name": "string",
        "is_deleted": false
      }
    }
    ```
  - Description: Retrieves a specific status by its ID, ensuring it is not deleted.

- **Update Status**  
  `PUT /update-status/:id`

  - Request Body:
    ```json
    {
      "status_name": "string"
    }
    ```
  - Response:
    ```json
    {
      "success": true,
      "data": {
        "status_id": "uuid",
        "status_name": "string",
        "is_deleted": false
      }
    }
    ```
  - Description: Updates the status' name. If no `status_name` is provided, no update will be made.

- **Soft Delete Status**  
  `DELETE /delete-status/:id`
  - Response:
    ```json
    {
      "success": true,
      "message": "Status deleted successfully"
    }
    ```
  - Description: Soft deletes the status by marking it as deleted (`is_deleted: true`).

### User Routes

- **Sign Up User**  
  `POST /signup`

  - Request Body:
    ```json
    {
      "username": "string",
      "email": "string",
      "password": "string"
    }
    ```
  - Response:
    ```json
    {
      "success": true,
      "message": "User created successfully",
      "token": "string",
      "user": {
        "user_id": "uuid",
        "username": "string",
        "email": "string",
        "password": "string",
        "is_deleted": false
      }
    }
    ```
  - Description: Creates a new user with the provided details and returns a JWT token for authentication.

- **Login User**  
  `POST /login`

  - Request Body:
    ```json
    {
      "email": "string",
      "password": "string"
    }
    ```
  - Response:
    ```json
    {
      "success": true,
      "message": "Login successful",
      "token": "string",
      "user": {
        "user_id": "uuid",
        "username": "string",
        "email": "string",
        "password": "string",
        "is_deleted": false
      }
    }
    ```
  - Description: Logs in an existing user and returns a JWT token for authentication.

- **Get All Users**  
  `GET /users`

  - Response:
    ```json
    {
      "success": true,
      "users": [
        {
          "user_id": "uuid",
          "username": "string",
          "email": "string",
          "password": "string",
          "is_deleted": false
        },
        {
          "user_id": "uuid",
          "username": "string",
          "email": "string",
          "password": "string",
          "is_deleted": false
        }
      ]
    }
    ```
  - Description: Returns a list of all users.

- **Get User By ID**  
  `GET /users/:id`

  - Response:
    ```json
    {
      "success": true,
      "user": {
        "user_id": "uuid",
        "username": "string",
        "email": "string",
        "password": "string",
        "is_deleted": false
      }
    }
    ```
  - Description: Returns a user by their ID.

- **Update User**  
  `PUT /users/:id`

  - Request Body:
    ```json
    {
      "username": "string",
      "email": "string",
      "password": "string"
    }
    ```
  - Response:
    ```json
    {
      "success": true,
      "message": "User updated successfully",
      "user": {
        "user_id": "uuid",
        "username": "string",
        "email": "string",
        "password": "string",
        "is_deleted": false
      }
    }
    ```
  - Description: Updates the details of a user by their ID.

- **Delete User**  
  `DELETE /users/:id`

  - Response:
    ```json
    {
      "success": true,
      "message": "User deleted successfully"
    }
    ```
  - Description: Deletes a user by their ID.

<small>This is a temp. readme which will then be moved for the backend once the frontend is created!</small>
