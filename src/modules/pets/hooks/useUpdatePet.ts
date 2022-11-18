import { useMutation, useQueryClient } from "@tanstack/react-query"
import { API } from "configs/api"
import { gql } from "graphql-request"
import { gqlError } from "helpers/gqlError"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { UpdatePetInput } from "../dto"
import { IPet } from "../interfaces"

export default function useUpdatePet(onClose?: () => void) {
  const methods = useForm<UpdatePetInput>()
  const queryClient = useQueryClient()
  const { mutateAsync, isLoading } = useMutation((data: UpdatePetInput) =>
    API.request<{ updatePet: IPet }, UpdatePetInput>(
      gql`
        mutation ($id: Int!, $name: String, $type: String, $ownerId: Int) {
          updatePet(
            updatePetInput: {
              id: $id
              name: $name
              type: $type
              ownerId: $ownerId
            }
          ) {
            id
            name
            type
            ownerId
          }
        }
      `,
      data,
    ),
  )

  const handleSubmit = methods.handleSubmit((data: UpdatePetInput) => {
    toast.promise(mutateAsync(data), {
      loading: "Updating a pet...",
      error: gqlError,
      success() {
        onClose?.()
        queryClient.invalidateQueries(["get-pets"])
        return "Updated a pet successfully"
      },
    })
  })

  const createOwnership = (ownerId: number, petId: number) => {
    toast.promise(
      mutateAsync({
        id: petId,
        ownerId: ownerId,
      }),
      {
        loading: "Creating ownership...",
        error: gqlError,
        success() {
          queryClient.invalidateQueries(["get-owners"])
          return "Created ownership"
        },
      },
    )
  }

  const deleteOwnership = (id: number) => {
    toast.promise(
      mutateAsync({
        id,
        ownerId: null,
      }),
      {
        loading: "Deleting ownership...",
        error: gqlError,
        success() {
          queryClient.invalidateQueries(["get-owners"])
          return "Deleted ownership"
        },
      },
    )
  }

  return {
    methods,
    handleSubmit,
    createOwnership,
    deleteOwnership,
    isLoading,
  }
}
