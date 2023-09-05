import React from 'react'
// import RoomTextField from '../components/InputElement/RoomTextElement'
import SendIcon from '@mui/icons-material/Send';
import ImageIcon from '@mui/icons-material/Image';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import TripOriginIcon from '@mui/icons-material/TripOrigin';
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'

function Room(props) {

  const [messages, setMessages] = React.useState([]);
  const [images, setImages] = React.useState([])
  const [status, setStatus] = React.useState('Online')
  const [showEmoji, setShowEmoji] = React.useState(false)
  const [isOnline, setIsOnline] = React.useState(true)

 

  const messageInputRef = React.useRef()
  const imageInputRef = React.useRef()
  const chatMainRef = React.useRef(null);


  React.useEffect(() => {
    // ...
    
    // Yeni mesajlar veya resimler geldiğinde chatMainRef'i en alta kaydır
    chatMainRef.current.scrollTop = chatMainRef.current.scrollHeight;
  }, [messages, images]);

  React.useEffect(() => {
    messageInputRef.current.focus()



    props.chatSocket.onmessage = function(event) {
      const data = JSON.parse(event.data);
      const type = data.type;
  
      if (type === 'writing_status') {
        setIsOnline(true)
        const writing = data.writing;
        const user_id = data.user_id;

        if (writing && user_id !== props.userId) {
            setStatus("Writing...")
        }
        else {
          setIsOnline(true)
          setStatus("Online")
        }
      } else if (type === 'send_message') {
        setIsOnline(true)
        setMessages((prevMessages) => [...prevMessages, data]);
      } else if (type === 'send_image') {
        setIsOnline(true)
        setImages((prevImages) => [...prevImages, data])
        console.log(data);
      } else if (type === 'offline') {
        setIsOnline(true)
        const user_id = data.user_id;
        const offline = data.offline;
        if (offline && user_id !== props.userId) {
            // updateOnlineStatus(false)
            props.chatSocket.send(JSON.stringify({
                'action_type': 'discard_room',
                'user_id': props.userId
            }));
            setIsOnline(false)
            setStatus("Offline")
        }
      } else if (type === 'online') {
        const online = data.online;
        if (online) {
          setIsOnline(true)
        }
      }
  };
  })




  const clickImageButton = React.useCallback(() => {
    imageInputRef.current.click()
  }, [])




  const selectImageHandler = React.useCallback(() => {
    const selectedFile = imageInputRef.current?.files[0];
    if (selectedFile) {
        const reader = new FileReader();

        reader.onload = function(event) {
            const imageUrl = event.target.result;
            props.chatSocket.send(JSON.stringify({
                'action_type': 'send_image',
                'image_url': imageUrl,
                'user_id': props.userId
            }));
        };

        reader.readAsDataURL(selectedFile);
    }
  }, [props.chatSocket, props.userId, imageInputRef])



  const selectEmojiHandler = (e) => {
    const sym = e.unified.split("_");
    let emoji = String.fromCodePoint(parseInt(sym[0], 16));
    messageInputRef.current.value += emoji;
  }


  const SendMessageHandler = React.useCallback(() => {
    const message = messageInputRef.current.value;
    if (message) {
        props.chatSocket.send(JSON.stringify({
            'action_type': 'on_chat',
            'message': message,
            'user_id': props.userId
        }));
        messageInputRef.current.value = ''
    }
  }, [props.chatSocket, props.userId])



  const handleKeyUp = (e) => {
    if (e.key === 'Enter') {
      SendMessageHandler();
      props.chatSocket.send(JSON.stringify({
        'action_type': 'writing_end',
        'user_id': props.userId
      }));
    }
  };





const changeInputValue = React.useCallback(() => {
  const inputValue = messageInputRef.current.value;
  if (inputValue !== '') {
    props.chatSocket.send(JSON.stringify({
      'action_type': 'writing_start',
      'user_id': props.userId
    }));

    setTimeout(() => {
    }, 1000);
  } else {
    props.chatSocket.send(JSON.stringify({
      'action_type': 'writing_end',
      'user_id': props.userId
    }));
  }
}, [props.chatSocket, props.userId]);




  const newChatMatch = React.useCallback(() => {
    const interest = localStorage.getItem("interest")
    console.log(interest.split(','));
        props.chatSocket.send(JSON.stringify({
            'action_type': 'rematch_persons',
            'person_interest': interest,
            'user_id': props.userId
        })
        )
        setIsOnline(true)
  }, [props.userId, props.chatSocket])



  const exitChat = React.useCallback(() => {
    localStorage.removeItem('interest')
    props.setPage('main')
  },[props])


  return (
    <section id='chat-room'>
      <div className='w-[55%] h-[600px] border m-auto mt-6 bg-slate-200 rounded-[10px] flex flex-col justify-between'>
        <div className='chat-header flex items-center bg-slate-900 rounded-[10px] justify-center'>
          <TripOriginIcon fontSize='sm' sx={{color: 'green', marginRight: '8px'}}></TripOriginIcon>
          <p className='text-[18px] text-white'>{status}</p>
        </div>
        <div ref={chatMainRef} className='chat-main p-2 overflow-y-auto flex flex-col flex-1 w-full h-full relative'>
          {/* <img className='w-full h-full object-cover sticky top-0 left-0 p-2 z-0 ' src={props.darkMode ? "/chat-light.png" : "/chat-dark.webp"} alt="" /> */}
          {
            isOnline
            ?
            messages.map((data, index) => (
              data.sender !== props.userId ? (
                <div key={index} className='opponent-message relative py-4 px-10 bg-slate-500 m-4 rounded-[20px] max-w-[80%] self-start text-white text-[16px]'>{data.message}</div>
              ) : (
                <div key={index} className='my-message py-4 relative px-10 bg-green-500 m-4 rounded-[20px] max-w-[70%] self-end text-white text-[16px]'>{data.message}</div>
              )
            ))
            :
            <div className='flex justify-center items-center flex-col w-full h-full'>
              <div onClick={() => {newChatMatch()}} className='bg-slate-900 py-4 px-10 rounded-[10px] cursor-pointer'>
                <button className='text-white text-[20px] w-full h-full'>New Chat</button>
              </div>
              <div onClick={() => {exitChat()}} className='bg-slate-900 py-4 px-8 rounded-[10px] mt-8 cursor-pointer'>
                <button className='text-white text-[20px] w-full h-full'>Exit</button>
              </div>
            </div>
          }
          {
            isOnline
            ?
            images.map((data, index) => (
              data.sender !== props.userId ? (
                <div key={index} className='opponent-message py-4 px-10 bg-slate-500 my-4 rounded-[20px] max-w-[80%] self-start text-white text-[16px]'>
                  <img className='w-full h-full' src={data.image_url} alt="" />
                </div>
              ) : (
                <div key={index} className='my-message py-4 px-10 bg-green-500 my-4 rounded-[20px] max-w-[70%] self-end text-white text-[16px]'>
                  <img className='w-full h-full' src={data.image_url} alt="" />
                </div>
              )
            ))
            :
            <div></div>
          }
          
          
        </div>
        <div className='message-area w-full h-[10%] bg-slate-300 flex relative rounded-[7px]'>
          <div className='w-[100%] h-full rounded-[7px]'>
            <input disabled={!isOnline} onChange={() => {changeInputValue()}} onKeyDown={handleKeyUp} ref={messageInputRef} className='w-full h-full py-4 px-6 text-[18px] text-black bg-slate-300 rounded-[7px]' type="text" />
          </div>
          <div className='flex items-center w-[24%] h-full absolute right-0'>
            <div className='w-full border flex items-center justify-center h-[96%]'>
              <button disabled={!isOnline} onClick={() => {setShowEmoji(!showEmoji)}} className='outline-0 h-full'><SentimentSatisfiedAltIcon sx={{color: 'black'}}></SentimentSatisfiedAltIcon></button>
              {
                showEmoji && (
                      <div className='absolute bottom-[100%] right-0'>
                        <Picker emojiButtonSize={30} emojiSize={30} data={data} onEmojiSelect={selectEmojiHandler}/>
                      </div>
                )
              }
            </div>
            <div className='w-full border flex items-center justify-center h-[96%]'>
              <input onChange={() => {selectImageHandler()}} ref={imageInputRef} className='hidden' type="file"/>
              <button disabled={!isOnline} onClick={() => {clickImageButton()}} className='outline-0 h-full'><ImageIcon sx={{color: 'black'}}></ImageIcon></button>
            </div>
            <div className='w-full border flex items-center justify-center h-[96%]'>
              <button disabled={!isOnline} onClick={() => {SendMessageHandler()}} className='outline-0 bg-green-500 w-full h-full p-4'><SendIcon style={{ color: 'white' }}></SendIcon></button>
            </div>
            </div>
        </div>
      </div>
    </section>
  )
}

export default Room