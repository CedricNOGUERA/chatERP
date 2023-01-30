import React from 'react'
import { Col, Row } from 'react-bootstrap';

const FriendsList = ({user, getConversation, active}: any) => {
  return (
    <li
                      key={user?.id_friend}
                      className={
                        active === user?.id_friend && user?.status === true
                          ? "py-2 bg-light border-3 border-start border-info border-end"
                          : "py-2 border-3 border-start border-white"
                      }
                      onClick={() => {
                        getConversation(
                          user?.id_friend && user?.id_friend,
                          user?.room && user?.room
                        );
                      }}
                    >
                      <Row className="w-100 ps-3">
                        <Col xs={2}>
                          <span className="flex-shrink-0 chat-user-img online user-own-img align-self-center me-3 ms-0">
                            <img
                              src={user?.avatar}
                              className="rounded-circle avatar-xs"
                              alt=""
                            />
                          </span>
                        </Col>
                        <Col className="m-auto">
                          {user?.first_name} {user?.last_name}
                          {user?.status !== true && "💘"}
                        </Col>
                      </Row>
                    </li>
  )
}

export default FriendsList