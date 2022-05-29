import React, { useState } from "react";
//import { auth, provider } from "../firebase-config";
//import { signInWithPopup } from "firebase/auth";
import { Link} from "react-router-dom";
import { useAuth } from "../../context/authContext";
import { Alert } from "./Alert";


export function ResetPassword() {


    const [user, setUser] = useState({
        email: "",
        password: "",
    });

    const { resetPassword } = useAuth();
    const [error , setError] = useState();

    //actualizamos el estado
    const handleChange = ({target: {name, value}}) => {
        setUser({...user,[name]: value})
    };
 
    // Manejador para resetear contraseña mediante funciones de fire base
    const handleResetPassword = async (e) => {
        e.preventDefault();
        if (!user.email) return setError("Introduce tu email");
        try {
            await resetPassword(user.email);// esto lo envia a firebase mediante la funcion en authcontext
            setError('Hemos enviado un nuevo enlace para resetear');
        } catch (error) {
            setError(error.message);
        }
    };
 
    // Igual que con Login y Register
    return (

          
        <div className='w-full h-screen'>
 
        <img
            className='hidden sm:block absolute w-full h-full object-cover'
            src='https://wallpaperaccess.com/full/378016.jpg'
            alt='/'
        />
        <div className='bg-black/60 fixed top-0 left-0 w-full h-screen'></div>
        
        <div className='fixed w-full px-4 py-24 z-50'>
        {error && <Alert message={error} />}
            <div className='max-w-[450px] h-[300px] mx-auto bg-black/75 text-white'>
            
            <div className='max-w-[320px] mx-auto py-16'>
            
                <h1 className='text-3xl font-bold'>Recuperar contraseña</h1>
                <form
                onSubmit={handleResetPassword}
                className='w-full flex flex-col py-4'
                >
                <input
                
                    className='p-3 my-2 bg-gray-700 rouded'
                    type="email"
                    name="email"
                    placeholder='YourEmail@Email'
                    onChange={handleChange}
                    autoComplete='email'
                    
                />

                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit" >Enviar</button>

                </form>
                <p className="my-4 text-sm flex justify-between px-3"> No tienes cuenta? <Link to='/register' className="text-blue-700 hover:text-blue-900">Register</Link></p>

            </div>
            </div>
        </div>
        </div>



        


    );
}


export default ResetPassword