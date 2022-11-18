import { Button } from "@chakra-ui/react"
import { Link, Outlet, useNavigate } from "react-router-dom"

export default function HomeLayout() {
  const navigate = useNavigate()

  const handleSignOut = () => {
    navigate("/auth/sign-in")
    localStorage.clear()
  }

  return (
    <div className="max-w-xl mx-auto">
      <div className="my-2 grid grid-cols-3 gap-2">
        <Link to="/pets">
          <Button className="w-full">Pets</Button>
        </Link>
        <Link to="/owners">
          <Button className="w-full">Owners</Button>
        </Link>
        <Button colorScheme="red" onClick={handleSignOut}>
          Sign out
        </Button>
      </div>
      <Outlet />
    </div>
  )
}
