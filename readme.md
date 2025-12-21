<p align="center">
  <img src="backend/assets/logo.png" width="120" />
</p>

# BMSCE Club Events Portal (BCEP)

BCEP is a centralized, automated event management ecosystem designed for BMS College of Engineering. It streamlines the lifecycle of campus events—from moderator creation and student registration to automated attendance reporting—using a high-performance, framework-less frontend and a robust Node.js backend.

## Preview

All screenshots and email previews are stored in the `` directory.

---

### Web Application

#### Landing Page
![Landing Page](readme%20assets/landing.png)

#### Student Dashboard
![Student Dashboard](readme%20assets/student-dashboard.png)

#### Student Event Registration
![Student Register](readme%20assets/student-register.png)

#### Moderator Dashboard
![Moderator Dashboard](readme%20assets/mod-dashboard.png)

#### Moderator Event View
![Moderator Event View](readme%20assets/mod-event-view.png)

---

### Email Previews

#### Stylised OTP Email
![OTP Email](readme%20assets/email-otp.png)

#### Successful Registration Email
![Registration Success](readme%20assets/email-success.png)


---

## Repository Structure

```text
BCEP/
```
---

## System Architecture

The project follows the Model-View-Controller (MVC) design pattern to ensure clean separation of concerns, scalability, and ease of maintenance.

* **Model:** Mongoose-based schemas for strict data validation and relational integrity.
* **View:** Server-side rendered logic with a Vanilla JS/CSS3 frontend for browser-native performance and low latency.
* **Controller:** Express routers managing business logic, authentication flows, and automated triggers.

---

## Tech Stack

### Core Technologies
* **Runtime:** Node.js (v5.1.0+)
* **Framework:** Express.js
* **Database:** MongoDB Atlas via Mongoose (v8.19.4)
* **Frontend:** Vanilla JavaScript, HTML5, CSS3

### Key Integrations and Dependencies
* **Automation:** node-cron for scheduled event termination and reporting.
* **Asset Management:** Cloudinary for optimized cloud storage and delivery of event posters.
* **Communication:** Nodemailer for SMTP-based OTP delivery and registration confirmations.
* **Security:** jsonwebtoken (JWT) for stateless authentication; bcrypt for salted password hashing.
* **Data Processing:** fast-csv for dynamic attendee report generation.

---

## Key Functional Modules

### 1. Automated Event Lifecycle Management
The system utilizes a Cron Scheduler running at 1-minute intervals to handle post-event administrative tasks:
* **Auto-Close:** Automatically transitions events from "open" to "closed" status upon reaching the deadline.
* **Automated Reporting:** Upon closure, the system aggregates attendee data (Name, USN, Email, Branch), generates a CSV file, and dispatches it to the host moderator's email via SMTP.

### 2. Algorithmic Branch Decoding
To ensure data integrity, the system implements a USN Parser. By extracting the departmental code (indices 5-7) from the student's University Seat Number, the backend automatically maps 24+ distinct engineering branches to the user profile.

### 3. Role-Based Access Control (RBAC)
The application enforces strict security boundaries via custom middleware:
* **Student Role:** Restricted to event browsing and registration.
* **Moderator Role:** Authorized to manage events, upload assets, and export data.
* **Administrative Gate:** A protected `/create-mod` endpoint requiring an `ADMIN_SECRET` to prevent unauthorized escalation of privileges.

---

## API Reference

The API is organized into two primary arteries: Authentication and Event Management. All protected routes require a JWT Bearer Token in the authorization header.



[Image of REST API architecture diagram]


### Authentication and Profile Management
**Base Path:** `/auth`

| Method | Endpoint | Access | Description |
|:---|:---|:---|:---|
| POST | `/send-otp` | Public | Initiates email verification by sending a 6-digit OTP. |
| POST | `/verify-otp` | Public | Validates the OTP provided by the user. |
| POST | `/register` | Public | Finalizes account creation after OTP verification. |
| POST | `/login` | Public | Authenticates credentials and returns a 7-day JWT. |
| POST | `/forgot-password` | Public | Initiates the password recovery flow. |
| POST | `/reset-password` | Public | Finalizes password reset using a verified token. |
| GET | `/profile` | Private | Retrieves the authenticated user's profile. |
| GET | `/registered-events` | Student | Fetches events joined by the authenticated student. |
| POST | `/create-mod` | Admin Secret | Specialized route for moderator creation. |

### Event Operations
**Base Path:** `/events`

| Method | Endpoint | Access | Description |
|:---|:---|:---|:---|
| GET | `/all` | Public | Retrieves all active and upcoming events. |
| GET | `/:id` | Public | Fetches detailed metadata for a specific event. |
| POST | `/create` | Moderator | Creates a new event with poster upload via Multer. |
| POST | `/:id/register` | Student | Atomic registration and confirmation email. |
| DELETE | `/:id/unregister` | Student | Removes student from an event registration list. |
| GET | `/moderator/my-events` | Moderator | Returns events created by the authenticated moderator. |
| GET | `/:id/registrations` | Moderator | Displays the list of students registered for an event. |
| GET | `/:id/export` | Moderator | Triggers immediate CSV generation and download. |
| GET | `/:id/send-mail` | Moderator | Manually triggers the attendee report email. |
| DELETE | `/:id` | Moderator | Permanently deletes an event and associated assets. |

---

## Installation and Deployment

### Prerequisites
* MongoDB Atlas Account
* Cloudinary API Credentials
* Node.js Environment

### Setup Instructions

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/not-rishi/BCEP.git
    cd BCEP
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Configure Environment Variables:**
    Create a `.env` file in the root directory:
    ```env
    PORT=3000
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_secure_random_string
    ADMIN_SECRET=rishi_is_cool
    CLOUDINARY_URL=your_cloudinary_url
    EMAIL_USER=your_smtp_user
    EMAIL_PASS=your_smtp_app_password
    ```

4.  **Start the server:**
    ```bash
    npm start
    ```


