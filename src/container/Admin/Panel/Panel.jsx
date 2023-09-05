import React from 'react'
import axios from 'axios';




function Panel(props) {
    const [chatRoomData, setChatRoomData] = React.useState([])


    React.useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/chat-rooms/')
          .then(response => {
            const filteredData = response.data.filter(item => item.room === props.currentRoom);
            console.log(filteredData);
          })
          .catch(error => {
            console.error('API isteği başarısız: ', error);
          });
      }, [props.currentRoom]);
      
    const clickRoomHandler = React.useCallback((e) => {
        props.setCurrentRoomId(e.id)
        props.setPage('persons-room')
    },[props])

  return (
    <section className='w-full h-full flex justify-center items-center'>
        <div className='w-[70%] m-auto flex justify-center items-center border border-white mt-8'>
            <ul className='p-8'>
                {
                    chatRoomData.map((data, index) => (
                        <li key={index} className='border py-1 px-8 rounded-[20px] cursor-pointer' onClick={() => {clickRoomHandler(data)}}>{data.room_id}</li>
                    ))
                }
            </ul>
        </div>
    </section>
  )
}

export default Panel