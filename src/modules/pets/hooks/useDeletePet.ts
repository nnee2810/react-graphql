import { useMutation, useQueryClient } from "@tanstack/react-query"
import { API } from "configs/api"
import { gql } from "graphql-request"
import { IPet } from "../interfaces"

export default function useDeletePet() {
  const queryClient = useQueryClient()

  return useMutation(
    (id: number) =>
      API.request<{ deletePet: IPet }>(
        gql`
          mutation ($id: Int!) {
            deletePet(id: $id) {
              id
            }
          }
        `,
        { id },
      ),
    {
      onSuccess() {
        queryClient.invalidateQueries(["get-pets"])
      },
    },
  )
}
