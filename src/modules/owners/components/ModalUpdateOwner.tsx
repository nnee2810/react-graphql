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
import { useEffect } from "react"
import { useUpdateOwner } from "../hooks"
import { IOwner } from "../interfaces"

interface ModalCreateOwnerProps extends ModalProps {
  data?: IOwner
}

export default function ModalCreateOwner({
  data,
  isOpen,
  onClose,
}: ModalCreateOwnerProps) {
  const {
    methods: { register, reset },
    handleSubmit,
    isLoading,
  } = useUpdateOwner(onClose)

  useEffect(() => {
    if (data) reset(data)
  }, [data, reset])

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <form onSubmit={handleSubmit}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update owner</ModalHeader>
          <ModalCloseButton />
          <ModalBody className="space-y-2">
            <Input placeholder="Name" {...register("name")} />
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
