import Header from './Header';
import React, { useState } from "react";
import Main from './Main'
import Signup from './Signup';
import Login from './Login';
import Account from './Account';
import ModifAccount from './ModifAccount';

import {BrowserRouter as Router, Route} from 'react-router-dom';
import '../styles/App.css';
import DeleteAccount from './DeleteAccount';

function App() {
  const isCo = sessionStorage.getItem('isCo');
  const isCOJson = JSON.parse(isCo)
  
  console.log("is co json  ", isCOJson)
  const [isConected, setIsConected] = useState(isCOJson);
  console.log('is :', isConected)
  
  const returnConect = document.createElement('P');
  
  if(isConected || isConected === true){

    returnConect.innerHTML = 
    console.log('good')
  }

  return (
    <div className="App">
      <Router>
        
        <Header isConected = {isConected} setIsConected = {setIsConected}/>
        
        <Route path="/signup" exact component={Signup}/>
        <Route path="/login" exact component={() => <Login isConected={isConected} setIsConected={setIsConected}  />} /> 
        <Route path="/main" exact component={() => <Main isConected={isConected} setIsConected={setIsConected}  />} />
        <Route path="/account" exact component={() => <Account onClick={Account} isConected={isConected} setIsConected={setIsConected}  />} />
        <Route path="/modify" exact component={() => <ModifAccount onClick={ModifAccount} /*isConected={isConected} setIsConected={setIsConected} */ />} />
        <Route path="/del" exact component={() => <DeleteAccount onClick={DeleteAccount} /*isConected={isConected} setIsConected={setIsConected} */ />} />
        

      </Router>
      {!isConected || isConected == false? <p>🔴 Veuillez vous connecter pour accéder au site </p> : <p>🟢 connected</p>}
    </div>
  );
}
   
export default App;
