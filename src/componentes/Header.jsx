import logoCorujao from "../assets/corujao-logo.jpeg"

import {
  LayoutDashboard,
  Package,
  ClipboardList,
  BarChart3,
  Sparkles,
} from "lucide-react"

export default function Header({ activeTab, setActiveTab }) {
  const tabs = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "products", label: "Produtos", icon: Package },
    { id: "orders", label: "Pedidos", icon: ClipboardList },
    { id: "reports", label: "Relatórios", icon: BarChart3 },
    { id: "ai", label: "IA", icon: Sparkles },
  ]

  return (
    <header className="header app-header-v4">
      <div className="system-watermark">
        <span>AI Sales Console</span>
      </div>

      <div className="company-identity">
        <div className="company-logo company-logo-image">
          <img src={logoCorujao} alt="Logo Corujão Burguer" />
        </div>

        <div>
          <h1>
            Corujão <span>Burguer</span>
          </h1>
          <p>Sistema de vendas com inteligência artificial</p>
        </div>
      </div>

      <nav className="tabs">
        {tabs.map((tab) => {
          const Icon = tab.icon

          return (
            <button
              key={tab.id}
              className={activeTab === tab.id ? "tab active" : "tab"}
              onClick={() => setActiveTab(tab.id)}
            >
              <Icon size={18} />
              <span>{tab.label}</span>
            </button>
          )
        })}
      </nav>
    </header>
  )
}