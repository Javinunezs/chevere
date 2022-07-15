import React from "react";
import { BrowserRouter as  Router, Routes, Route} from "react-router-dom";
import { Login } from "./pages/AuthChevere/Login";
import { Register }  from "./pages/AuthChevere/Register";
import {AuthProvider} from "./context/authContext";
import { ProtectedRoute } from "./pages/AuthChevere/ProtectedRoute";
import { useState } from "react";
import { ResetPassword } from "./pages/AuthChevere/ResetPassword";
import { Posts } from "./pages/Posts/Posts";
import { AddPost } from "./pages/Posts/AddPost";
import Navbar  from "./pages/NavigationBar/Navbar";
import Post  from "./pages/Posts/Post";
import Profile  from "./pages/ProfileChevere/Profile";
import EditProfile  from "./pages/ProfileChevere/EditProfile";
import MapView from "./pages/Maps/MapView";

//import {MapPage} from "./pages/Maps/MapPage.tsx";
import "leaflet/dist/leaflet.css";
import 'font-awesome/css/font-awesome.css';
import "./App.css";
import Home from "./pages/Home/Home";





function App() {

  const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth")); // ver esto cambiarlo para que este en authContext
  
  //bg-[url('/img/fondo-log-hd.png')]
  //     <div className="bg-slate-300 text-black text-white flex-1">
  // <Route path = "/share" element={<Share />} />


  return (

    <AuthProvider>

    <Navbar/>
          <Routes>
          
            <Route path = "/login" element={<Login />} />
            <Route path = "/register" element={<Register/>} />
            <Route path = "/resetpassword" element={<ResetPassword/>} />                    
            <Route path = "/" element={<Posts />} />
            <Route path = "/mapview" element={<MapView />} />
            <Route path = "/home" element={<Home />} />

          
            <Route path="/post/:id" element={
              <ProtectedRoute>
                 
                <Post/>
              </ProtectedRoute>
              } 
            />
          
            <Route path = "/addpost" element={
              <ProtectedRoute>
                <AddPost />
              </ProtectedRoute>
              } 
            />
            <Route path = "/profile" element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
              } 
            />
            <Route path = "/editprofile" element={
              <ProtectedRoute>
                <EditProfile />
              </ProtectedRoute>
              } 
            />

          </Routes>
        
        
         


    </AuthProvider>
    
  );

}

export default App;





/*const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth"));

   <Route path = "/createevent" element={<CreateEvent isAuth={isAuth}/>} />
   <Route path = "/" element={       esto es de los enlaces
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
              } 
    />


  const signUserOut = () => {
    signOut(auth).then(() => {
      localStorage.clear();
      setIsAuth(false);
      window.location.pathname = "/login";
    });

  };*/
