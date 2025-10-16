import { Item } from "../models/Items";

let items: Item[] = []; // assuming you already have a similar in-memory array

export function getItems() {
  return items;
}

export function getItemById(id: number) {
  return items.find((item) => item.id === id);
}

export function addItem(name: string, quantity: number, purchased: boolean) {
  const newItem = { id: Date.now(), name, quantity, purchased };
  items.push(newItem);
  return newItem;
}

export function updateItem(id: number, updates: Partial<Item>) {
  const item = items.find((i) => i.id === id);
  if (!item) return null;

  if (updates.name !== undefined) item.name = updates.name;
  if (updates.quantity !== undefined) item.quantity = updates.quantity;
  if (updates.purchased !== undefined) item.purchased = updates.purchased;

  return item;
}
