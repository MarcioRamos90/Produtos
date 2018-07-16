import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3001/"
});

const apis = {
  loadCategorias: () => api.get("categorias"),
  loadCategoriaById: categoria =>
    api.get(`http://localhost:3001/categorias/${categoria}`),
  deleteCategoria: categoria => api.delete("categorias/" + categoria.id),
  createCategoria: categoria => api.post("categorias", { categoria }),
  editCategoria: categoria => api.put("categorias/" + categoria.id, categoria),

  getProdutoByCategoria: categoria =>
    api.get(`produtos?categoria=${categoria}`),
  createProduto: produto => api.post("produtos", produto),
  deleteProduto: id => api.delete("produtos/" + id),
  getProdutoById: id => api.get("produtos/" + id),
  editProduto: produto => api.put("produtos/" + produto.id, produto)
};

export default apis;
