import { IOwner } from "modules/owners/interfaces"

export interface IPet {
  id: number
  name: string
  type: string
  owner?: IOwner
  ownerId?: number
}
