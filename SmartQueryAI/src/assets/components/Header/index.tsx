import { DatabaseIcon } from 'lucide-react';
import styles from './styles.module.css';

export function Header(){
    return(
        <>
            <div className={styles.header}>
                <DatabaseIcon />
                <div className={styles.texts}>
                    <h2>Chat Sql Assistant</h2>
                    <p>Ask questions and get real-time data</p>
                </div>
            </div>
        </>
    );

}