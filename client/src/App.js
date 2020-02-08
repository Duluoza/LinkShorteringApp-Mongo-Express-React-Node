import React from 'react';
import 'materialize-css';
import { BrowserRouter as Router } from 'react-router-dom';
import {useRoutes} from "./routes";

const App = () => {
    const routes = useRoutes(false);
    return (
        <Router>
            <div className="container">
                { routes }
            </div>
        </Router>
    );
};

export default App;
