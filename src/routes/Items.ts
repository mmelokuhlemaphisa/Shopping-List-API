import { IncomingMessage, ServerResponse } from "http";
import {
  getItems,
  getItemById,
  addItem,
  updateItem,
  deleteItem,
} from "../Controller/Items";

// https://localhost:5000/items

export const itemsRoutes = async (
  req: IncomingMessage,
  res: ServerResponse
) => {
  if (req.url?.startsWith("/items")) {
    const parts = req.url.split("/");
    const id = parts[2] ? parseInt(parts[2]) : undefined;

    // GET /items → all items
    if (req.method === "GET" && !id) {
      res.writeHead(200, { "content-type": "application/json" });
      res.end(JSON.stringify(getItems()));
      return;
    }

    //GET /items/:id → single item by ID
    if (req.method === "GET" && id) {
      if (isNaN(id)) {
        res.writeHead(400, { "content-type": "application/json" });
        res.end(JSON.stringify({ error: "Invalid item ID" }));
        return;
      }

      const item = getItemById(id);
      if (!item) {
        res.writeHead(404, { "content-type": "application/json" });
        res.end(JSON.stringify({ error: "Item not found" }));
        return;
      }

      res.writeHead(200, { "content-type": "application/json" });
      res.end(JSON.stringify(item));
      return;
    }

    // POST /items → create new item
    if (req.method === "POST") {
      let body = "";
      req.on("data", (chunk) => {
        body += chunk.toString();
      });

      req.on("end", () => {
        try {
          const { name, quantity, purchased } = JSON.parse(body);

          if (!name || typeof name !== "string") {
            res.writeHead(400, { "content-type": "application/json" });
            res.end(JSON.stringify({ error: "Name is required" }));
            return;
          }
          if (!quantity || typeof quantity !== "string") {
            res.writeHead(400, { "content-type": "application/json" });
            res.end(JSON.stringify({ error: "Quantity must be a string" }));
            return;
          }
          if (
            typeof purchased === "undefined" ||
            typeof purchased !== "boolean"
          ) {
            res.writeHead(400, { "content-type": "application/json" });
            res.end(JSON.stringify({ error: "Purchased status is required" }));
            return;
          }

          const newItem = addItem(name, quantity, purchased);
          res.writeHead(201, { "content-type": "application/json" });
          res.end(JSON.stringify(newItem));
        } catch (error) {
          res.writeHead(400, { "content-type": "application/json" });
          res.end(JSON.stringify({ error: "Invalid JSON payload" }));
        }
      });
      return;
    }

    // PUT /items/:id → update an existing item
    if (req.method === "PUT" && id) {
      if (isNaN(id)) {
        res.writeHead(400, { "content-type": "application/json" });
        res.end(JSON.stringify({ error: "Invalid item ID" }));
        return;
      }

      let body = "";
      req.on("data", (chunk) => {
        body += chunk.toString();
      });

      req.on("end", () => {
        try {
          const { name, quantity, purchased } = JSON.parse(body);

          // Validate at least one field is provided
          if (
            typeof name === "undefined" &&
            typeof quantity === "undefined" &&
            typeof purchased === "undefined"
          ) {
            res.writeHead(400, { "content-type": "application/json" });
            res.end(
              JSON.stringify({
                error:
                  "At least one field (name, quantity, purchased) must be provided",
              })
            );
            return;
          }

          const updatedItem = updateItem(id, { name, quantity, purchased });

          if (!updatedItem) {
            res.writeHead(404, { "content-type": "application/json" });
            res.end(JSON.stringify({ error: "Item not found" }));
            return;
          }

          res.writeHead(200, { "content-type": "application/json" });
          res.end(JSON.stringify(updatedItem));
        } catch (error) {
          res.writeHead(400, { "content-type": "application/json" });
          res.end(JSON.stringify({ error: "Invalid JSON payload" }));
        }
      });
      return;
    }

    // DELETE /items/:id → Delete an item
    if (req.method === "DELETE" && id) {
      if (isNaN(id)) {
        res.writeHead(400, { "content-type": "application/json" });
        res.end(JSON.stringify({ error: "Invalid item ID" }));
        return;
      }

      const deleted = deleteItem(id);
      if (!deleted) {
        res.writeHead(404, { "content-type": "application/json" });
        res.end(JSON.stringify({ error: "Item not found" }));
        return;
      }

      res.writeHead(204, { "content-type": "application/json" }); // No Content
      res.end();
      return;
    }

    // Method not allowed
    res.writeHead(405, { "content-type": "application/json" });
    res.end(JSON.stringify({ error: "Method Not Allowed on /items" }));
    return;
  }
};
