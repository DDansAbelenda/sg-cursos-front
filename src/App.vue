<template>
  <v-app>
    <div class="principal-container">
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
        </div>
        <v-spacer></v-spacer>
        <v-toolbar-title>SGCPT</v-toolbar-title>
      </v-app-bar>

      <!--Menu lateral-->
      <v-navigation-drawer v-model="drawer" temporary>
        <v-list-item prepend-avatar="https://randomuser.me/api/portraits/men/78.jpg" title="John Leider"></v-list-item>
        <v-divider></v-divider>
        <v-list density="compact" nav>
          <v-list-item to="/" prepend-icon="mdi-view-dashboard" title="Home" value="home"></v-list-item>
          <v-list-item to="/employee" prepend-icon="mdi-briefcase" title="Empleados" value="employee"></v-list-item>
          <v-list-item to="/course" prepend-icon="mdi-school" title="Cursos" value="course"></v-list-item>
          <v-list-item to="/edition" prepend-icon="mdi-calendar-account-outline" title="Ediciones"
            value="edition"></v-list-item>
        </v-list>
      </v-navigation-drawer>

      <div class="content">
        <router-view />
      </div>
    </div>
  </v-app>
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
.content {
  margin-top: 3.5rem;
}


.menu-icon {
  pointer-events: none;
  visibility: hidden;
}

@media(max-width:860px) {
  .nav-bar-items {
    display: none;
  }

  .menu-icon {
    pointer-events: auto;
    visibility: visible;
  }
}
</style>

