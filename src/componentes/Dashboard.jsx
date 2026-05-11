export default function Dashboard() {
  const metrics = [
    {
      label: "Total vendido",
      value: "R$ 0,00",
      description: "Valor acumulado em pedidos",
      icon: "R$",
      tag: "Financeiro",
    },
    {
      label: "Produto mais vendido",
      value: "-",
      description: "Aguardando dados do backend",
      icon: "★",
      tag: "Produto",
    },
    {
      label: "Pedidos",
      value: "0",
      description: "Pedidos registrados no sistema",
      icon: "#",
      tag: "Operação",
    },
    {
      label: "IA",
      value: "Ativa",
      description: "Assistente inteligente conectado",
      icon: "AI",
      tag: "Online",
    },
  ]

  const systemStatus = [
    {
      title: "API Backend",
      description: "FastAPI conectada ao sistema de vendas.",
      status: "Pronto",
    },
    {
      title: "Relatórios",
      description: "Total vendido e produto mais vendido disponíveis.",
      status: "Pronto",
    },
    {
      title: "Assistente IA",
      description: "Preparado para responder perguntas do sistema.",
      status: "Ativo",
    },
  ]

  return (
    <section className="page dashboard-page">
      <div className="page-header">
        <div>
          <span className="eyebrow">Visão geral</span>
          <h1>Dashboard</h1>
          <p>Resumo inteligente do sistema de vendas.</p>
        </div>

        <button className="dashboard-action">
          Sincronizar dados
        </button>
      </div>

      <div className="metrics-grid">
        {metrics.map((metric) => (
          <article className="metric-card polished-metric" key={metric.label}>
            <div className="metric-top">
              <div>
                <span>{metric.label}</span>
                <small>{metric.tag}</small>
              </div>

              <div className="metric-icon">
                {metric.icon}
              </div>
            </div>

            <strong>{metric.value}</strong>
            <p>{metric.description}</p>
          </article>
        ))}
      </div>

      <div className="dashboard-grid">
        <div className="panel summary-panel">
          <div className="panel-heading">
            <div>
              <span className="eyebrow small-eyebrow">Análise</span>
              <h2>Resumo inteligente</h2>
            </div>

            <span className="panel-badge">
              IA Insights
            </span>
          </div>

          <p>
            A IA poderá analisar vendas, estoque, produtos mais vendidos
            e gerar recomendações com base nos dados reais do sistema.
          </p>

          <div className="summary-list">
            <div>
              <span>01</span>
              <p>Identificar produtos com maior saída.</p>
            </div>

            <div>
              <span>02</span>
              <p>Acompanhar desempenho geral de vendas.</p>
            </div>

            <div>
              <span>03</span>
              <p>Sugerir decisões baseadas nos relatórios.</p>
            </div>
          </div>
        </div>

        <div className="panel status-panel">
          <div className="panel-heading">
            <div>
              <span className="eyebrow small-eyebrow">Sistema</span>
              <h2>Status operacional</h2>
            </div>
          </div>

          <div className="activity-list">
            {systemStatus.map((item) => (
              <div className="activity-item status-item" key={item.title}>
                <div>
                  <span>{item.title}</span>
                  <p>{item.description}</p>
                </div>

                <strong>{item.status}</strong>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}