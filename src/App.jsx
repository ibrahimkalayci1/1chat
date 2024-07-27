import { useState } from "react";
import LoginPage from "./pages/LoginPage";
import RoomPage from "./pages/RoomPage"
import ChatPage from "./pages/ChatPage";

function App() { 
 //kullanıcı giriş yaptımı state i 
 const [isAuth, setIsAuth] = useState
 (localStorage.getItem("token"));

//kullanıcının girdiği oda state i

const [room,setRoom] = useState(null)

//kullanıcının yetkisi yoksa : login sayfası
if (!isAuth) {
   return <LoginPage setIsAuth={setIsAuth} />;
}

// kullanıcının yetkisi varsa oda seçme sayfası




  return (
    <div className="container">
{ room  ? (
  //oda seçiliyse sohbet sayfası 
  <ChatPage room= {room}  setRoom={setRoom} />
) :    (
  //oda seçilmediyse oda secme sayfası

      
      <RoomPage setIsAuth = {setIsAuth} 
      setRoom={setRoom}/>
    )  }
      </div>
  );
}

export default App
