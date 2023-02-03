import React from 'react'
import { Button, Col, ListGroup, Modal, Row } from 'react-bootstrap';
import useAuthStore from '../../store/userAuthStore';
import { _getFriendRequest } from '../../util/functionBis';
import { supabase } from '../../util/supabaseClient';

const FriendRequestValidationCopy = ({show2, handleClose2, selectedFriend, frInvite, invite
  , friendRequest
}: any) => {
  
  const [frRequest, setFrRequest] = React.useState<any>([]);


  console.log(frInvite.askers_list)
  console.log(invite.askers_list)
  console.log(frRequest.friends_list)

  const dataStore = useAuthStore((state: any) => state)


  React.useEffect(() => {
    _getFriendRequest(dataStore.id, setFrRequest)
    
  }, [])






  const friendRequest2 = async(friend: any) => {

    if(frRequest.friends_list){
        const newFriendsList = [...frRequest.friends_list, friend.id]
      

        const { data, error } = await supabase 
      .from('frRequest')
      .update({
        friends_list: newFriendsList
      })
      .eq('asker_id', dataStore.id)
      

    }
    else{

    

      const { data, error } = await supabase 
      .from('frRequest')
      .insert([{
        asker_id: dataStore.id,
        friends_list:[ friend.id]
      }])
    }



    if(invite.askers_list){
      const newFriendsList = [...invite.askers_list, dataStore.id]
    

      const { data, error } = await supabase 
    .from('frInvite')
    .update({
      askers_list: newFriendsList
    })
    .eq('invite_id', friend.id)
    

  }
  else{
  
      
      const { data: frInvites, error: errors } = await supabase 
      .from('frInvite')
      .insert([{
        invite_id: friend.id,
        askers_list:[dataStore.id]
      }])
    }
  }



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
              // friendRequest2(selectedFriend);
              handleClose2();
            }}
          >
            Valider
          </Button>
        </Modal.Footer>
      </Modal>
  )
}

export default FriendRequestValidationCopy