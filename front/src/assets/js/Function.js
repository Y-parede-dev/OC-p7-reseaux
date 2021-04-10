// Création Header requetes a l'API

export const createHeader = () => {
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
   // myHeaders.get('content-type');
    return myHeaders;
};
// Création Header requetes avec token a l'API


// reGex email
export const isValidEmailFront = (value) => {
    let reGex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    return reGex.test(value);
};
// reGex password (entre 8-15 caract. / au moins 1 chifre 1maj. une min et au moins un carct. spé.)
export const isValidPasswordFront = (value) => {
    let reGex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[-+!*$@%_])([-+!*$@%_\w]{8,15})$/;
    return reGex.test(value);
};
// creation ou modification d'un article

 export const contentPostOrModif = (contentPost, requete) => {
    if(contentPost.includes('http://www.')||contentPost.includes('https://www')){
        if(!contentPost.includes(' http')){
            if(contentPost.includes('&t')){
                const refer = contentPost.split('&t')[0];
                requete.set('url_web', refer);
            }
            if(contentPost.includes('&l')){
                const refer = contentPost.split('&l')[0];
                requete.set('url_web', refer);
            }
                
        }else{
            if(contentPost.includes('https:')){
                const refer = contentPost.split('https:')[1]
                requete.set('content', contentPost.split('https:')[0]);
                if(contentPost.includes('&t') || contentPost.includes('&l')){
                    if(contentPost.includes('&t')){
                        const urlWeb =  refer.split('&t')[0];
                        requete.set('url_web', `https:${urlWeb}`);

                    }
                    if(contentPost.includes('&l')){
                        const urlWeb =  refer.split('&l')[0];
                        requete.set('url_web', `https:${urlWeb}`);
                    }
                }else{
                    requete.set('url_web', `https:${refer}`);
                }                    

            }else {
                const refer = contentPost.split('http:')[1]
                requete.set('content', contentPost.split('http:')[0]);
                if(contentPost.includes('&t') || contentPost.includes('&l')){
                    if(contentPost.includes('&t')){
                        const urlWeb =  refer.split('&t')[0];
                        requete.set('url_web', `http:${urlWeb}`);

                    }
                    if(contentPost.includes('&l')){
                        const urlWeb =  refer.split('&l')[0];
                        requete.set('url_web', `http:${urlWeb}`);
                    }
                }else{
                    requete.set('url_web', `http:${refer}`);
                }   
            }
            
        }
        
    }else {
        if(contentPost == 'undefined'){
            requete.set('content', '');

        }
        requete.set('content', contentPost);
    }
}
// verification d'etatt
export const VerifState=(state, setState)=>{
    if(state == true){
        setState(false)
    }else{
        setState(true)
    }
}

