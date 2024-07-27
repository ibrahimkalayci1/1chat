import { addDoc, collection,getDocs,onSnapshot,serverTimestamp,query,where,orderBy, } from 'firebase/firestore';
import React, { useEffect, useRef, useState } from 'react'
import { db, auth } from '../firebase';
import Message from '../components/Message';
import EmojiPicker from 'emoji-picker-react';

function App() {
  return (
    <div>
      <EmojiPicker />
    </div>
  );
}

const ChatPage = ({room,setRoom}) => {
  const [text, setText] = useState("")
  const [isOpen, setIsOpen] = useState(false)
  const [messages,setMessages] = useState([]);
  const lastMsg = useRef(null);

//form gönderilince mesajı konsola kaydet
    const handleSubmit =  async (e) => {
        e.preventDefault();

        //mesaj document ının kaydedileceği koollksynn refernsnı al

        const messagesCol = collection(db, "messages")
        // firebase veritabanı collection ve document ile calışır
        //! COLLECTİON VERİ GRUBU DOCUENT İLE COLLECTİON İÇİNDEKİ HER BİR VERİ
        // referansı alınan kolleksiyonu document ı ekle

        await addDoc(messagesCol, {
            text: e.target[0].value,
            room,
            author: {
                id:auth.currentUser.uid,
                name:auth.currentUser.displayName,
                photo: auth.currentUser.photoURL,
            },
            createdAt: serverTimestamp(),
        });

        //formu temizle
   setText("") ;        };

         // mevcut odada gönderilen mesajları anlık olarak al

         useEffect(() => {
          // 1 abone olunacak collection un referansını al
          const messagesCol = collection(db, "messages");
          //koleksiyondaki  bütün verileri al
          
          // 2 sorgu ayarları 

          const q = query(messagesCol, 
            where("room", "==",room), 
            orderBy("createdAt", "asc"));

          //3 onSnapshot: anlı olarak koleksiyondaki bütün değişimleri izler
          // her değiştiğince callback fonksiynu tetiklenir
          // ve güncellemleri alır

           const unsub = onSnapshot(q, (snapshot) =>{
          let temp = [];

           //data metodu ile documanların içindeki veriye erişip 
          //geçici diziye aktardk
        snapshot.docs.forEach((doc) => {
          temp.push(doc.data());
        });       
        //son mesaja odakla
        lastMsg.current.scrollIntoView({behavior:"smooth"});
      setMessages(temp)      
      });


        


           // 4 kullanıcı sayfadan ayrıldığı anda dinlemeyi durdur
      return () => {
        unsub();   
      };
          }, []);



         
     
console.log(text)
  return (
    <div className='chat-page' >
        <header>
        <p>{auth.currentUser?.displayName}</p>
        <p>{room}</p>
        <button onClick={() => setRoom(null)} >Farklı Oda</button>
    </header>
    
    <main>
     {messages.length < 1 ? (
      <div className='warn'> 
      <p>Sohbete ilk mesajı gönderin</p>
      </div>
     ) : ( messages.map ((data,key) => 
     <Message data={data} key={key} />)
     )}

      <div ref={lastMsg}/>
    </main>
    
    <form className='send-form' onSubmit={handleSubmit}>
    <input  
    value={text}
    onChange={(e)  => setText(e.target.value)} 
    placeholder='mesajnızı yazın'  
    type='text' />
    <div>    
      <EmojiPicker 
      onEmojiClick={(e) => {setText(text + e.emoji);
        setIsOpen(false);
       }}
      open={isOpen} 
      skinTonesDisabled />
    
    <button type='button' onClick={() => setIsOpen(!isOpen)} >😉</button>
    </div>
    <button type='submit' >Gönder</button>
    </form>


    </div>
  );
};

export default ChatPage
