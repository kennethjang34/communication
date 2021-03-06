import React, { useState } from "react";
// import "antd/dist/antd.css";
import { connect } from "react-redux";
import * as accountActions from "../redux-store/actions/accountActions";
import { Avatar, Input, AutoComplete, Button } from "antd";
import { UserOutlined } from "@ant-design/icons";
import axios from "axios";

// axios.defaults.baseURL = "http://127.0.0.1:8000/account/api/";
const searchResult = (
    accountID,
    setOptions,
    sendFriendRequest,
    currentUser
) => {
    var accounts = null;
    axios
        .get(`http://127.0.0.1:8000/account/api/accounts?userID=${accountID}`, {
            headers: {
                Authorization: `Token ${localStorage.getItem("token")}`,
            },
        })
        .then((response) => {
            accounts = response.data;

            setOptions(
                new Array(accounts.length)
                    .join(".")
                    .split(".")
                    .map((_, idx) => {
                        let account;
                        if (accounts.length == 0) {
                            account = "No person with the ID found";
                        } else {
                            account = `${accounts[idx].userID}`;
                        }
                        // const account = `${accounts[idx].userID}`;
                        return {
                            value: account,

                            label: (
                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                    }}
                                    key={account}
                                >
                                    <span>{account}</span>{" "}
                                    <Button
                                        onClick={() => {
                                            sendFriendRequest(
                                                currentUser,
                                                account
                                            );
                                        }}
                                    >
                                        Request Friendship
                                    </Button>
                                </div>
                            ),
                        };
                    })
            );
        });
};

const AddFriendPrompter = (props) => {
    const [options, setOptions] = useState([]);
    const [selected, setSelected] = useState(null);

    const handleSelected = (account) => {
        setSelected(account);
    };

    const handleSearch = (value) => {
        setOptions(
            value
                ? searchResult(
                      value,
                      setOptions,
                      props.sendFriendRequest,
                      props.currentUser
                  )
                : []
        );
    };

    return (
        <div style={{ width: "300px", height: "300px" }}>
            <AutoComplete
                dropdownMatchSelectWidth={252}
                style={{
                    width: 300,
                }}
                options={options}
                onSelect={handleSelected}
                onSearch={handleSearch}
            >
                {/* <Button
                size="large"
                placeholder="Enter the userID of your friend"
            /> */}
                <Input.Search
                    size="large"
                    placeholder="Enter the userID of your friend"
                    enterButton
                />
            </AutoComplete>
            <div
                style={{
                    width: "300px",
                    height: "300px",
                    position: "absolute",
                    visibility: selected ? "visible" : "hidden",
                }}
            >
                <Avatar
                    shape="square"
                    size={64}
                    icon={<UserOutlined />}
                    style={{
                        top: "20%",
                        left: "50%",
                        position: "absolute",
                        transform: "translateX(-50%)",
                    }}
                />
                <span
                    style={{
                        top: "45%",
                        left: "50%",
                        transform: "translateX(-50%)",
                        // marginLeft: "0px",
                        position: "absolute",
                    }}
                >
                    <p style={{ textAlign: "start" }}>{selected}</p>
                </span>
                <Button
                    style={{
                        left: "50%",
                        // display: "flex",
                        top: "55%",
                        // justifyContent: "center",
                        position: "absolute",
                        transform: "translateX(-50%)",

                        // textAlign: "center",
                    }}
                    onClick={() => {
                        props.sendFriendRequest(props.currentUser, selected);
                    }}
                >
                    Request Friendship
                </Button>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    return { currentUser: state.auth.currentUser };
};

const mapDispatchToProps = (dispatch) => {
    return {
        sendFriendRequest: (currentUser, receiver) => {
            dispatch(
                accountActions.sendFriendRequestAction(currentUser, receiver)
            );
        },
    };
};

// export { AddFriendPrompter };
export default connect(mapStateToProps, mapDispatchToProps)(AddFriendPrompter);
