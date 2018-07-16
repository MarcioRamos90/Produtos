import React, { Component } from "react";
import { Route, Link } from "react-router-dom";

import ProdutosHome from "./ProdutosHome";
import Categoria from "./Categoria";
import ProdutoNovo from "./ProdutoNovo";
import ProdutoEdit from "./ProdutoEdit";

class Produtos extends Component {
  constructor(props) {
    super(props);

    this.state = {
      categoriaEditing: ""
    };

    this.editCategoria = this.editCategoria.bind(this);
    this.handleNewCategoria = this.handleNewCategoria.bind(this);
    this.renderCategoria = this.renderCategoria.bind(this);
    this.cleanEdit = this.cleanEdit.bind(this);
    this.handleEditCategoria = this.handleEditCategoria.bind(this);
  }
  cleanEdit() {
    this.setState({
      categoriaEditing: ""
    });
  }
  componentDidMount() {
    this.props.loadCategorias();
  }
  editCategoria(categoria) {
    this.setState({
      categoriaEditing: categoria.id
    });
  }
  renderCategoria(cat) {
    return (
      <li key={cat.id} style={{ marginBottom: "5px" }}>
        {this.state.categoriaEditing === cat.id && (
          <div className="input-group">
            <div className="input-group-btn">
              <input
                ref={"cat-" + cat.id}
                className="form-control"
                type="text"
                defaultValue={cat.categoria}
                onKeyUp={this.handleEditCategoria}
              />
              <button
                onClick={() => this.cleanEdit()}
                className="btn btn-danger"
              >
                cancel
              </button>
            </div>
          </div>
        )}
        {this.state.categoriaEditing !== cat.id && (
          <div>
            <a onClick={() => this.props.removeCategoria(cat)}>
              <i className="fas fa-trash" style={{ color: "#555" }} />
            </a>

            <a onClick={() => this.editCategoria(cat)}>
              <i
                className="fas fa-pencil-alt"
                style={{ color: "#555", margin: "3px" }}
              />
            </a>
            <Link
              style={{ marginLeft: "5px", color: "#555" }}
              to={`/produtos/categoria/${cat.id}`}
            >
              {cat.categoria}
            </Link>
          </div>
        )}
      </li>
    );
  }
  handleEditCategoria(key) {
    if (key.keyCode === 13) {
      // console.log(this.props.re);
      this.props.editCategoria({
        id: this.state.categoriaEditing,
        categoria: this.refs["cat-" + this.state.categoriaEditing].value
      });
      this.cleanEdit();
    }
  }
  handleNewCategoria(key) {
    if (key.keyCode === 13) {
      this.props.createCategoria(this.refs.categoria.value);
      this.refs.categoria.value = "";
    }
  }
  render() {
    const { match, categorias, produtos, categoria } = this.props;

    return (
      <div>
        <div className="jumbotron text-center">
          <h1>Seus Preodutos</h1>
        </div>
        <div className="row">
          <div className="col-md-2">
            <h3>Categorias</h3>
            <ul style={{ listStyle: "none", padding: "0" }}>
              {categorias.map(this.renderCategoria)}
            </ul>
            <div className="well">
              <input
                onKeyUp={this.handleNewCategoria}
                className="form-control"
                type="text"
                ref="categoria"
                placeholder="Nova Categoria"
              />
            </div>
            <Link to={"/produtos/novo"}>Novo Produto</Link>
          </div>
          <div className="col-md-8">
            <Route exact path={match.url} component={ProdutosHome} />
            <Route
              exact
              path={match.url + "/novo"}
              render={props => {
                return (
                  <ProdutoNovo
                    {...props}
                    categorias={categorias}
                    createProduto={this.props.createProduto}
                  />
                );
              }}
            />
            <Route
              path={match.url + "/editar/:id"}
              render={props => {
                return (
                  <ProdutoEdit
                    {...props}
                    categorias={categorias}
                    loadProdutoById={this.props.loadProdutoById}
                    editProduto={this.props.editProduto}
                  />
                );
              }}
            />
            <Route
              exact
              path={match.url + "/categoria/:catId"}
              render={props => {
                return (
                  <Categoria
                    {...props}
                    loadProdutosByCategoria={this.props.loadProdutosByCategoria}
                    produtos={produtos}
                    categoria={categoria}
                    loadCategoriaById={this.props.loadCategoriaById}
                    removeProduto={this.props.removeProduto}
                  />
                );
              }}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Produtos;
