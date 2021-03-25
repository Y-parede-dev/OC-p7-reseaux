import { useState } from 'react';
import { createHeader } from '../assets/js/Function';
import '../styles/CreatePost.css';

function CreatePost(){
    
    const [contentPost, setContentPost] = useState('');
   
    const recupUserCo = sessionStorage.getItem('userIsCo');
    const PrecupUserCo = JSON.parse(recupUserCo);
    const blockOnScroll =()=>{
        let srll = sessionStorage.getItem('scroll');
        let elt = document.getElementById('form-create-post');
        if(srll){
            elt.className ='with-scroll'
        }
    }
        
    console.log(PrecupUserCo)
    
    const handleSubmit = (event) => {
        event.preventDefault();
        
        const requete = {
            user_id: "",
            content: '',
            date_post:"",
            image_url:null,
            url_web:null
        }
        PrecupUserCo.forEach((item)=>{
            requete.user_id = item.id;
            return requete;
        })
        if(contentPost.search('http')){
            if(!contentPost.search(' ')){
                requete.content = '';
                requete.url_web=contentPost;
            }else{
                requete.content = contentPost.split('http')[0];
                requete.url_web = contentPost.split('http')[1];
                requete.url_web = `http${requete.url_web}`
            }
               
        }else {
            requete.content = contentPost;
        }
        const datePost = new Date();
        let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',hour:'numeric', minute:'numeric' };
        
        requete.date_post = datePost.toLocaleString('fr-Fr', options); 
        console.log(requete)
        const myInit = { 
            method: 'POST',
            headers: createHeader(),
            mode: 'cors',
            cache: 'default',
            body: JSON.stringify(requete)
        };
        fetch("http://localhost:3001/api/post", myInit)
        .then(res=>res.json())
        
        .catch(err=>console.log(err))
    }
    const handleChangeContent = (event) =>{
        setContentPost(event.target.value);
       
    }
   
    
    // affiche un retour visuel dès que input:file change
    
    
    var fileInput = document.querySelector( ".input-file" ),
        button = document.querySelector( ".input-file-trigger" ),
        the_return = document.querySelector(".file-return");
    if(document.onLoad){
    // action lorsque la "barre d'espace" ou "Entrée" est pressée
        button.addEventListener( "keydown", function( event ) {
            if ( event.keyCode == 13 || event.keyCode == 32 ) {
                fileInput.focus();
            }
        });
        
        // action lorsque le label est cliqué
        button.addEventListener( "click", function( event ) {
            fileInput.focus();
            return false;
        });
        fileInput.addEventListener( "change", function( event ) {
            the_return.innerHTML = this.value;
    });}

   
    return(
    
        <form id="form-create-post" onLoad={blockOnScroll} onSubmit={handleSubmit}> <span className="title-form-post">Souhaitez vous poster quelque chose ?</span>
            <label htmlFor="content-post"></label>
            <textarea className="form-control" type="text" name="content-post" value={contentPost} onChange={handleChangeContent}/>
            <div className="input-file-container">
                 
                <label htmlFor="my-file" className="input-file-trigger" tabIndex="0">
                    Select a file...
                </label>
            </div>
            <p className="file-return"></p>
            <input className="form-control form-control-submit" name="submit-login" type="submit" value="envoyer"/>
        </form>
        
    )
};
export default CreatePost;