import '../styles/Signaler.css'
const Signaler = ({postId}) => {

    
    const checkBox = () => {
        /*
        if(document.getElementById('propos-sexiste').checked){
            alert('sexiste')
        }*/
    }
    
    return(
        <form id={`signaler-${postId}`} className='comment form-signaler'>
            <div className='propos propos-sexiste'>
                <input id='propos-sexiste' name='propos-sexiste' onClick={()=>checkBox()} type='checkbox' />
                <label htmlFor='propos-sexiste'>propos-sexiste</label>
            </div>
            <div className='propos propos-raciste'>
                <input id='propos-raciste' name='propos-raciste' type='checkbox' />
                <label htmlFor='propos-raciste'>propos-raciste</label>
            </div>
            <div className='propos propos-difflamatoire'>
                <input id='propos-difflamatoire' name='propos-difflamatoire' type='checkbox' />
                <label htmlFor='propos-difflamatoire'>propos-difflamatoire</label>
            </div>
            <button type='submit'>envoyer</button>
        </form>
    )
}
export default Signaler;