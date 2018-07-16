import React, { Component } from "react";
import { Redirect } from "react-router-dom";

class ProdutoEdit extends Component {
  constructor(props) {
    super(props);

    this.state = {
      redirect: null
    };

    this.handleEditProduto = this.handleEditProduto.bind(this);
    this.readProduto = this.readProduto.bind(this);
  }
  componentDidMount() {
    this.readProduto();
  }
  readProduto() {
    this.props.loadProdutoById(this.props.match.params.id).then(res => {
      this.refs.produto.value = res.data.descricao;
      this.refs.categoria.value = res.data.categoria;
      console.log(res.data.categoria);
    });
  }
  handleEditProduto() {
    const produto = {
      id: this.props.match.params.id,
      descricao: this.refs.produto.value,
      categoria: this.refs.categoria.value
    };
    this.props
      .editProduto(produto)
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
      <dir>
        <h2>Edição de Produtos</h2>
        <select ref="categoria">
          {categorias.map(categoria => (
            <option key={categoria.id} value={categoria.id}>
              {categoria.categoria}
            </option>
          ))}
        </select>
        <input
          className="form-control"
          ref="produto"
          placeholder="Nome do produto"
        />
        <button
          onClick={this.handleEditProduto}
          className="btn btn-primary right"
        >
          Save
        </button>
      </dir>
    );
  }
}

export default ProdutoEdit;
