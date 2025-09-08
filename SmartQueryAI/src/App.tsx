import "./App.css";
import { ChatContainer } from "./assets/components/ChatContainer";
import { ChatInput } from "./assets/components/ChatInput";
import { ChatMessage } from "./assets/components/ChatMessage";
import { Container } from "./assets/components/Container";
import { Header } from "./assets/components/Header";

function App() {
  return (
    <>
      <Container>
        <Header />
        <ChatContainer>
          <ChatMessage text="Olá! Sou seu assistente de consultas SQL. Digite sua pergunta e eu buscarei os dados para você." time="11:55" sender="user"/>
        </ChatContainer>
        <ChatInput/>
      </Container>
    </>
  );
}

export default App;
