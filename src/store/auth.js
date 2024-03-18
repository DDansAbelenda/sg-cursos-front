//Archivo para gestionar los estados de la sesión del usuario

import { defineStore } from "pinia";
import { show_alert } from "@/function";

export const useAuthStore = defineStore('auth', {
    state: () => ({ authUser: null, authToken: null }),
    getters: {
        user: (state) => state.authUser,
        token: (state) => state.authToken
    },
    actions: {
        async getToken() {
            await axios.get('/sanctum/csrf-cookie');
        },
        async login(form) {
            await this.getToken();
            await axios.post('/api/auth/login', form).then(
                (res) => {
                    this.authToken = res.data.token;
                    this.authUser = res.data.data;
                    //Respaldar la información en caso de recargar la página
                    //Se almacena el token en directamente al ser una cadena
                    sessionStorage.setItem('TOKEN', this.authToken);
                    //En el caso de la información de autenticación se almacena como JSON para evitar
                    //que se haga indefinido al guardarse como objeto
                    sessionStorage.setItem('AUTH', JSON.stringify({
                        status: res.status,
                        message: res.message,
                        data: res.data,
                        token: res.token
                    }));
                    this.router.push('/');
                }
            ).catch(
                (errors) => {
                const res = errors.response.data.errors;
                show_alert(res, 'error', ''); 
                console.log(errors.response.data.errors);
                }
            )
        },
        async register(form) {
            await this.getToken();
            await axios.post('/api/auth/register', form).then(
                (res) => {
                    show_alert(res.data.message, 'success', '');
                    setTimeout(() => window.location.href = '/register', 2000);
                }
            ).catch(
                (errors) => {
                    let desc = '';
                    errors.response.data.errors.map(
                        (e) => { desc = desc + ' ' + e }
                    );
                    show_alert(desc, 'error', '');
                }
            )
        },
        async logout() {
            await axios.get('/api/auth/logout', this.authToken);
            this.authToken = null;
            this.authUser = null;
            //Una vez cierra sesión el usuario se elimina su información
            //de la memoria 
            sessionStorage.removeItem('TOKEN');
            sessionStorage.removeItem('AUTH');
            this.router.push('/login');
        }
    },
    //persist: true para que no se pierda la sesion cuando se refresca la página
});