import React from 'react'

const RoomPage = ({setIsAuth,setRoom}) => {

  //çıkış butonuna tıklandığında çalışır
 
const logout = () => {
  //yetki statini false e cek
  setIsAuth(false)
localStorage.removeItem("token")
}
//form gönderilince
const handleSubmit = (e)  => {
  e.preventDefault()

//inputtaki girdiyi al ve küçük harfe cevir 
const room = e.target[0].value.toLocaleLowerCase();

setRoom(room)

};

  
  return (
    <form onSubmit={handleSubmit} className='room-page' >
        <h1>Chat Odası</h1>
        <p>hangi odaya giriş yapmak istersiniz</p>
        <input 
        placeholder='örn:haftaici' 
        type='text' 
        required />

        <button type='submit' > Odaya Gir </button>
        <button onClick={logout} type='button'> Çıkış Yap </button>
    </form>
  )
}

export default RoomPage
