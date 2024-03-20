<template>
  <v-app>
    <!-- Principal Container -->
    <v-container class="container" fluid>
      <v-row>
        <v-col cols="12">
          <!-- Contenido de la hero section -->
          <v-row class="hero-section section" align="center" justify="center">
            <v-col class="d-flex text-center justify-center" cols="6">
            </v-col>
            <v-col cols="6">
              <v-card class="card-text">
                <v-card-text>
                  <h2>Hola &#x1F44B;</h2>
                  <p class="abstract">Bienvenido a nuestro sistema de gestión de formación de empleados.
                    Aquí, encontrarás todas las herramientas necesarias para planificar y
                    gestionar eficientemente la formación dentro de tu empresa.</p>
                  <v-btn @click="scrollToElement">
                    Ver Más
                  </v-btn>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>

    <!-- Sección de empleados -->
    <v-container id="employee" class="container" fluid>
      <v-row>
        <v-col cols="12">
          <v-row class="employee-section section" align="center" justify="center">
            <v-col cols="6">
            </v-col>
            <v-col cols="6">
              <v-card class="card-text">
                <v-card-text>
                  <h2>Empleados &#x1F4BC;</h2>
                  <p class="abstract">Descubre más sobre el talentoso equipo que forma parte de nuestra empresa.
                    Desde empleados dedicados a la formación hasta aquellos que buscan ampliar
                    sus habilidades, cada uno contribuye al éxito de nuestra organización.</p>
                  <v-btn to="/employee#header">
                    Ver más
                  </v-btn>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>

    <!-- Sección de cursos -->
    <v-container class="container" fluid>
      <v-row>
        <v-col cols="12">
          <v-row class="course-section section" align="center" justify="center">
            <v-col cols="6">
            </v-col>
            <v-col cols="6">
              <v-card class="card-text">
                <v-card-text>
                  <h2>Cursos &#x1F393;</h2> 	
                  <p class="abstract">Explora nuestra oferta de cursos internos diseñados para mejorar
                    las habilidades y conocimientos de tus empleados.
                    Desde cursos básicos hasta programas avanzados, ofrecemos una variedad
                    de opciones para el desarrollo profesional.</p>
                  <v-btn to="/course">Ver más</v-btn>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>

    <!-- Sección de ediciones -->
    <v-container class="container" fluid>
      <v-row>
        <v-col cols="12">
          <v-row class="edition-section section" align="center" justify="center">
            <v-col cols="6">
            </v-col>
            <v-col cols="6">
              <v-card class="card-text">
                <v-card-text>
                  <h2>Ediciones &#x1F4C6;</h2>
                  <p class="abstract">Conoce más sobre las distintas ediciones de nuestros cursos,
                    que se adaptan a diferentes ubicaciones, fechas y horarios.
                    Cada edición ofrece una experiencia única de aprendizaje
                    para garantizar la máxima flexibilidad y participación.</p>
                  <v-btn to="/edition">Ver más</v-btn>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>

  </v-app>
</template>

<script>

export default {
  name: 'HomeView',
  methods: {
    scrollToElement() {
      // Utiliza JavaScript para desplazarse hasta al elemento
      const element = document.getElementById('employee');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    },
  },
}
</script>

<style scoped>
/**
   */
.container {
  padding: 0.9rem 0rem !important;
  background-color: rgb(211, 211, 211);
}

.hero-section {
  background-image: url('../assets/hero_section.jpg');
}

.employee-section {
  background-image: url('../assets/employee_section.jpg');
}

.course-section {
  background-image: url('../assets/cursos_section.jpg');
}

.edition-section {
  background-image: url('../assets/edition_section.jpg');
}

.section {
  background-size: cover;
  background-position: center;
  height: 100vh;
  background-color: #e0e0e0;
}

.card-text {
  margin-right: 1rem !important;
}

.card-text:hover {
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.5);
}

.abstract {
  margin: 0.4rem 0rem;
}

@media(max-width:860px) {
  .section {
    background-size: 200%;
    height: 60vh;
  }

}
</style>
