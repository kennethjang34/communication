import axios from "axios";
import * as actionTypes from "../actions/actionTypes";
import * as messageActions from "../actions/chatActions";
const initialState = {
  chats: localStorage.chats ? JSON.parse(localStorage.chats) : {},
  //currenetUser is user account object of django (Not User model)
  currentUser: localStorage.currentUser ? localStorage.currentUser : null,
  selected: null,
  loading: false,
  error: false,
};

const addMessage = (state, action) => {
  const chat = { ...state.chats[action.chatID] };
  const messages = [...chat.messages, action.message];
  const chats = { ...state.chats };
  chat.messages = messages;
  chats[action.chatID] = chat;
  return { ...state, chats: chats };
};

//only for one room
const loadMessages = (state, action) => {
  const chats = { ...state.chats };
  const chatID = action.chatID;
  chats[chatID].messages = action.messages;
  new_state = { ...state, chats: { ...chats } };
  return { ...state, chats: { ...chats } };
};

const selectChat = (state, action) => {
  return { ...state, selected: action.chatID };
};

const loadChats = (state, action) => {
  //action.chats: list of JSON object chats
  return { ...state, chats: action.chats };
};

const chatCreated = (state, action) => {
  const chats = { ...state.chats };
  chats[action.chat.chatID] = {
    messages: [],
    participants: action.chat.participants,
  };
  return { ...state, chats: { ...chats } };
};

//todo
const deleteChats = (state, action) => {
  return { ...state };
};

const chatAdded = (state, action) => {
  const chats = { ...state.chats };
  console.log(action);
  if (!chats[action.chatID]) {
    chats[action.chatID] = {
      messages: [],
      participants: action.participants,
    };
    return { ...state, chats: chats };
  } else {
    return state;
  }
};

export default reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOAD_CHATS:
      return loadChats(state, action);
    case actionTypes.CHAT_CREATED:
      return chatCreated(state, action);
    case actionTypes.CHAT_ADDED:
      return chatAdded(state, action);
    case actionTypes.DELETE_CHATS:
      return deleteChats(state, action);
    case actionTypes.SELECT_CHAT:
      return selectChat(state, action);
    case actionTypes.LOAD_MESSAGES:
      return loadMessages(state, action);
    case actionTypes.ADD_MESSAGE:
      return addMessage(state, action);

    default:
      return state;
  }
};
