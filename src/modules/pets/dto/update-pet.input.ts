import { CreatePetInput } from "."

export interface UpdatePetInput extends Partial<CreatePetInput> {
  id: number
}
