import { useEffect, useState } from "react"
import {
  DollarSign,
  Star,
  ClipboardList,
  Sparkles,
  Brain,
  ShieldCheck,
  Search,
  BarChart3,
  TrendingUp,
} from "lucide-react"

import { api } from "../services/api"

export default function Dashboard() {
  const [totalSold, setTotalSold] = useState(0)
  const [topProduct, setTopProduct] = useState("-")
  const [topProductQuantity, setTopProductQuantity] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadDashboardData() {
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

    loadDashboardData()
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

  const metrics = [
    {
      label: "Total vendido",
      value: loading ? "Carregando..." : formatCurrency(totalSold),
      description: "Valor acumulado em pedidos",
      icon: DollarSign,
      tag: "Financeiro",
    },
    {
      label: "Produto mais vendido",
      value: loading ? "Carregando..." : topProduct,
      description: topProductQuantity
        ? `${topProductQuantity} unidades vendidas`
        : "Aguardando dados do backend",
      icon: Star,
      tag: "Produto",
    },
    {
      label: "Pedidos",
      value: "0",
      description: "Pedidos registrados no sistema",
      icon: ClipboardList,
      tag: "Operação",
    },
    {
      label: "IA",
      value: "Ativa",
      description: "Assistente inteligente conectado",
      icon: Sparkles,
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
        {metrics.map((metric) => {
          const Icon = metric.icon

          return (
            <article className="metric-card polished-metric" key={metric.label}>
              <div className="metric-top">
                <div>
                  <span>{metric.label}</span>
                  <small>{metric.tag}</small>
                </div>

                <div className="metric-icon">
                  <Icon size={18} />
                </div>
              </div>

              <strong>{metric.value}</strong>
              <p>{metric.description}</p>
            </article>
          )
        })}
      </div>

      <div className="dashboard-grid">
        <div className="panel summary-panel">
          <div className="panel-heading">
            <div>
              <span className="eyebrow small-eyebrow">Análise</span>
              <h2>
                <Brain size={22} />
                Resumo inteligente
              </h2>
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
              <Search size={20} />
              <p>Identificar produtos com maior saída.</p>
            </div>

            <div>
              <span>02</span>
              <BarChart3 size={20} />
              <p>Acompanhar desempenho geral de vendas.</p>
            </div>

            <div>
              <span>03</span>
              <TrendingUp size={20} />
              <p>Sugerir decisões baseadas nos relatórios.</p>
            </div>
          </div>
        </div>

        <div className="panel status-panel">
          <div className="panel-heading">
            <div>
              <span className="eyebrow small-eyebrow">Sistema</span>
              <h2>
                <ShieldCheck size={22} />
                Status operacional
              </h2>
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