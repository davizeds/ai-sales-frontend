export default function Orders() {
  const orders = [
    {
      id: "#001",
      client: "Cliente exemplo 1",
      total: "R$ 149,70",
      status: "Concluído",
      items: "3 itens",
    },
    {
      id: "#002",
      client: "Cliente exemplo 2",
      total: "R$ 89,90",
      status: "Em análise",
      items: "1 item",
    },
    {
      id: "#003",
      client: "Cliente exemplo 3",
      total: "R$ 259,80",
      status: "Concluído",
      items: "4 itens",
    },
  ]

  return (
    <section className="page orders-page">
      <div className="page-header">
        <div>
          <span className="eyebrow">Operações</span>
          <h1>Pedidos</h1>
          <p>Crie, acompanhe e gerencie pedidos do sistema.</p>
        </div>

        <button className="dashboard-action">
          Novo pedido
        </button>
      </div>

      <div className="orders-layout">
        <div className="order-create-panel">
          <h2>Criar novo pedido</h2>
          <p>Selecione cliente, produtos e quantidades para gerar um pedido.</p>

          <div className="fake-form">
            <div className="fake-input">Selecionar cliente</div>
            <div className="fake-input">Selecionar produto</div>
            <div className="fake-input">Quantidade</div>
          </div>

          <button className="primary-button">
            Criar pedido
          </button>
        </div>

        <div className="orders-list-panel">
          <div className="panel-title">
            <h2>Últimos pedidos</h2>
            <span>{orders.length} pedidos</span>
          </div>

          <div className="orders-list">
            {orders.map((order) => (
              <article className="order-card" key={order.id}>
                <div>
                  <span className="order-id">{order.id}</span>
                  <h3>{order.client}</h3>
                  <p>{order.items}</p>
                </div>

                <div className="order-right">
                  <strong>{order.total}</strong>
                  <span className="status-badge">{order.status}</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}