import { useMutation, useQueryClient } from "@tanstack/react-query"
import { API } from "configs/api"
import { gql } from "graphql-request"
import { gqlError } from "helpers/gqlError"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { UpdateOwnerInput } from "../dto"
import { IOwner } from "../interfaces"

export default function useUpdateOwner(onClose: () => void) {
  const methods = useForm<UpdateOwnerInput>()
  const queryClient = useQueryClient()
  const { mutateAsync, isLoading } = useMutation(
    async (data: UpdateOwnerInput) =>
      (
        await API.request<{ updateOwner: IOwner }, UpdateOwnerInput>(
          gql`
            mutation ($name: String!) {
              updateOwner(updateOwnerInput: { name: $name }) {
                id
                name
              }
            }
          `,
          data,
        )
      ).updateOwner,
  )

  const handleSubmit = methods.handleSubmit((data: UpdateOwnerInput) => {
    toast.promise(mutateAsync(data), {
      loading: "Updating a owner...",
      error: gqlError,
      success() {
        onClose()
        methods.reset()
        queryClient.invalidateQueries(["get-owners"])
        return "Updated a owner successfully"
      },
    })
  })

  return {
    methods,
    handleSubmit,
    isLoading,
  }
}
