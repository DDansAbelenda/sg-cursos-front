<template>
    <div>
        <!-- nav-bar -->
        <v-app-bar app>
            <div v-if="authStore.user" class="menu-icon">
                <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
            </div>
            <div v-if="authStore.user" class="nav-bar-items">
                <v-btn to="/">Home</v-btn>
                <v-btn to="/employee">Empleados</v-btn>
                <v-btn to="/course">Cursos</v-btn>
                <v-btn to="/edition">Ediciones</v-btn>
                <v-btn to="/about">About Us</v-btn>
            </div>
            <v-spacer v-if="authStore.user"></v-spacer>
            <v-toolbar-title>Sistema de Gestión de Cursos</v-toolbar-title>
            <v-btn v-if="authStore.user" @click="authStore.logout">Salir</v-btn>
        </v-app-bar>

        <!--Menu lateral-->
        <v-navigation-drawer v-model="drawer" temporary>
            <v-list-item title="SGC"></v-list-item>
            <v-divider></v-divider>
            <v-list density="compact" nav>
                <v-list-item to="/" prepend-icon="mdi-view-dashboard" title="Home" value="home"></v-list-item>
                <v-list-item v-if="authStore.user" to="/employee" prepend-icon="mdi-briefcase" title="Empleados"
                    value="employee"></v-list-item>
                <v-list-item v-if="authStore.user" to="/course" prepend-icon="mdi-school" title="Cursos"
                    value="course"></v-list-item>
                <v-list-item v-if="authStore.user" to="/edition" prepend-icon="mdi-calendar-account-outline"
                    title="Ediciones" value="edition"></v-list-item>
                <v-list-item v-if="authStore.user" to="/about" prepend-icon="mdi-information-variant" title="About Us"
                    value="edition"></v-list-item>
            </v-list>
        </v-navigation-drawer>
    </div>
</template>
<script setup>
import { useAuthStore } from '@/store/auth';
import { ref } from 'vue';

const authStore = useAuthStore();
const drawer = ref(null);
</script>  
<style>
.menu-icon {
    pointer-events: none;
    visibility: hidden;
}

@media (max-width: 860px) {
    .nav-bar-items {
        display: none;
    }

    .v-spacer {
        display: none;
    }

    .menu-icon {
        pointer-events: auto;
        visibility: visible;
    }
}
</style>  