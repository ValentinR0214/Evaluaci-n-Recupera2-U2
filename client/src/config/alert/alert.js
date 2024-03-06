import swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const AlertClient = withReactContent(swal);

//Titulos y Mensajes definidos success | error | confirm

//Aletya error
//Alerta Succes
//Alerta Confirm

export const customAlert = (title, text, icon) =>{
    return AlertClient.fire({
        title,
        text,
        icon,
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Aceptar'

    });
}