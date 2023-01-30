import React from 'react'
import { Button, Col, ListGroup, Modal, Row } from 'react-bootstrap';

const FriendRequestValidation = ({show2, handleClose2, selectedFriend, friendRequest}: any) => {
  return (
    <Modal
        show={show2}
        onHide={handleClose2}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Confirmez la demande d'ami</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-end">
          <ListGroup variant="flush">
            <ListGroup.Item action variant="primary">
              <Row className="w-100 ps-3">
                <Col xs={3} className="m-auto text-start">
                  <span className="flex-shrink-0 chat-user-img online user-own-img align-self-center me-3 ms-0">
                    <img
                      src={selectedFriend?.avatar}
                      className="rounded-circle avatar-md"
                      alt="avatar"
                    />
                  </span>
                </Col>
                <Col className="m-auto text-center">
                  {selectedFriend?.first_name} {selectedFriend?.last_name}
                </Col>
              </Row>
            </ListGroup.Item>
          </ListGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" className="me-3" onClick={handleClose2}>
            Annuler
          </Button>
          <Button
            variant="success"
            onClick={() => {
              friendRequest(selectedFriend);
              handleClose2();
            }}
          >
            Valider
          </Button>
        </Modal.Footer>
      </Modal>
  )
}

export default FriendRequestValidation