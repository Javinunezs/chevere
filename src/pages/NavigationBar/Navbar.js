import React, { useState } from 'react';
import {Link, Navigate} from "react-router-dom";
import{useAuth} from "../../context/authContext"; 


function Navbar() {

  const {  user,logout, loading} = useAuth();  //ejemplo uso: <h1> Hola {user.email}</h1>


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
// La barra de navegación cambia ahora mismo entre usuarios registrados y los que no están. Limitando asi ciertas acciones.
  return (
    
		<nav className="bg-white shadow-lg items-center justify-between z-[100] w-full absolute">
		{
			!user?
			<>
				
					<div className="max-w-6xl mx-auto px-4">
						<div className="flex justify-between">
							<div className="flex space-x-7">
								
								<div>
									
									<a href="/" className="flex items-center py-4 px-2">
										<img src="logo192.png" alt="Logo" className="h-8 w-8 mr-2"/>
										<span className="font-semibold text-gray-500 text-lg">Chask App</span>
									</a>
								</div>
								
								<div className="hidden md:flex items-center space-x-1">
									
										
										<>
											<a href="/" className="py-4 px-2 text-green-500 border-b-4 border-green-500 font-semibold ">Home</a>
											<Link to={"mapview"} className="py-4 px-2 text-gray-500 font-semibold hover:text-green-500 transition duration-300">Map</Link>
										</>
									
								</div>
							</div>
							
							<div className="hidden md:flex items-center space-x-3 ">
									<Link to={"login"} className="py-2 px-2 font-medium text-gray-500 rounded hover:bg-green-500 hover:text-white transition duration-300">Log In</Link>
									<Link to="register" className="py-2 px-2 font-medium text-white bg-green-500 rounded hover:bg-green-400 transition duration-300">Sign Up</Link>
							</div>
						</div>
					</div>	
				
			</>
			:<>
					<div className="max-w-6xl mx-auto px-4">
						<div className="flex justify-between">
							<div className="flex space-x-7">
								
								<div>
									
									<a href="/" className="flex items-center py-4 px-2">
										<img src="logo192.png" alt="Logo" className="h-8 w-8 mr-2"/>
										<span className="font-semibold text-gray-500 text-lg">Chask App</span>
									</a>
								</div>
								
								<div className="hidden md:flex items-center space-x-1">
									<a href="/" className="py-4 px-2 text-green-500 border-b-4 border-green-500 font-semibold ">Home</a>
									
									<Link to="profile" className="py-4 px-2 text-gray-500 font-semibold hover:text-green-500 transition duration-300">Profile</Link>
									<Link to={"mapview"} className="py-4 px-2 text-gray-500 font-semibold hover:text-green-500 transition duration-300">Map</Link>

								</div>
							</div>
							
							<div className="hidden md:flex items-center space-x-3 ">		
									<button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" onClick={ handleLogout }> Log Out </button>
							</div>
						</div>
					</div>
				
			</>
		}
		
		</nav>
    
  )
}

export default Navbar
