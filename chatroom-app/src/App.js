import React, { useState } from 'react';
import Auth from './components/Auth';
import ChatRoom from './components/ChatRoom';
import JoinChat from './components/JoinChat';


const App = () => {
  const [User, setUser] = useState({
    susername: "Hello",
    spassword: "ln",
    username: "Hello",
    password: "ln",
    firstname: "p",
    lastname: "fn",
    createon: "co"
  });
  const [Message, setMessage] = useState({
    from_user: "",
    to_user: "",
    room: "",
    message: ""
  });
  const [LoggedIn, setLoggedIn] = useState(false);

  return <div style={{ minHeight: '100vh', width: '100vw', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    {
      LoggedIn === false &&
      <Auth User={User} Message={Message} setUser={setUser} setMessage={setMessage} LoggedIn={LoggedIn} setLoggedIn={setLoggedIn} />
    }
    {
      LoggedIn === true &&
      <JoinChat User={User} Message={Message} setUser={setUser} setMessage={setMessage} LoggedIn={LoggedIn} setLoggedIn={setLoggedIn} />
    }
    {
      LoggedIn === true &&
      <ChatRoom  User={User} Message={Message} setUser={setUser} setMessage={setMessage} LoggedIn={LoggedIn} setLoggedIn={setLoggedIn} />
    }
  </div>;
};

export default App;
