<template>
    <LoadingPage :isLoading="loading" />
    <v-container class="mt-5">
        <v-row justify="center">
            <v-col>
                <v-card class="border border-success">
                    <v-card-title class="bg-success text-white">REGISTER</v-card-title>
                    <v-card-text>
                        <v-form @submit.prevent="authStore.register(form)">
                            <v-text-field v-model="form.name" label="Name" outlined prepend-icon="mdi-account" autofocus
                                class="input" required></v-text-field>
                            <v-text-field v-model="form.email" label="Email" outlined prepend-icon="mdi-at"
                                class="input" required></v-text-field>
                            <v-text-field v-model="form.password" label="Password" outlined prepend-icon="mdi-key"
                                type="password" class="input" required></v-text-field>
                            <v-btn type="submit" dark block class="input">Crear</v-btn>
                        </v-form>
                    </v-card-text>
                </v-card>
            </v-col>
            <v-col>
                <!-- Tabla de cursos -->
                <v-data-table :headers="headers" :items="users" :items-per-page="20" class="elevation-1">
                    <template v-slot:top>
                        <v-toolbar flat>
                            <v-toolbar-title>Usuarios</v-toolbar-title>
                        </v-toolbar>
                    </template>
                    <!-- Agregamos la columna de acciones -->
                    <template v-slot:item.actions="{ item }">
                        <v-btn class="delete" icon @click="deleteUser(item)" flat>
                            <v-icon color="red darken-1">mdi-delete</v-icon>
                        </v-btn>
                    </template>
                </v-data-table>
            </v-col>
        </v-row>
    </v-container>
</template>
<script setup>
import { onMounted, ref } from 'vue';
import { useAuthStore } from '@/store/auth';
import LoadingPage from '../components/LoadingPage.vue'
import { confirmation, show_alert } from '@/function';


const authStore = useAuthStore();

//Listado de usuarios
const users = ref([]);
//Cabeceras de la tabla
const headers = [
    { title: 'Nombre Usuario', key: 'name' },
    { title: 'Correo', value: 'email' },
    { title: 'Acciones', value: 'actions', sortable: false }
]

//Formulario para crear el usuario
const form = ref({
    name: '',
    email: '',
    password: ''
})

const deleteUser = (user) => {
    const userStorage = JSON.parse(sessionStorage.getItem('AUTH')).data.data;
    if (user.id == userStorage.id) {
        show_alert('No se puede eliminar el usuario actual', 'error', '');
    } else {
        confirmation(user.name, `/api/user/${user.id}`, '/register');
    }
}

onMounted(() => { getUsers() });

//Para controlar el loading
const loading = ref(false);
const toggleLoading = () => {
    loading.value = !loading.value;
}
const getUsers = async () => {
    toggleLoading();
    await axios.get('/api/user').then(
        response => (users.value = response.data));
    toggleLoading();
}

</script>

<style>
.input {
    margin-top: 1rem;
}
</style>