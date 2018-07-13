import React, { Component } from "react";

class App extends Component {
  render() {
    return (
      <div className="App">
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <div className="container">
            <a className="navbar-brand" href="/">
              Gerenciador de Produtos
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon" />
            </button>

            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                  <a className="nav-link" href="">
                    Home
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="">
                    Produtos
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="">
                    Sobre
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <div className="jumbotron text-center">
          <h1>Gerenciador de Produtos</h1>
        </div>
        <div className="container">
          <h3>Conteúdo...</h3>
        </div>
      </div>
    );
  }
}

export default App;
