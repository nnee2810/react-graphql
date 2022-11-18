import { IUser } from "modules/users/interfaces"

export interface SignInResponse {
  signIn: {
    token: string
    user: IUser
  }
}
