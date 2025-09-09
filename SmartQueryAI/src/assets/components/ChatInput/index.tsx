import { SendIcon } from "lucide-react";
import styles from "./styles.module.css";
import { useState } from "react";

type Props = {
  onSend: (text: string) => void;
  disabled?: boolean;
};

export function ChatInput({ onSend, disabled = false }: Props) {
  const [text, setText] = useState("");

  function handleSubmit(e?: React.FormEvent) {
    e?.preventDefault();
    const trimmed = text.trim();
    if (!trimmed) return;
    onSend(trimmed);
    setText("");
  }

  return (
    <>
      <form className={styles.chatinput} onSubmit={handleSubmit}>
        <input
          type="text"
          name="inputUser"
          id="inputUser"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Digite sua pergunta..."
          disabled={disabled}
        />

        <button
          type="submit"
          onClick={() => handleSubmit()}
          disabled={disabled || !text.trim()}
        >
          <SendIcon />
          Enviar
        </button>
      </form>
    </>
  );
}
