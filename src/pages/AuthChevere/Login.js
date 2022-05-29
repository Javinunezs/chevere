import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import { Alert } from "./Alert";


export function Login() {

  // Asignamos los campos que user dispondrá

    const [user, setUser] = useState({
        email: "",
        password: "",
    });

    const { login, loginWithGoogle, resetPassword } = useAuth();
    const navigate = useNavigate();
    const [error , setError] = useState();

    //actualizamos el estado
    const handleChange = ({target: {name, value}}) => {
        setUser({...user,[name]: value})
    };
    // Vemos que hay dentro del estado
    const handleSubmit = async (e) => {
        e.preventDefault()   //conseguimos que no se refresque la pagina y asi cancelar el envio de informacion
        setError(""); // Conseguimos que el error desaparezca de pantalla si nos registramos bien
        try{
            await login(user.email, user.password); // esto lo envia a firebase mediante la funcion en authcontext
            navigate("/");
        }catch (error) {
            // QUitar comentarios para personalizar mensajes de eeror
            /*console.log(error.code); // conseguimos el codigo del error
            if (error.code === "auth/internal-error"){ //Uno a uno adaptamos los mensajes de error al usuario
                setError('Correo Invalido');
            }*/

            setError(error.message); // mostramos los mensajes de error al intentar hacer login o register
        }
    };

    // Manejador usado para poder ingresar desde google
    const handleGoogleSignin = async () => {
        try{
            await loginWithGoogle();
            navigate('/');
        }catch (error) {
            setError(error.message);
        }

    };

 
    // Vista de la página de Login, adaptarla para que se vea en el home y no como una pantalla separada

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
          <div className='max-w-[450px] h-[600px] mx-auto bg-black/75 text-white'>
            <div className='max-w-[320px] mx-auto py-16'>
              <h1 className='text-3xl font-bold'>Log In</h1>
              {error ? <p className='p-3 bg-red-400 my-2'>{error}</p> : null}
              <form onSubmit={handleSubmit} className='w-full flex flex-col py-4'>
                <input
                  onChange={handleChange}
                  className='p-3 my-2 bg-gray-700 rounded'
                  type='email'
                  name='email'
                  placeholder='Email'
                  autoComplete='email'
                />
                <input
                  onChange={handleChange}
                  className='p-3 my-2 bg-gray-700 rounded'
                  type='password'
                  name='password'
                  id='password'
                  placeholder='Contraseña'
                  autoComplete='current-password'
                />
                <button className='bg-green-600 py-3 my-6 rounded font-bold'>
                  Inicio
                </button>
                <button onClick={handleGoogleSignin} className="bg-slate-50 hover:bg-slate-200 text-black shadow rounded border-2 border-gray-300 py-2 px-4 w-full">Login with Google</button>
                <div className='flex justify-between items-center text-sm text-gray-600'>
                  <p>
                    <input className='mr-2' type='checkbox' />
                    Recordar contraseña
                  </p>
                  <p>Necesitas ayuda?</p>
                </div>
                <p className='py-8  text-sm '>
                  <span className=' text-sm text-gray-600'>Nuevo en ChaskApp?</span>{' '}
                  <Link to='/register'>Registrate</Link>
                </p>
                <p className=" text-sm flex justify-between px-3"> Forgot password? <Link to='/resetpassword' className="text-blue-700 hover:text-blue-900">Reset Password</Link></p>                

                
            </form>
       

              
            </div>
          </div>
        </div>
      </div>




    );
}



export default Login