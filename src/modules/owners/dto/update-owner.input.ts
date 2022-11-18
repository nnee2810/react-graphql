import { CreateOwnerInput } from "./create-owner.input"

export interface UpdateOwnerInput extends Partial<CreateOwnerInput> {
  id: number
}
