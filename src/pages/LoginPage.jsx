import { signInWithPopup } from 'firebase/auth'
import {auth,provider} from "../firebase/index"
import React from 'react'

const LoginPage = ({setIsAuth}) => {

//butona tıklanınca çalışır
const handleClick = () => {
signInWithPopup(auth, provider)
.then((data) => {
  setIsAuth(data.user.refreshToken)
//local storage i güncelle
localStorage.setItem("token", data.user.refreshToken)
} )
.catch((err) => console.log(err) )
};

  return (
    <div className='container' >
      <div className='login'>

<h1>Chat Odası</h1>

<p>Devam Etmek İçin Giriş Yap</p>

<button onClick={handleClick} >
    <img src="logo.png" alt="" />
    <span>Google ile Giriş Yap</span>
    </button>

      </div>
    </div>
  );
};

export default LoginPage
