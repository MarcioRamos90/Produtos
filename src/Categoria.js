import React, { Component } from "react";
import axios from "axios";

class Categoria extends Component {
  constructor(props) {
    super(props);
    this.loadData = this.loadData.bind(this);

    this.state = {
      produtos: [],
      categoria: {}
    };
  }
  loadData(id) {
    axios.get(`http://localhost:3001/produtos?categoria=${id}`).then(res => {
      this.setState({
        produtos: res.data
      });
    });
    axios.get(`http://localhost:3001/categorias/${id}`).then(res => {
      this.setState({
        categoria: res.data
      });
    });
  }
  componentDidMount() {
    const catIds = this.props.match.params.catId;
    this.loadData(catIds);
  }

  componentWillReceiveProps(newProps) {
    this.loadData(newProps.match.params.catId);
  }
  renderProduto(produto) {
    return (
      <p key={produto.id} className="alert alert-info">
        {produto.descricao}
      </p>
    );
  }
  render() {
    return (
      <div>
        <h1>{this.state.categoria.categoria}</h1>
        {this.state.produtos.map(this.renderProduto)}
      </div>
    );
  }
}

export default Categoria;
