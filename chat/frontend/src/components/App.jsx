import React from "react";
import { connect } from "react-redux";
import * as authActions from "../redux-store/actions/authActions";
import ChatApp from "./ChatApp";
import React from "react";
import { useLocation } from "react-router-dom";

import { Route, BrowserRouter, Routes, Navigate } from "react-router-dom";
import Login from "./Login";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.props.checkAuth();
        let previous_url = window.location.pathname;
        previous_url = previous_url.split("/chat/").pop();
        if (previous_url === "/login") {
            previous_url = "/";
        }
        this.state = { previous: previous_url };
    }

    BodyComponent = (props) => {
        const location = useLocation();
        if (this.props.currentUser) {
            return <ChatApp />;
        } else {
            return <Navigate to="/login" replace state={{ from: location }} />;
        }
    };

    LoginRouteComponent = (props) => {
        const location = useLocation();
        return (
            <div>
                {<Login from={location.state ? location.state.from : null} />}
            </div>
        );
    };

    render = () => {
        return (
            <BrowserRouter>
                <Routes>
                    <Route
                        path="/login"
                        element={<this.LoginRouteComponent />}
                    />
                    <Route path="/chat" element={<this.BodyComponent />} />
                </Routes>
            </BrowserRouter>
        );
    };
}

const mapStateToProps = (state) => {
    return {
        currentUser: state.auth.currentUser,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        checkAuth: () => dispatch(authActions.checkAuthAction),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
