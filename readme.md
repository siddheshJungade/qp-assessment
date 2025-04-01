# User Guide for QA-Assignment API

## Project Setup
To set up the project locally, follow these steps:

1. **Clone the repository:**
   ```sh
   git clone https://github.com/siddheshJungade/qp-assessment.git
   cd qp-assessment
   ```

2. **Install dependencies:**
   ```sh
   npm install
   ```

3. **Run the development server:**
   ```sh
   npm run dev
   ```

---

## Introduction
The QA-Assignment API provides endpoints for managing grocery items and orders. It includes functionality for administrators to create, update, delete, and fetch grocery items, as well as for users to browse items and place orders.

## Base URL
```
http://localhost:3000/api
```

## Authentication
Currently, the API does not require authentication. Future implementations may include authentication mechanisms.

---

# Admin Endpoints

## Create Grocery Item
**Endpoint:**
```
POST /admin/grocery-items
```
**Request Body:**
```json
{
  "name": "Apple Veniger t",
  "price": 1.99,
  "inventory": 100,
  "category": "Fruits"
}
```
**Response:**
- 201 Created: Grocery item successfully added.
- 400 Bad Request: Invalid data provided.

---

## Get All Grocery Items
**Endpoint:**
```
GET /admin/grocery-items
```
**Response:**
- 200 OK: Returns a list of grocery items.

---

## Delete Grocery Item
**Endpoint:**
```
DELETE /admin/grocery-items/:id
```
**Path Parameter:**
- `id` (integer) - ID of the grocery item to delete.

**Response:**
- 200 OK: Grocery item deleted.
- 404 Not Found: Item does not exist.

---

## Update Grocery Item
**Endpoint:**
```
PATCH /admin/grocery-items/:id
```
**Path Parameter:**
- `id` (integer) - ID of the grocery item to update.

**Request Body:**
```json
{
    "name": "Green Apple",
    "inventory": 200,
    "price": 2.49,
    "category": "Fruits",
    "description": "Fresh red apples"
}
```
**Response:**
- 200 OK: Item updated.
- 400 Bad Request: Invalid data.
- 404 Not Found: Item does not exist.

---

## Update Grocery Item Inventory
**Endpoint:**
```
PUT /admin/grocery-items/:id/inventory
```
**Path Parameter:**
- `id` (integer) - ID of the grocery item.

**Request Body:**
```json
{
    "inventory": 0
}
```
**Response:**
- 200 OK: Inventory updated.
- 404 Not Found: Item does not exist.

---

# User Endpoints

## Get All Grocery Items
**Endpoint:**
```
GET /user/grocery-items
```
**Response:**
- 200 OK: List of available grocery items.

---

## Place Order
**Endpoint:**
```
POST /user/:user_id/orders
```
**Path Parameter:**
- `user_id` (integer) - ID of the user placing the order.

**Request Body:**
```json
{
  "items": [
    {
      "groceryItemId": 1,
      "quantity": 5
    },
    {
      "groceryItemId": 2,
      "quantity": 3
    }
  ]
}
```
**Response:**
- 201 Created: Order placed successfully.
- 400 Bad Request: Invalid order data.

---

## Get Order Items
**Endpoint:**
```
GET /user/orders/:order_id/items
```
**Path Parameter:**
- `order_id` (integer) - ID of the order.

**Response:**
- 200 OK: Returns order details.
- 404 Not Found: Order not found.

---

# Test Endpoint
**Endpoint:**
```
GET /
```
**Response:**
- 200 OK: API is running.

---

## Notes
- Ensure the API is running on port `3000`.
- All endpoints return JSON responses.
- Future enhancements may include authentication and additional validation.

This user guide provides a structured overview of the API, ensuring easy integration and usage.


