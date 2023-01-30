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

const LeftSideBar2 = () => {


  const [allUserExceptMe, setAllUserExceptMe] = React.useState<any>([]);
  const [filteredUsers, setFilteredUsers] = React.useState<any>([]);
  const [selectedFriend, setSelectedFriend] = React.useState<any>([]);


    //***********************************************************
// ajouter un contact*/
  const [showContact, setShowContact] = React.useState<boolean>(false);
  const handleCloseContact = () => {
    setShowContact(false);
    // setEyePassword(false);
    // setEyePassword2(false);
    // resetForm();
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
    setShow2(true)
  };

  const dataStore = useAuthStore((state: any) => state);


  React.useEffect(() => {
    
    _getUserDataOnlyMe(setFilteredUsers, dataStore.id);
    _getUserDataExemptMe(setAllUserExceptMe, dataStore.id);

  
    
  }, []);




  
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

    // if (!friendAreas || friendAreas.length === 0) {
    
    // const { data: friendArea, error: errors } = await supabase.from("friendArea").insert([
    //   {

    //     host_id: dataStore.id,
    //     rooms: [
    //       {
    //         room: chatId,
    //         id_friend: friend?.id,
    //         first_name: friend?.first_name,
    //         last_name: friend?.last_name,
    //         avatar: friend?.avatar,
    //         status: "pending",
    //       },
    //     ],
    //     friends: [friend?.id],
    //   }
    // ]);

    // if(error){
    //   console.log(error);
    // }

    //   console.log("first");

    // } 
    // else {

    //   const newTabRooms = [
    //     ...friendAreas?.rooms,
    //     {
    //       room: chatId,
    //       id_friend: friend?.id,
    //       first_name: friend?.first_name,
    //       last_name: friend?.last_name,
    //       avatar: friend?.avatar,
    //       status: "pending",

    //     },
    //   ];
    //   const newTabFriends = [...friendAreas?.friends, friend?.id];

    //   const { data, error } = await supabase
    //     .from("friendArea")
    //     .update({
    //       rooms: newTabRooms,
    //       friends: newTabFriends,
    //     })
    //     .eq("host_id", dataStore);
    //     if(error){
    //       console.log(error)
    //     }
    // }
    // console.log("already");

    // if (!error) {
      

    // }
    
    // if (!selectedFriend?.friendArea || selectedFriend?.friendArea?.length === 0) {
    //   const { data: friendAreaz, error: errorz } = await supabase.from("friendArea").insert([
    //     {
    //       host_id: friend?.id,
    //       rooms: [
    //         {
    //           room: chatId,
    //           id_friend: dataStore.id,
    //           first_name: dataStore.firstname,
    //           last_name: dataStore?.lastname,
    //           avatar: dataStore?.avatar,
    //           status: false,
    //         },
    //       ],
    //       friends: [dataStore.id],
    //     },
    //   ]);
      
    //   if(error){
    //     console.log(error)
    //   }



    // }
    //  else {

    //   const newTabRooms = [
    //     ...inviteData?.rooms,
       
    //         {
    //           room: chatId,
    //           id_friend: dataStore?.id,
    //           first_name: dataStore?.firstname,
    //           last_name: dataStore?.lastname,
    //           avatar: dataStore?.avatar,
    //           status: false,
    //         },
         
    //   ];
     
    //   console.log(newTabRooms)
    //   const newTabFriends = [...inviteData?.friends, dataStore.id];
      
    //   const { data, error } = await supabase
    //     .from("friendArea")
    //     .update({
    //       rooms: newTabRooms,
    //       friends: newTabFriends,
    //     })
    //     .eq("host_id", friend?.id);
        
    //     if (!error) {
    //       console.log("friend");
    //     }
    //     if(error){
    //       console.log(error)
    //     }
    // }
    
  };



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

            {/* <ul className="list-unstyled">
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
            </ul> */}

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
                                    // onClick={() => {
                                    //   acceptFriend(user.id_friend);
                                    // }}
                                  >
                                    <i className="ri-add-box-line"></i>
                                  </button>
                                </Col>
                                <Col xs={6}>
                                  <button
                                    type="button"
                                    className="btn btn-soft-danger btn-sm shadow-none"
                                    // onClick={refuseFriend}
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
                    // onClick={handleShowGrp}
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
                {/* {allUserExceptMe?.map((user: any) => (
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
                ))} */}
              </ul>
            </div>
          </div>
        </div>
      </div>
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


    </div>
  );
}

export default LeftSideBar2