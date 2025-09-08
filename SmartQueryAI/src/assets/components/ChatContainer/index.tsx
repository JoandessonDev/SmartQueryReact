import styles from './styles.module.css';
type ChatContainerProps = {
    children: React.ReactNode;
};
export function ChatContainer({children} : ChatContainerProps){
    return(
        <>
        <div className={styles.chatcontainer}>
            {children}
        </div>
        </>
    );
}