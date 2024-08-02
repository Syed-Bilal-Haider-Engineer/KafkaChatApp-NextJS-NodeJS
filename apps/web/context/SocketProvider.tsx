'use client'
import React, { useEffect, useState, useCallback } from "react";
import { io, Socket } from "socket.io-client";

interface SocketProviderProps {
  children?: React.ReactNode;
}

interface ISocketContext {
  sendMessage: (message: string) => void;
  connected: boolean;
  message: any
}

export const SocketContext = React.createContext<ISocketContext | null>(null);
export const useSocket = () => {
  const context = React.useContext(SocketContext);
  if (!context) {
    throw new Error("useSocket must be used within a SocketProvider");
  }
  return context;
}

export const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [connected, setConnected] = useState<boolean>(false);
  const [message, setMessage] = useState('')
  const onMessageReceive = (message: any) => {
    setMessage(message)
  }
  useEffect(() => {
    const socketInstance = io("http://localhost:8000");

    setSocket(socketInstance);

    socketInstance.on("connect", () => {
      setConnected(true);
    });
    socketInstance.on('message',onMessageReceive)
    socketInstance.on("disconnect", () => {
      setConnected(false);
    });

    return () => {
      socketInstance.disconnect();
      socketInstance.off('message',onMessageReceive)
    };
  }, []);

  const sendMessage = useCallback((message: string) => {  
    if (socket) {
      console.log("emitting message", message);
      socket.emit("message", {message});
    }
  }, [socket]);

  return (
    <SocketContext.Provider value={{ sendMessage, connected , message}}>
      {children}
    </SocketContext.Provider>
  );
};
