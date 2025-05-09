export type Datastore = {
  users: User[],
  lists: List[],
}

export type User = {
  userId: number,
  email: string,
  password: string,
  nameFirst: string,
  nameLast: string,
}

export type List = {
  userId: number,
  completed: Item[],
  upcoming: Item[],
}

export type Item = {
  name: string,
  description: string,
  due: Date,
}

export type EmptyObj = {}
