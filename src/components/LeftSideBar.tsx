import React from "react";
import {
  Accordion,
  Alert,
  Button,
  Col,
  Form,
  InputGroup,
  ListGroup,
  Modal,
  Row,
} from "react-bootstrap";
import useAuthStore from "../store/userAuthStore";
import {
  _getAllFriendAreaData,
  _getChatId,
  _getFriendArea,
  _getUserData,
  _getUserDataExemptMe,
  _getUserDataOnlyMe,
  _updateChatStatus,
} from "../util/function";
import { supabase } from "../util/supabaseClient";
import Swal from "sweetalert2";
import FriendsList from "./FriendsList";
import FriendRequestModal from "./modal/FriendRequestModal";
import FriendRequestValidation from "./modal/FriendRequestValidation";
import { v4 as uuidv4 } from 'uuid';

const LeftSideBar = ({ setRoomId }: any) => {

  const [allUserExceptMe, setAllUserExceptMe] = React.useState<any>([]);
  const [filteredUsers, setFilteredUsers] = React.useState<any>([]);
  const [active, setActive] = React.useState<any>();
  const [selectedFriend, setSelectedFriend] = React.useState<any>([]);
  const [allUser, setAllUser] = React.useState<any>([]);
  const [friendAreas, setFriendAreas] = React.useState<any>([]);
  const [inviteData, setInviteData] = React.useState<any>([]);
  const [inviteData2, setInviteData2] = React.useState<any>([]);

  ///Group state
  const [userChecked, setUserChecked] = React.useState<any>();
  const [userGrp, setUserGrp] = React.useState<any>([]);
  const [nameGrp, setNameGrp] = React.useState<any>("");

  
//***********************************************************
// ajouter un contact*/
  const [showContact, setShowContact] = React.useState<boolean>(false);
  const handleCloseContact = () => {
    setShowContact(false);
    setEyePassword(false);
    setEyePassword2(false);
    resetForm();
  };
  const handleShowContact = () => setShowContact(true);

//****************************************************
// demande d'ami*/
  const [show, setShow] = React.useState<boolean>(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

//****************************************************
// Confirmation de demande d'ami*/
  const [show2, setShow2] = React.useState<boolean>(false);

  const handleClose2 = () => setShow2(false);
  const handleShow2 = (id: any) => {
    const choise = allUserExceptMe?.filter((user: any) => user.id === id)
    setSelectedFriend(choise[0])
    setInviteData(choise[0])

    setShow2(true)
  };



  //****************************************************
// Confirmation de demande d'ami*/
  const [showDecision, setShowDecision] = React.useState<boolean>(false);

  const handleCloseDecision = () => setShowDecision(false);
  const handleShowDecision = (id: any) => {
    const choise = allUserExceptMe?.filter((user: any) => user.id === id)
    setSelectedFriend(choise[0])
    setShowDecision(true)
  };

//****************************************************
// Modal groupe*/
  const [showGrp, setShowGrp] = React.useState<boolean>(false);

  const handleCloseGrp = () => {
    setShowGrp(false)};
  const handleShowGrp = () => setShowGrp(true)

//*****************************************
// Store state */

  const dataStore = useAuthStore((state: any) => state);
  const authIdFriend = useAuthStore((state: any) => state.authIdFriend);

  //

//************************
// Form state */

  const [name, setName] = React.useState<string>("");
  const [lastname, setLastName] = React.useState<string>("");
  const [email, setEmail] = React.useState<string>("");
  const [avatar, setAvatar] = React.useState<string>("");
  const [pass, setPass] = React.useState<string>("");
  const [pass2, setPass2] = React.useState<string>("");

  const [eyePassword, setEyePassword] = React.useState<boolean>(false);
  const [eyePassword2, setEyePassword2] = React.useState<boolean>(false);
  


///**************************************** */
// useEffect

  React.useEffect(() => {
    _getUserDataExemptMe(setAllUserExceptMe, dataStore.id);
    _getFriendArea(setFriendAreas, dataStore.id);
    _getUserDataOnlyMe(setFilteredUsers, dataStore.id);
    _getUserData(setAllUser);
    // _getChatId(setMsgId)
    _getAllFriendAreaData(setInviteData2)
    subscribeFriendArea()
  }, []);
  
  
  ///************************ ***************/
  // Si demande d'ami, on récupère les data de l'invité dans "inviteData"
  React.useEffect(() => {
    if(selectedFriend?.id) {
      _getFriendArea(setInviteData, selectedFriend?.id);
      // _getUserDataOnlyMe(setInviteData, selectedFriend?.id);
    }
  }, [selectedFriend]);
  
  React.useEffect(() => {
    if(selectedFriend?.id) {
      _getFriendArea(setInviteData, selectedFriend?.id);
      // _getUserDataOnlyMe(setInviteData, selectedFriend?.id);
    }
    _getUserDataOnlyMe(setFilteredUsers, dataStore.id);
    _getUserDataExemptMe(setAllUserExceptMe, dataStore.id);
    subscribeFriendArea()
  }, [friendAreas]);

  
  React.useEffect(() => {
    _getUserDataExemptMe(setAllUserExceptMe, dataStore.id);
  }, [filteredUsers]);


  
  

  const resetForm = () => {
    setName("");
    setLastName("");
    setEmail("");
    setAvatar("");
    setPass("");
    setPass2("");
  };

  const addContact = async (e: any) => {
    e.preventDefault();

    const { data, error } = await supabase.from("users").insert([
      {
        first_name: name,
        last_name: lastname,
        email: email,
        avatar: avatar,
        username: `${name}@${lastname}`.toLocaleLowerCase(),
        pass: pass,
      },
    ]);

    if (!error) {
      console.log("c'est good");
      handleCloseContact();
      _getUserDataExemptMe(setAllUserExceptMe, dataStore.id);

      Swal.fire({
        customClass: {
          title: "text-light",
        },
        position: "top-end",
        padding: 10,
        icon: "success",
        title: "Contact ajouté",
        showConfirmButton: false,
        background: "#333",
        timer: 1800,
      });
    }
    console.log("contact added");
    if (error) {
      console.log(error);
      Swal.fire({
        position: "top-end",
        padding: 10,
        icon: "warning",
        title: "Une erreur s'est produite, merci de réessayer",
        showConfirmButton: false,
        timer: 2500,
      });
    }
  };

  const getConversation = (id: any, room: any) => {
    authIdFriend(id);
    setActive(id);
    setRoomId(room);
  };


  const friendRequest =  async(friend: any) => {
    const chatId = uuidv4();
 
    const { data, error } = await supabase.from("chatMessages2").insert([
      {
        id: chatId,
        user_id: dataStore.id,
        friend_id: friend?.id,
        users_msg: [],
        status: "pending"
      },
    ]);

    if(error){
      console.log(error)
    }

    if (!friendAreas || friendAreas.length === 0) {
    //demanadeur
    const { data: friendArea, error: errors } = await supabase.from("friendArea").insert([
      {

        host_id: dataStore.id,
        rooms: [
          {
            room: chatId,
            id_friend: friend?.id,
            first_name: friend?.first_name,
            last_name: friend?.last_name,
            avatar: friend?.avatar,
            status: "pending",
          },
        ],
        friends: [friend?.id],
      }
    ]);

    if(error){
      console.log(error);
    }

      console.log("first");
      subscribeFriendArea()
    } 
    else {

      const newTabRooms = [
        ...friendAreas?.rooms,
        {
          room: chatId,
          id_friend: friend?.id,
          first_name: friend?.first_name,
          last_name: friend?.last_name,
          avatar: friend?.avatar,
          status: "pending",

        },
      ];
      const newTabFriends = [...friendAreas?.friends, friend?.id];

      const { data, error } = await supabase
        .from("friendArea")
        .update({
          rooms: newTabRooms,
          friends: newTabFriends,
        })
        .eq("host_id", dataStore?.id);
        if(error){
          console.log(error)
        }
    }
    console.log("already");

    if (!error) {
      subscribeFriendArea()

    }
    
    if (!inviteData.rooms || inviteData.rooms?.length === 0) {
      const { data: friendAreaz, error: errorz } = await supabase.from("friendArea").insert([
        {
          host_id: friend?.id,
          rooms: [
            {
              room: chatId,
              id_friend: dataStore.id,
              first_name: dataStore.firstname,
              last_name: dataStore?.lastname,
              avatar: dataStore?.avatar,
              status: false,
            },
          ],
          friends: [dataStore?.id],
        },
      ]);
      
      if(error){
        console.log(error)
      }


      subscribeFriendArea()
    }
     else {

      const newTabRooms = [
        ...inviteData?.rooms,
       
            {
              room: chatId,
              id_friend: dataStore?.id,
              first_name: dataStore?.firstname,
              last_name: dataStore?.lastname,
              avatar: dataStore?.avatar,
              status: false,
            },
         
      ];
      
    
      const newTabFriends = [...inviteData?.friends, dataStore.id];
      
      const { data, error } = await supabase
        .from("friendArea")
        .update({
          rooms: newTabRooms,
          friends: newTabFriends,
        })
        .eq("host_id", friend?.id);
        
        if (!error) {
          console.log("friend");
          subscribeFriendArea()
        }
        if(error){
          console.log(error)
        }
    }
    subscribeFriendArea()
  };
  

  const acceptFriend = async(id: any) => {
    
    
    const askerData = selectedFriend?.friendArea[0]?.rooms?.filter((friend: any) => friend.id_friend === dataStore.id)
    const indx = selectedFriend?.friendArea[0]?.rooms?.findIndex((friend: any) => friend.id_friend === dataStore.id)
    
    const receiverData =  filteredUsers?.friendArea[0]?.rooms?.filter((user: any) => user?.id_friend === id)
    const indx2 =  filteredUsers?.friendArea[0]?.rooms?.findIndex((user: any) => user?.id_friend === id)

    console.log(askerData)
    console.log(indx)
    console.log(receiverData)
    console.log(indx2)
    
    
    const newData = {
      avatar: askerData && askerData[0]?.avatar,
      first_name: askerData && askerData[0]?.first_name,
      id_friend: askerData && askerData[0]?.id_friend,
      last_name: askerData && askerData[0]?.last_name,
      room: askerData && askerData[0]?.room,
      status: true,
    };
    
    
    const newTab = [...selectedFriend?.friendArea[0]?.rooms]
    newTab[indx] = newData
    
    const { data: friendArea, error: errors} = await supabase
  .from('friendArea')
  .update({ rooms: newTab })
  .eq('host_id', id)


  if(errors){
    console.log(errors)
  }


  const newData2 = {
    avatar: receiverData && receiverData[0]?.avatar,
    first_name: receiverData && receiverData[0]?.first_name,
    id_friend: receiverData && receiverData[0]?.id_friend,
    last_name: receiverData && receiverData[0]?.last_name,
    room: receiverData && receiverData[0]?.room,
    status: true,
  };
  const newTab2 = [...filteredUsers?.friendArea[0]?.rooms]
  newTab2[indx2] = newData2

  const { data, error } = await supabase
  .from('friendArea')
  .update({ rooms: newTab2 })
  .eq('host_id', dataStore.id)

  if(error){
    console.log(error)
  }
  

  _updateChatStatus(`${askerData[0]?.room}`)
  _getUserDataOnlyMe(setFilteredUsers, dataStore.id);

  setSelectedFriend([])

  }
console.log(selectedFriend)


  const refuseFriend = () => {

  }

  const memberGrp = (id: any) => {

userGrp.push(id)

  }


  const createGroup = async() => {
const myUuid = uuidv4()
    console.log(nameGrp)
    console.log(userGrp)

    const { data, error } = await supabase
  .from('groupArea')
  .insert([
    {  group_name: nameGrp, host_id: dataStore.id, rooms: myUuid, friends: userGrp },
  ])
  if(error){
    console.log(error)
  }


  const { data: groupMessages, error: errors } = await supabase
  .from('groupMessages')
  .insert([{
    id: myUuid,
    user_id: dataStore.id,
    msg: [],
    members: userGrp  
 } ])
if(errors){
  console.log(errors)
}

  }


  
  async function subscribeFriendArea() {
    const friendArea = supabase.channel('all-channel')
    .on(
      'postgres_changes',
      { event: '*', schema: 'public', table: 'friendArea' },
      (payload) => {
        console.log('Change received!', payload)
        _getUserDataOnlyMe(setFilteredUsers, dataStore.id)
       
    
      }
    )
    .on(
      'postgres_changes',
      { event: '*', schema: 'public', table: 'chatMessages2' },
      (payload) => {
        console.log('Change received!', payload)
        _getUserDataOnlyMe(setFilteredUsers, dataStore.id)
      }
    )
    .subscribe();
  }


  return (
    <div className="chat-leftsidebar">
      <div className="px-4 pt-4 mb-4">
        <div className="d-flex align-items-start">
          <div className="flex-grow-1">
            <h5 className="mb-4">Chats</h5>
          </div>
          <div className="flex-shrink-0">
            <div
              data-bs-toggle="tooltip"
              data-bs-trigger="hover"
              data-bs-placement="bottom"
              title="Add Contact"
            >
              <button type="button" className="btn btn-soft-success btn-sm">
                <i className="ri-add-line align-bottom"></i>
              </button>
            </div>
          </div>
        </div>
        <div className="search-box">
          <input
            type="text"
            className="form-control bg-light border-light"
            placeholder="Search here..."
          />
          <i className="ri-search-2-line search-icon"></i>
        </div>
      </div>
      <ul
        className="nav nav-tabs nav-tabs-custom nav-success nav-justified"
        role="tablist"
      >
        <li className="nav-item">
          <a
            className="nav-link active"
            data-bs-toggle="tab"
            href="#chats"
            role="tab"
          >
            Chats
          </a>
        </li>
        <li className="nav-item ">
          <a
            className="nav-link "
            data-bs-toggle="tab"
            href="#contacts"
            role="tab"
          >
            Contact
          </a>
        </li>
      </ul>
      <div className="tab-content text-muted">
        <div className="tab-pane active" id="chats" role="tabpanel">
          <div className="chat-room-list pt-3" data-simplebar>
            <div className="d-flex align-items-center px-4 mb-2">
              <div className="flex-grow-1">
                <h4 className="mb-0 fs-12 text-muted text-uppercase">
                  Direct Messages
                </h4>
              </div>
              <div className="flex-shrink-0">
                <div
                  data-bs-toggle="tooltip"
                  data-bs-trigger="hover"
                  data-bs-placement="bottom"
                  title="New Message"
                >
                  <button
                    type="button"
                    className="btn btn-soft-success btn-sm shadow-none"
                    onClick={handleShow}
                  >
                    <i className="ri-add-line align-bottom"></i>
                  </button>
                </div>
              </div>
            </div>

            <ul className="list-unstyled">
              {filteredUsers?.friendArea &&
                filteredUsers?.friendArea[0]?.rooms?.map((user: any) =>
                  user?.status === true ? (
                 
                    <FriendsList
                      user={user}
                      getConversation={getConversation}
                      active={active}
                    />
                  ) : null
                )}
            </ul>

            <div className="d-flex align-items-center mt-4 px-4 mb-2">
              <div className="flex-grow-1">
                <h4 className="mb-0 fs-12 text-muted text-uppercase">
                  Demande d'ami
                </h4>
              </div>
              <div className="flex-shrink-0">
                <div
                  data-bs-toggle="tooltip"
                  data-bs-trigger="hover"
                  data-bs-placement="bottom"
                  title="New Message"
                ></div>
              </div>
            </div>
            <ul className="list-unstyled">
              {filteredUsers?.friendArea &&
                filteredUsers?.friendArea[0]?.rooms?.map((user: any) =>
                  user.status === false ? (
                    <li key={user.id_friend} className="py-2">
                      <Row className="w-100 px-3 ">
                        <Col xs={2}>
                          <span className="flex-shrink-0 chat-user-img online user-own-img align-self-center me-3 ms-0">
                            <img
                              src={user.avatar}
                              className="rounded-circle avatar-xs"
                              alt=""
                            />
                          </span>
                        </Col>
                        <Col className="m-auto">
                          <Row className="">
                            <Col>
                              {user.first_name} {user.last_name}
                            </Col>

                            <Col xs={4} className="px-0">
                              <Row className="px-0">
                                <Col xs={6}>
                                  <button
                                    type="button"
                                    className="btn btn-soft-success btn-sm shadow-none"
                                    onClick={() => {
                                      // acceptFriend(user.id_friend);
                                      handleShowDecision(user.id_friend);
                                    }}
                                  >
                                    <i className="ri-add-box-line"></i>
                                  </button>
                                </Col>
                                <Col xs={6}>
                                  <button
                                    type="button"
                                    className="btn btn-soft-danger btn-sm shadow-none"
                                    onClick={refuseFriend}
                                  >
                                    <i className="ri-checkbox-indeterminate-line"></i>
                                  </button>
                                </Col>
                              </Row>
                            </Col>
                          </Row>
                        </Col>
                      </Row>
                    </li>
                  ) : null
                )}
            </ul>

            <div className="chat-message-list">
              <ul
                className="list-unstyled chat-list chat-user-list"
                id="userList"
              ></ul>
            </div>
            <div className="d-flex align-items-center px-4 mt-4 pt-2 mb-2">
              <div className="flex-grow-1">
                <h4 className="mb-0 fs-11 text-muted text-uppercase">
                  Channels
                </h4>
              </div>
              <div className="flex-shrink-0">
                <div
                  data-bs-toggle="tooltip"
                  data-bs-trigger="hover"
                  data-bs-placement="bottom"
                  title="Create group"
                >
                  <button
                    type="button"
                    className="btn btn-soft-success btn-sm"
                    onClick={handleShowGrp}
                  >
                    <i className="ri-add-line align-bottom"></i>
                  </button>
                </div>
              </div>
            </div>
            <div className="chat-message-list">
              <ul
                className="list-unstyled chat-list chat-user-list mb-0"
                id="channelList"
              ></ul>
            </div>
          </div>
        </div>
        <div className="tab-pane" id="contacts" role="tabpanel">
          <div className="chat-room-list pt-3" data-simplebar>
            <div className="sort-contact">
              <div className="d-flex align-items-center px-4 mb-2">
                <div className="flex-grow-1">
                  <h4 className="mb-0 fs-12 text-muted text-uppercase">
                    Ajouter un contact
                  </h4>
                </div>
                <div className="flex-shrink-0">
                  <div
                    data-bs-toggle="tooltip"
                    data-bs-trigger="hover"
                    data-bs-placement="bottom"
                    title="New Message"
                  >
                    <button
                      type="button"
                      className="btn btn-soft-success btn-sm shadow-none"
                      onClick={handleShowContact}
                    >
                      <i className="ri-user-add-line"></i>
                    </button>
                  </div>
                </div>
              </div>
              <ul className="list-unstyled">
                {allUserExceptMe?.map((user: any) => (
                  <li
                    key={user.id}
                    className="py-2"
                    // onClick={() => {
                    //   authIdFriend(user?.id && user?.id);
                    //   setActive(user?.id && user?.id);
                    //   setRoomId(user?.room && user?.room[0]?.room);
                    // }}
                  >
                    <Row className="w-100 ps-3">
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
                    </Row>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/*************************************** 
        Modal nouveau contact
         ***************************************/}
      <Modal
        show={showContact}
        onHide={handleCloseContact}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title className="">
            <i className="ri-user-add-line text-success"></i> Ajouter un
            {/* <i className="ri-contacts-book-2-line text-success"></i> Ajouter un */}
            {/* <i className="ri-contacts-book-2-fill text-success"></i> Ajouter un */}
            contact
          </Modal.Title>
        </Modal.Header>
        <Form id="add-a-contact-form" onSubmit={addContact}>
          <Modal.Body>
            <Row>
              <Col>
                <Form.Group className="mb-3" controlId="userName">
                  <Form.Label>Prénom</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    placeholder="prénom"
                    value={name}
                    onChange={(e) => setName(e.currentTarget.value)}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3" controlId="userLastName">
                  <Form.Label>Nom</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    placeholder="nom"
                    value={lastname}
                    onChange={(e) => setLastName(e.currentTarget.value)}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Form.Group className="mb-3" controlId="userEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                required
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.currentTarget.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="userAvatar">
              <Form.Label>Photo</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="photo"
                value={avatar}
                onChange={(e) => setAvatar(e.currentTarget.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="userPass">
              <Form.Label>
                Password <sub>(6 caractères min.)</sub>
              </Form.Label>
              <InputGroup className="mb-3">
                <Form.Control
                  required
                  type={!eyePassword ? "password" : "text"}
                  placeholder="Password"
                  value={pass}
                  onChange={(e) => setPass(e.currentTarget.value)}
                />
                <InputGroup.Text
                  id="basic-addon"
                  onClick={() => setEyePassword(!eyePassword)}
                >
                  {!eyePassword ? (
                    <i className="ri-eye-line"></i>
                  ) : (
                    <i className="ri-eye-off-line"></i>
                  )}
                </InputGroup.Text>
              </InputGroup>
            </Form.Group>
            <Form.Group className="mb-3" controlId="userPass2">
              <Form.Label>Confirmer votre password</Form.Label>
              <InputGroup className="mb-3">
                <Form.Control
                  required
                  type={!eyePassword2 ? "password" : "text"}
                  placeholder="Confirmer votre password"
                  value={pass2}
                  onChange={(e) => setPass2(e.currentTarget.value)}
                />
                <InputGroup.Text
                  id="basic-addon2"
                  onClick={() => setEyePassword2(!eyePassword2)}
                >
                  {!eyePassword2 ? (
                    <i className="ri-eye-line"></i>
                  ) : (
                    <i className="ri-eye-off-line"></i>
                  )}
                </InputGroup.Text>
              </InputGroup>
              {pass2.length > 4 && pass !== pass2 && (
                <div className="w-75 m-auto">
                  <small>
                    <Alert variant="danger">
                      {/* <i className="ri-error-warning-line"></i>{' '} */}
                      <img
                        alt="Erreur icon"
                        src="https://img.icons8.com/officel/32/error.png"
                      />
                      votre password est différent du premeir
                    </Alert>
                  </small>
                </div>
              )}
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseContact}>
              Annuler
            </Button>
            <Button
              variant="primary"
              type="submit"
              // <Button variant="primary" type="button" onClick={addContact}
              disabled={pass2.length > 4 && pass !== pass2 ? true : false}
            >
              Valider
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>

      {/*************************************** 
        Modal demande d'ami 
         ***************************************/}

      <FriendRequestModal
        show={show}
        handleClose={handleClose}
        handleShow2={handleShow2}
        allUserExceptMe={allUserExceptMe}
      />

      {/*************************************** 
        Modal de confirmation de demande d'ami 
        ***************************************/}
      <FriendRequestValidation
        show2={show2}
        handleClose2={handleClose2}
        selectedFriend={selectedFriend}
        friendRequest={friendRequest}
      />



         {/*************************************** 
        Acceptation/refus demande d'ami
        ***************************************/}

<Modal
        show={showDecision}
        onHide={handleCloseDecision}
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
          <Button variant="danger" className="me-3" onClick={handleCloseDecision}>
            Annuler
          </Button>
          <Button
            variant="success"
            onClick={() => {
              acceptFriend(selectedFriend.id);
              handleCloseDecision();
            }}
          >
            Valider
          </Button>
        </Modal.Footer>
      </Modal>




      {/*************************************** 
        Modal de création de groupe
        ***************************************/}

      <Modal show={showGrp} onHide={handleCloseGrp}>
        <Modal.Header closeButton>
          <Modal.Title>Créez un groupe</Modal.Title>
        </Modal.Header>
        <Form onSubmit={createGroup}>
        <Modal.Body>
          <InputGroup className="mb-3">
            <InputGroup.Text id="basic-addon1">Nom du groupe</InputGroup.Text>
            <Form.Control
            required
              id="inputPassword5"
              placeholder="groupe"
              aria-label="group"
              aria-describedby="group-name"
              value={nameGrp}
              onChange={(e) => setNameGrp(e.currentTarget.value)}
             
            />
          </InputGroup>
          <Accordion defaultActiveKey={["0"]} alwaysOpen>
            <Accordion.Item eventKey="0">
              <Accordion.Header>Choisissez un ami</Accordion.Header>
              <Accordion.Body>
                <ListGroup variant="flush">
                  {filteredUsers?.friendArea &&
                    filteredUsers?.friendArea[0]?.rooms?.map((user: any) =>
                      user?.status === true ? (
                        <ListGroup.Item
                          key={user.id_friend}
                          action
                          variant="primary"
                        >
                          <Form.Check required type="checkbox" value={user.id_friend} onChange={(e) => memberGrp(e.currentTarget.value)} />
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
                          </Row>
                        </ListGroup.Item>
                      ) : null
                    )}
                </ListGroup>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => {
            setUserGrp([])
            setNameGrp("")
            handleCloseGrp()}}>
            Annuler
          </Button>
          <Button variant="primary" onClick={createGroup}>
            Créer votre groupe
          </Button>
        </Modal.Footer>
        </Form>

      </Modal>
    </div>
  );
};

export default LeftSideBar;
