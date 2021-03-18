import '../styles/CreatePost.css';

function CreatePost(){
    return(
    
        <form id="form-create-post"> <span className="title-form-post">Souhaiter vous poster quelque chose ?</span>
            <label htmlFor="content-post"></label>
            <textarea className="form-control" type="text" name="content-post"/>
            <label htmlFor='image-post'></label>
            <input className="form-control image-post" type="file" name="image-post" accept="image/png, image/jpeg, image/gif" />
            
            <input className="form-control form-control-su" name="submit-login" type="submit" value="envoyer"/>

        </form>
        
    )
};
export default CreatePost;