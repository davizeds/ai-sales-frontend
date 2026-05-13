import { useEffect, useState } from "react"
import {
  DollarSign,
  Star,
  ClipboardCheck,
  RefreshCw,
  BarChart3,
  Lightbulb,
  TrendingUp,
} from "lucide-react"

import { api } from "../services/api"

export default function Reports() {
  const [totalSold, setTotalSold] = useState(0)
  const [topProduct, setTopProduct] = useState("-")
  const [topProductQuantity, setTopProductQuantity] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadReports() {
      try {
        const [totalResponse, topProductResponse] = await Promise.all([
          api.getTotalSold(),
          api.getTopProduct(),
        ])

        setTotalSold(getTotalSoldValue(totalResponse))

        const bestProduct = getTopProductValue(topProductResponse)
        setTopProduct(bestProduct.name)
        setTopProductQuantity(bestProduct.quantity)
      } catch {
        setTotalSold(0)
        setTopProduct("-")
        setTopProductQuantity(null)
      } finally {
        setLoading(false)
      }
    }

    loadReports()
  }, [])

  function getTotalSoldValue(data) {
    return data.total_vendido || data.total || data.valor_total || 0
  }

  function getTopProductValue(data) {
    return {
      name:
        data.produto ||
        data.nome ||
        data.mais_vendido ||
        data.produto_mais_vendido ||
        data.resposta ||
        "-",
      quantity:
        data.quantidade ||
        data.total_quantidade ||
        data.quantidade_vendida ||
        null,
    }
  }

  function formatCurrency(value) {
    return Number(value).toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    })
  }

  const reports = [
    {
      title: "Total vendido",
      value: loading ? "Carregando..." : formatCurrency(totalSold),
      description: "Soma total dos pedidos registrados.",
      icon: DollarSign,
    },
    {
      title: "Produto mais vendido",
      value: loading ? "Carregando..." : topProduct,
      description: topProductQuantity
        ? `${topProductQuantity} unidades vendidas.`
        : "Produto com maior quantidade vendida.",
      icon: Star,
    },
    {
      title: "Pedidos concluídos",
      value: "0",
      description: "Quantidade de pedidos finalizados.",
      icon: ClipboardCheck,
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
          <RefreshCw size={17} />
          Atualizar relatórios
        </button>
      </div>

      <div className="reports-grid">
        {reports.map((report) => {
          const Icon = report.icon

          return (
            <article className="report-card" key={report.title}>
              <div className="report-icon">
                <Icon size={20} />
              </div>

              <span>{report.title}</span>
              <strong>{report.value}</strong>
              <p>{report.description}</p>
            </article>
          )
        })}
      </div>

      <div className="reports-bottom">
        <div className="panel">
          <h2>
            <BarChart3 size={22} />
            Resumo dos dados
          </h2>

          <p>
            Os relatórios são alimentados diretamente pelo backend,
            permitindo acompanhar vendas, produtos e desempenho geral.
          </p>

          <div className="progress-list">
            <div>
              <span>Vendas</span>
              <div className="progress-bar">
                <div style={{ width: totalSold > 0 ? "72%" : "8%" }}></div>
              </div>
            </div>

            <div>
              <span>Produtos</span>
              <div className="progress-bar">
                <div style={{ width: topProduct !== "-" ? "54%" : "8%" }}></div>
              </div>
            </div>

            <div>
              <span>Pedidos</span>
              <div className="progress-bar">
                <div style={{ width: "8%" }}></div>
              </div>
            </div>
          </div>
        </div>

        <div className="panel">
          <h2>
            <Lightbulb size={22} />
            Insights
          </h2>

          <div className="insights-list">
            {insights.map((item) => (
              <div className="insight-item" key={item}>
                <TrendingUp size={20} />
                <p>{item}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}