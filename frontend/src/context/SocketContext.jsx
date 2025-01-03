import {createContext, useContext, useEffect, useState} from "react";
import {io} from "socket.io-client";

const SOCKET_URL = 'http://localhost:3000';
const SocketContext = createContext();

export const useSocket = () => {
    return useContext(SocketContext);
}

export const SocketProvider = ({children}) => {
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        const socketInstance = io(SOCKET_URL, {
            reconnection: true,
            reconnectionAttempts: 5,
            reconnectionDelay: 1000,
            reconnectionDelayMax: 5000,
        })
        setSocket(socketInstance);
        return () => {
            if (socketInstance) socketInstance.disconnect();
        };
    }, []);

    return(
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    )
}