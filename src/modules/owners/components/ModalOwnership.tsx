import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Select,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react"
import { ModalProps } from "interfaces"
import { useGetPets, useUpdatePet } from "modules/pets/hooks"
import { useForm } from "react-hook-form"
import { AiOutlineClose } from "react-icons/ai"
import { IOwner } from "../interfaces"

interface ModalOwnershipProps extends ModalProps {
  data?: IOwner
}
interface FormValues {
  petId: number
}

export default function ModalOwnership({
  data,
  isOpen,
  onClose,
}: ModalOwnershipProps) {
  const { handleSubmit, register, watch } = useForm<FormValues>()
  const selectPetId = watch("petId")
  const { data: pets, isLoading: loadingPets } = useGetPets()
  const { createOwnership, deleteOwnership } = useUpdatePet()

  const handleCreateOwnership = handleSubmit(({ petId }) => {
    if (!data) return
    createOwnership(data?.id, petId)
  })

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{data?.name}'s pets</ModalHeader>
        <ModalBody>
          <form onSubmit={handleCreateOwnership} className="flex space-x-2">
            <Select
              placeholder={loadingPets ? "Loading pets..." : "Pets..."}
              {...register("petId", {
                valueAsNumber: true,
              })}
            >
              {pets?.map((item) => (
                <option value={item.id}>{item.name}</option>
              ))}
            </Select>
            <Button type="submit" colorScheme="green" disabled={!selectPetId}>
              Add
            </Button>
          </form>
          <TableContainer>
            <Table>
              <Thead>
                <Tr>
                  <Th>ID</Th>
                  <Th>Name</Th>
                  <Th>Type</Th>
                  <Th>Actions</Th>
                </Tr>
              </Thead>
              <Tbody>
                {data?.pets?.map((item) => (
                  <Tr key={item.id}>
                    <Td>{item.id}</Td>
                    <Td>{item.name}</Td>
                    <Td>{item.type || "-"}</Td>
                    <Td>
                      <div className="flex space-x-2">
                        <div
                          className="cursor-pointer"
                          onClick={deleteOwnership.bind(null, item.id)}
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
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
