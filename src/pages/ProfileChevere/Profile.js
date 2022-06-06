import "../../App.css";
import Avatar from "@mui/material/Avatar";
import { useState } from "react";
import  {storage,auth}  from "../../firebase-config";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";


  //Storage
  

// Pagina de perfil en consturcción


function Profile({userId}) {

  const [user] = useAuthState(auth); //ejemplo uso: <h1> Hola {user.email}</h1>
  const navigate =   useNavigate();

  const handleEditProfile = async () => {
    try{
      navigate('/editProfile');
  }catch (error) {
      console.error(error.message);
  }


  }



  /// Con esto cojo los datos ya generados en el registro/ Hay que dar la opcion para que un usuario pueda cambiarlo sin problemas foto y nombre, y poder añadir las demas partes como biografia


  return (
		<div className="pt-20">
			{/*  splitting header into 3 components */}



			<div className="">
				<div className="">
					<Avatar src={user.photoURL} />
					<h4>{user.displayName}</h4>
          <h4>{user.email}</h4>
				</div>

				
			</div>

      {/* Boton para editar perfil */}
             
            <button onClick={handleEditProfile} className="sticky bottom-5 left-full mr-6  p-0 w-10 h-10 bg-green-600 rounded-full hover:bg-green-700 active:shadow-lg mouse shadow transition ease-in duration-200 focus:outline-none">
            <i
        className={`fa fa-edit fa-lg`}
        style={{
          cursor: "pointer",
          
        }}
        
      />
            </button>
		</div>
	);


}
export default Profile

  
/*
  const [profPic, setProfPic] = useState([]);
  const { loading } = useAuth()  //ejemplo uso: <h1> Hola {user.email}</h1>
  const [user] = useAuthState(auth);
  const navigate =   useNavigate();

  const handleEditProfile = async () => {
    try{
      navigate('/editProfile');
  }catch (error) {
      console.error(error.message);
  }


  }

  // Con este hook vamos a conseguir mostrar todos los eventos guardados en la BD y ordenador por fecha de creacion
  // y de manera descendente
  useEffect(()=>{
      const profpicRef = collection(db,"accounts",id);
      const storageRef = ref(storage, imageUrl);

      storageRef.   
      
          setProfPic(profPic);
          console.log(profPic);
      
  },[]);

  // Manejador que nos ayuda a llamar a addpost para crear un evento desde esta pantalla
  const handleAddEvent = async () => {
      try{
          navigate('/addpost');
      }catch (error) {
          console.error(error.message);
      }

  };
    
    if (loading) return <h1> Loading </h1>


    return(
      <div className="grid grid-cols-3  bg-gray-200">
                       
          <div className="col-span-3 pt-20">   
          
    */

          {/* Aqui para solucionar el problema de esconderse debajo de navbar usaba <div className="py-10"></div>, ahora uso arriba pt-20 y volver a poner en col-span-2 cuando añada lo que quiero a la derecha, mientras ocupar toda la pantalla*/}
      
          //{user && user.uid === userId ?():() }

                






  /*const [image, setImage] = useState(null);
  const [url, setUrl] = useState(null);

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = () => {
    const imageRef = ref(storage, `/profile/${Date.now()}${image.name}`);
    uploadBytes(imageRef, image)
      .then(() => {
        getDownloadURL(imageRef)
          .then((url) => {
            setUrl(url);
          })
          .catch((error) => {
            console.log(error.message, "error getting the image url");
          });
        setImage(null);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };



  return (
    <div >
      <Avatar src={url} sx={{ width: 150, height: 150 }} />
      <input type="file" onChange={handleImageChange} />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );*/


















    // Funcion sacada de autContext.js
    // Con esta funcion creamos un objeto que nos aporta info desde firebase acerca del usuario logeado, pudiendo crear desde aqui un perfil
    /*const login = async (email, password) => {
        const userCredentials = await signInWithEmailAndPassword(auth, email,password);
        console.log(userCredentials);
     }
    */

     

     /*async function upload(file, currentUser, setLoading){
        const fileRef = ref(storage, currentUser.uid + '.png');
            setLoading(true);
        const snapshot = await uploadBytes(fileRef, file);
        const photoURL = await getDownloadURL(fileRef);
        updateProfile(currentUser, {photoURL});
        setLoading(false);
        alert("Nueva foto!");
  
    };


    const currentUser = useAuth();
    const [photo, setPhoto] = useState(null);
    const [loading, setLoading] = useState(false);  
    const [photoURL, setPhotoURL] = useState();


     function handleChange(e){
       if (e.target.files[0]){
         setPhoto(e.target.files[0])
       }

     }

     function handleProfilePhoto(){
        upload(photo, currentUser, setLoading);
     }

     useEffect(() => {
       if(currentUser?.photoURL){ // && currentUser.photoURL esto tambien serviria quitando desde la interrogacion
        
        setPhotoURL(currentUser.photoURL);
       }
       
     },[currentUser])*/
     

  /*return (
    <div className='pt-20'>
      <input type="file" onChange={handleChange} />
      <button disabled={loading || !photo} onClick={handleProfilePhoto}>Editar Foto  </button>
      <img src={photoURL} alt='Avatar' className='avatar' />
      
      <div className="relative w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
        <svg className="absolute w-12 h-12 text-gray-400 -left-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path></svg>
      </div>
      <>
      <div className='w-full text-black'>
        <div className='absolute top-[20%] p-4 md:p-8'>
          <h1 className='text-3xl md:text-5xl font-bold'> Eventos Guardados</h1>
        </div>
      </div>
      </>


    </div>
  );*/

