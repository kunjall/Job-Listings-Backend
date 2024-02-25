# Job Listings Management API #

## Description

This project involves creating a backend RESTful API using Node.js, Express, and MongoDB to manage job listings and users. The system is designed to allow users to view job listings, apply for jobs, and interact with other users by liking them to increase their points.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [API Endpoints](#api-endpoints)
- [Authentication](#authentication)


## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/kunjall/job-listings-backend.git
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Set up .env file with the following content:

    ```env
    SECRET_KEY = 'XXXXXXXX'
    PORT = '3000'
    URL = 'mongodb+srv://<username>:<password>@cluster.mongodb.net/<dbname>?retryWrites=true&w=majority'
    ```

   - Generate a random `SECRET_KEY`
   - Replace `<username>` with your MongoDB username.
   - Replace `<password>` with the password for the database user.
   - Replace `<dbname>` with the name of your MongoDB database.

## Usage

Set up the .env file as instructed in the installation section.
- For Prod
  ```bash
    npm run start
  ```
- For Dev
  ```bash
    npm run dev
  ```

## Features

  - Login for JWT authentication
  - CRUD operations for Users
  - Like users on basis of their github profile
  - Retrieve users in ascending order of their likes
  - CRUD operataions for Job Listings
  - Add applicants to Job Listing
  - Logout to invalidate JWT

## API Endpoints 

**FOR ALL ENDPOINTS OTHER THAN Login, USE THE TOKEN PROVIDED BY THE LOGIN API AS AUTHORIZATION IN HEADER**

**You can test them using Postman**

**Postman collection:**
`https://elements.getpostman.com/redirect?entityId=26089168-34c6e6b9-88b8-439c-808a-e20da04a8564&entityType=collection`

- Login **(POST)**
  - Endpoint: `http://localhost:3000/api/auth/login`
  - Body:
    ```json
    {"username": "name"}
    ```
    
- Create User **(POST)**
  - endpoint: `http://localhost:3000/api/users`
  - body:
    ```json
    [
    {
        "name": "John Doe",
        "points": 0,
        "githubLink": "https://github.com/johndoe",
        "_id": "65dbb1cef4a2483eee36a6f4",
        "__v": 0
    },
    {
        "name": "Jane Smith",
        "points": 0,
        "githubLink": "https://github.com/janesmith",
        "_id": "65dbb1cef4a2483eee36a6f5",
        "__v": 0
    }
    ]
    ```

- Read Users **(GET)**
  - endpoint: `http://localhost:3000/api/users`
  - body: userId (optional) - Show a specific user
    ```json
    {
    "userId": "65db22ac0260ba55785ebcb2"
    }
    ```

- Update User **(PATCH)**
  - endpoint: `http://localhost:3000/api/users/:userId/update`
  - body: any parameter
    ```json
        {"name": "Yash"}
    ```
  

- Delete User **(DELETE)**
    - endpoint: `http://localhost:3000/api/users/delete`
    - body:
        ```json
        {
      "userId": "65db128b679f3013066c35e9"
      }
      ```

- Like User **(POST)**
  - endpoint: `http://localhost:3000/api/users/:userId/like`
  
- Get Users in Ascending Order of Likes **(GET)**
  - endpoint: `http://localhost:3000/api/users/likes`

- Create Job Listings **(POST)**
  - endpoint: `http://localhost:3000/api/jobs`
  - body:
    ```json
        [
        {
          "Date": "2024-02-23",
          "Link": "https://example.com/job1",
          "Title": "Job 1",
          "UsersApplied": []
        },
        {
          "Date": "2024-02-24",
          "Link": "https://example.com/job2",
          "Title": "Job 2",
          "UsersApplied": []
        }]
    ```

- Read Job Listings **(GET)**
   - endpoint: `http://localhost:3000/api/jobs/job-listings/readListings`
   - body: jobId (optional) - Show a specific job
     ```json
     {
      "jobId": "65db233f0260ba55785ebcb8"
      }
     ```
- Update Listing **(PATCH)**
  - endpoint: `http://localhost:3000/api/jobs/job-listings/jobId/update`
  - body: any parameter
    ```json
        {"link": "https://example.com/test"}
    ```

- Delete Listing **(DELETE)**
    - endpoint: `http://localhost:3000/api/users/delete`
    - body:
        ```json
        {
      "userId": "65db128b679f3013066c35e9"
      }
      ```
  

- Add Applicant to Job Listing **(POST)**
  - endpoint: `http://localhost:3000/api/jobs/job-listings/delete`
  - body:
      ```json
      {
    "jobId": "65db20e90260ba55785ebca4"
    }
    ```

- Logout **(POST)**
  - endpoint: `http://localhost:3000/api/auth/logout`
 

## Authentication

- User authentication is handled using JWT tokens.
- After successful login, a token is generated and required for authorized operations.
- Logout is implemented to invalidate the JWT token.





