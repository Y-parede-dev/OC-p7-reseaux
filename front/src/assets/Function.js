// Création Header requetes a l'API

const createHeader=()=>{
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.get('content-type');
    return myHeaders
}
export default createHeader;