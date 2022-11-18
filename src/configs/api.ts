import { GraphQLClient } from "graphql-request"

export const API = new GraphQLClient("http://localhost:5000/graphql", {
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
})
