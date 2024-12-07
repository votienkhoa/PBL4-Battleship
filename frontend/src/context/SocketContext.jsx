import {createContext, useContext, useEffect, useState} from "react";
import {io} from "socket.io-client";

const SOCKET_URL = 'http://192.168.1.150:3000';
const SocketContext = createContext();

export const useSocket = () => {
    return useContext(SocketContext);
}

export const SocketProvider = ({children}) => {
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        const socketInstance = io(SOCKET_URL);
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