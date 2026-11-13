import { Navigate } from 'react-router-dom'
import { useState, useEffect } from 'react';
import axios from 'axios';


function ProtectedRoute({ isLoggedIn, children}) {

    const [isTokenValid, setIsTokenValid] = useState(null);

    useEffect(() =>{
        const validateToken = async () => {
            try{
                const response = await axios.get('http://localhost:8080/user',{
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                })
                console.log('Token válido')
                setIsTokenValid(true);
            } catch(error){
                console.error('Token inválido:', error)
                setIsTokenValid(false);
            }
        }
        validateToken();
    },[])

    if (isTokenValid === null) {
        return <div>Validando token...</div>;
    }


    if(!isLoggedIn|| !isTokenValid){
        return <Navigate to="/Login"/>
    }

    return children
}

export default ProtectedRoute