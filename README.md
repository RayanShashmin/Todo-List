


Todo List
This is a Todo list application built using the (MongoDB, Express.js, React.js, Node.js) stack.

Features
CRUD Operations: Create, Read, Update, and Delete Todo items.
#Responsive UI: Simple and intuitive user interface built with React.
Persistent Storage: Todos are stored in a MongoDB database.
RESTful API: Backend API built with Node.js and Express.js.
Technologies Used
Frontend: React.js
Backend: Node.js, Express.js
Database: MongoDB

Getting Started
Prerequisites
Make sure you have the following installed:

Node.js
MongoDB
Installation
Clone the repository

bash
Copy code
git clone <repository-url>
Install dependencies

bash
Copy code
# Install server dependencies
npm install

# Install client dependencies
cd client
npm install
cd ..
Set up environment variables

Create a .env file in the root directory and add the following variables:

plaintext
Copy code
PORT=8080  # Port on which backend server will run
MONGODB_URI=mongodb://localhost:27017/todo-app  # MongoDB connection URI
Replace mongodb://localhost:27017/todo-app with your MongoDB URI.

Start the development server

bash
Copy code
# Start backend server
npm start

# Start frontend development server (in another terminal)
cd client
npm start
