import { Item } from "../models/Items";

let items: Item[] = [];

let currentId = 0;

export const getItems = (): Item[] => {
  return items;
};

export const getItemById = (id: number): Item | undefined => {
  const item = items.find((item) => item.id === id);
  return item;
};

export const addItem = (
  name: string,
  quantity: number,
  purchased: boolean
): Item => {
  const newItem: Item = {
    id: currentId++,
    name,
    quantity,
    purchased
  };
  items.push(newItem);
  return newItem;
};


