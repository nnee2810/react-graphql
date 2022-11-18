import { useQuery } from "@tanstack/react-query"
import { API } from "configs/api"
import { gql } from "graphql-request"
import { IPet } from "../interfaces"

export default function useGetPets() {
  return useQuery(
    ["get-pets"],
    async () =>
      (
        await API.request<{ getPets: IPet[] }>(
          gql`
            query {
              getPets {
                id
                name
                type
                owner {
                  id
                  name
                }
                ownerId
              }
            }
          `,
        )
      ).getPets,
  )
}
