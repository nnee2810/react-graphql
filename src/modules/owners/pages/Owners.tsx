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
import { MdOutlinePets } from "react-icons/md"
import {
  ModalCreateOwner,
  ModalOwnership,
  ModalUpdateOwner,
} from "../components"
import { useDeleteOwner, useGetOwners } from "../hooks"

export default function Owners() {
  const { data, isLoading } = useGetOwners()
  const { mutateAsync: deleteOwner } = useDeleteOwner()
  const [openCreate, setOpenCreate] = useBoolean()
  const [selectUpdateId, setSelectUpdateId] = useState(0)
  const [selectOwnerId, setSelectOwnerId] = useState(0)

  const handleDelete = (id: number) => {
    toast.promise(deleteOwner(id), {
      loading: "Deleting a owner...",
      error: gqlError,
      success: "Deleted a owner successfully",
    })
  }

  return (
    <div className="space-y-2">
      <Button colorScheme="green" onClick={setOpenCreate.on}>
        Add owner
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
                  <Th>Own</Th>
                  <Th>Actions</Th>
                </Tr>
              </Thead>
              <Tbody>
                {data.map((item) => (
                  <Tr key={item.id}>
                    <Td>{item.id}</Td>
                    <Td>{item.name}</Td>
                    <Td>{item.pets?.length || 0}</Td>
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
                          onClick={setSelectOwnerId.bind(null, item.id)}
                        >
                          <MdOutlinePets />
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
      <ModalCreateOwner isOpen={openCreate} onClose={setOpenCreate.off} />
      <ModalUpdateOwner
        data={data?.find((item) => item.id === selectUpdateId)}
        isOpen={!!selectUpdateId}
        onClose={setSelectUpdateId.bind(null, 0)}
      />
      <ModalUpdateOwner
        data={data?.find((item) => item.id === selectUpdateId)}
        isOpen={!!selectUpdateId}
        onClose={setSelectUpdateId.bind(null, 0)}
      />
      <ModalOwnership
        data={data?.find((item) => item.id === selectOwnerId)}
        isOpen={!!selectOwnerId}
        onClose={setSelectOwnerId.bind(null, 0)}
      />
    </div>
  )
}
