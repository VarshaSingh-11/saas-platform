# Saas Platform

This project is an SDE Intern Assignment [002] for The Internet Folks.

## Table of Contents

- Installation
- Usage
- API Endpoints

## Installation

1. Clone the repository: \
   `git clone https://github.com/VarshaSingh-11/saas-platform.git`
2. Navigate to the project directory: \
   `cd community-api`
3. Install the dependencies: \
   `npm install`
4. Create a .env file in the root directory and add the following environment variables:
   ```
   MONGODB_URI=your_mongodb_uri
   JWT_SECRET=your_jwt_secret
   PORT=your_port
   ```
5. Start the server:
   `npm start`

## Usage
Once the server is running, you can interact with the API using tools like Postman or cURL.

## API Endpoints

### Create Role
POST /v1/role \
![image](https://github.com/VarshaSingh-11/saas-platform/assets/80753426/940386ba-e4e1-47ee-9630-f959dd9f0962)

### Get All
GET /v1/role \
![image](https://github.com/VarshaSingh-11/saas-platform/assets/80753426/f6e746b3-f358-4a03-bff3-dd492df1b0ee)

### Sign Up
POST /v1/auth/signup \
![image](https://github.com/VarshaSingh-11/saas-platform/assets/80753426/647f0894-f576-4574-be0d-69aa67f64204)

### Sign In
POST /v1/auth/signin \
![image](https://github.com/VarshaSingh-11/saas-platform/assets/80753426/d5c90172-5c25-47af-9c7a-e3a8944c51dc)

### Get Me
GET /v1/auth/me \
![image](https://github.com/VarshaSingh-11/saas-platform/assets/80753426/f42fd6b9-7a42-4e0a-b1c2-736fd2d97059)

### Create Community
POST /v1/community (Authorization Bearer Token is also sent) \
![image](https://github.com/VarshaSingh-11/saas-platform/assets/80753426/23143337-17d9-41b8-ac61-0fb477ca22b9)

### Get All Communities
GET /v1/community \
![image](https://github.com/VarshaSingh-11/saas-platform/assets/80753426/24879637-3216-4214-a085-16b06bf80c6d)

### Get Community Members
GET /v1/community/VarshaDen/members \
![image](https://github.com/VarshaSingh-11/saas-platform/assets/80753426/3361412a-4ad0-45fe-ba6a-bde40c71a7d1)

### Get Owned Communities
GET /v1/community/me/owner \
![image](https://github.com/VarshaSingh-11/saas-platform/assets/80753426/ffb53dd6-0ade-4d08-b552-ad1f7e75194c)

### Get Communities I am in
GET /v1/community/me/member \
![image](https://github.com/VarshaSingh-11/saas-platform/assets/80753426/c0919827-b5f1-4175-9ae1-161a8cef4cbf)

### Add Member
POST /v1/member \
![image](https://github.com/VarshaSingh-11/saas-platform/assets/80753426/6f7d96f0-1728-4d6c-b3f3-c141294fae8e)

### Remove Member
DELETE /v1/member \
![image](https://github.com/VarshaSingh-11/saas-platform/assets/80753426/f6bfd503-2332-45eb-a48f-4c7057b8f3d6)
