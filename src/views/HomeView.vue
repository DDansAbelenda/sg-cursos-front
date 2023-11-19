<template>
  <v-app>
    <!-- Sección de héroe -->
    <v-container fluid>
      <v-row>
        <v-col cols="12">
          <!-- Contenido de la hero section -->
          <v-row class="hero-section section" align="center" justify="center">
            <v-col class="d-flex text-center justify-center" cols="6">
            </v-col>
            <v-col cols="6">
              <v-card>
                <v-card-text>
                  <h2>Título</h2>
                  <p>Bienvenido a nuestro sistema de gestión de formación de empleados.
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
    <v-container id="employee" fluid>
      <v-row>
        <v-col cols="12">
          <v-row class="employee-section section" align="center" justify="center">
            <v-col cols="6">
            </v-col>
            <v-col cols="6">
              <v-card>
                <v-card-text>
                  <h2>Empleados</h2>
                  <p>Descubre más sobre el talentoso equipo que forma parte de nuestra empresa.
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
    <v-container fluid>
      <v-row>
        <v-col cols="12">
          <v-row class="course-section section" align="center" justify="center">
            <v-col cols="6">
            </v-col>
            <v-col cols="6">
              <v-card>
                <v-card-text>
                  <h2>Cursos</h2>
                  <p>Explora nuestra oferta de cursos internos diseñados para mejorar
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
    <v-container fluid>
      <v-row>
        <v-col cols="12">
          <v-row class="edition-section section" align="center" justify="center">
            <v-col cols="6">
            </v-col>
            <v-col cols="6">
              <v-card>
                <v-card-text>
                  <h2>Ediciones</h2>
                  <p>Conoce más sobre las distintas ediciones de nuestros cursos,
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
      // Utiliza JavaScript para desplazarte al elemento
      const element = document.getElementById('employee');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    },
  },
}
</script>

<style scoped>
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
  height: 100vh;
  background-color: #e0e0e0;
}

/* Puedes cambiar el color de fondo según tu diseño */
</style>
