import {
  Alert,
  Button,
  Spinner,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useBoolean,
} from "@chakra-ui/react"
import { gqlError } from "helpers/gqlError"
import { useState } from "react"
import toast from "react-hot-toast"
import { AiOutlineClose, AiOutlineEdit } from "react-icons/ai"
import { Link } from "react-router-dom"
import { ModalCreatePet, ModalUpdatePet } from "../components"
import { useDeletePet, useGetPets } from "../hooks"

export default function Pets() {
  const { data, isLoading } = useGetPets()
  const { mutateAsync: deletePet } = useDeletePet()
  const [openCreate, setOpenCreate] = useBoolean()
  const [selectUpdateId, setSelectUpdateId] = useState(0)

  const handleDelete = (id: number) => {
    toast.promise(deletePet(id), {
      loading: "Deleting a pet...",
      error: gqlError,
      success: "Deleted a pet successfully",
    })
  }

  return (
    <div className="space-y-2">
      <Button colorScheme="green" onClick={setOpenCreate.on}>
        Add pet
      </Button>
      <div>
        {isLoading ? (
          <Spinner />
        ) : data?.length ? (
          <TableContainer>
            <Table>
              <Thead>
                <Tr>
                  <Th>ID</Th>
                  <Th>Name</Th>
                  <Th>Type</Th>
                  <Th>Owner</Th>
                  <Th>Actions</Th>
                </Tr>
              </Thead>
              <Tbody>
                {data.map((item) => (
                  <Tr key={item.id}>
                    <Td>{item.id}</Td>
                    <Td>{item.name}</Td>
                    <Td>{item.type || "-"}</Td>
                    <Td>
                      {item.owner ? (
                        <Link to={`/owners/${item.owner.id}`}>
                          {item.owner.name}
                        </Link>
                      ) : (
                        "-"
                      )}
                    </Td>
                    <Td>
                      <div className="flex space-x-2">
                        <div
                          className="cursor-pointer"
                          onClick={setSelectUpdateId.bind(null, item.id)}
                        >
                          <AiOutlineEdit />
                        </div>
                        <div
                          className="cursor-pointer"
                          onClick={handleDelete.bind(null, item.id)}
                        >
                          <AiOutlineClose />
                        </div>
                      </div>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        ) : (
          <Alert status="error">No data</Alert>
        )}
      </div>
      <ModalCreatePet isOpen={openCreate} onClose={setOpenCreate.off} />
      <ModalUpdatePet
        data={data?.find((item) => item.id === selectUpdateId)}
        isOpen={!!selectUpdateId}
        onClose={setSelectUpdateId.bind(null, 0)}
      />
    </div>
  )
}
