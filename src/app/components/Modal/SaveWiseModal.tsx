import { Button, Col, Modal, Row } from "react-bootstrap"
import { CLOSE, CONFIRM } from "../../utilities/constants";
import { VARIANT } from "../../utilities/enums";

interface Props {
   isShown: boolean;
   message?: string;
   onClose?: () => void;
   onConfirm?: () => void;

}

const SaveWiseModal = ({
   isShown,
   message,
   onClose,
   onConfirm,
}: Props) => {
   console.log(message);
   return (
      <Modal
         show={isShown}
         size="sm"
         backdrop="static"
         keyboard={false}
         centered
      >
         <Modal.Body>
            <p>
               {message}
            </p>

            <Row>
               <Col>
                  <Button
                     variant={VARIANT.SECONDARY}
                     onClick={onClose}
                  >
                     {CLOSE}
                  </Button>
               </Col>

               <Col className="d-flex justify-content-end">
                  <Button
                     variant={VARIANT.PRIMARY}
                     onClick={onConfirm}
                  >
                     {CONFIRM}
                  </Button>
               </Col>
            </Row>
         </Modal.Body>
      </Modal>
   )
}

export default SaveWiseModal
