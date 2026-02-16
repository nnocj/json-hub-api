🚀 json-hub-api

A flexible, secure, and lightweight JSON document storage API built with Node.js, Express, and PostgreSQL.

json-hub-api allows users and organizations to store structured JSON data inside a simple document + folder system — all within a single database table — while supporting full CRUD operations and secure access via passkeys.

🌍 Why This Exists

This project was inspired by the need for a backend that simply accepts and stores JSON data without requiring predefined schemas.

Instead of building custom backends for every small app or prototype, json-hub-api acts as a:

JSON-as-a-Service backend

It enables developers to focus on frontend logic while this API handles structured storage securely.

🧠 Core Concept

All documents are stored in a single table with the following structure:

Field	Description
title	Name of the document
folder	Logical grouping (e.g., orders, messages, logs)
owner	User or company name
passkey_hash	Encrypted secret key
data	JSON content
created_at	Timestamp of creation
updated_at	Timestamp of last update

This creates a flexible document hub capable of supporting multiple use cases inside one database.

🔐 Security Model

Each document is:

Tied to an owner

Protected by a secret passkey (bcrypt hashed)

Only users with valid credentials can:

Fetch documents

Update documents

Delete documents

List documents

No raw passkeys are stored.

⚙️ Features
✅ Create Document

Store any valid JSON under a folder and owner.

✅ Fetch Document (Secure)

Retrieve a single document using:

title

folder

owner

secret_passkey

✅ Update Document

Modify:

Title

Folder

Owner

Passkey

JSON data (full replacement)

✅ Delete Document

Securely remove a document.

✅ List Documents by Folder

Filter using:

owner

folder

secret_passkey

Perfect for retrieving:

All orders

All messages

All logs

All reports

📦 Real-World Use Cases
🛒 E-commerce Prototype

Store incoming orders under:

folder: "orders"


Frontend dashboards can fetch and display all orders in real time.

💬 Messaging System

Store messages under:

folder: "messages"


Retrieve all messages in one API call.

📊 Admin Dashboard

Store:

Logs

Activity reports

Analytics data

All organized by folders.

🎓 Educational CRUD Teaching Tool

Demonstrate:

Create

Read

Update

Delete

Without complex database schemas.

🚀 Rapid Prototyping Engine

Build functional backend systems in days instead of weeks.

Use this API as the backend for:

School systems

Workforce apps

Marketplaces

Book platforms

Internal tools

🏗️ Tech Stack

Node.js (ES Modules)

Express.js

PostgreSQL

bcrypt

Swagger (API documentation)

Render (Cloud PostgreSQL hosting)

📄 API Documentation

Swagger UI available at:

/docs

🧪 Example Request
Create Document
POST /api/documents/create

{
  "title": "Order_001",
  "folder": "orders",
  "owner": "Acme Corp",
  "secret_passkey": "mySecret123",
  "data": {
    "customer": "John Doe",
    "items": 3,
    "total": 120
  }
}

🎯 Design Philosophy

This API intentionally:

Does not enforce strict schemas

Does not create multiple relational tables

Does not restrict JSON structure

Instead:

The frontend defines structure.
The API securely stores and retrieves it.

Ideal for:

Prototypes

Small apps

Learning projects

Flexible internal tools

⚖️ Trade-Off

The single-table JSON storage approach prioritizes:

✔ Simplicity
✔ Flexibility
✔ Speed
✔ Rapid development

Over:

✖ Complex relational querying
✖ Heavy analytics
✖ Enterprise-scale normalization

🚀 Future Improvements

JWT-based authentication

Owner-level authentication system

Rate limiting

Optional JSON schema validation

Folder-level indexing

Advanced querying features

👨🏽‍💻 Author

Nicholas Commey
Backend Developer | Systems Thinker | Product Builder

💡 One Sentence Summary

json-hub-api is a secure, flexible JSON document hub that allows developers and organizations to store and manage structured data without rigid schemas — enabling rapid backend development and real-world experimentation.