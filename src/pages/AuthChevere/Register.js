import {useState} from "react";
import { useAuth } from "../../context/authContext";
import {Link, useNavigate} from "react-router-dom";
import { Alert } from "./Alert";
import {Posts} from "../Posts/Posts"

export function Register() {


    const [user, setUser] = useState({
        email: '',
        password: '',
    });

    const {signup} = useAuth();
    const navigate = useNavigate();
    const [error, setError] = useState();

    //actualizamos el estado
    const handleChange = ({target: {name, value}}) => {
        setUser({...user,[name]: value})
    };
    // Vemos que hay dentro del estado
    const handleSubmit = async (e) => {
        e.preventDefault()   //conseguimos que no se refresque la pagina y asi cancelar el envio de informacion
        setError(''); // Conseguimos que el error desaparezca de pantalla si nos registramos bien
        try{
            await signup(user.email, user.password); // esto lo envia a firebase mediante la funcion en authcontext
            navigate('/')
        }catch (error) {
            // QUitar comentarios para personalizar mensajes de eeror
            /*console.log(error.code); // conseguimos el codigo del error
            if (error.code === "auth/internal-error"){ //Uno a uno adaptamos los mensajes de error al usuario
                setError('Correo Invalido');
            }*/

            setError(error.message); // mostramos los mensajes de error al intentar hacer login o register
        }
    };

    // Al igual que en el login, añadirlo a la pagina principal, que no aparezca en una pantalla separada, Cambiar mensajes de error por toast
    return (
        <>
        <div className='w-full h-screen'>
          <div className='bg-black/60 fixed top-0 left-0 w-full h-screen'></div>
          <div className='fixed w-full px-4 py-24 z-50'>
          {error && <Alert message={error} />}
            <div className='max-w-[450px] h-[600px] mx-auto bg-black/75 text-white'>
              <div className='max-w-[320px] mx-auto py-16'>
                <h1 className='text-3xl font-bold'>Registro</h1>
                <form
                  onSubmit={handleSubmit}
                  className='w-full flex flex-col py-4'
                >
                  <input
                    onChange={handleChange}
                    className='p-3 my-2 bg-gray-700 rouded'
                    type='email'
                    name='email'
                    placeholder='YourEmail@Email'
                    autoComplete='email'
                  />
                  <input
                    onChange={handleChange}
                    className='p-3 my-2 bg-gray-700 rouded'
                    type='password'
                    name='password'
                    id='password'
                    placeholder='Contraseña'
                    autoComplete='current-password'
                  />
                  <button className='bg-green-600 py-3 my-6 rounded font-bold'>
                    Registrar
                  </button>
                  <div className='flex justify-between items-center text-sm text-gray-600'>
                    <p>
                      <input className='mr-2' type='checkbox' />
                      Recordar contraseña
                    </p>
                    <p>Necesitas ayuda?</p>
                  </div>
                  <p className='py-8'>
                    <span className='text-gray-600'>
                      Estas ya registrado en ChaskApp?
                    </span>{' '}
                    <Link to='/login'>Log in</Link>
                  </p>
                </form>
              </div>
            </div>
          </div>
          <Posts  className='hidden sm:block absolute w-full h-full object-cover'/>
        </div>
      </>

    );
}



