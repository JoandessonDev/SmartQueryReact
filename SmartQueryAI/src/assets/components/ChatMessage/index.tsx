import styles from './styles.module.css';
type ChatMessageProps = {
    text: string;
    time: string;
    sender: "user" | "bot";
};
export function ChatMessage({text, time, sender} : ChatMessageProps){
    return(
        <>
        <div className={`${styles.message} ${sender == 'bot' ? styles.messageBot :  styles.messageUser }`}>
            <div className={`${styles.chatMessage} ${sender == 'bot' ? styles.chatBotMessage :  styles.chatUserMessage }`}>
                <p>{text}</p>
                <span className={styles.time}>{time}</span>
            </div>
        </div>
        </>
    );
}