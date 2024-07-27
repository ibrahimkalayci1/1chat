import React from 'react'
import { auth } from '../firebase'

const Message = ({data}) => {
   // oturumu açık olan kullanıcının id si
   // mesajı atan kullanıcının id si

    //eğer mesajı bu cihazda oturumu açı olan user attıysa: sağ
    if(auth.currentUser.uid === data.author.id) {
  return <p className='msg-user' >{data.text}</p>;
}
//eğer farklı bi user attıysa : sol

  return (
    <div className='msg-other'>
      <div>
        <img src={data.author.photo} alt="profile picture" />
        <span>{data.author.name}</span>
      </div>
      <p className='mes-text'>{data.text} </p>
    </div>
  )
}

export default Message