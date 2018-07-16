import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import Home from "./Home";
import Produtos from "./Produtos";
import Sobre from "./Sobre";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      categorias: [],
      categoria: {},
      produtos: []
    };
    // categoria
    this.createCategoria = this.createCategoria.bind(this);
    this.editCategoria = this.editCategoria.bind(this);
    this.loadCategorias = this.loadCategorias.bind(this);
    this.removeCategoria = this.removeCategoria.bind(this);
    this.loadCategoriaById = this.loadCategoriaById.bind(this);
    // produto
    this.createProduto = this.createProduto.bind(this);
    this.loadProdutosByCategoria = this.loadProdutosByCategoria.bind(this);
    this.removeProduto = this.removeProduto.bind(this);
    this.loadProdutoById = this.loadProdutoById.bind(this);
    this.editProduto = this.editProduto.bind(this);
  }
  createCategoria(categoria) {
    this.props.api
      .createCategoria(categoria)
      .then(res => this.loadCategorias())
      .catch(err => console.error(err));
  }
  editCategoria(categoria) {
    this.props.api
      .editCategoria(categoria)
      .then(() => this.loadCategorias())
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
  loadProdutosByCategoria(categoria) {
    this.props.api.getProdutoByCategoria(categoria).then(res => {
      this.setState({
        produtos: res.data
      });
    });
  }
  loadCategoriaById(categoria) {
    this.props.api.loadCategoriaById(categoria).then(res => {
      this.setState({
        categoria: res.data
      });
    });
  }
  createProduto(produto) {
    return this.props.api.createProduto(produto).then();
  }
  removeProduto(produto) {
    return this.props.api.deleteProduto(produto);
  }
  loadProdutoById(produto) {
    return this.props.api.getProdutoById(produto);
  }
  editProduto(produto) {
    return this.props.api.editProduto(produto);
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
                  // categoria
                  createCategoria={this.createCategoria}
                  editCategoria={this.editCategoria}
                  loadCategorias={this.loadCategorias}
                  removeCategoria={this.removeCategoria}
                  categorias={this.state.categorias}
                  categoria={this.state.categoria}
                  loadCategoriaById={this.loadCategoriaById}
                  // produto
                  createProduto={this.createProduto}
                  loadProdutosByCategoria={this.loadProdutosByCategoria}
                  removeProduto={this.removeProduto}
                  produtos={this.state.produtos}
                  loadProdutoById={this.loadProdutoById}
                  editProduto={this.editProduto}
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
