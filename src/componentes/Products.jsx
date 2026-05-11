export default function Products() {
  const products = [
    {
      name: "Produto exemplo 1",
      price: "R$ 49,90",
      stock: 12,
      status: "Em estoque",
    },
    {
      name: "Produto exemplo 2",
      price: "R$ 89,90",
      stock: 5,
      status: "Estoque baixo",
    },
    {
      name: "Produto exemplo 3",
      price: "R$ 129,90",
      stock: 22,
      status: "Em estoque",
    },
  ]

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
        <div className="search-box">
          Buscar produto...
        </div>

        <span className="products-count">
          {products.length} produtos cadastrados
        </span>
      </div>

      <div className="products-grid">
        {products.map((product) => (
          <article className="product-card" key={product.name}>
            <div className="product-card-header">
              <div>
                <span className="product-label">Produto</span>
                <h2>{product.name}</h2>
              </div>

              <span className="status-badge">
                {product.status}
              </span>
            </div>

            <div className="product-info">
              <div>
                <span>Preço</span>
                <strong>{product.price}</strong>
              </div>

              <div>
                <span>Estoque</span>
                <strong>{product.stock}</strong>
              </div>
            </div>

            <div className="product-actions">
              <button>Editar</button>
              <button>Detalhes</button>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}