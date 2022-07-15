import React,{useState} from 'react'
import {Link} from "react-router-dom";
import { useAuth } from "../../context/authContext"; 

const MenuItems =({showMenu,active})=> {
    


    const {  user, logout} = useAuth(); 
    // Manejador para realizar logout mediante un botón en la barra de navegacion
  const handleLogout =async () => {
    try{
      await logout();
    } catch (error) {
      console.error(error.message);
    }
  };


  return (
    <div className='z-40'>{
    !user?
			<>

                <div className={active ? 'flex-col flex items-center fixed inset-0 left-1/4 uppercase bg-black/40 backdrop-blur-lg gap-8 justify-center p-8 z-40 md:hidden' : 'hidden'}>
                        <i className="fa fa-times " style={{cursor: "pointer"}} aria-hidden="true" onClick={showMenu}/>
                        <a href="/" className="py-4 px-2 text-green-500 border-b-4 border-green-500 font-semibold "onClick={showMenu}>Home</a>
                        <Link to={"mapview"} className="py-4 px-2 text-gray-500 font-semibold hover:text-green-500 transition duration-300"onClick={showMenu}>Map</Link>
                        <Link to={"login"} className="py-2 px-2 font-medium text-gray-500 rounded hover:bg-green-500 hover:text-white transition duration-300"onClick={showMenu}>Log In</Link>
                        <Link to="register" className="py-2 px-2 font-medium text-white bg-green-500 rounded hover:bg-green-400 transition duration-300"onClick={showMenu}>Sign Up</Link>
                </div>

            </>
            :<>
                <div> 

                    <div></div>


                    <div className={active ? 'flex-col flex items-center fixed inset-0 left-1/4 uppercase bg-black/40 backdrop-blur-lg gap-8 justify-center p-8 z-40 md:hidden' : 'hidden'}>
                    <i className="fa fa-times " style={{cursor: "pointer"}} aria-hidden="true" onClick={showMenu}></i>
                        <a href="/" className="py-4 px-2 text-green-500 border-b-4 border-green-500 font-semibold "onClick={showMenu}>Home</a>
                
                        <Link to="profile" className="py-4 px-2 text-gray-500 font-semibold hover:text-green-500 transition duration-300"onClick={showMenu}>Profile</Link>
                        <Link to="mapview" className="py-4 px-2 text-gray-500 font-semibold hover:text-green-500 transition duration-300"onClick={showMenu}>Map</Link>
                        <div onClick={showMenu}>
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"  onClick={ handleLogout} > Log Out </button>
                        </div>
                    </div>
                </div>
            </>
}
            </div>
                                


  )
}

export default MenuItems