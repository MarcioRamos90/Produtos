import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3001/"
});

const apis = {
  loadCategorias: () => api.get("categorias"),
  deleteCategoria: categoria => api.delete("categorias/" + categoria.id),
  createCategoria: categoria =>
    api.post("categorias", {
      categoria: categoria
    })
};

export default apis;
