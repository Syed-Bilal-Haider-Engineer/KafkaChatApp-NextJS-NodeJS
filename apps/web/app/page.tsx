'use client';
import { useState } from "react";
import styles from "./page.module.css"
import { useSocket } from "../context/SocketProvider";

export default function Home() {
  const [message, setMessage] = useState('');
  const { sendMessage, message: newMessage } = useSocket()
  const sendHandleMessage = () => {
    sendMessage(message);
    setMessage('');
  }
  return (
    <div className={styles.mainContainer}>
      <div className={styles.chatContainer}>
        <div className={styles.users}>

        </div>
        <div className={styles.messageContainer}>
          <div className={styles.chatBody}>
            {newMessage}
          </div>
          <div className={styles.main}>
            <div className={styles.messageBox}>
              <input
                type="text"
                className={styles.messageInput}
                placeholder="Enter your message..."
                onChange={(e) => setMessage(e.target.value)}
                name="message"
                value={message}
              />
            </div>
            <button className={styles.btn} onClick={() => sendHandleMessage()}>
              Send Message
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
