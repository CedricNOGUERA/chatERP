import React from "react";
import "./App.css";
import LeftSideBar from "./components/LeftSideBar";
import TopBar from "./components/TopBar";
import ChatInput from "./components/ChatInput";
import ProfileOffcanvas from "./components/offCanvas/ProfileOffcanvas";
import { _getDateLocal } from "./util/function";
import AuthForm from "./components/AuthForm";
import { supabase } from "./util/supabaseClient";
import useAuthStore from "./store/userAuthStore";
import { useForm } from "react-hook-form";
import PendingFriends from "./components/offCanvas/PendingFriends";
import LeftSideBar2 from "./components/LeftSideBar2";



function App() {

  const [roomId, setRoomId] = React.useState<any>("");

  const [message, setMessage] = React.useState<any>("");
  const [dataz, setDataz] = React.useState<any>([]);
  const [userdata, setUserdata] = React.useState<any>([]);
  const [idChatFriend, setIdChatFriend] = React.useState<any>([]);

  const isLogged = useAuthStore((state: any) => state.isLogged);
  const dataStore = useAuthStore((state: any) => state);
  const authIdFriend = useAuthStore((state: any) => state.authIdFriend);

  // const {
  //   register,
  //   handleSubmit,
  //   reset,
  //   formState: { errors },
  // } = useForm();

  const allUserExceptMe = userdata.filter(
    (user: any) => user.id !== dataStore.id
  );
  const filteredUsers = userdata.filter(
    (user: any) => user.id === dataStore.id
  );

  const roomFilter = filteredUsers[0]?.friendArea[0]?.rooms?.filter(

    (user: any) => user.id_friend === dataStore?.idFriend
  );

  const messageEndRef = React.useRef<null | HTMLElement>(
    null
  ) as React.MutableRefObject<HTMLInputElement>


  React.useEffect(() => {
 goDown()
  }, [dataz]);


  React.useEffect(() => {
    subscribeEvents();
   
    getUserData();
  
  }, []);

  React.useEffect(() => {
    subscribeEvents();

    if (roomId) {
      getMessages();
    }
  }, [roomId]);

  // console.log(roomId)
  // console.log(roomFilter)

 
  
  const goDown = () => {
    messageEndRef.current?.scrollIntoView()

  }

  const getUserData = async () => {
    let { data: users, error } = await supabase.from("users").select("*, friendArea(*)");

    if (users) {
      setUserdata(users);
    } else {
      console.log(error);
    }
  };

  const addMsg = async (e: any) => {
    e.preventDefault()
    dataz?.push({
      id: dataStore.id,
      message: message,
      name: dataStore.firstname,
      created_at: Date.now(),
    });

    const { data, error } = await supabase
      .from("chatMessages2")
      .update({ users_msg: dataz })
      .eq("id", roomId);

      if(!error){
        const timer = setTimeout(() => {
          goDown()
         
        }, 1500);
        return () => clearTimeout(timer);
      }

    setMessage("");
  };


  const getMessages = async () => {
    let { data: chatMessages2, error } = await supabase
      .from("chatMessages2")
      .select("*")
      .eq("id", roomId)
      .single();

      setDataz(chatMessages2?.users_msg);
      
    if (error) {
   
      console.log(error);
    }
  };

  async function subscribeEvents() {
    const chatMessages2 = supabase
      .channel("custom-all-channel")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "chatMessages2" },
        (payload) => {
          console.log('Change received!', payload)
          getMessages();
          goDown();
          // console.log(pay:oad);
        }
      )
      .subscribe();
  }









  return (
    <>
      {!isLogged ? (
        <AuthForm userdata={userdata} />
      ) : (
        <>
          <div className="main-content">
            <div className="page-content">
              <div className="container-fluid">
                <div className="chat-wrapper d-lg-flex gap-1 mx-n4  p-1">
                  <LeftSideBar
                    
                    setRoomId={setRoomId}
                  />
              
                  <div
                    className="user-chat overflow-hidden"
                    // style={{ width: "100vh" }}
                  >
                    <div className="chat-content d-lg-flex">
                      <div className="w-100 overflow-hidden position-relative">
                        <div className="position-relative">
                          <div className="position-relative" id="users-chat">
                            <div
                              className="alert alert-warning alert-dismissible copyclipboard-alert px-4 fade show "
                              id="copyClipBoard"
                              role="alert"
                            >
                              Message copied
                            </div>
                          </div>
                          <TopBar />
                          <div
                            className="position-relative convers"
                            id="channel-chat"
                          >
                            <div
                              className="col chat-conversation p-3 p-lg-4"
                              id="chat-conversation"
                              data-simplebar
                            >
                              <ul
                                className="list-unstyled chat-conversation-list"
                                id="channel-conversation"
                              >
                                {dataz &&
                                  dataz?.map((msg: any, indx: any) => (
                                    <li
                                      key={indx}
                                      className={
                                        dataStore.id === msg.id
                                          ? "chat-list right"
                                          : "chat-list left"
                                      }
                                    >
                                      <div className="conversation-list">
                                        <div className="user-chat-content">
                                          <div className="ctext-wrap">
                                            <div
                                              className="ctext-wrap-content"
                                              id="5"
                                            >
                                              <p className="mb-0 ctext-content">
                                                {msg.message}
                                              </p>
                                            </div>
                                            <div className="dropdown align-self-start message-box-drop">
                                              {" "}
                                              <a
                                                className="dropdown-toggle"
                                                href="#"
                                                role="button"
                                                data-bs-toggle="dropdown"
                                                aria-haspopup="true"
                                                aria-expanded="false"
                                              >
                                                {" "}
                                                <i className="ri-more-2-fill"></i>{" "}
                                              </a>{" "}
                                              <div className="dropdown-menu">
                                                {" "}
                                                <a
                                                  className="dropdown-item reply-message"
                                                  href="#"
                                                >
                                                  <i className="ri-reply-line me-2 text-muted align-bottom"></i>
                                                  Reply
                                                </a>{" "}
                                                <a
                                                  className="dropdown-item"
                                                  href="#"
                                                >
                                                  <i className="ri-share-line me-2 text-muted align-bottom"></i>
                                                  Forward
                                                </a>{" "}
                                                <a
                                                  className="dropdown-item copy-message"
                                                  href="#"
                                                >
                                                  <i className="ri-file-copy-line me-2 text-muted align-bottom"></i>
                                                  Copy
                                                </a>{" "}
                                                <a
                                                  className="dropdown-item"
                                                  href="#"
                                                >
                                                  <i className="ri-bookmark-line me-2 text-muted align-bottom"></i>
                                                  Bookmark
                                                </a>{" "}
                                                <a
                                                  className="dropdown-item delete-item"
                                                  href="#"
                                                >
                                                  <i className="ri-delete-bin-5-line me-2 text-muted align-bottom"></i>
                                                  Delete
                                                </a>{" "}
                                              </div>{" "}
                                            </div>
                                          </div>
                                          <div className="conversation-name">
                                            <span className="text-muted name">
                                              {msg.name}
                                            </span>
                                            <small className="text-muted time">
                                              {_getDateLocal(msg.created_at)}
                                            </small>{" "}
                                            <span className="text-success check-message-icon">
                                              <i className="bx bx-check-double"></i>
                                            </span>
                                          </div>
                                        </div>{" "}
                                      </div>
                                    </li>
                                  ))}
                              </ul>
                              <div ref={messageEndRef} />
                            </div>
                            <div
                              className="alert alert-warning alert-dismissible copyclipboard-alert px-4 fade show "
                              id="copyClipBoardChannel"
                              role="alert"
                            >
                              Message copied
                            </div>
                          </div>

                          <ChatInput
                            message={message}
                            setMessage={setMessage}
                            addMsg={addMsg}
                            goDown={goDown}
                          />
                          <div className="replyCard">
                            <div className="card mb-0">
                              <div className="card-body py-3">
                                <div className="replymessage-block mb-0 d-flex align-items-start">
                                  <div className="flex-grow-1">
                                    <h5 className="conversation-name"></h5>
                                    <p className="mb-0"></p>
                                  </div>
                                  <div className="flex-shrink-0">
                                    <button
                                      type="button"
                                      id="close_toggle"
                                      className="btn btn-sm btn-link mt-n2 me-n3 fs-18"
                                    >
                                      <i className="bx bx-x align-middle"></i>
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <ProfileOffcanvas meData={filteredUsers[0]}  />
          <PendingFriends />
        </>
      )}
    </>
  );
}

export default App;
