import "./App.css";
import { ChatContainer } from "./assets/components/ChatContainer";
import { ChatInput } from "./assets/components/ChatInput";
import { ChatMessage } from "./assets/components/ChatMessage";
import { Container } from "./assets/components/Container";
import { Header } from "./assets/components/Header";
import { useState } from "react";
import { sendMessage, type SendResponse, type QuestionRequestDTO } from "./services/api";
import { type Message } from "./types/messages";
import { ModePrompt } from "./types/ModePrompt";


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
      const request: QuestionRequestDTO = {
        modePrompt: ModePrompt.Sql,
        messageUser: text
      };

      const resp: SendResponse = await sendMessage(request);

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

//   // coloque isso no topo do arquivo, abaixo dos imports, se quiser
// function isNonEmptyString(v: any): v is string {
//   return typeof v === "string" && v.trim().length > 0;
// }

// function normalizeApiResponse(data: any): SendResponse {
//   // sem dado
//   if (data === null || data === undefined) return {};

//   // já é um SendResponse "normal"
//   if (typeof data === "object" && ("rows" in data || "message" in data)) {
//     // garantir que rows seja array se existir
//     const rows = Array.isArray((data as any).rows) ? (data as any).rows : undefined;
//     const message = isNonEmptyString((data as any).message) ? (data as any).message : undefined;
//     return { rows, message };
//   }

//   // se veio um array direto (ex: backend retornou array de linhas)
//   if (Array.isArray(data)) {
//     return { rows: data };
//   }

//   // formatos comuns: { data: [...] } ou { Data: [...] } ou { result: [...] }
//   if (typeof data === "object") {
//     const keys = Object.keys(data);
//     for (const k of keys) {
//       const v = (data as any)[k];
//       if (Array.isArray(v)) {
//         return { rows: v, message: isNonEmptyString((data as any).message) ? (data as any).message : undefined };
//       }
//     }
//   }

//   // se veio string, pode ser JSON string com o payload, tentar parse
//   if (typeof data === "string") {
//     try {
//       const parsed = JSON.parse(data);
//       return normalizeApiResponse(parsed);
//     } catch (e) {
//       // string normal: trata como mensagem do bot
//       return { message: data };
//     }
//   }

//   // fallback: se for objeto com propriedades simples, transformar em "linha única"
//   if (typeof data === "object") {
//     try {
//       const row = data;
//       return { rows: [row] };
//     } catch {
//       return {};
//     }
//   }

//   return {};
// }

// async function handleSend(text: string) {
//   const userMessage: Message = {
//     id: String(Date.now()),
//     text,
//     time: nowTime(),
//     sender: "user"
//   };

//   // adiciona a mensagem do usuário
//   setMessages(prev => [...prev, userMessage]);
//   setLoading(true);

//   try {
//     const request: QuestionRequestDTO = {
//       modePrompt: ModePrompt.Sql,
//       messageUser: text
//     };

//     // sendMessage pode retornar formatos variados; aqui tratamos como any
//     const rawResp: any = await sendMessage(request as any);
//     const resp = normalizeApiResponse(rawResp);

//     // prepare mensagens a adicionar em lote (mantém ordem)
//     const newMessages: Message[] = [];

//     // se existir message textual não vazia, adiciona como mensagem do bot
//     if (isNonEmptyString(resp.message)) {
//       newMessages.push({
//         id: String(Date.now() + 1),
//         text: resp.message!,
//         time: nowTime(),
//         sender: "bot"
//       });
//     }

//     // se houver rows válidas e não vazias, adiciona como tabela (mantemos rows reais no objeto)
//     if (Array.isArray(resp.rows) && resp.rows.length > 0) {
//       const pretty = rowsToPrettyText(resp.rows);
//       newMessages.push({
//         id: String(Date.now() + 2),
//         text: pretty,
//         time: nowTime(),
//         sender: "bot",
//         rows: resp.rows
//       });
//     }

//     // se não tiver nem message nem rows -> mensagem "Nenhum dado encontrado"
//     if (!isNonEmptyString(resp.message) && (!Array.isArray(resp.rows) || resp.rows.length === 0)) {
//       newMessages.push({
//         id: String(Date.now() + 3),
//         text: "Nenhum dado encontrado",
//         time: nowTime(),
//         sender: "bot"
//       });
//     }

//     // adiciona tudo em um único set (evita problemas de ordem)
//     setMessages(prev => [...prev, ...newMessages]);
//   } catch (err: any) {
//     const errorMsg: Message = {
//       id: String(Date.now() + 4),
//       text: `Erro: ${err?.message ?? err}`,
//       time: nowTime(),
//       sender: "bot"
//     };
//     setMessages(prev => [...prev, errorMsg]);
//   } finally {
//     setLoading(false);
//   }
// }

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
