<p align="center">
  <img src="backend/assets/logo.png" width="150" alt="BCEP Logo" />
</p>

<h1 align="center">BMSCE Club Events Portal (BCEP)</h1>

<p align="center">
  <strong>The definitive, automated event management ecosystem for BMS College of Engineering.</strong>
  <br />
  <em>Streamlining campus life from registration to automated reporting.</em>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Frontend-Vanilla_JS-yellow?style=for-the-badge&logo=javascript" alt="Vanilla JS" />
  <img src="https://img.shields.io/badge/Backend-Node.js-green?style=for-the-badge&logo=node.js" alt="Node.js" />
  <img src="https://img.shields.io/badge/Database-MongoDB-47A248?style=for-the-badge&logo=mongodb" alt="MongoDB" />
  <img src="https://img.shields.io/badge/Security-JWT-black?style=for-the-badge&logo=json-web-tokens" alt="JWT" />
</p>

---

## Overview

**BCEP** is a high-performance event management platform designed to eliminate the friction of campus event coordination. By moving away from heavy frameworks on the frontend, BCEP achieves **near-instant load times** while maintaining a robust, scalable Node.js backend to handle the heavy lifting of student data and automated reporting.

### Key Features
* **Zero-Framework Frontend:** Built with pure HTML5/CSS3 and Vanilla JS for maximum browser compatibility and speed.
* **Automated Lifecycle:** Events close themselves. Reports email themselves. You just host.
* **Smart USN Parsing:** Automatically detects and maps branches (CSE, ISE, ECE, etc.) directly from student USNs.
* **Moderator Suite:** A powerful command center for club leads to track registrations in real-time and export data with a single click.

---

## Interface Preview

<details>
<summary><b> ✨ Click here to view screenshots</b></summary>

### Landing Page
![Landing Page](Readme%20Assets/landing.png)
<p align="center"><small><em>See all active registrations happening at a glance. No login needed.</em></small></p>

### Login Page
![Login Page](Readme%20Assets/login.png)
<p align="center"><small><em>Fast login, faster access.</em></small></p>

### Student Dashboard
<div align="center">
  <img src="Readme%20Assets/dashboard-1.png" width="90%" />
  <br><br>
  <img src="Readme%20Assets/dashboard-2.png" width="90%" />
</div>
<p align="center"><small><em>Smart filters, seamless experience, stunning dashboard.</em></small></p>

### Student Event Registration
![Student Register](Readme%20Assets/event.png)
<p align="center"><small><em>One-click event registration. Cancel anytime before the deadline.</em></small></p>

### Moderator Dashboard
![Moderator Dashboard](Readme%20Assets/mod-dashboard.png)
<p align="center"><small><em>View all your events in one powerful moderator dashboard.</em></small></p>

### Moderator Event View
![Moderator Event View](Readme%20Assets/event-control.png)
<p align="center"><small><em>Track registrations live, export data instantly, or delete the event when needed.</em></small></p>

### Email Previews
<div align="center">
  <img src="Readme%20Assets/register-email.png" width="90%" />
  <br><br>
  <img src="Readme%20Assets/cancel-email.png" width="90%" />
</div>
<p align="center"><small><em>Smart email notifications so nothing slips by.</em></small></p>

</details>

---

## Repository Structure

```text
BCEP/
├── backend/
│   ├── assets/
│   │   └── logo.png
│   ├── src/
│   │   ├── config/
│   │   │   ├── cloudinary.js
│   │   │   └── db.js
│   │   ├── controllers/
│   │   │   ├── auth.controller.js
│   │   │   └── event.controller.js
│   │   ├── middleware/
│   │   │   ├── auth.js
│   │   │   ├── authMiddleware.js
│   │   │   ├── role.js
│   │   │   └── upload.js
│   │   ├── models/
│   │   │   ├── event.js
│   │   │   └── user.js
│   │   ├── routes/
│   │   │   ├── auth.routes.js
│   │   │   └── event.routes.js
│   │   ├── utils/
│   │   │   ├── branchMap.js
│   │   │   ├── createCsv.js
│   │   │   ├── emailRateLimit.js
│   │   │   ├── emailTemplates.js
│   │   │   ├── scheduler.js
│   │   │   └── sendEmail.js
│   │   └── app.js
│   ├── .env
│   ├── package.json
│   └── server.js
├── frontend/
│   ├── Data/
│   │   ├── Clubs/
│   │   │   └── Slideshow/
│   │   │       ├── addix-1.jpg
│   │   │       ├── addix-2.jpg
│   │   │       ├── addix-3.jpg
│   │   │       ├── Ai-verse.jpg
│   │   │       ├── bull-1.jpg
│   │   │       ├── bull-2.jpg
│   │   │       ├── ieee-1.jpg
│   │   │       ├── Moutaineering Club.jpg
│   │   │       ├── ninaad-1.jpg
│   │   │       ├── rando-1.jpg
│   │   │       └── wemp-1.jpg
│   │   └── Images/
│   │       ├── arch.png
│   │       ├── eye-close.png
│   │       ├── eye-open.png
│   │       ├── filter-black.svg
│   │       ├── filter.svg
│   │       └── logo.png
│   ├── Loader/
│   │   ├── loader.css
│   │   └── loader.js
│   ├── Pages/
│   │   ├── landing/
│   │   │   ├── about.css
│   │   │   ├── about.html
│   │   │   ├── login.css
│   │   │   └── login.html
│   │   ├── Mod Dashboard/
│   │   │   ├── create.css
│   │   │   ├── create.html
│   │   │   ├── dashboard.css
│   │   │   ├── dashboard.html
│   │   │   ├── register.css
│   │   │   └── register.html
│   │   ├── Mod Login/
│   │   │   ├── login.css
│   │   │   ├── login.html
│   │   │   └── mod-create.html
│   │   ├── Student Dashboard/
│   │   │   ├── dashboard.css
│   │   │   ├── dashboard.html
│   │   │   ├── profile.css
│   │   │   ├── profile.html
│   │   │   ├── register.css
│   │   │   └── register.html
│   │   └── Student Login/
│   │       ├── Create/
│   │       │   ├── create-account.html
│   │       │   ├── create-email.html
│   │       │   ├── create-otp.html
│   │       │   ├── create-success.html
│   │       │   └── welcome.json
│   │       ├── Reset/
│   │       │   ├── reset-email.html
│   │       │   ├── reset-otp.html
│   │       │   ├── reset-password.html
│   │       │   ├── reset-success.html
│   │       │   └── success.json
│   │       ├── login.css
│   │       └── login.html
│   ├── config.js
│   ├── index.html
│   └── landing.css
├── Readme Assets/
│   ├── cancel-email.png
│   ├── dashboard-1.png
│   ├── dashboard-2.png
│   ├── event-control.png
│   ├── event.png
│   ├── landing.png
│   ├── login.png
│   ├── mod-dashboard.png
│   └── register-email.png
├── .gitignore
└── readme.md
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
    ADMIN_SECRET=admin_secret_string
    CLOUDINARY_URL=your_cloudinary_url
    EMAIL_USER=your_smtp_user
    EMAIL_PASS=your_smtp_app_password
    ```

4.  **Start the server:**
    ```bash
    npm start
    ```


---

<p align="center">
  <a href="#bmsce-club-events-portal-bcep">Back to Top</a> • 
  <a href="https://github.com/not-rishi/BCEP/issues">Report Bug</a> • 
  <a href="https://github.com/not-rishi/BCEP/pulls">Request Feature</a>
</p>

<table align="center">
  <tr>
    <td align="center" width="600">
      <b>BMSCE College Events Portal</b><br>
      Standardizing campus engagement through automated event lifecycles.<br>
      <sub>Maintained by <b>not-rishi</b> • © 2025</sub>
    </td>
  </tr>
</table>
