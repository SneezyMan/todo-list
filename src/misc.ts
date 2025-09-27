export class HttpError extends Error {
  status: number;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

export type User = {
  userId: number,
  nameFirst: string,
  nameLast: string,
  email: string,
  password: string,
}

export type List = {
  listId: number,
  listName: string,
}