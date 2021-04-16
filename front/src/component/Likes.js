import { VerifState } from "../assets/js/Function";
import { useEffect, useState } from 'react';

const Likes = ({id_post, btnToglComment, url}) => {
    const [isLiked, setIsLiked] = useState(false);
    const [likesNumber, setLikesNumber] = useState(0);

    useEffect(()=>{
        const urlTest = `${url}/${id_post}/like`
        fetch(urlTest)
          .then(res=>res.json())
          .then(result=>{
            console.log(result.result)
            result.result.forEach((likes)=>{
                console.log(likes.likes)
                setLikesNumber(likes.likes)
            })
    
          })
      },[isLiked])
    
    const req = (id_post, likesNumber)=>{
        const myHeaders = new Headers();
        myHeaders.set('Content-type', 'application/json');
        const url = `http://localhost:3001/api/post/${id_post}/like`;
        const user = sessionStorage.getItem('userIsCo')
        const userP = JSON.parse(user);
        const requete =  {
            post_id: id_post,
            user_id: userP.id,
            like_numb: likesNumber
        }
        const myInit = { 
            method: 'POST',
            headers: myHeaders,
            mode: 'cors',
            cache: 'default',
            body:JSON.stringify(requete)
        };
        const waitConnect = async ()=>{
        const rep = await fetch(url, myInit)
            .then(res => res.json())
                VerifState(isLiked, setIsLiked)
                return rep;
        }
        waitConnect()
    }
    return(
        <div className="like-unlike">
            <button alt='like' onLoad={()=>{}} onClick={()=>{req(id_post, likesNumber)}} id={`like-${id_post}`} className='like'><i className="fas fa-heart"></i></button>
            <span className='like-count' id={`like-count-${id_post}`}>{likesNumber}</span>
            <button alt='like' onClick={()=>btnToglComment(id_post)} className='btn-comment'><i className="far fa-comments"></i></button>
        </div>    
    )
}
export default Likes;