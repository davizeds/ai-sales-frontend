import { useEffect, useState } from "react"
import { Search, Pencil, Info } from "lucide-react"
import { api } from "../services/api"

export default function Products() {
  const [products, setProducts] = useState([])
  const [search, setSearch] = useState("")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    async function loadProducts() {
      try {
        const data = await api.getProducts()

      const productList = Array.isArray(data)
  ? data
  : data.lista || data.produtos || data.products || []

        setProducts(productList)
      } catch {
        setError("Não foi possível carregar os produtos do backend.")
      } finally {
        setLoading(false)
      }
    }

    loadProducts()
  }, [])

  function getProductName(product) {
    return product.nome || product.name || "Produto sem nome"
  }

  function getProductPrice(product) {
    const price = product.preco || product.price || 0

    return Number(price).toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    })
  }

  function getProductStock(product) {
    return product.estoque || product.stock || 0
  }

  function getProductStatus(stock) {
    if (Number(stock) <= 0) return "Sem estoque"
    if (Number(stock) <= 5) return "Estoque baixo"

    return "Em estoque"
  }

  const filteredProducts = products.filter((product) => {
    const name = getProductName(product)

    return name.toLowerCase().includes(search.toLowerCase())
  })

  return (
    <section className="page products-page">
      <div className="page-header">
        <div>
          <span className="eyebrow">Catálogo</span>
          <h1>Produtos</h1>
          <p>Gerencie produtos, preços e estoque do sistema.</p>
        </div>

        <button className="dashboard-action">
          Novo produto
        </button>
      </div>

      <div className="products-toolbar">
        <div className="search-wrapper">
          <Search size={18} />

          <input
            className="search-box"
            type="text"
            placeholder="Buscar produto..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </div>

        <span className="products-count">
          {filteredProducts.length} produtos cadastrados
        </span>
      </div>

      {loading && (
        <div className="empty-state">
          Carregando produtos do backend...
        </div>
      )}

      {error && (
        <div className="empty-state error-state">
          {error}
        </div>
      )}

      {!loading && !error && filteredProducts.length === 0 && (
        <div className="empty-state">
          Nenhum produto encontrado.
        </div>
      )}

      {!loading && !error && filteredProducts.length > 0 && (
        <div className="products-grid">
          {filteredProducts.map((product, index) => {
            const name = getProductName(product)
            const price = getProductPrice(product)
            const stock = getProductStock(product)
            const status = getProductStatus(stock)

            return (
              <article
                className="product-card"
                key={product.id || product.produto_id || index}
              >
                <div className="product-card-header">
                  <div>
                    <span className="product-label">Produto</span>
                    <h2>{name}</h2>
                  </div>

                  <span className="status-badge">
                    {status}
                  </span>
                </div>

                <div className="product-info">
                  <div>
                    <span>Preço</span>
                    <strong>{price}</strong>
                  </div>

                  <div>
                    <span>Estoque</span>
                    <strong>{stock}</strong>
                  </div>
                </div>

                <div className="product-actions">
                  <button>
                    <Pencil size={16} />
                    Editar
                  </button>

                  <button>
                    <Info size={16} />
                    Detalhes
                  </button>
                </div>
              </article>
            )
          })}
        </div>
      )}
    </section>
  )
}