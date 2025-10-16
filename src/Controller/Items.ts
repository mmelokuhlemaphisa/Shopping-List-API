import { Item } from "../models/Items";

let items: Item[] = []; // assuming you already have a similar in-memory array

let currentId = 1;

export function getItems() {
  return items;
}

export function getItemById(id: number) {
  return items.find((item) => item.id === id);
}

export const addItem = (
  name: string,
  quantity: number,
  purchased: boolean
): Item => {
  const newItem: Item = {
    id: currentId++,
    name,
    quantity,
    purchased,
  };
  items.push(newItem);
  return newItem;
};


export function updateItem(id: number, updates: Partial<Item>) {
  const item = items.find((i) => i.id === id);
  if (!item) return null;

  if (updates.name !== undefined) item.name = updates.name;
  if (updates.quantity !== undefined) item.quantity = updates.quantity;
  if (updates.purchased !== undefined) item.purchased = updates.purchased;

  return item;
}

export function deleteItem(id: number): boolean {
  const index = items.findIndex((item) => item.id === id);
  if (index === -1) return false; // Item not found

  items.splice(index, 1); 
  return true;
}
