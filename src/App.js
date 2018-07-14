import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import Home from "./Home";
import Produtos from "./Produtos";
import Sobre from "./Sobre";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      categorias: []
    };
    this.createCategoria = this.createCategoria.bind(this);
    this.loadCategorias = this.loadCategorias.bind(this);
    this.removeCategoria = this.removeCategoria.bind(this);
  }
  createCategoria(categoria) {
    this.props.api
      .createCategoria(categoria)
      .then(res => this.loadCategorias())
      .catch(err => console.error(err));
  }
  removeCategoria(categoria) {
    this.props.api
      .deleteCategoria(categoria)
      .then(res => this.loadCategorias())
      .catch(err => console.error(err));
  }
  loadCategorias() {
    this.props.api.loadCategorias().then(res => {
      this.setState({
        categorias: res.data
      });
    });
  }
  render() {
    return (
      <Router>
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
                    <Link className="nav-link" to="/">
                      Home
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/produtos">
                      Produtos
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/sobre">
                      Sobre
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </nav>

          <div className="container">
            <Route exact path="/" component={Home} />
            <Route
              path="/produtos"
              render={props => (
                <Produtos
                  {...props}
                  createCategoria={this.createCategoria}
                  loadCategorias={this.loadCategorias}
                  removeCategoria={this.removeCategoria}
                  categorias={this.state.categorias}
                />
              )}
            />
            <Route exact path="/sobre" component={Sobre} />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
