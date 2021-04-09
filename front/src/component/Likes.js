const Likes = (postId, likeNumb) => {
    
    const myHeaders = new Headers();
        myHeaders.set('Content-type', 'application/json');
    const url = `http://localhost:3001/api/post/${postId}/like`;
    const user = sessionStorage.getItem('userIsCo')
    const userP = JSON.parse(user);
    

    const requete =  {
        post_id: postId,
        user_id: userP.id,
        like_numb: likeNumb
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
    
    return rep;
    
    }
    waitConnect()
    return(
        <div className="like-unlike">
            <button alt='like' onClick={()=>{Likes(postId, likeNumb)}} id={`like-${postId}`} className='like'><i className="fas fa-heart"></i></button>
            <span className='like-count' id={`like-count-${postId}`}>{likeNumb}</span>
            
        </div>
    )
      
    
}
export default Likes;