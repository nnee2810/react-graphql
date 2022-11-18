import { useMutation } from "@tanstack/react-query"
import { API } from "configs/api"
import { gql } from "graphql-request"
import { gqlError } from "helpers/gqlError"
import { SignInInput, SignInResponse } from "modules/auth/dto/"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"

export default function useSignIn() {
  const navigate = useNavigate()
  const methods = useForm<SignInInput>()
  const { mutateAsync, isLoading } = useMutation(
    async (data: SignInInput) =>
      await API.request<SignInResponse>(
        gql`
          mutation {
            signIn(signInInput: { 
              username: "${data.username}"
              password: "${data.password}"
            }) {
              token
              user {
                username
              }
            }
          }
        `,
      ),
  )

  const handleSubmit = methods.handleSubmit((data: SignInInput) => {
    toast.promise(mutateAsync(data), {
      loading: "Loading",
      error: gqlError,
      success({ signIn: { token } }) {
        localStorage.setItem("token", token)
        API.setHeader("Authorization", `Bearer ${token}`)
        navigate("/")
        return "Sign in successfully"
      },
    })
  })

  return {
    methods,
    handleSubmit,
    isLoading,
  }
}
