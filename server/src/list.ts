import { getData } from "./datastore";
import { Item, EmptyObj } from "./interface";

/**
 * @param {number} userId - userId to identify corresponding list
 * @param {string} name - name of Item
 * @param {string} description - description of Item
 * @param {number} dueDate - date which the Item is due
 * @param {number} dueMonth - month which the Item is due
 * @param {number} dueYear - year which the Item is due 
 */
export function addItem(userId: number, name: string, description: string,
  dueDate: number, dueMonth: number, dueYear: number): EmptyObj {

  const data = getData();
  const list = data.lists.find((list) => list.userId === userId);
  if (!list) {
    throw new Error("list with userId does not exist");
  }
  
  const onlySpaces = /^ *$/;
  if (onlySpaces.test(name)) {
    throw new Error("Name only contains spaces");
  }

  if (onlySpaces.test(description)) {
    throw new Error("Description only contains spaces");
  }

  if (dueDate < 1) {
    throw new Error("Date must be larger than 0");
  }
  if (dueMonth < 1 || dueMonth > 12) {
    throw new Error("Month must between 1 and 12");
  }
  if (dueYear < 0) {
    throw new Error("Year must be greater than 0");
  }

  const current = new Date();
  const due = new Date(dueYear, dueMonth - 1, dueDate);
  
  if (due.getTime() < current.getTime()) {
    throw new Error ("Due time has already past");
  }

  const newItem: Item = {
    name,
    description,
    due
  }
  list.upcoming.push(newItem);

  return {};
}