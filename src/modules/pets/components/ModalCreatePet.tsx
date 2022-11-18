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
import { useCreatePet } from "../hooks"

export default function ModalCreatePet({ isOpen, onClose }: ModalProps) {
  const {
    methods: { register },
    handleSubmit,
    isLoading,
  } = useCreatePet(onClose)
  const { data: owners, isLoading: loadingOwners } = useGetOwners()

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <form onSubmit={handleSubmit}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create pet</ModalHeader>
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
              Create
            </Button>
          </ModalFooter>
        </ModalContent>
      </form>
    </Modal>
  )
}
