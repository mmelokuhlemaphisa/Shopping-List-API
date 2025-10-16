<img src="https://socialify.git.ci/mmelokuhlemaphisa/Shopping-List-API/image?language=1&owner=1&name=1&stargazers=1&theme=Light" alt="Shopping-List-API" width="640" height="320" />


## Shopping-List-API
Perfect — here’s your **updated and complete README.md** with all **five CRUD endpoints** included (Add, Get All, Get by ID, Update, Delete).
This version also includes a clear example of how to test each endpoint.

---


## 🧾 Item Manager API

A simple Node.js + TypeScript API that manages a list of shopping items in memory.  
It allows you to **add**, **view**, **update**, and **delete** items using clean REST API routes.  
Perfect for learning **HTTP servers**, **TypeScript modules**, and **CRUD operations**.

---

## 🚀 Features

- ✅ Add new items  
- 📋 Get all items  
- 🔍 Get a single item by ID  
- ✏️ Update existing items  
- ❌ Delete items  
- 🧠 TypeScript-based, no database required  

---

## 🧩 Project Structure

```md
project/
├── src/
│   ├── models/
│   │   └── Items.ts          # Defines the Item interface
│   ├── utils/
│   │   └── response.ts       # JSON response helpers
│   ├── data/
│   │   └── itemsData.ts      # In-memory data and logic
│   ├── routes/
│   │   └── itemsRoutes.ts    # Route handling for /items endpoints
│   └── server.ts             # HTTP server setup
└── package.json

````

---

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/mmelokuhlemaphisa/Shopping-List-API.git

# Navigate into the project
cd item-manager-api

# Install dependencies
npm install
````

---

## 🧠 Scripts

```bash
# Run in development mode (auto-reload)
npm run dev

```

---

## 🧪 API Endpoints

### 🟩 Add an Item

**Endpoint:** `POST /items`
**Description:** Add a new item to the list.

**Request Body:**

```json
{
  "name": "Apples",
  "quantity": 5,
  "purchased": false
}
```

**Response Example:**

```json
{
  "id": 0,
  "name": "Apples",
  "quantity": 5,
  "purchased": false
}
```

---

### 🟦 Get All Items

**Endpoint:** `GET /items`
**Description:** Retrieve all items in the list.

**Response Example:**

```json
[
  { "id": 0, "name": "Apples", "quantity": 5, "purchased": false },
  { "id": 1, "name": "Bananas", "quantity": 3, "purchased": true }
]
```

---

### 🟨 Get a Single Item by ID

**Endpoint:** `GET /items/:id`
**Example:** `/items/1`

**Response Example:**

```json
{
  "id": 1,
  "name": "Bananas",
  "quantity": 3,
  "purchased": true
}
```

**Error Example:**

```json
{ "error": "Item not found" }
```

---

### 🟧 Update an Item

**Endpoint:** `PUT /items/:id`
**Description:** Update an existing item’s name, quantity, or purchased status.

**Request Body:**

```json
{
  "name": "Oranges",
  "quantity": 10,
  "purchased": true
}
```

**Response Example:**

```json
{
  "id": 1,
  "name": "Oranges",
  "quantity": 10,
  "purchased": true
}
```

---

### 🟥 Delete an Item

**Endpoint:** `DELETE /items/:id`
**Example:** `/items/0`

**Response Example:**

```json
{ "message": "Item deleted successfully" }
```

**Error Example:**

```json
{ "error": "Item not found" }
```

---

## 🧰 Technologies Used

* **Node.js** – Server runtime
* **TypeScript** – Static typing
* **HTTP module** – Native Node HTTP server
* **Nodemon** – Auto-reload for development

---

## 🧠 Example Workflow

1. **Add** a new item with `POST /items`
2. **View all** items with `GET /items`
3. **Fetch one** item with `GET /items/:id`
4. **Update** it using `PUT /items/:id`
5. **Delete** it with `DELETE /items/:id`

---


## 💬 Author

Created by **[Melokuhle Maphisa]**



