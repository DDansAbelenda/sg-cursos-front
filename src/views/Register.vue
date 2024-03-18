<template>
    <v-container class="mt-5">
        <v-row justify="center">
            <v-col cols="12" sm="8" md="4">
                <v-card class="border border-success">
                    <v-card-title class="bg-success text-white">REGISTER</v-card-title>
                    <v-card-text>
                        <v-form @submit.prevent="authStore.register(form)">
                            <v-text-field v-model="form.name" label="Name" outlined prepend-icon="mdi-account"
                                autofocus></v-text-field>
                            <v-text-field v-model="form.email" label="Email" outlined prepend-icon="mdi-at"></v-text-field>
                            <v-text-field v-model="form.password" label="Password" outlined prepend-icon="mdi-key"
                                type="password"></v-text-field>
                            <v-btn type="submit" dark block>Send</v-btn>
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
    name: '',
    email: '',
    password: ''
})
</script>
