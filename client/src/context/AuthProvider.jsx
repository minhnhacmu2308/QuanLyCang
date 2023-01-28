import { useState,useEffect ,useMemo,createContext} from 'react';
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export default function AuthProvider({children}) {
    const [token,setToken] = useState("");
    const navigate = useNavigate();

    useEffect(() =>{
        async function getToken() {
            const data  = localStorage.getItem("token");
            setToken(data);
            console.log("token",data);      
        }    
        getToken()
        if(token === null){
            navigate("/login")
        }
         
    },[token]);

    return(
        <AuthContext.Provider value={{token,setToken}}>
            {children }
        </AuthContext.Provider>
    )
} 