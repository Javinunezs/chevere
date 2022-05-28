import React, { useState } from "react";
//import { auth, provider } from "../firebase-config";
//import { signInWithPopup } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { Alert } from "./Alert";


export function ResetPassword() {


    const [user, setUser] = useState({
        email: "",
        password: "",
    });

    const { resetPassword } = useAuth();
    const navigate = useNavigate();
    const [error , setError] = useState();

    //actualizamos el estado
    const handleChange = ({target: {name, value}}) => {
        setUser({...user,[name]: value})
    };
 

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


/*

        <div className='w-full h-screen'>
        {error && <Alert message={error} />}
          <img
            className='hidden sm:block absolute w-full h-full object-cover'
            src='https://wallpaperaccess.com/full/378016.jpg'
            alt='/'
          />
          <div className='bg-black/60 fixed top-0 left-0 w-full h-screen'></div>
          <div className='fixed w-full px-4 py-24 z-50'>
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
                    
                    autoComplete='email'
                    
                  />

                  <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit" >Enviar</button>

                </form>
                <p className="my-4 text-sm flex justify-between px-3"> No tienes cuenta? <Link to='/register' className="text-blue-700 hover:text-blue-900">Register</Link></p>

              </div>
            </div>
          </div>
        </div>

 */


/* <div className="w-full max-w-xs m-auto ">
            
        
        {error && <Alert message={error} />}
        
        <form onSubmit={handleResetPassword} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
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
        
        
            <div className="flex items-center justify-between">
        
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit" >Send</button>
        
                
            </div>
        </form>
        
        <p className="my-4 text-sm flex justify-between px-3"> No tienes cuenta? <Link to='/register' className="text-blue-700 hover:text-blue-900">Register</Link></p>
        </div>
*/









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




export default ResetPassword