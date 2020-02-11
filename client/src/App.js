import React from 'react';
import 'materialize-css';
import { BrowserRouter as Router } from 'react-router-dom';
import {useRoutes} from "./routes";
import {useAuth} from "./hooks/AuthHook";
import { AuthContext } from "./context/AuthContext";

const App = () => {
    const { login, logout, token, userId } = useAuth();
    const isAuthenticated = !!token;
    const routes = useRoutes(isAuthenticated);

    return (
        <AuthContext.Provider value={{  login, logout, token, userId, isAuthenticated }}>
            <Router>
                <div className="container">
                    { routes }
                </div>
            </Router>
        </AuthContext.Provider>
    );
};

export default App;
