import { useState } from 'react';
import '../styles/ModifPost.css';
const ModifPost = () => {
    const [contentPost, setContentPost] = useState('');
    const [contentPostImg, setContentPostImg] = useState([]);

    const userStorage = sessionStorage.getItem("token+id");
    const userStorageJson = JSON.parse(userStorage);
    const recupUserCo = sessionStorage.getItem('userIsCo');
    const PrecupUserCo = JSON.parse(recupUserCo);
    const recupPost = sessionStorage.getItem('post-modif');
    const recupPostParse = JSON.parse(recupPost);
    

    const handleChangeImg = (event) => {
        console.log(event.target.files[0])
        
        let imageData = event.target.files[0];
        setContentPostImg(imageData);
        
        console.log( imageData)
    };

    const handleSubmit = (event) => {
        event.preventDefault();
       
        const requete =new FormData();
        requete.append('user_id','');
        requete.append('post_id',recupPostParse.id_post);
        requete.append('content',recupPostParse.content);
        requete.append('image_url',recupPostParse.image_url);
        requete.append('url_web',recupPostParse.url_web);
        PrecupUserCo.forEach((item)=>{
            requete.set('user_id',item.id);
            return requete;
        });
    
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
        
        const myHeaders = new Headers();
            myHeaders.append('Authorization', 'Bearer ' + userStorageJson.token);
            const myInit = { 
                method: 'PUT',
                headers: myHeaders,
                mode: 'cors',
                cache: 'default',
                body: requete
            };
        fetch("http://localhost:3001/api/post/"+recupPostParse.id_post, myInit)
        .then(res=>res.json())
        
        .catch(err=>console.log(err))
        sessionStorage.removeItem('post-modif')
    }
    const handleChangeContent = (event) =>{
        setContentPost(event.target.value);
       
    }

    return(
        <section className="modif-post">
            <form id="form-modif-post" onSubmit={handleSubmit}> 
                <label htmlFor="content-modif-post"></label>
                <textarea className="form-control" type="text" name="content-modif-post" value={contentPost} onChange={handleChangeContent}/>
                <label className="image-post-label pos-lab-on-input" htmlFor='image-modif-post'><i className="fas fa-image"></i></label>
                <input className="form-control image-post image-post-modif pos-lab-on-input" type="file" name="image-modif-post" accept="image/*" onChange={handleChangeImg} />
                
                
                <input className="form-control form-control-modif-post-annuler" name="annuler" type="button" value="anulez"/>
                <input className="form-control form-control-modif-post" name="submit" type="submit" value="envoyer"/>

            </form>
        </section>
    )
};
export default ModifPost;