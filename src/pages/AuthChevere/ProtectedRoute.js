import { useAuth } from "../../context/authContext";
import { Navigate } from "react-router-dom";

export function ProtectedRoute({children}){

    // Con esta funcion compruebo si el objeto existe

    const {user,loading} = useAuth();



    // De no existir lo redireccionamos al login
    if(loading) return <h1> loading </h1>;
    if(!user) return <Navigate to='/login' />;


    return <>{children}</>;

}