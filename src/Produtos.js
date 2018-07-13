import React, { Component } from "react";
import { Route, Link } from "react-router-dom";
import axios from "axios";

import ProdutosHome from "./ProdutosHome";
import Categoria from "./Categoria";

class Produtos extends Component {
  constructor(props) {
    super(props);

    this.state = {
      categorias: []
    };

    this.handleNewCategoria = this.handleNewCategoria.bind(this);
    this.loadCategorias = this.loadCategorias.bind(this);
    this.removeCategoria = this.removeCategoria.bind(this);
    this.renderCategoria = this.renderCategoria.bind(this);
  }
  componentDidMount() {
    this.loadCategorias();
  }
  loadCategorias() {
    axios.get("http://localhost:3001/categorias").then(res => {
      this.setState({
        categorias: res.data
      });
    });
  }
  removeCategoria(categoria) {
    axios
      .delete("http://localhost:3001/categorias/" + categoria.id)
      .then(res => this.loadCategorias());
  }
  renderCategoria(cat) {
    return (
      <li key={cat.id}>
        <Link to={`/produtos/categoria/${cat.id}`}>{cat.categoria}</Link>
        <button
          onClick={() => this.removeCategoria(cat)}
          className="btn-danger"
        >
          e
        </button>
      </li>
    );
  }
  handleNewCategoria(key) {
    if (key.keyCode === 13) {
      axios
        .post("http://localhost:3001/categorias", {
          categoria: this.refs.categoria.value
        })
        .then(res => {
          this.loadCategorias();
          this.refs.categoria.value = "";
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
  render() {
    const { match } = this.props;
    const { categorias } = this.state;

    return (
      <div>
        <div className="jumbotron text-center">
          <h1>Seus Preodutos</h1>
        </div>
        <div className="row">
          <div className="col-md-2">
            <h3>Categorias</h3>
            <ul>{categorias.map(this.renderCategoria)}</ul>
            <div className="well">
              <input
                onKeyUp={this.handleNewCategoria}
                className="form-control"
                type="text"
                ref="categoria"
                placeholder="Nova Categoria"
              />
            </div>
          </div>
          <div className="col-md-8">
            <Route exact path={match.url} component={ProdutosHome} />
            <Route
              exact
              path={match.url + "/categoria/:catId"}
              component={Categoria}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Produtos;
