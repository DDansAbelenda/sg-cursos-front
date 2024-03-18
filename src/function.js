//Funciones que se reutilizaran en los componentes
import Swal from 'sweetalert2';
import { nextTick } from '@vue/runtime-core';
import { useAuthStore } from './store/auth';


export function show_alert(msj, icon, focus) {
    if (focus !== '') {
        nextTick(() => focus.value.focus());
    }
    Swal.fire({
        title: msj, icon: icon, buttonsStyling: true
    });
}

export function confirmation(name, url, redirect) {
    const alert = Swal.mixin({ buttonsStyling: true });
    alert.fire({
        title: 'Are you sure delete ' + name + ' ?',
        icon: 'question', showCancelButton: true,
        confirmButtonText: '<i class="fa-solid fa-check"></i> Yes, delete',
        cancelButtonText: '<i class="fa-solid fa-check"></i> Cancel'
    }).then((result) => {
        if (result.isConfirmed) {
            sendRequest('DELETE', {}, url, redirect);
        }
    })
}

export async function sendRequest(method, params, url, redirect = '') {
    const authStore = useAuthStore();
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + authStore.authToken;
    let res;
    await axios({ method: method, url: url, data: params }).then(
        response => {
            res = response.data.status,
                show_alert(response.data.message, 'success', ''),
                setTimeout(
                    () => (redirect !== '') ? window.location.href = redirect : '', 2000)
        }
    ).catch((errors) => {
        let desc = '';
        res = errors.response.data.status;
        Object.values(errors.response.data.errors).forEach(e => {
            desc = desc + ' ' + e
        });
        show_alert(desc, 'error', '')
        //console.log(JSON.stringify(errors.response.data));
        //console.log(errors.response.data.status);
    })
    return res;
}