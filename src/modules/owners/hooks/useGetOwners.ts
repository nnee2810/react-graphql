import { useQuery } from "@tanstack/react-query"
import { API } from "configs/api"
import { gql } from "graphql-request"
import { IOwner } from "../interfaces"

export default function useGetOwners() {
  return useQuery(
    ["get-owners"],
    async () =>
      (
        await API.request<{ getOwners: IOwner[] }>(
          gql`
            query {
              getOwners {
                id
                name
                pets {
                  id
                  name
                  type
                }
              }
            }
          `,
        )
      ).getOwners,
  )
}
