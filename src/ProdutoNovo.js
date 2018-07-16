import React, { Component } from "react";
import { Redirect } from "react-router-dom";

class ProdutoNovo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      redirect: false
    };

    this.handleNewProduto = this.handleNewProduto.bind(this);
  }
  handleNewProduto() {
    const produto = {
      descricao: this.refs.produto.value,
      categoria: this.refs.categoria.value
    };
    this.props
      .createProduto(produto)
      .then(res =>
        this.setState({ redirect: "/produtos/categoria/" + produto.categoria })
      );
  }
  render() {
    const { categorias } = this.props;
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />;
    }
    return (
      <div>
        <h2>Novo Produto</h2>
        <select ref="categoria">
          {categorias.map(categoria => (
            <option key={categoria.id} value={categoria.id}>
              {" "}
              {categoria.categoria}{" "}
            </option>
          ))}
        </select>
        <input
          className="form-control"
          ref="produto"
          placeholder="Nome do produto"
        />
        <button
          onClick={this.handleNewProduto}
          className="btn btn-primary right"
        >
          Save
        </button>
      </div>
    );
  }
}

export default ProdutoNovo;
