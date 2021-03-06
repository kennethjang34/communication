import React from "react";
import socketServerInstance from "../websocket";
import { connect } from "react-redux";
import * as authActions from "../redux-store/actions/authActions";
import * as messageActions from "../redux-store/actions/chatActions";
import * as chatActions from "../redux-store/actions/chatActions";
import server from "../websocket";
//The user authentication must be global. => redux
//Chat component is react-based chat UI for each chat room. ChatID doesn't have to be global.
//ChatID is an instance-specific prop
//
class ChatRoom extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      input: "",
    };

    // this.state.path = window.location.pathname;
    // let chatID = this.state.path.split("/chat/").pop();
    // this.buildConnection(props.chatID);
  }

  sendMessage = (event) => {
    event.preventDefault();
    const message = {
      author: this.props.currentUser,
      //This needs to be changed
      content: this.state.input,
      //Planning to change it to a list
      chatID: this.props.chatID,
      // chatID: window.location.pathname.split("/chat/").pop(),
      // timestamp: new Date().getDate() / 1000,
    };
    this.props.serverInstance.sendMessage(message.chatID, {
      request: "new_message",
      message: message,
    });

    this.setState({
      input: "",
    });
  };

  trimTimestamp(timestamp) {
    let trimmed = "";
    const date = new Date(timestamp);
    //The smallest time unit will be minute
    const timePassed = Math.round(
      (new Date().getTime() - date.getTime()) / 60000
    );
    if (timePassed < 1) {
      trimmed = "Just sent";
    } else if (timePassed < 60 && timePassed >= 1) {
      trimmed = `${timePassed} minutes ago `;
    } else if (timePassed < 24 * 60 && timePassed >= 60) {
      trimmed = `${Math.round(timePassed / 60)} hours ago`;
    } else if (timePassed < 31 * 24 * 60 && timePassed >= 24 * 60) {
      trimmed = `${Math.round(timePassed / (60 * 24))} days ago`;
    } else {
      trimmed = date.toDateString();
    }
    return trimmed;
  }

  TopPanel = (props) => {
    return (
      <div id="toppanel">
        <div className="visible-xs" id="ms-menu-trigger">
          <i className="fa fa-bars"></i>
        </div>

        <div className="pull-left hidden-xs">
          <img
            src="https://bootdey.com/img/Content/avatar/avatar2.png"
            alt=""
            className="img-avatar m-r-10"
          />
          <div className="lv-avatar pull-left"></div>
          {/*<ul>
            {props.participants.map((partipant) => {
              return (
                <li>
                  <span>participant</span>
                </li>
              );
            })}{" "}
          </ul>*/}
          "
        </div>

        <ul className="ah-actions actions">
          <li>
            <a href="">
              <i className="fa fa-trash"></i>
            </a>
          </li>
          <li>
            <a href="">
              <i className="fa fa-check"></i>
            </a>
          </li>
          <li>
            <a href="">
              <i className="fa fa-clock-o"></i>
            </a>
          </li>
          <li className="dropdown">
            <a href="" data-toggle="dropdown" aria-expanded="true">
              <i className="fa fa-sort"></i>
            </a>

            <ul className="dropdown-menu dropdown-menu-right">
              <li>
                <a href="">Latest</a>
              </li>
              <li>
                <a href="">Oldest</a>
              </li>
            </ul>
          </li>
          <li className="dropdown">
            <a href="" data-toggle="dropdown" aria-expanded="true">
              <i className="fa fa-bars"></i>
            </a>

            <ul className="dropdown-menu dropdown-menu-right">
              <li>
                <a href="">Refresh</a>
              </li>
              <li>
                <a href="">Message Settings</a>
              </li>
            </ul>
          </li>
        </ul>
        <script>
          {document.addEventListener("DOMContentLoaded", () => {
            if (document.getElementById("ms-menu-trigger")[0]) {
              $("body").on("click", "#ms-menu-trigger", function() {
                document
                  .getElementByClassName("ms-menu")
                  .classList.toggle("toggled");
              });
            }
          })}
          ;
        </script>
      </div>
    );
  };

  changeCurrentInput = (event) => {
    event.preventDefault();
    this.setState({
      input: event.target.value,
    });
  };

  keypress = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      this.sendMessage(event);
    }
  };

  scrollToBottom() {
    this.lastMessage.scrollIntoView({ behavior: "smooth" });
  }

  componentDidMount() {
    this.scrollToBottom();
  }
  componentDidUpdate() {
    this.scrollToBottom();
  }

  renderMessages = (messages) => {
    const messages_rendered = messages.map((message, index) => {
      return (
        <li className="message-feed" key={index}>
          <div
            className={
              message.author === this.props.currentUser
                ? "sent"
                : `received from: ${message.author}`
            }
          >
            <img
              src="https://bootdey.com/img/Content/avatar/avatar2.png"
              alt=""
              className="img-avatar"
            />
            <p className="mf-content">
              {message.content}
              <br />
              <small className="mf-date">
                {this.trimTimestamp(message.timestamp)}
              </small>
            </p>
          </div>
        </li>
      );
    });
    return messages_rendered;
  };

  render = () => {
    let messages = [];
    if (
      this.props.chats[this.props.chatID] &&
      this.props.chats[this.props.chatID].messages
    ) {
      messages = this.props.chats[this.props.chatID].messages;
    }
    return (
      <div>
        <this.TopPanel receiver={this.props.participants} />
        <div className="chat-room">
          <div className="ms-body">
            {/* <div className="message-feed received">
                        <img
                            src="https://bootdey.com/img/Content/avatar/avatar2.png"
                            alt=""
                            className="img-avatar"
                        />
                    </div> */}
            <ul>{messages && this.renderMessages(messages)}</ul>
          </div>
          <div
            style={{ float: "left", clear: "both" }}
            ref={(message) => {
              this.lastMessage = message;
            }}
          ></div>
          <div className="pull-left">
            <img
              src="https://bootdey.com/img/Content/avatar/avatar1.png"
              alt=""
              className="img-avatar"
            />
          </div>

          <div className="msb-reply">
            <form onSubmit={this.sendMessage}>
              <textarea
                placeholder="Enter message"
                onChange={this.changeCurrentInput}
                onKeyPress={this.keypress}
                key="mesage-input"
                value={this.state.input}
                // defaultValue={this.state.input}
              />
              <i className="fa fa-paperclip attachment" aria-hidden="true"></i>
              <button className="submit">
                <i className="fa fa-paper-plane-o"></i>
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  };
}

//Adding redux state as props to this component
const mapStateToProps = (state, ownProps) => {
  return {
    chats: state.chat.chats,

    currentUser: state.auth.currentUser,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addMessage: (chatID, message) => {
      return dispatch(chatActions.addMessage(chatID, message));
    },
    loadMessages: (chatID, messages) => {
      return dispatch(chatActions.loadMessages(chatID, messages));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ChatRoom);
