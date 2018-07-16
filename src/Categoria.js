import React, { Component } from "react";
import { Link } from "react-router-dom";

class Categoria extends Component {
  constructor(props) {
    super(props);
    this.loadData = this.loadData.bind(this);
    this.removeProduto = this.removeProduto.bind(this);
    this.renderProduto = this.renderProduto.bind(this);

    this.state = {
      produtos: [],
      categoria: {},
      id: null
    };
  }
  removeProduto(id) {
    this.props
      .removeProduto(id)
      .then(res => this.loadData(this.props.match.params.catId));
  }
  loadData(id) {
    this.setState({ id });
    this.props.loadProdutosByCategoria(id);
    this.props.loadCategoriaById(id);
  }
  componentDidMount() {
    const catIds = this.props.match.params.catId;
    this.loadData(catIds);
  }

  componentWillReceiveProps(newProps) {
    if (newProps.match.params.catId !== this.state.id) {
      this.loadData(newProps.match.params.catId);
    }
  }
  renderProduto(produto) {
    return (
      <p key={produto.id} className="alert alert-info">
        <a onClick={() => this.removeProduto(produto.id)}>
          <i className="fas fa-trash" style={{ color: "#555" }} />
        </a>
        <Link to={"/produtos/editar/" + produto.id}>
          <i
            className="fas fa-pencil-alt"
            style={{ color: "#555", margin: "10px" }}
          />
        </Link>
        {produto.descricao}
      </p>
    );
  }
  render() {
    return (
      <div>
        <h1>{this.props.categoria.categoria}</h1>
        {this.props.produtos.length === 0 && (
          <p className="alert alert-danger">Nenhum Produto</p>
        )}
        {this.props.produtos.map(this.renderProduto)}
      </div>
    );
  }
}

export default Categoria;
