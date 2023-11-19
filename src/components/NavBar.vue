<template>
    <div>
        <!-- nav-bar -->
        <v-app-bar app>
            <div class="menu-icon">
                <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
            </div>
            <div class="nav-bar-items">
                <v-btn to="/">Home</v-btn>
                <v-btn to="/employee">Empleados</v-btn>
                <v-btn to="/course">Cursos</v-btn>
                <v-btn to="/edition">Ediciones</v-btn>
                <v-btn to="/about">About Us</v-btn>
            </div>
            <v-spacer></v-spacer>
            <v-toolbar-title>Course Management System</v-toolbar-title>
        </v-app-bar>

        <!--Menu lateral-->
        <v-navigation-drawer v-model="drawer" temporary>
            <v-list-item title="CMS"></v-list-item>
            <v-divider></v-divider>
            <v-list density="compact" nav>
                <v-list-item to="/" prepend-icon="mdi-view-dashboard" title="Home" value="home"></v-list-item>
                <v-list-item to="/employee" prepend-icon="mdi-briefcase" title="Empleados" value="employee"></v-list-item>
                <v-list-item to="/course" prepend-icon="mdi-school" title="Cursos" value="course"></v-list-item>
                <v-list-item to="/edition" prepend-icon="mdi-calendar-account-outline" title="Ediciones"
                    value="edition"></v-list-item>
                <v-list-item to="/about" prepend-icon="mdi-information-variant" title="About Us"
                    value="edition"></v-list-item>

            </v-list>
        </v-navigation-drawer>
    </div>
</template>
<script>
export default {
    data() {
        return {
            drawer: null,
        }
    },
}
</script>
<style>
.menu-icon {
    pointer-events: none;
    visibility: hidden;
}

@media(max-width:860px) {
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