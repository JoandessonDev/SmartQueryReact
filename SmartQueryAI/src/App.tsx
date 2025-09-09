import "./App.css";
import { ChatContainer } from "./assets/components/ChatContainer";
import { ChatInput } from "./assets/components/ChatInput";
import { ChatMessage } from "./assets/components/ChatMessage";
import { Container } from "./assets/components/Container";
import { Header } from "./assets/components/Header";
import { useState } from "react";
import { sendMessage, SendResponse } from "./services/api";
import { Message } from "./types/messages";

function nowTime(): string{
  const d = new Date();
  return d.toLocaleTimeString([], {hour: "2-digit", minute: "2-digit"});
}

function rowsToPrettyText(rows: Record<string, unknown>[]): string {
  if (!rows.length) return "Sem registros.";
  const cols = Object.keys(rows[0]);
  const header = cols.join(" | ");
  const lines = rows.map(r => cols.map(c => {
    const v = r[c];
    if (v === null || v === undefined) return "";
    if (typeof v === "object") return JSON.stringify(v);
    return String(v);
  }).join(" | "));
  
  return [header, ...lines].join("\n");
}

function App() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: String(Date.now()),
      text: "Olá! Sou seu assistente de consultas SQL. Digite sua pergunta e eu buscarei os dados para você.",
      time: nowTime(),
      sender: "bot",
    },
  ]);

  const [loading, setLoading] = useState(false);

  const handleSend = async (text: string) => {
    const userMessage:  Message = {
                          id: String(Date.now()),
                          text, time: nowTime(),
                          sender: "user" 
                        };
    setMessages(prev => [...prev, userMessage]);
    setLoading(true);

    try{
      const resp: SendResponse = await sendMessage(text);

      if(resp.message){
        const botMessage: Message = {
                            id: String(Date.now() + 1),
                            text: resp.message,
                            time: nowTime(), 
                            sender: 'bot'
                          };
        setMessages(prev => [...prev, botMessage]);                          
      }

      if (resp.rows && resp.rows.length) {
        const pretty = rowsToPrettyText(resp.rows);
        const tableMsg: Message = { id: String(Date.now() + 2), text: pretty, time: nowTime(), sender: "bot", rows: resp.rows };
        setMessages(prev => [...prev, tableMsg]);
      }

      if (!resp.message && (!resp.rows || resp.rows.length === 0)) {
        const emptyMsg: Message = { id: String(Date.now() + 3), text: "Nenhum dado encontrado", time: nowTime(), sender: "bot" };
        setMessages(prev => [...prev, emptyMsg]);
      }
    } 
    catch (err: any) {
      const errorMsg: Message = { id: String(Date.now() + 4), text: `Erro: ${err?.message ?? err}`, time: nowTime(), sender: "bot" };
      setMessages(prev => [...prev, errorMsg]);
    } 
    finally {
      setLoading(false);
    }
  }

 return (
    <Container>
      <Header />
      <ChatContainer>
        {messages.map((m) =>
          m.rows ? (
            <ChatMessage key={m.id} time={m.time} sender={m.sender}>
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                  <thead>
                    <tr>
                      {Object.keys(m.rows[0]).map((col) => (
                        <th key={col} style={{ borderBottom: "1px solid #ddd", padding: "6px", textAlign: "left" }}>{col}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {m.rows.map((row, i) => (
                      <tr key={i}>
                        {Object.values(row).map((val, j) => (
                          <td key={j} style={{ padding: "6px", borderBottom: "1px solid #f0f0f0" }}>{String(val ?? "")}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </ChatMessage>
          ) : (
            <ChatMessage key={m.id} text={m.text} time={m.time} sender={m.sender} />
          )
        )}
      </ChatContainer>

      <ChatInput onSend={handleSend} disabled={loading} />
    </Container>
  );
}



export default App;
