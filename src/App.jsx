import { useState } from "react"
import "./App.css"

import Header from "./componentes/Header.jsx"
import Dashboard from "./componentes/Dashboard.jsx"
import Products from "./componentes/Products.jsx"
import Orders from "./componentes/Orders.jsx"
import Reports from "./componentes/Reports.jsx"
import AiAssistant from "./componentes/AiAssistant.jsx"

function App() {
  const [activeTab, setActiveTab] = useState("dashboard")

  function renderContent() {
    if (activeTab === "dashboard") return <Dashboard />
    if (activeTab === "products") return <Products />
    if (activeTab === "orders") return <Orders />
    if (activeTab === "reports") return <Reports />
    if (activeTab === "ai") return <AiAssistant />

    return <Dashboard />
  }

  return (
    <main className="app">
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />

      <section className="content">
        {renderContent()}
      </section>
    </main>
  )
}

export default App