import React from 'react'
import axios from 'axios';



function PersonsRoom(props) {
    const [messageData, setMessageData] = React.useState([])

    React.useEffect(() => {
      axios.get('http://127.0.0.1:8000/api/messages/')
        .then(response => {
          console.log(response.data);
        })
        .catch(error => {
          console.error('API isteği başarısız: ', error);
        });
    }, []);



  return (
    <div><section id='chat-room'>
    <div className='w-[55%] h-[600px] border m-auto mt-6 bg-slate-200 rounded-[10px] flex flex-col justify-between'>
      <div className='chat-header flex items-center bg-slate-900 rounded-[10px] justify-center'>
      </div>
      <div className='chat-main p-2 overflow-y-auto flex flex-col flex-1 w-full h-full relative'>
        
            <div  className='opponent-message relative py-4 px-10 bg-slate-500 m-4 rounded-[20px] max-w-[80%] self-start text-white text-[16px]'></div>
            <div  className='my-message py-4 relative px-10 bg-green-500 m-4 rounded-[20px] max-w-[70%] self-end text-white text-[16px]'></div>

      </div>
      
    </div>
  </section></div>
  )
}

export default PersonsRoom