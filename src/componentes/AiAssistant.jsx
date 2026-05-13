import { useState } from "react"
import {
  Send,
  Sparkles,
  Lightbulb,
  Settings,
  Database,
  Server,
  Brain,
  MessageCircle,
  ArrowRight,
} from "lucide-react"

import { api } from "../services/api"

export default function AiAssistant() {
  const [question, setQuestion] = useState("")
  const [loading, setLoading] = useState(false)
  const [messages, setMessages] = useState([
    {
      type: "ai",
      text: "Olá! Posso responder perguntas sobre vendas, produtos, pedidos e relatórios do sistema.",
    },
  ])

  const suggestions = [
    "Qual produto mais vendido?",
    "Quanto vendi no total?",
    "Quais produtos estão cadastrados?",
  ]

  async function handleAsk(customQuestion) {
    const currentQuestion = customQuestion || question

    if (!currentQuestion.trim()) {
      return
    }

    const userMessage = {
      type: "user",
      text: currentQuestion,
    }

    setMessages((currentMessages) => [...currentMessages, userMessage])
    setQuestion("")
    setLoading(true)

    try {
      const response = await api.askAI(currentQuestion)

      const answer =
        response.resposta ||
        response.mensagem ||
        response.message ||
        "A IA respondeu, mas não encontrei o campo de resposta esperado."

      const aiMessage = {
        type: "ai",
        text: answer,
      }

      setMessages((currentMessages) => [...currentMessages, aiMessage])
    } catch {
      const errorMessage = {
        type: "ai",
        text: "Não consegui conectar com a IA no backend agora.",
      }

      setMessages((currentMessages) => [...currentMessages, errorMessage])
    } finally {
      setLoading(false)
    }
  }

  function handleSubmit(event) {
    event.preventDefault()
    handleAsk()
  }

  return (
    <section className="page ai-page">
      <div className="page-header">
        <div>
          <span className="eyebrow">Inteligência Artificial</span>
          <h1>Assistente IA</h1>
          <p>Faça perguntas sobre vendas, produtos, pedidos e relatórios.</p>
        </div>

        <button
          className="dashboard-action"
          onClick={() =>
            setMessages([
              {
                type: "ai",
                text: "Nova conversa iniciada. Faça uma pergunta sobre o sistema.",
              },
            ])
          }
        >
          <MessageCircle size={17} />
          Nova conversa
        </button>
      </div>

      <div className="ai-layout">
        <div className="ai-chat-panel">
          <div className="chat-header">
            <div>
              <h2>
                <Sparkles size={22} />
                Chat inteligente
              </h2>
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

            {loading && (
              <div className="chat-message ai-message">
                <span>AI Sales</span>
                <p>Consultando backend...</p>
              </div>
            )}
          </div>

          <form className="chat-input-area" onSubmit={handleSubmit}>
            <input
              className="chat-input"
              type="text"
              placeholder="Digite sua pergunta sobre o sistema..."
              value={question}
              onChange={(event) => setQuestion(event.target.value)}
            />

            <button className="primary-button" type="submit" disabled={loading}>
              <Send size={17} />
              Perguntar
            </button>
          </form>
        </div>

        <div className="ai-side-panel">
          <h2>
            <Lightbulb size={22} />
            Perguntas sugeridas
          </h2>

          <p>Use exemplos rápidos para consultar os dados do negócio.</p>

          <div className="suggestions-list">
            {suggestions.map((suggestion) => (
              <button
                key={suggestion}
                onClick={() => handleAsk(suggestion)}
                disabled={loading}
              >
                {suggestion}
                <ArrowRight size={17} />
              </button>
            ))}
          </div>

          <div className="ai-info-card">
            <span>
              <Settings size={18} />
              Como funciona
            </span>

            <p>
              O frontend envia a pergunta para o backend. O backend consulta os
              dados do sistema e retorna uma resposta para o chat.
            </p>

            <div className="ai-flow">
              <div>
                <Database size={22} />
                <small>Dados</small>
              </div>

              <ArrowRight size={16} />

              <div>
                <Server size={22} />
                <small>API</small>
              </div>

              <ArrowRight size={16} />

              <div>
                <Brain size={22} />
                <small>IA</small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}