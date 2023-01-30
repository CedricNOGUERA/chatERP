import React from 'react'
import { Accordion, Button, Col, ListGroup, Modal, Row } from 'react-bootstrap';
import useAuthStore from '../../store/userAuthStore';

const FriendRequestModal = ({show, handleClose, handleShow2, allUserExceptMe }: any) => {
  
    const dataStore = useAuthStore((state: any) => state);
  
  
    return (
    <Modal
    show={show}
    onHide={handleClose}
    backdrop="static"
    keyboard={false}
  >
    <Modal.Header closeButton>
      <Modal.Title>Envoyer une demande d'ami</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <Accordion defaultActiveKey={["0"]} alwaysOpen>
        <Accordion.Item eventKey="0">
          <Accordion.Header>Choisissez un ami</Accordion.Header>
          <Accordion.Body>
            <ListGroup variant="flush">
              {allUserExceptMe &&
                allUserExceptMe?.map(
                  (user: any, indx: any) =>
                    dataStore.id != user?.friendArea[0]?.friends?.filter(
                        (friend: any) => friend == dataStore.id
                      ) && (
                      <ListGroup.Item
                        key={user.id}
                        action
                        variant="primary"
                        onClick={() => {
                          handleClose();
                          handleShow2(user.id);
                        }}
                      >
                        <Row className="w-100 ps-3">
                          <>
                            <Col>
                              <span className="flex-shrink-0 chat-user-img online user-own-img align-self-center me-3 ms-0">
                                <img
                                  src={user.avatar}
                                  className="rounded-circle avatar-xs"
                                  alt=""
                                />
                              </span>
                            </Col>
                            <Col className="m-auto">
                              {user.first_name} {user.last_name}
                            </Col>
                          </>
                          {/* // )} */}
                        </Row>
                      </ListGroup.Item>
                    )
                )}
            </ListGroup>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={handleClose}>
        Close
      </Button>
    </Modal.Footer>
  </Modal>
  )
}

export default FriendRequestModal