export type User = {_id:string, firstName: string, lastName: string,  email: string, createAt: Date, updateAt: Date }
export type UserList = Array<User & { password: string }>