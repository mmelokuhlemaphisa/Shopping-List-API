import { get, IncomingMessage, ServerResponse } from "http";
import { getItems, getItemById, addItem } from "../Controller/Items";
import { log } from "console";

// https://localhost:5000/items

export const itemsRoutes = async (
  req: IncomingMessage,
  res: ServerResponse
) => {
  if (req.url?.startsWith("/items")) {
    const parts = req.url.split("/");
    const id = parts[2] ? parseInt(parts[2]) : undefined;
    if (req.method === "GET" && !id) {
      res.writeHead(200, { "content-type": "application/json" });
      res.end(JSON.stringify(getItems()));
      return;
    }

    if (req.method === "GET" && id) {
      //   const item = getItemById(id);
      //   res.writeHead(song ? 200 : 404, { "content-type": "application/json" });
      //   res.end(JSON.stringify(song || { message: "Song not found" }));
      //   return;
      if (isNaN(id)) {
        res.writeHead(400, { "content-type": "application/json" });
        res.end(JSON.stringify({ error: "Invalid song ID" }));
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

    if (req.method === "POST") {
      let body = "";
      req.on("data", (chunk) => {
        body += chunk.toString();
      });

      req.on("end", () => {
        //
        //
        try {
          const { name, quantity, purchased } = JSON.parse(body);
          if (!name || typeof name !== "string") {
            res.writeHead(400, { "content-type": "application/json" });
            res.end(JSON.stringify({ error: "Name is required" }));
          }
          if (!quantity || typeof quantity !== "number") {
            res.writeHead(400, { "content-type": "application/json" });
            res.end(JSON.stringify({ error: "Quantity is required" }));
          }

          if (typeof purchased === "undefined" || typeof purchased !== "boolean") {
            res.writeHead(400, { "content-type": "application/json" });
            res.end(JSON.stringify({ error: "Purchased status is required" }));
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
    res.writeHead(405, { "content-type": "application/json" });
    res.end(JSON.stringify({ error: "Method Not Allowed on /items" }));
    return;
  }
};
