export default function Reports() {
  const reports = [
    {
      title: "Total vendido",
      value: "R$ 0,00",
      description: "Soma total dos pedidos registrados.",
    },
    {
      title: "Produto mais vendido",
      value: "-",
      description: "Produto com maior quantidade vendida.",
    },
    {
      title: "Pedidos concluídos",
      value: "0",
      description: "Quantidade de pedidos finalizados.",
    },
  ]

  const insights = [
    "Acompanhe o faturamento total do sistema.",
    "Identifique quais produtos têm maior saída.",
    "Use os dados como base para decisões comerciais.",
  ]

  return (
    <section className="page reports-page">
      <div className="page-header">
        <div>
          <span className="eyebrow">Análise</span>
          <h1>Relatórios</h1>
          <p>Visualize métricas comerciais e indicadores do sistema.</p>
        </div>

        <button className="dashboard-action">
          Atualizar relatórios
        </button>
      </div>

      <div className="reports-grid">
        {reports.map((report) => (
          <article className="report-card" key={report.title}>
            <span>{report.title}</span>
            <strong>{report.value}</strong>
            <p>{report.description}</p>
          </article>
        ))}
      </div>

      <div className="reports-bottom">
        <div className="panel">
          <h2>Resumo dos dados</h2>
          <p>
            Os relatórios serão alimentados diretamente pelo backend,
            permitindo acompanhar vendas, produtos e desempenho geral.
          </p>

          <div className="progress-list">
            <div>
              <span>Vendas</span>
              <div className="progress-bar">
                <div style={{ width: "72%" }}></div>
              </div>
            </div>

            <div>
              <span>Produtos</span>
              <div className="progress-bar">
                <div style={{ width: "54%" }}></div>
              </div>
            </div>

            <div>
              <span>Pedidos</span>
              <div className="progress-bar">
                <div style={{ width: "86%" }}></div>
              </div>
            </div>
          </div>
        </div>

        <div className="panel">
          <h2>Insights</h2>

          <div className="insights-list">
            {insights.map((item) => (
              <div className="insight-item" key={item}>
                <span>•</span>
                <p>{item}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}