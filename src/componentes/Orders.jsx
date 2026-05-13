import { useEffect, useState } from "react"
import {
  ClipboardList,
  User,
  Package,
  Hash,
  PlusCircle,
  CheckCircle,
} from "lucide-react"

import { api } from "../services/api"

export default function Orders() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    async function loadOrders() {
      try {
        const data = await api.getOrders()

        const orderList = Array.isArray(data)
          ? data
          : data.resultado || data.lista || data.pedidos || []

        setOrders(orderList)
      } catch {
        setError("Não foi possível carregar os pedidos do backend.")
      } finally {
        setLoading(false)
      }
    }

    loadOrders()
  }, [])

  function formatCurrency(value) {
    return Number(value || 0).toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    })
  }

  function getOrderItemsCount(order) {
    if (!Array.isArray(order.itens)) {
      return 0
    }

    return order.itens.reduce((total, item) => {
      return total + Number(item.quantidade || 0)
    }, 0)
  }

  return (
    <section className="page orders-page">
      <div className="page-header">
        <div>
          <span className="eyebrow">Operações</span>
          <h1>Pedidos</h1>
          <p>Crie, acompanhe e gerencie pedidos do sistema.</p>
        </div>

        <button className="dashboard-action">
          <PlusCircle size={17} />
          Novo pedido
        </button>
      </div>

      <div className="orders-layout">
        <div className="order-create-panel">
          <h2>
            <ClipboardList size={22} />
            Criar novo pedido
          </h2>

          <p>
            Selecione cliente, produtos e quantidades para gerar um pedido.
          </p>

          <div className="fake-form">
            <div className="fake-input">
              <User size={17} />
              Selecionar cliente
            </div>

            <div className="fake-input">
              <Package size={17} />
              Selecionar produto
            </div>

            <div className="fake-input">
              <Hash size={17} />
              Quantidade
            </div>
          </div>

          <button className="primary-button">
            <PlusCircle size={17} />
            Criar pedido
          </button>
        </div>

        <div className="orders-list-panel">
          <div className="panel-title">
            <h2>
              <ClipboardList size={22} />
              Últimos pedidos
            </h2>

            <span>
              {orders.length} pedidos
            </span>
          </div>

          {loading && (
            <div className="empty-state">
              Carregando pedidos do backend...
            </div>
          )}

          {error && (
            <div className="empty-state error-state">
              {error}
            </div>
          )}

          {!loading && !error && orders.length === 0 && (
            <div className="empty-state">
              Nenhum pedido encontrado.
            </div>
          )}

          {!loading && !error && orders.length > 0 && (
            <div className="orders-list">
              {orders.map((order) => {
                const itemsCount = getOrderItemsCount(order)

                return (
                  <article className="order-card" key={order.id}>
                    <div>
                      <span className="order-id">
                        #{String(order.id).padStart(3, "0")}
                      </span>

                      <h3>Cliente #{order.cliente_id}</h3>

                      <p>
                        {itemsCount} {itemsCount === 1 ? "item" : "itens"}
                      </p>
                    </div>

                    <div className="order-right">
                      <strong>{formatCurrency(order.total)}</strong>

                      <span className="status-badge">
                        <CheckCircle size={15} />
                        Registrado
                      </span>
                    </div>
                  </article>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}