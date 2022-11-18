import { useMutation, useQueryClient } from "@tanstack/react-query"
import { API } from "configs/api"
import { gql } from "graphql-request"
import { gqlError } from "helpers/gqlError"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { CreateOwnerInput } from "../dto"
import { IOwner } from "../interfaces"

export default function useCreateOwner(onClose: () => void) {
  const methods = useForm<CreateOwnerInput>()
  const queryClient = useQueryClient()
  const { mutateAsync, isLoading } = useMutation(
    async (data: CreateOwnerInput) =>
      (
        await API.request<{ createOwner: IOwner }, CreateOwnerInput>(
          gql`
            mutation ($name: String!) {
              createOwner(createOwnerInput: { name: $name }) {
                id
                name
              }
            }
          `,
          data,
        )
      ).createOwner,
  )

  const handleSubmit = methods.handleSubmit((data: CreateOwnerInput) => {
    toast.promise(mutateAsync(data), {
      loading: "Creating a owner...",
      error: gqlError,
      success() {
        onClose()
        methods.reset()
        queryClient.invalidateQueries(["get-owners"])
        return "Created a owner successfully"
      },
    })
  })

  return {
    methods,
    handleSubmit,
    isLoading,
  }
}
