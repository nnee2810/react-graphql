import { useMutation, useQueryClient } from "@tanstack/react-query"
import { API } from "configs/api"
import { gql } from "graphql-request"
import { IOwner } from "../interfaces"

export default function useDeleteOwner() {
  const queryClient = useQueryClient()

  return useMutation(
    (id: number) =>
      API.request<{ deleteOwner: IOwner }>(
        gql`
          mutation ($id: Int!) {
            deleteOwner(id: $id) {
              id
            }
          }
        `,
        { id },
      ),
    {
      onSuccess() {
        queryClient.invalidateQueries(["get-owners"])
      },
    },
  )
}
