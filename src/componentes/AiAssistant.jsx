export default function AiAssistant() {
  const suggestions = [
    "Qual produto vendeu mais?",
    "Quanto vendi no total?",
    "Quais produtos estão com estoque baixo?",
  ]

  const messages = [
    {
      type: "user",
      text: "Qual produto vendeu mais?",
    },
    {
      type: "ai",
      text: "O produto mais vendido será exibido aqui com base nos dados reais do backend.",
    },
  ]

  return (
    <section className="page ai-page">
      <div className="page-header">
        <div>
          <span className="eyebrow">Inteligência Artificial</span>
          <h1>Assistente IA</h1>
          <p>Faça perguntas sobre vendas, produtos, pedidos e relatórios.</p>
        </div>

        <button className="dashboard-action">
          Nova conversa
        </button>
      </div>

      <div className="ai-layout">
        <div className="ai-chat-panel">
          <div className="chat-header">
            <div>
              <h2>Chat inteligente</h2>
              <p>Conectado aos dados do sistema.</p>
            </div>

            <span className="ai-status">Online</span>
          </div>

          <div className="chat-messages">
            {messages.map((message, index) => (
              <div
                className={
                  message.type === "user"
                    ? "chat-message user-message"
                    : "chat-message ai-message"
                }
                key={index}
              >
                <span>{message.type === "user" ? "Você" : "AI Sales"}</span>
                <p>{message.text}</p>
              </div>
            ))}
          </div>

          <div className="chat-input-area">
            <div className="chat-input">
              Digite sua pergunta sobre o sistema...
            </div>

            <button className="primary-button">
              Perguntar
            </button>
          </div>
        </div>

        <div className="ai-side-panel">
          <h2>Perguntas sugeridas</h2>
          <p>Use exemplos rápidos para consultar os dados do negócio.</p>

          <div className="suggestions-list">
            {suggestions.map((suggestion) => (
              <button key={suggestion}>
                {suggestion}
              </button>
            ))}
          </div>

          <div className="ai-info-card">
            <span>Como funciona</span>
            <p>
              O backend consulta os dados reais do sistema e envia contexto
              para a IA responder de forma natural.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}