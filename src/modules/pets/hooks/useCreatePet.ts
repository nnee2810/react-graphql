import { useMutation, useQueryClient } from "@tanstack/react-query"
import { API } from "configs/api"
import { gql } from "graphql-request"
import { gqlError } from "helpers/gqlError"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { CreatePetInput } from "../dto"
import { IPet } from "../interfaces"

export default function useCreatePet(onClose: () => void) {
  const methods = useForm<CreatePetInput>()
  const queryClient = useQueryClient()
  const { mutateAsync, isLoading } = useMutation(
    async (data: CreatePetInput) =>
      (
        await API.request<{ createPet: IPet }, CreatePetInput>(
          gql`
            mutation ($name: String!, $type: String, $ownerId: Int) {
              createPet(
                createPetInput: { name: $name, type: $type, ownerId: $ownerId }
              ) {
                id
                name
              }
            }
          `,
          data,
        )
      ).createPet,
  )

  const handleSubmit = methods.handleSubmit((data: CreatePetInput) => {
    toast.promise(mutateAsync(data), {
      loading: "Creating a pet...",
      error: gqlError,
      success() {
        onClose()
        methods.reset()
        queryClient.invalidateQueries(["get-pets"])
        return "Created a pet successfully"
      },
    })
  })

  return {
    methods,
    handleSubmit,
    isLoading,
  }
}
