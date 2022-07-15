import React,{useState} from 'react';
import { Link } from "react-router-dom";
import { useAuth } from "../../context/authContext"; 
import MenuItems from './MenuItems';
import Avatar from "@mui/material/Avatar";


function Navbar() {

  const {  user,logout, loading} = useAuth();  //ejemplo uso: <h1> Hola {user.email}</h1>
  const [active,setActive] = useState(false); //burguer escondido de primeras

        const showMenu= () => {
            setActive(!active);
        }

  // Manejador para realizar logout mediante un botón en la barra de navegacion
  const handleLogout =async () => {
    try{
      await logout();
    } catch (error) {
      console.error(error.message);
    }
  };
  
  if (loading) return <h1> Loading </h1>


// Barra de navigación done el objetivo es reducir al maximo los enlaces desde la barra de navegacion, dejando un diseño limopo
// La barra de navegación cambia ahora mismo entre usuarios registrados y los que no están. Limitando asi ciertas acciones dependiendo de si estas o no registrado.
  return (
    
		<nav className="bg-white shadow-md items-center justify-between z-[400] w-full absolute">
		{
			!user?
			<>
				
					
						<div className="flex justify-between max-w-6xl mx-auto px-4 space-x-7">
								
								<div>
									
									<a href="/" className="flex items-center py-4 px-2">
										<img src="logo192.png" alt="Logo" className="h-8 w-8 mr-2"/>
										<span className="font-semibold text-gray-500 text-lg">Chask App</span>
									</a>
								</div>


								<div className='absolute right-6 md:hidden top-6 scale-150'>
								<i className="fa fa-bars scale-150" styles={{cursor: "pointer"}} aria-hidden="true" onClick={showMenu}></i>
 
								</div>
								
								
							
							<div className="hidden md:flex items-center space-x-1">
									
										
										<>
											<a href="/" className="py-4 px-2 text-green-500 border-b-4 border-green-500 font-semibold ">Home</a>
											<Link to={"mapview"} className="py-4 px-2 text-gray-500 font-semibold hover:text-green-500 transition duration-300">Map</Link>
											<Link to="login" className="py-2 px-2 font-medium text-gray-500 rounded hover:bg-green-500 hover:text-white transition duration-300">Log In</Link>
											<Link to="register" className="py-2 px-2 font-medium text-white bg-green-500 rounded hover:bg-green-400 transition duration-300">Sign Up</Link>
							
										</>
									
							</div>
							<MenuItems showMenu={showMenu} active={active}/>							
						</div>
					
				
			</>
			:<>
					
						<div className="flex justify-between max-w-6xl mx-auto px-4 space-x-7">

						
						
							
								
								<div>
									
									<a href="/" className="flex items-center py-4 px-2">
										<img src="logo192.png" alt="Logo" className="h-8 w-8 mr-2"/>
										<span className="font-semibold text-gray-500 text-lg">Chask App</span>
									</a>
								</div>

								<div className='absolute right-6 md:hidden top-6 scale-150'>
								<i className="fa fa-bars scale-150" styles={{cursor: "pointer"}} aria-hidden="true" onClick={showMenu}></i>
 
								</div>
								
								<div className="hidden md:flex items-center space-x-1">
									<a href="/" className="py-4 px-2 text-green-500 border-b-4 border-green-500 font-semibold ">Home</a>
									
									<Link to="profile" className="py-4 px-2 text-gray-500 font-semibold hover:text-green-500 transition duration-300">Profile</Link>
									<Link to={"mapview"} className="py-4 px-2 text-gray-500 font-semibold hover:text-green-500 transition duration-300">Map</Link>
									<Avatar src={user.photoURL} />
									<div className="hidden md:flex items-center space-x-3 ">		
										<button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" onClick={ handleLogout }> Log Out </button>
									</div>
								</div>
								<MenuItems showMenu={showMenu} active={active}/>
							
							

						

						</div>
				
			</>
		}
		
		</nav>
    
  )
}

export default Navbar
