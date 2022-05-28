import React, { useState } from "react";
//import { auth, provider } from "../firebase-config";
//import { signInWithPopup } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { Alert } from "./Alert";


export function Login() {


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

    const handleGoogleSignin = async () => {
        try{
            await loginWithGoogle();
            navigate('/');
        }catch (error) {
            setError(error.message);
        }

    };

    const handleResetPassword = async (e) => {
        e.preventDefault();
        if (!user.email) return setError("Introduce tu email");
        try {
            await resetPassword(user.email);
            setError('Hemos enviado un nuevo enlace para resetear');
        } catch (error) {
            setError(error.message);
        }
    };
 

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





/*        <div className="w-full max-w-xs m-auto ">
            
            <h1 className="text-7xl text-lime-900 pb-20 ">Chask </h1>

            {error && <Alert message={error} />}

            <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <div className="mb-4">
                    <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2"> Email </label>
                    <input 
                        type="email" 
                        name="email" 
                        placeholder="youremail@email"
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"

                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2"> Password </label>
                    <input 
                        type="password" 
                        name="password" 
                        id="password" 
                        onChange={handleChange}
                        placeholder="******"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>

                <div className="flex items-center justify-between">

                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit" >Login</button>

                    <p className="my-4 text-sm flex justify-between px-3"> Forgot password? <Link to='/resetpassword' className="text-blue-700 hover:text-blue-900">Reset Password</Link></p>                

                </div>
            </form>
            <button onClick={handleGoogleSignin} className="bg-slate-50 hover:bg-slate-200 text-black shadow rounded border-2 border-gray-300 py-2 px-4 w-full">Login with Google</button>

            <p className="my-4 text-sm flex justify-between px-3"> No tienes cuenta? <Link to='/register' className="text-blue-700 hover:text-blue-900">Register</Link></p>
        </div> */





















  // Primera funcion en funcionamiento
  /*let navigate = useNavigate();

  const signInWithGoogle = () => {
    signInWithPopup(auth, provider).then((result) => {
      localStorage.setItem("isAuth", true);  
      setIsAuth(true);
      navigate("/");
    });
  };
  return (
    <div className = "loginPage">

        <p> Sign In With Google </p>
        <button className="login-with-google-btn" onClick={signInWithGoogle}>
          Sign in with google
        </button>
    </div>
  );
  }*/




export default Login