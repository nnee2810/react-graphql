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
} from "@chakra-ui/react"
import { ModalProps } from "interfaces"
import { useCreateOwner } from "modules/owners/hooks"

export default function ModalCreateOwner({ isOpen, onClose }: ModalProps) {
  const {
    methods: { register },
    handleSubmit,
    isLoading,
  } = useCreateOwner(onClose)

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <form onSubmit={handleSubmit}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create owner</ModalHeader>
          <ModalCloseButton />
          <ModalBody className="space-y-2">
            <Input placeholder="Name" {...register("name")} />
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
