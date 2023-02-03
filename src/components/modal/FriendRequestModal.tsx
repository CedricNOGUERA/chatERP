import React from 'react'
import { Accordion, Button, Col, Form, InputGroup, ListGroup, Modal, Row } from 'react-bootstrap';
import useAuthStore from '../../store/userAuthStore';
import { _getUserData } from '../../util/function';
import { _getFriendInvite, _getFriendsFriendArea, _getUserDataExemptMe, _getUserId  } from '../../util/functionBis';
import { _getFriendRequest } from '../../util/functionBis';
import { supabase } from '../../util/supabaseClient';

const FriendRequestModal = ({show, handleClose, handleShow2, allUserExceptMe, setAllUserExceptMe }: any) => {
  
    const [allUser, setAllUser] = React.useState<any>([]);
    const [friends, setFriends] = React.useState<any>([]);
    const [requestedFriend, setRequestedFriends] = React.useState<any>([]);
    const [invitedFriends, setInvitedFriends] = React.useState<any>([]);
    const [allFriends, setAllFriends] = React.useState<any>([]);
    const [go, setGo] = React.useState<any>([]);
    const [userAllId, setUserAllId] = React.useState<any>([]);
    const [testAgain, setTestAgain] = React.useState<any>([]);
    const [searchUser, setSearchUser] = React.useState<string>("");


    const dataStore = useAuthStore((state: any) => state);
        
    // const allfriends = friends?.friends?.concat(
    //   requestedFriend?.friends_list,
    //   invitedFriends?.askers_list
    // );
   

    React.useEffect(() => {
        
        _getUserData(setAllUser)
        _getFriendsFriendArea(setFriends, dataStore.id)
        _getFriendRequest(dataStore.id, setRequestedFriends)
        _getFriendInvite(dataStore.id, setInvitedFriends)
        _getUserId(setUserAllId)

      }, []);

   
      React.useEffect(() => {
        setAllFriends(
          friends?.friends?.concat(
            requestedFriend && requestedFriend?.friends_list,
            invitedFriends && invitedFriends?.askers_list
          )
        );
        
      }, [invitedFriends]);
      React.useEffect(() => {
        
        noFriend(userAllId)

      }, [allUser]);
      React.useEffect(() => {
        setTestAgain(new Set(go.concat(allFriends)))
        

      }, [go]);
      
      const noFriend = (data: any) => {
  
        setGo(data.map((id: any)=> (
  
          (id.id)
        )))
        
      }
      const test = allFriends?.map((friendId: any) => allUser?.filter((user: any) => user.id !== friendId))
    
      const getUsernameByInputResearch = async() => {

        let {data, error} = await supabase
        .from('users')
        .select ('*')
        .eq('first_name', searchUser)
      }
      


      const retry = allUserExceptMe?.filter(
        (user: any, indx: any) =>
          dataStore.id !=
            user?.friendArea[0]?.friends?.filter(
              (friend: any) => friend === dataStore.id
            ))


      const found = retry.find((user: any) => user.first_name === searchUser )

     
      

    console.log(found)
    console.log(retry)
    // console.log(searchUser)
  


return (
  <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
    <Modal.Header closeButton>
      <Modal.Title>Envoyer une demande d'ami</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <InputGroup className="mb-3 ">
        <InputGroup.Text id="search-input" className="border-0">
          <i className="ri-user-search-line text-primary fs-3"></i>
        </InputGroup.Text>
        <Form.Control
          className="border-0 bg-light"
          placeholder="Recherche un contact..."
          aria-label="search-contact"
          aria-describedby="search-input"
          value={searchUser}
          onChange={(e) => setSearchUser(e.currentTarget.value)}
        />
      </InputGroup>

      {found ? (
        <Accordion defaultActiveKey={["0"]} alwaysOpen>
          <Accordion.Item eventKey="0">
            <Accordion.Header>Sélectionne un ami</Accordion.Header>
            <Accordion.Body>
              <ListGroup variant="flush">
                <ListGroup.Item
                  key={found?.id}
                  action
                  variant="primary"
                  onClick={() => {
                    handleClose();
                    handleShow2(found?.id);
                  }}
                >
                  <Row className="w-100 ps-3">
                    <>
                      <Col>
                        <span className="flex-shrink-0 chat-user-img online user-own-img align-self-center me-3 ms-0">
                          <img
                            src={found?.avatar}
                            className="rounded-circle avatar-xs"
                            alt="avatar"
                          />
                        </span>
                      </Col>
                      <Col className="m-auto">
                        {found?.first_name} {found?.last_name}
                      </Col>
                    </>
                  </Row>
                </ListGroup.Item>
              </ListGroup>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      ) : (
        <Accordion defaultActiveKey={["0"]} alwaysOpen>
          <Accordion.Item eventKey="0">
            <Accordion.Header>Sélectionne un ami</Accordion.Header>
            <Accordion.Body>
              <ListGroup variant="flush">
                {allUserExceptMe &&
                  allUserExceptMe?.map(
                    (user: any, indx: any) =>
                      dataStore.id !=
                        user?.friendArea[0]?.friends?.filter(
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
                                    alt="avatar"
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
      )}
    </Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={handleClose}>
        Close
      </Button>
    </Modal.Footer>
  </Modal>
);
}

export default FriendRequestModal