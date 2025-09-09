import type { Sender } from '../../../types/messages';
import styles from './styles.module.css';
type ChatMessageProps = {
    text?: string;
    time: string;
    sender: Sender;
    children?: React.ReactNode;
};

export function ChatMessage({text, time, sender, children} : ChatMessageProps){
    return(
        <>
        <div className={`${styles.message} ${sender == 'bot' ? styles.messageBot :  styles.messageUser }`}>
            <div className={`${styles.chatMessage} ${sender == 'bot' ? styles.chatBotMessage :  styles.chatUserMessage }`}>
                {children ?? <p>{text}</p>}
                <span className={styles.time}>{time}</span>
            </div>
        </div>
        </>
    );
}