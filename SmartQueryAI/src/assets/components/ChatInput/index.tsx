
import { SendIcon } from 'lucide-react';
import styles from './styles.module.css';
import { useState } from 'react';

export function ChatInput(){
    const [contador, setContador] = useState(10);
    function UpdateContador(){
        setContador(value => value + 1);
        console.log(contador + 1);
    }

    return(
        <>
        <div className={styles.chatinput}>
            <input type="text" name="inputUser" id="inputUser" value={contador} />
            <button onClick={UpdateContador}>
                <SendIcon/>
                Enviar
            </button>
        </div>
        </>
    );
}