import { useEffect, useState, useRef } from 'react';
import {contentPostOrModif} from '../assets/js/Function'
import '../styles/CreatePost.css';

const CreatePost=({postM, setPostM})=>{
    
    const [contentPost, setContentPost] = useState('');
    const [contentPostImg, setContentPostImg] = useState('');
    const userStorage = sessionStorage.getItem("token+id");
    const userStorageJson = JSON.parse(userStorage);
    const recupUserCo = sessionStorage.getItem('userIsCo');
    const PrecupUserCo = JSON.parse(recupUserCo);
    const scrollFixPos =()=>{
        let srll = sessionStorage.getItem('scroll');
        let elt = document.getElementById('form-create-post');

        if(srll){
            elt.className ='with-scroll'
        }
    }
    const imageRef = useRef(null);

    function useDisplayImage() {
        const [result, setResult] = useState("");
    
        function uploader(e) {
          const imageFile = e.target.files[0];
    
          const reader = new FileReader();
          reader.addEventListener("load", (e) => {
            setResult(e.target.result);
          });
    
          reader.readAsDataURL(imageFile);
        }
    
        return { result, uploader };
      }
    
    const { result, uploader } = useDisplayImage();
    
    
    const handleSubmit = (event) => {     
        if(postM==true){
            setPostM(false)

        }else{
            setPostM(true)
        }
        event.preventDefault();
        const datePost = new Date();
        let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',hour:'numeric', minute:'numeric' };
        const datePostString =datePost.toLocaleString('fr-Fr', options);     
        const requete = new FormData();
        requete.append('user_id','');
        requete.append('content','');
        requete.append('date_post',datePostString);
        requete.append('image_url',null);
        requete.append('url_web',null);  
        requete.set('user_id',PrecupUserCo.id);

        contentPostOrModif(contentPost, requete);   
        if(contentPost.includes('http://www.')||contentPost.includes('https://www')){
            requete.set('image_url', null);
            if(!contentPost.includes(' http')){
                if(contentPost.includes('&list')){
                    requete.set('url_web', contentPost.split('&list')[0]);
                } else {
                    requete.set('url_web', contentPost);
                }
            }else{
                if(contentPost.includes('https:')){
                    requete.set('content', contentPost.split('https:')[0]);
                    let reqBase = contentPost.split('https:')[1];
                    let urlWeb = reqBase;
                    if(contentPost.includes('&list')){
                        urlWeb = reqBase.split("&list")[0]
                        requete.set('url_web', `https:${urlWeb}`);
                    }else{
                        const urlWeb =  contentPost.split('https:')[1];
                        requete.set('url_web', `https:${urlWeb}`);
                    }
                }else {
                    requete.set('content', contentPost.split('http:')[0]);
                    let reqBase = contentPost.split('http:')[1];
                    let urlWeb = reqBase;
                    if(contentPost.includes('&list')){
                        urlWeb = reqBase.split("&list")[0]
                        requete.set('url_web', `http:${urlWeb}`);
                    }else{
                        const urlWeb =  contentPost.split('http:')[1];
                        requete.set('url_web', `http:${urlWeb}`);
                    }
                }  
            }  
        }else {
            if(contentPostImg != ''){
                requete.set('image_url', contentPostImg);
                console.log( contentPostImg)

            }
            requete.set('content', contentPost);
        }
        const myHeaders = new Headers();
            myHeaders.append('Authorization', 'Bearer ' + userStorageJson.token);
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
        <form id="form-create-post" onLoad={scrollFixPos} onSubmit={handleSubmit}> 
            <p className="title-form-post"></p>
            <label htmlFor="content-post"></label>
            <textarea className="form-control" type="text" name="content-post" placeholder={contentPostImg !== "" ? "" : `Que souhaitez vous poster ${PrecupUserCo && PrecupUserCo.prenom} ?`}  value={contentPost} onChange={(e)=>{setContentPost(e.target.value)}}/>
            {result && <img className='choise-image' ref={imageRef} src={result} alt="image choisie" />}
            
            <label className="image-post-label" htmlFor='image-post'><i className="fas fa-image"></i></label>
            <input className="form-control image-post" type="file" name="image-post" accept="image/*" onChange={(e)=>{setContentPostImg(e.target.files[0]);uploader(e);}} />
            <button className="form-control form-control-su" name="submit-login" type="submit">envoyer</button>
        </form>
    )
};
export default CreatePost;



