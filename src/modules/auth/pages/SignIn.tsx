import { Button, Input } from "@chakra-ui/react"
import { useSignIn } from "modules/auth/hooks"

export default function SignIn() {
  const {
    methods: { register },
    handleSubmit,
  } = useSignIn()

  return (
    <div className="h-screen flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm p-4 space-y-2 rounded-md shadow-2xl"
      >
        <Input placeholder="Username" {...register("username")} />
        <Input
          type="password"
          placeholder="Password"
          {...register("password")}
        />
        <div className="grid grid-cols-2 gap-2">
          <Button type="submit" colorScheme="green">
            Sign in
          </Button>
          <Button>Sign up</Button>
        </div>
      </form>
    </div>
  )
}
