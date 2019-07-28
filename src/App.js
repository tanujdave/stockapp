import React, { Component } from "react";
import "./App.css";
import StockPage from "./containers/StockPage";

class App extends Component {
    render() {
        return (
            <React.Fragment>
                <header>
                    <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
                        <a className="navbar-brand">
                            Stock App
                        </a>
                    </nav>
                </header>
                <main role="main">
                    <div className="album py-5">
                        <StockPage />
                    </div>
                </main>
            </React.Fragment>
        );
    }
}

export default App;
