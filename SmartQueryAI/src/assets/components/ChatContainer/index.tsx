import styles from "./styles.module.css";
import React, { useEffect, useRef } from "react";

type ChatContainerProps = {
  children: React.ReactNode;
};

export function ChatContainer({ children }: ChatContainerProps) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!ref.current) return;
    ref.current.scrollTop = ref.current.scrollHeight;
  }, [children]);

  return (
    <>
      <div className={styles.chatcontainer} ref={ref}>
        {children}
      </div>
    </>
  );
}
