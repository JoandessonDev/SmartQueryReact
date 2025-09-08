
import { SendIcon } from 'lucide-react';
import styles from './styles.module.css';

export function ChatInput(){
    return(
        <>
        <div className={styles.chatinput}>
            <input type="text" name="inputUser" id="inputUser" />
            <button>
                <SendIcon/>
                Enviar
            </button>
        </div>
        </>
    );
}