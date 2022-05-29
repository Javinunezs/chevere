import { createContext, useContext, useEffect, useState } from "react";
import {createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, GoogleAuthProvider, signInWithPopup, sendPasswordResetEmail} from "firebase/auth";
import {auth} from "../firebase-config";

export const authContext = createContext(); // aqui se contiene el valor de contexto

export const useAuth = () => {
    const context = useContext(authContext);
    if (!context) throw new Error('There is not auth provider');
    return context;
};

// Todo componente hijo podrá acceder a los datos del componente padre, es como un useState pero ahora lo podré usar en todos los componentes
export function AuthProvider ({children}){

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Funcion signup autorizacion
    const signup = (email, password) => createUserWithEmailAndPassword(auth, email, password); //funcion async

    // Funcion Login Autorizacion
    const login = (email, password) => signInWithEmailAndPassword(auth, email,password);

    // Funcion logout autorizacion
    const logout = () => signOut(auth);

    // Funcion Login con google autorizacion
    //Esto esta en la documentacion
    const loginWithGoogle =  () => {
        const googleProvider = new GoogleAuthProvider();
        return signInWithPopup(auth, googleProvider);
    };

    // Funcion cambiar contraseña autorizacion
    const resetPassword = async (email) => sendPasswordResetEmail(auth, email);


    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) =>{
            setUser(currentUser);
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);


    // Devolvemos los valores que deben ser comprobados
    return(
        <authContext.Provider value={{signup, login, user, logout, loading, loginWithGoogle, resetPassword }}>
            {children}
        </authContext.Provider>
    );
}