import React from "react";
import './App.css';
import Header from "./container/Header"
import Main from "./container/Main";
import Room from "./container/Room";
import Footer from "./container/Footer";
import { v4 as uuidv4 } from 'uuid';
import PersonsRoom from "./container/Admin/PersonsRoom/PersonsRoom";
import Panel from "./container/Admin/Panel/Panel";







function App() {
  
const [userId, setUserId] = React.useState(null)
const [darkMode, setDarkMode] = React.useState(localStorage.getItem('mode') === 'true');

const [currentRoomId, setCurrentRoomId] = React.useState(null)



const chatSocket = React.useMemo(() => {
  return new WebSocket(
    'ws://'
    + '127.0.0.1:8000'
    + '/ws/'
  );
}, []);


React.useEffect(() => {
  localStorage.setItem('mode', darkMode)
},[darkMode])




const changeDarkMode = React.useCallback(() => {
  setDarkMode(!darkMode)
}, [setDarkMode, darkMode])


const [page, setPage] = React.useState('panel')


const MainPageJSX = React.useMemo(() => {
  switch(page){
    case 'main':
      return <Main darkMode={darkMode} setPage={setPage} chatSocket={chatSocket} userId={userId}></Main>
    case 'room':
      return <Room darkMode={darkMode} setPage={setPage} chatSocket={chatSocket} userId={userId}></Room>
    case 'persons-room':
      return <PersonsRoom currentRoomId={currentRoomId} darkMode={darkMode} setPage={setPage} chatSocket={chatSocket} userId={userId}></PersonsRoom>
    case 'panel':
      return <Panel currentRoomId={currentRoomId} setCurrentRoomId={setCurrentRoomId} darkMode={darkMode} setPage={setPage} chatSocket={chatSocket} userId={userId}></Panel>
    default:
      return 
  }
}, [chatSocket, page, userId, darkMode, currentRoomId])




React.useEffect(() => {
  let user_id = localStorage.getItem("user_id")

  if (!user_id) {
    const uniqueId = uuidv4();
    setUserId(uniqueId)
    localStorage.setItem('user_id', uniqueId)
  }
  else{
    setUserId(user_id)
  }

},[userId])



React.useEffect(() => {
  chatSocket.onopen = function(event) {
    chatSocket.send(JSON.stringify({
        'action_type': 'insert_app',
        'user_id': userId
    }));
  };
},[chatSocket, userId])



  return (
    <div className="App">
      <Header darkMode={darkMode} changeDarkMode={changeDarkMode}></Header>
      {MainPageJSX}
      {page === 'main'
      ?
      <Footer darkMode={darkMode}></Footer>
      :
      <></>
      }
    </div>
  );
}

export default App;
