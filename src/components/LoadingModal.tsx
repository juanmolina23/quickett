import { Modal, Spinner } from "react-bootstrap";

type ModalProps = {
  modalShow: boolean;
};

const LoadingModal = ({ modalShow }: ModalProps) => {
  return (
    <Modal
      show={modalShow}
      backdrop='static'
      keyboard={false}
      aria-labelledby='contained-modal-title-vcenter'
      centered
    >
      <Modal.Body className='d-flex justify-content-center'>
        <Spinner animation='grow' />
        <p>Logging in...</p>
      </Modal.Body>
    </Modal>
  );
};

export default LoadingModal;
