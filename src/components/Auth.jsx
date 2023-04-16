import React, { useState, useEffect } from "react";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, signInWithPopup, FacebookAuthProvider, GithubAuthProvider} from "firebase/auth";
import { auth, provider, faceProvider, Gbprovider } from "../firebase";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "../index.css"
import {FcGoogle} from "react-icons/fc"
import {GrFacebook} from "react-icons/gr"
import {BsGithub} from "react-icons/bs"



export default function Welcome() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const [passwordControl, setPasswordControl]= useState({
      password:"",
      confirmPassword:""
  });

  const navigate = useNavigate();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        navigate("/todo");
      }
    });
  }, [navigate]);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSignIn = () =>{
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
        if(user){
        toast.success("Giriş Yapılıyor.")          
        setTimeout(() => {
            navigate("/todo")  
        }, 3000);
        }
    })
    .catch((error) => {
        toast.error("Giriş yapılamıyor.",error)
    });
}

const handleRegister = () => {
  if(passwordControl.password !== passwordControl.confirmPassword) {
      toast.error("Parolalar Eşleşmiyor")
      return;
  }
  const auth = getAuth();
  createUserWithEmailAndPassword(auth, email, passwordControl.password)
  .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      if(user){
      toast.success("Hesap Oluşturuldu")          
      setTimeout(() => {
          navigate("/todo")  
      }, 3000);
      // ...
      }
  })
  .catch((error) => {
      toast.error("Hesap Oluşturulamıyor", error.message)
  });
}


const googleRegister = () => {
  const auth = getAuth();
  signInWithPopup(auth, provider)
  .then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      const user = result.user;
      if(user){
      toast.success("Giriş Yapılıyor .. ")          
      setTimeout(() => {
          navigate("/todo")  
      }, 3000);
      }
  }).catch((error) => {
      const credential = GoogleAuthProvider.credentialFromError(error);
      toast.error(credential);
  });
}

const GBregister = () =>{
  const auth = getAuth();
  signInWithPopup(auth, Gbprovider) 
  .then((result) => {
    const credential = GithubAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    const user = result.user;
    if(user){
      toast.success("Giriş Yapılıyor .. ")          
      setTimeout(() => {
          navigate("/todo")  
      }, 3000);
      }
  }).catch((error) => {
    const credential = GithubAuthProvider.credentialFromError(error);
    console.log(error);
  });
}

const FBregister = () =>{
  const auth = getAuth();
  signInWithPopup(auth, faceProvider).then((result)=>{
      const credential = FacebookAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      const user = result.user;
      console.log("user",user);
      if(user){
        toast.success("Giriş Yapılıyor .. ")          
        setTimeout(() => {
            navigate("/todo")  
        }, 3000);
        }
  }).catch((err)=>{console.log(err.message)})
}

  return (
    <div className="h-screen w-screen bg-gray-900 py-8 px-4 flex-col flex justify-center items-center font-serif">
      <div className="max-w-md mx-auto bg-gray-800 rounded px-8 pt-6 pb-8 mb-4 flex flex-col w-3/4 ">
        <h1 className="tracking-widest text-4xl mb-4 text-white font-bold text-center">{isRegistering ? "Kayıt Ol" : "Giriş Yap"}</h1>
        {isRegistering ? (
            <>
              <div className="mb-4  text-gray-400 py-2">
                <label className="block text-gray-200 text-sm font-black mb-2" >E-mail</label>
                <input 
                className="border rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none w-full"
                type="email"
                placeholder='E-mail'
                onChange={handleEmailChange}
                value={email}
              />
              </div>
              <div className="mb-6">
                <label className="block text-gray-200 text-sm font-bold mb-2" >Parola</label>
                <input 
                className="border rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none w-full"
                type="password"
                placeholder='Parola'
                onChange={(e)=>
                setPasswordControl({
                ...passwordControl,
                password: e.target.value
                })
                }
                value={passwordControl.password}
                />
              </div>
              <div>
                <label className="block text-gray-200 text-sm font-bold mb-2" >Parola Tekrar</label>
                <input
                className="border rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none w-full"
                type="password"
                placeholder='Parola Tekrar'
                onChange={(e)=>
                setPasswordControl({
                ...passwordControl,
                confirmPassword: e.target.value
                })
                }
                value={passwordControl.confirmPassword}
                />
              </div>
              <div className="flex flex-col mt-7">
                <button className="w-full  py-2 bg-sky-800 shadow-lg shadow-indigo-800/50 hover:shadow-red-800/40 text-white font-semibold rounded-lg" onClick={handleRegister}>Kayıt Ol</button>
                <button className="w-full mt-6 py-2 bg-sky-800 shadow-lg shadow-indigo-800/50 hover:shadow-red-800/40 text-white font-semibold rounded-lg" onClick={()=> setIsRegistering(false)}>Hesabınız Mar Mı ?</button>
                <div className="flex">
                  <button className="w-full mt-6 py-2 bg-sky-800 shadow-lg shadow-indigo-800/50 hover:shadow-red-800/40 text-white font-semibold rounded-lg flex justify-center m-2" onClick={googleRegister}><FcGoogle style={{height:"20px"}}/></button>
                  <button className="w-full mt-6 py-2 bg-sky-800 shadow-lg shadow-indigo-800/50 hover:shadow-red-800/40 text-white font-semibold rounded-lg flex justify-center m-2" onClick={FBregister}> <GrFacebook /></button>
                  <button className="w-full mt-6 py-2 bg-sky-800 shadow-lg shadow-indigo-800/50 hover:shadow-red-800/40 text-white font-semibold rounded-lg flex justify-center m-2" onClick={GBregister}><BsGithub style={{height:"20px"}}/></button>
                </div>
              </div>
           </>
        ) : (
          <>
          <div className="mb-4">
                <label className="block text-gray-200 text-sm font-bold mb-2" >E-mail</label>
                <input 
                className="border rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none w-full"
                type="email"
                placeholder='E-mail'
                onChange={handleEmailChange}
                value={email}
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-200 text-sm font-bold mb-2" >Parola</label>
                <input
                  className="border rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none w-full"  
                  type="password"
                  onChange={handlePasswordChange}
                  value={password}
                  placeholder="Password"
              />
            </div>
            <div className="flex flex-col mt-7">
              <button className="w-full  py-2 bg-sky-800 shadow-lg shadow-indigo-800/50 hover:shadow-red-800/40 text-white font-semibold rounded-lg" onClick={handleSignIn}>
                Giriş Yap
              </button>
              <button
               className="w-full mt-6 py-2 bg-sky-800 shadow-lg shadow-indigo-800/50 hover:shadow-red-800/40 text-white font-semibold rounded-lg"
                onClick={() => setIsRegistering(true)}
              >
                Hesap oluştur
              </button>
              <div className="flex">
                <button className="w-full mt-6 py-2 bg-sky-800 shadow-lg shadow-indigo-800/50 hover:shadow-red-800/40 text-white font-semibold rounded-lg flex justify-center m-2" onClick={googleRegister}><FcGoogle style={{height:"20px"}}/></button>
                <button className="w-full mt-6 py-2 bg-sky-800 shadow-lg shadow-indigo-800/50 hover:shadow-red-800/40 text-white font-semibold rounded-lg flex justify-center m-2" onClick={FBregister}> <GrFacebook /></button>
                <button className="w-full mt-6 py-2 bg-sky-800 shadow-lg shadow-indigo-800/50 hover:shadow-red-800/40 text-white font-semibold rounded-lg flex justify-center m-2" onClick={GBregister}><BsGithub style={{height:"20px"}}/></button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}