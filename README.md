# bike-showroom-management
A web-based bike showroom management system for inventory, sales, and customer tracking.
🏍️ Bike Showroom Management Dashboard

A full-stack Bike Showroom Management Dashboard built to manage and monitor daily showroom activities such as bike sales, stock, customers, employees, and reports.
The system supports role-based dashboards for Admin (Host) and Staff (Salesperson).

📌 Project Objective

To design and develop a dashboard application that helps a bike showroom:

Track bike inventory and stock

Manage customers and sales

Monitor daily and monthly performance

Provide role-based access for Admin and Staff

Improve efficiency and reduce paperwork

🛠️ Technology Stack
Frontend

React (TypeScript)

Ant Design (UI components)

Recharts & Ant Design Plots (Charts)

Redux Toolkit Query (API data fetching)

React Router DOM

Backend

Node.js

Express.js

MongoDB Atlas

Mongoose

JWT Authentication

Tools

VS Code

MongoDB Compass

Postman

🔐 Authentication & Roles

The system uses JWT-based authentication and supports two roles:

👑 Admin (Host)

Full access to all data

Can view overall showroom performance

Can manage staff, bikes, customers, and sales

Can view reports and analytics

👤 Staff (Salesperson)

Limited access

Can view only their own sales and customers

Can add customers and sales

Cannot access admin-level analytics or employee management

🔑 Default Admin Credentials

Use the following credentials to log in as Admin:

Username: admin
Password: admin123


⚠️ Note: Admin credentials are hardcoded / seeded in the database for this academic project.
Staff accounts are created by the Admin.

📊 Admin Dashboard Features

Total Bikes in Showroom

Available Stock

Bikes Sold Today

Total Customers

Total Sales Records

Total Revenue

Low Stock Alerts

Monthly Sales Trend (Line Chart)

Bike Stock Distribution (Pie Chart)

Top Selling Bike Models (Pie Chart)

Recent Sales Table

📈 Staff Dashboard Features

Available Bikes

Bikes Sold Today (by logged-in staff)

Customers Handled (by logged-in staff)

Today’s Sales Amount

Monthly Sales Trend (Personal Performance)

Bike Stock Overview (Pie Chart)

Top Selling Bike Models (Personal Sales)

Recent Sales by Staff

📌 Staff dashboard data is fully isolated using staffId and JWT authentication.
