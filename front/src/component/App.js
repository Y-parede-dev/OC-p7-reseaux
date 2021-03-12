import Header from './Header';
import React, { useState } from "react";
import Main from './Main'
import Signup from './Signup';
import Login from './Login';
import Account from './Account';

import {BrowserRouter as Router, Route} from 'react-router-dom';
import '../styles/App.css';

function App() {
  const isCo = sessionStorage.getItem('isCo');
  const isCOJson = JSON.parse(isCo)
  
  console.log("is co json  ", isCOJson)
  const [isConected, setIsConected] = useState(isCOJson);
  console.log('is :', isConected)
  if(isConected){
    console.log('good')
  }
  return (
    <div className="App">
      <Router>
        
        <Header isConected = {isConected} setIsConected = {setIsConected}/>
        
        <Route path="/signup" exact component={Signup}/>
        <Route path="/login" exact component={() => <Login isConected={isConected} setIsConected={setIsConected}  />}/> 
        <Route path="/main" exact component={() => <Main isConected={isConected} setIsConected={setIsConected}  />}/>
        <Route path="/account" exact component={() => <Account isConected={isConected} setIsConected={setIsConected}  />}/>
        

      </Router>

    </div>
  );
}
   
export default App;
