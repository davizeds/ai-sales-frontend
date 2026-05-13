const API_BASE_URL = "http://127.0.0.1:8000"

async function request(path, options = {}) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    ...options,
  })

  if (!response.ok) {
    throw new Error("Erro ao buscar dados da API")
  }

  return response.json()
}

export const api = {
  getProducts() {
    return request("/produtos")
  },

  getTotalSold() {
    return request("/total_vendido")
  },

  getTopProduct() {
    return request("/produto_mais_vendido")
  },

  askAI(pergunta) {
    return request("/ia/perguntar", {
      method: "POST",
      body: JSON.stringify({
        pergunta: pergunta,
      }),
    })
  },

  getOrders() {
    return request("/pedidos")
  },
}