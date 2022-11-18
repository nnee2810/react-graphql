import { IPet } from "modules/pets/interfaces/pet.interface"

export interface IOwner {
  id: number
  name: string
  pets: IPet[]
}
