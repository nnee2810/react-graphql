import { ClientError } from "graphql-request"

export function gqlError(error: ClientError) {
  return error.response.errors?.[0].message || "Cannot handle request"
}
