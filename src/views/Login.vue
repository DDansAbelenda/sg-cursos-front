<template>
    <v-container class="mt-5">
        <v-row justify="center">
            <v-col cols="12" sm="8" md="4">
                <v-card class="border border-success">
                    <v-card-title class="bg-success text-white">LOGIN</v-card-title>
                    <v-card-text>
                        <v-form @submit.prevent="authStore.login(form)">
                            <v-text-field v-model="form.email" label="Email" outlined prepend-icon="mdi-at"
                                autofocus class="input"></v-text-field>
                            <v-text-field v-model="form.password" label="Password" outlined prepend-icon="mdi-key"
                                type="password" class="input"></v-text-field>
                            <v-btn type="submit" class="bg-blue-grey-darken-4 input" dark block >Login</v-btn>
                        </v-form>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>
<script setup>
import { ref } from 'vue';
import { useAuthStore } from '@/store/auth';

const authStore = useAuthStore();

const form = ref({
    email: 'admin@email.com',
    password: 'password'
})
</script>

<style>
.input{
    margin-top: 1rem;
}
</style>
