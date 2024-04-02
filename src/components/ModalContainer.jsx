import { Modal } from "@mui/material";

export default function ModalContainer({ children }) {
  return (
    <Modal>
      {children}
    </Modal>
  );
}