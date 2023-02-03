import React from "react";
import { Badge, Col, Container, Row } from "react-bootstrap";
import useAuthStore from "../store/userAuthStore";
import { _getChatData, _getFriendArea, _getInvitedUserData, _getUserData, _getUserDataOnlyMe } from "../util/function";
import { _getFriendRequest } from "../util/functionBis";
import { supabase } from "../util/supabaseClient";
import Avatar from "./Avatar";

const TopBar = () => {
  const [userData, setUserData] = React.useState<any>([]);
  const [myData, setMyData] = React.useState<any>([]);
  const [inviteData, setInviteData] = React.useState<any>([]);
  const [inviteDataz, setInviteDataz] = React.useState<any>([]);
  const [unique, setUnique] = React.useState<any>([]);
  const [pendingFriend, setPendingFriend] = React.useState<any>([]);
  const [friendData, setFriendData] = React.useState<any>([]);
  const [frRequest, setFrRequest] = React.useState<any>([]);
  const [pendingAskes, setPendingAskes] = React.useState<any>([]);




  const authId = useAuthStore((state: any) => state.id)

  const dataStore = useAuthStore((state: any) => state)


  const members =  friendData?.rooms?.filter((user: any) => user?.status === true)

  const filtre = unique?.map((friend: any) => userData?.filter((user: any) => user.id === friend))

console.log(pendingAskes)

  
  React.useEffect(() => {
    _getUserDataOnlyMe(setMyData, authId)
    _getChatData(setPendingFriend, dataStore.id)
    _getUserData(setUserData)
    _getFriendArea(setFriendData, dataStore.id)
    _getFriendRequest(dataStore.id, setFrRequest)
    subscribeChatMessages()
    subscribeFrRequest()
  }, []);
  


  React.useEffect(() => {
    setPendingAskes(
      frRequest?.friends_list?.map((user: any) =>
        userData?.filter((dude: any, indx: any) => dude.id === user)
      )
    );
  }, [frRequest]);
  
  
  
  React.useEffect(() => {
    const tab = pendingFriend?.map((friend: any) => {
      inviteDataz.push(friend?.friend_id)
    })
    
    subscribeChatMessages()
  }, [pendingFriend]);



  React.useEffect(() => {
    
    setUnique([...new Set(inviteDataz)])
    subscribeChatMessages()
  }, [pendingFriend, myData]);
  



  async function subscribeChatMessages() {
  const chatMessages2 = supabase.channel('custom-all-channel')
  .on(
    'postgres_changes',
    { event: '*', schema: 'public', table: 'chatMessages2' },
    (payload) => {
      console.log('Change received!', payload)
      _getUserData(setUserData)

    }
  )
  .on(
    'postgres_changes',
    { event: '*', schema: 'public', table: 'friendArea' },
    (payload) => {
      console.log('Change received!', payload)
      _getUserData(setUserData)
      _getFriendArea(setFriendData, dataStore.id)
      _getFriendRequest(dataStore.id, setFrRequest)


    }
  )
  .subscribe()
}

async function subscribeFrRequest () {
  const frRequest = supabase.channel('custom-all-channel')
.on(
  'postgres_changes',
  { event: '*', schema: 'public', table: 'frRequest' },
  (payload) => {
    console.log('Change received!', payload)
    _getFriendRequest(dataStore.id, setFrRequest)
  }
)
.subscribe()
}

console.log(members)
  return (
    <div className="p-3 user-chat-topbar">
      <div className="row align-items-center ">
        <div className="col-sm-6 col-8">
          <div className="d-flex align-items-center">
            <div className="flex-shrink-0 d-block d-lg-none me-3">
              <i className="ri-arrow-left-s-line align-bottom"></i>
            </div>
            <div className="flex-grow-1 overflow-hidden">
              <div className="d-flex align-items-center">
                  <Avatar
                    avatar={dataStore.avatar}
                    badge={myData?.badge_status}
                    statusUser={myData?.status}
                    />
                <div className="flex-grow-1 overflow-hidden text-start">
                  <h5 className="text-truncate mb-0 fs-16">
                    <a
                      className="text-reset username"
                      data-bs-toggle="offcanvas"
                      href="#userProfileCanvasExample"
                      aria-controls="userProfileCanvasExample"
                    >
                      {dataStore.firstname} {dataStore.lastname}
                    </a>
                  </h5>
                  <p className="text-truncate text-muted fs-14 mb-0 userStatus">
                    <small>
                      {members === undefined ? 'aucun' : members?.length}{" "}
                      {members?.length > 1 ? "membres" : "membre"}
                    </small>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-sm-6 col-4">
          <ul className="list-inline user-chat-nav text-end mb-0">
            {pendingAskes && pendingAskes.length > 0 && (
              <li className="list-inline-item m-0">
                <div className="dropdown">
                  <button
                    className="btn btn-ghost-secondary btn-icon"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <i className="ri-user-shared-2-line fs-4 text-primary"></i>

                    <Badge bg="danger" pill>
                      {pendingAskes.length}
                    </Badge>
                  </button>
                  <Container
                    className="dropdown-menu dropdown-menu-end"
                    style={{ width: "250px" }}
                  >
                    <h6 className="px-2 text-primary">Demande en attente</h6>
                    {pendingAskes &&
                      pendingAskes?.map((user: any) => (
                        <Row
                          key={user[0]?.id}
                          className="pending-friends m-0 py-2"
                        >
                          <Col xs={2} className="">
                            <span className="flex-shrink-0 chat-user-img online user-own-img align-self-center me-3 ms-0">
                              <img
                                src={user[0]?.avatar}
                                className="rounded-circle avatar-xs"
                                alt=""
                              />
                            </span>
                          </Col>
                          <Col className="m-auto">
                            {user[0]?.first_name} {user[0]?.last_name}{" "}
                            {user[0]?.status === true ? (
                              "💘"
                            ) : (
                              <i className="ri-question-line text-info"></i>
                            )}
                          </Col>
                        </Row>
                      ))}
                  </Container>
                </div>
              </li>
            )}
            <li className="list-inline-item m-0">
              <div className="dropdown">
                <button
                  className="btn btn-ghost-secondary btn-icon"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="feather feather-search"
                  >
                    <circle cx="11" cy="11" r="8"></circle>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                  </svg>
                </button>
                <div className="dropdown-menu p-0 dropdown-menu-end dropdown-menu-lg">
                  <div className="p-2">
                    <div className="search-box">
                      <input
                        type="text"
                        className="form-control bg-light border-light"
                        placeholder="Search here..."
                        id="searchMessage"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </li>

            <li className="list-inline-item d-none d-lg-inline-block m-0">
              <button
                type="button"
                className="btn btn-ghost-secondary btn-icon"
                data-bs-toggle="offcanvas"
                data-bs-target="#userProfileCanvasExample"
                aria-controls="userProfileCanvasExample"
              >
                <i className="ri-user-settings-line fs-4"></i>
              </button>
            </li>

            <li className="list-inline-item m-0">
              <div className="dropdown">
                <button
                  className="btn btn-ghost-secondary btn-icon"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <svg
                    xmlns="\assets\images\svg\more-vertical.svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="feather feather-more-vertical icon-sm"
                  >
                    <circle cx="12" cy="12" r="1"></circle>
                    <circle cx="12" cy="5" r="1"></circle>
                    <circle cx="12" cy="19" r="1"></circle>
                  </svg>
                </button>
                <div className="dropdown-menu dropdown-menu-end">
                  <a
                    className="dropdown-item d-block d-lg-none user-profile-show"
                    href="#"
                  >
                    <i className="ri-user-2-fill align-bottom text-muted me-2"></i>{" "}
                    View Profile
                  </a>
                  <a className="dropdown-item" href="#">
                    <i className="ri-inbox-archive-line align-bottom text-muted me-2"></i>{" "}
                    Archive
                  </a>
                  <a className="dropdown-item" href="#">
                    <i className="ri-mic-off-line align-bottom text-muted me-2"></i>{" "}
                    Muted
                  </a>
                  <a className="dropdown-item" href="#">
                    <i className="ri-delete-bin-5-line align-bottom text-muted me-2"></i>{" "}
                    Delete
                  </a>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
