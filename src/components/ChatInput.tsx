import React from "react";

const ChatInput = ({ message, setMessage, addMsg, goDown }: any) => {
  return (
    <div className="chat-input-section p-3 p-lg-4">
      <form
        id="chatinput-form"
        onSubmit={(e) => {
          addMsg(e);
          setMessage("");
        }}
      >
        <div className="row g-0 align-items-center">
          <div className="col-auto">
            <div className="chat-input-links me-2">
              <div className="links-list-item">
                <button
                  type="button"
                  className="btn btn-link text-decoration-none emoji-btn"
                  id="emoji-btn"
                >
                  <i className="bx bx-smile align-middle"></i>
                </button>
              </div>
            </div>
          </div>

          <div className="col">
            <div className="chat-input-feedback">Please Enter a Message</div>
            <input
              type="text"
              className="form-control chat-input bg-light border-light"
              id="chat-input"
              placeholder="Type your message..."
              autoComplete="off"
              value={message}
              onChange={(e) => setMessage(e.currentTarget.value)}
            />
          </div>
          <div className="col-auto">
            <div className="chat-input-links ms-2">
              <div className="links-list-item">
                <button
                  type="submit"
                  className="btn btn-success chat-send waves-effect waves-light"
                >
                  <i className="ri-send-plane-2-fill align-bottom"></i>
                </button>{" "}
                <button
                  type="button"
                  onClick={goDown}
                  className="btn btn-outline-success rounded-circle pt-1"
                >
                  <i className="ri-arrow-down-s-line"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ChatInput;
