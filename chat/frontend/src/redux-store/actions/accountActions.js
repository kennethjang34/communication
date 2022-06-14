import * as actionTypes from "./actionTypes";

import axios from "axios";

//********************* */
axios.defaults.baseURL = "http://127.0.0.1:8000/account/api/";

export const sendFriendRequestAction = (requester, receiver) => {
  console.log(requester);
  console.log(receiver);
  return (dispatch) => {
    axios
      .post(
        "add-friend",
        {
          requester: requester,
          receiver: receiver,
        },
        {
          headers: {
            Authorization: `Token ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((response) => {
        //console.log(response.data);
      });
  };
};

export const friendAddedAction = (friend) => {
  var existing = localStorage.getItem("friends");
  if (existing === null) existing = "";
  localStorage.setItem("friends", existing + JSON.stringify(friend));
  return (dispatch) => {
    dispatch({
      type: actionTypes.FRIEND_ADDED,
      friend: friend,
    });
  };
};
