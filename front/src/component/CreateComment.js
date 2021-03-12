function CreateComment(){
    return(
        
        <form id="form-create-comment">
            <label htmlFor="content-new-comment"></label>
            <textarea className="form-control form-control-comment" type="text" name="content-new-comment" placeholder="* Votre commentaire"/>
            <input className="form-control form-control-submit" name="submit-login" type="submit" value="envoyer"/>

        </form>
    )
}
export default CreateComment;