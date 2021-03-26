import { useState } from 'react';
import { createHeader } from '../assets/js/Function';
import '../styles/CreatePost.css';

function CreatePost(){
    
    const [contentPost, setContentPost] = useState('');
    const [contentPostImg, setContentPostImg] = useState([]);
    const [contentPostUrl, setContentPostUrl] = useState('');
    const userStorage = sessionStorage.getItem("token+id");
    const userStorageJson = JSON.parse(userStorage);
    const recupUserCo = sessionStorage.getItem('userIsCo');
    const PrecupUserCo = JSON.parse(recupUserCo);
    const test =()=>{
        let srll = sessionStorage.getItem('scroll');
        let elt = document.getElementById('form-create-post');

        if(srll){
            elt.className ='with-scroll'
        }
    }
        
    const handleChangeImg = (event) => {
        console.log(event.target.files[0])
        
        let imageData = event.target.files[0];
        setContentPostImg(imageData);
        
        console.log( imageData)
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const requete = new FormData();
        requete.append('user_id','');
        requete.append('content','');
        requete.append('date_post','');
        requete.append('image_url',null);
        requete.append('url_web',null);
        
        PrecupUserCo.forEach((item)=>{
            requete.set('user_id',item.id);
            return requete;
        })
        if(contentPostImg !=[]){
            requete.set('image_url', contentPostImg);
        }
        console.log(contentPost.includes('http://www.'))
        if(contentPost.includes('http://www.')||contentPost.includes('https://www')){
            if(!contentPost.includes(' http')){
                requete.set('url_web', contentPost);

            }else{
                if(contentPost.includes('https:')){
                    requete.set('content', contentPost.split('https:')[0]);
                    const urlWeb =  contentPost.split('https:')[1];
                    requete.set('url_web', `https:${urlWeb}`);
 
                }else {
                    requete.set('content', contentPost.split('http:')[0]);
                    const urlWeb =  contentPost.split('http:')[1];
                    requete.set('url_web', `http:${urlWeb}`);
                }
                
            }
               
        }else {
            requete.set('content', contentPost);
        }
        const datePost = new Date();
        let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',hour:'numeric', minute:'numeric' };
        const myHeaders = new Headers();
            myHeaders.append('Authorization', 'Bearer ' + userStorageJson.token);
        requete.set('date_post ',datePost.toLocaleString('fr-Fr', options)); 
        const myInit = { 
            method: 'POST',
            headers: myHeaders,
            mode: 'cors',
            cache: 'default',
            body: requete
        };
        fetch("http://localhost:3001/api/post", myInit)
        .then(res=>res.json())
        
        .catch(err=>console.log(err))
    }
    const handleChangeContent = (event) =>{
        setContentPost(event.target.value);
       
    }
    
  
   
    return(
    
        <form id="form-create-post" onLoad={test} onSubmit={handleSubmit}> <span className="title-form-post">Souhaitez vous poster quelque chose ?</span>
            <label htmlFor="content-post"></label>
            <textarea className="form-control" type="text" name="content-post" value={contentPost} onChange={handleChangeContent}/>
            <label className="image-post-label" htmlFor='image-post'><i className="fas fa-image"></i></label>
            <input className="form-control image-post" type="file" name="image-post" accept="image/*" onChange={handleChangeImg} />
            
            <input className="form-control form-control-su" name="submit-login" type="submit" value="envoyer"/>

        </form>
        
    )
};
export default CreatePost;