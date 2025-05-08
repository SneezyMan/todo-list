import { getData } from "./datastore";

export function clear() {
  let data = getData();
  data = {
    users: [],
    lists: [],
  }
};