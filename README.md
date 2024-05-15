# Indian House - Hotel Management System - Online Food Ordering System - Reservation System

# Project Overview: 

The project aims to develop an online food ordering system for "Indian House," a hotel in France(Lille). The 
system will allow customers to browse the menu, place food orders, make table reservations, and pay online. It 
will also include an admin interface for managing orders, reservations, payments, complaints, and issues.

# Key Features

1. User DashBoard
2. Admin DashBoard
3. User Auth
4. Order Placement 
5. Payment Gateway
6. Reservation System
7. Complaint System
8. Issue System
9. Feedback System
10. Cart
11. Order Tracking



## Installation Guide

``` git clone https://github.com/ShamiGondal/Hotel-Managemet-System-Admin-Side.git ```
``` npm install ```
``` cd ./Client ```
``` npm run start ```
``` cd .. ```
``` cd ./Server ```
Chnage to apiUri to
``` http://localhost:4000/```
Then 
``` nodemon ./app.js ```

# Client Side /Customer Side

 [Hotel Management Sytem | Online Food Ordering System ](https://github.com/ShamiGondal/Hotel-Management-Sytem-Online-Food-Ordering-System-)
 
 ## Previews
 
 [Actual Site / Client Side](https://indian-house-restaurant.netlify.app/)
 
 [Admin Side](https://indian-house-admin-panel.netlify.app/)
 

# 💻 Tech Stack:
![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white) ![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E) ![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white) ![Netlify](https://img.shields.io/badge/netlify-%23000000.svg?style=for-the-badge&logo=netlify&logoColor=#00C7B7) ![Vercel](https://img.shields.io/badge/vercel-%23000000.svg?style=for-the-badge&logo=vercel&logoColor=white) ![Bootstrap](https://img.shields.io/badge/bootstrap-%238511FA.svg?style=for-the-badge&logo=bootstrap&logoColor=white) ![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white) ![NPM](https://img.shields.io/badge/NPM-%23CB3837.svg?style=for-the-badge&logo=npm&logoColor=white) ![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white) ![MySQL](https://img.shields.io/badge/mysql-4479A1.svg?style=for-the-badge&logo=mysql&logoColor=white) ![Git](https://img.shields.io/badge/git-%23F05033.svg?style=for-the-badge&logo=git&logoColor=white) ![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white) ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB) ![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB) ![Postman](https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=postman&logoColor=white)


# Hostings

1. Laragon + Avein Database MY SQL
2. Render Backend
3. Netlify Frontend

# Extra 

1. Stripe Payment

## Documentations 

[SRS Report ](https://drive.google.com/file/d/1RFLrinnl9qDXWaWxQeFJFwp64AIJL4o_/view?usp=sharing)
[Docs](https://drive.google.com/file/d/1W4np522xeTU5-y0dkTpf5JbI1e9HqrcO/view?usp=sharing)


## Cover Image

![Repository Cover Image](./assets/image-1.png)

## EndPoints to use

# Create User
curl -X POST http://localhost:4000/api/CreateUser

# Login
curl -X POST http://localhost:4000/api/login

# Get Customer
curl http://localhost:4000/api/getCustomer

# Add Food Items
curl -X POST http://localhost:4000/api/addFoodItems

# Place Order
curl -X POST http://localhost:4000/api/placeOrder

# Create Reservation
curl -X POST http://localhost:4000/api/createReservation

# Submit Feedback
curl -X POST http://localhost:4000/api/submitFeedback

# Add Address
curl -X POST http://localhost:4000/api/addAddress

# Add Admin
curl -X POST http://localhost:4000/api/addAdmin

# Admin Login
curl -X POST http://localhost:4000/api/adminLogin

# Get Customers
curl http://localhost:4000/api/getCustomers

# Get Admins
curl http://localhost:4000/api/getAdmins

# Get Addresses
curl http://localhost:4000/api/getAddresses

# Get Food Items
curl http://localhost:4000/api/getFoodItems

# Get Orders
curl http://localhost:4000/api/getOrders

# Get Reservations
curl http://localhost:4000/api/getReservations

# Get Feedback
curl http://localhost:4000/api/getFeedback

# My Reservations
curl http://localhost:4000/api/my-reservations

# My Orders
curl http://localhost:4000/api/my-orders

# Add Complaints
curl -X POST http://localhost:4000/api/addComplaints

# My Complaints
curl http://localhost:4000/api/my-complaints

# Reports
curl http://localhost:4000/api/reports

# Update Reservation Status
curl -X PUT http://localhost:4000/api/updateReservationStatus/56

# Update Order Status
curl -X PUT http://localhost:4000/api/updateOrderStatus/1

# Update Complaint Status
curl -X PUT http://localhost:4000/api/updateComplaintStatus/1

# Get Complaints
curl http://localhost:4000/api/getComplaints

# Update Payment Status
curl -X PUT http://localhost:4000/api/updatePaymentStatus/1

# Get Payments
curl http://localhost:4000/api/getpayments

# My Payments
curl http://localhost:4000/api/my-payments

# Edit Food Item
curl -X PUT http://localhost:4000/api/editFoodItem/:foodItemId

# Add Addon
curl -X POST http://localhost:4000/api/addAddon

# Get Coupons
curl http://localhost:4000/api/getCoupons

# Get Addons
curl http://localhost:4000/api/getAddons

# Pending Reservation
curl http://localhost:4000/api/pendingReservation

# Pending Orders
curl http://localhost:4000/api/pendingOrders

# Notifications - Customer
curl http://localhost:4000/api/notifications/customer

# Notifications - Promotions
curl http://localhost:4000/api/notifications/promotions

# Mark Notification as Read
curl -X PUT http://localhost:4000/api/notifications/:id/read


# Contributer 

[Ahmed Naeem ](https://github.com/ahmadnaeem313)
[Hannan Ali](https://github.com/hannan112)