import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/AuthChevere/Login";
import { Register }  from "./pages/AuthChevere/Register";
import {AuthProvider} from "./context/authContext";
import { ProtectedRoute } from "./pages/AuthChevere/ProtectedRoute";


import { useState } from "react";
import { ResetPassword } from "./pages/AuthChevere/ResetPassword";
import { Posts } from "./pages/Posts/Posts";
import { AddPost } from "./pages/Posts/AddPost";
import Navbar from "./pages/NavigationBar/Navbar";
import 'font-awesome/css/font-awesome.css';
import Post from "./pages/Posts/Post";
import Profile from "./pages/ProfileChevere/Profile";
import MapView from "./pages/Maps/MapView";
import "leaflet/dist/leaflet.css"
//import { signOut } from "firebase/auth";
//import { auth } from "./firebase-config";




function App() {

  const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth")); // ver esto cambiarlo para que este en authContext
  //bg-[url('/img/fondo-log-hd.png')]
  //     <div className="bg-slate-300 text-black text-white flex-1">
  return (
    <AuthProvider>

    <Navbar/>
          <Routes>
            <Route path = "/login" element={<Login />} />
            <Route path = "/register" element={<Register/>} />
            <Route path = "/resetpassword" element={<ResetPassword/>} />                    
            <Route path = "/" element={<Posts />} />
            <Route path = "/mapview" element={<MapView />} />

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
          </Routes>
        
        
   

    </AuthProvider>
  );


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

  };

  return (
    <div className="bg-slate-300" h-screen text-white flex>
      <Router>
        <nav>
          <Link to="/"> Home </Link>
          <Link to="/createevent"> Create Event </Link>
          {!isAuth ? (<Link to="/login"> Login </Link>) : (<button onClick={ signUserOut }> Log Out </button>)}
    
        </nav>
        <Routes>
          <Route path = "/" element={<Home isAuth={isAuth} />} />
          <Route path = "/createevent" element={<CreateEvent isAuth={isAuth}/>} />
          <Route path = "/login" element={<Login setIsAuth={setIsAuth} />} />
          <Route path = "/register" element={<Register/>} />
    
    
        </Routes>
      </Router>
    </div>

  );*/

  /*return (
  <Router>
    <nav>
      <Link to="/"> Home </Link>
      <Link to="/createevent"> Create Event </Link>
      {!isAuth ? (<Link to="/login"> Login </Link>) : (<button onClick={ signUserOut }> Log Out </button>)}

    </nav>
    <Routes>
      <Route path = "/" element={<Home isAuth={isAuth} />} />
      <Route path = "/createevent" element={<CreateEvent isAuth={isAuth}/>} />
      <Route path = "/login" element={<Login setIsAuth={setIsAuth} />} />
      <Route path = "/register" element={<Register/>} />


    </Routes>
  </Router>
    );*/
}

export default App;
