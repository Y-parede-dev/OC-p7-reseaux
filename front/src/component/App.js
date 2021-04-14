import Header from './Header';
import React, { useState } from "react";
import Main from './Main';
import Signup from './Signup';
import Login from './Login';
import Account from './Account';
import ModifPost from './ModifPost';
import Footer from './Footer';


import {BrowserRouter as Router, Route} from 'react-router-dom';
import '../styles/App.css';
import DeleteAccount from './DeleteAccount';

function App() {
  console.log(document.URL)

  const isCo = sessionStorage.getItem('isCo');
  const isCOJson = JSON.parse(isCo);
  const [isConected, setIsConected] = useState(isCOJson);
  return (
    <div className="App">
      <Router>
        <Header isConected = {isConected} setIsConected = {setIsConected}/>
        <Route path="/signup" exact component={Signup}/>
        <Route path="/login" exact component={() => <Login isConected={isConected} setIsConected={setIsConected}  />} /> 
        <Route path="/main" exact component={() => <Main isConected={isConected} setIsConected={setIsConected}  />} />
        <Route path="/account" exact component={() => <Account onClick={Account} isConected={isConected} setIsConected={setIsConected}  />} />
       
        <Route path="/del" exact component={() => <DeleteAccount onClick={DeleteAccount}  />} />
        <Route path="/modify-post" exact component={() => <ModifPost onClick={ModifPost} />} />
        <Footer />
      </Router>
      {!isConected || isConected == false? <p className="is-connected">🔴 {window.location.href.includes('/signup')? <span> pour pouvoir enregistrer un compte <br/> <br/> Veuillez entrez un mot de passe fort  et un email valide</span>:<span>Veuillez vous connecter pour accéder au site</span>} </p> : <p className="is-connected">🟢 connected</p>}
    </div>
  );
};
   
export default App;
