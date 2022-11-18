import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
} from "@chakra-ui/react"
import { ModalProps } from "interfaces"
import { useGetOwners } from "modules/owners/hooks"
import { useEffect } from "react"
import { useUpdatePet } from "../hooks"
import { IPet } from "../interfaces"

interface ModalUpdatePetProps extends ModalProps {
  data?: IPet
}

export default function ModalUpdatePet({
  data,
  isOpen,
  onClose,
}: ModalUpdatePetProps) {
  const {
    methods: { register, reset },
    handleSubmit,
    isLoading,
  } = useUpdatePet(onClose)
  const { data: owners, isLoading: loadingOwners } = useGetOwners()

  useEffect(() => {
    if (data) reset(data)
  }, [data, reset])

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <form onSubmit={handleSubmit}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update pet</ModalHeader>
          <ModalCloseButton />
          <ModalBody className="space-y-2">
            <Input placeholder="Name" {...register("name")} />
            <Input placeholder="Type" {...register("type")} />
            <Select
              placeholder={loadingOwners ? "Loading owners..." : "Owners..."}
              {...register("ownerId", {
                valueAsNumber: true,
              })}
            >
              {owners?.map((owner) => (
                <option value={owner.id} key={owner.id}>
                  {owner.name}
                </option>
              ))}
            </Select>
          </ModalBody>
          <ModalFooter>
            <Button type="submit" colorScheme="green" isLoading={isLoading}>
              Update
            </Button>
          </ModalFooter>
        </ModalContent>
      </form>
    </Modal>
  )
}
