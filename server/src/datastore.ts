import { Datastore } from "./interface";

const datastore: Datastore = {
  users: [],
  lists: [],
}

export function getData() {
  return datastore;
}