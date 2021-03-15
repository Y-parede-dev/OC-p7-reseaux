// Création Header requetes a l'API

export const createHeader = () => {
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
   // myHeaders.get('content-type');
    return myHeaders
}
// reGex email
export const isValidEmailFront = (value) => {
    let reGex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    return reGex.test(value);
};
// reGex password (entre 8-15 caract. / au moins 1 chifre 1maj. une min et au moins un carct. spé.)
export const isValidPasswordFront = (value) => {
    let reGex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[-+!*$@%_])([-+!*$@%_\w]{8,15})$/;
    return reGex.test(value)
}
