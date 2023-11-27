<template>
  <div class="principal">
    <v-container>
      <v-row column="3">
        <v-col md="6" sm="12">
          <div class="contact-info">
            <h4>Contactos:</h4>
            <p>Teléfono: +5358693986</p>
            <p>Email: aidacalvofleites@gmail.com</p>
            <p>Teléfono: +5354919237</p>
            <p>Email: ddansabelenda@gmail.com</p>
          </div>
        </v-col>

        <v-col md="6" sm="12">
          <div class="contact-info">
            <h4>Equipo de desarrollo</h4>
            <ul style="list-style-type: none;">
              <li>Aida Rosa Calvo Fleites</li>
              <li>Daniel Dans Abelenda</li>
              <li>Lester Enrique Perez Carballedo</li>
              <li>Mario Abel Ortega</li>
            </ul>
          </div>
        </v-col>
      </v-row>
    </v-container>
    <v-divider></v-divider>
    <v-container>
      <v-row>
        <v-col>
          <p class="text-center">© 2023 Sistema de Gestión de Cursos. Todos los derechos reservados.</p>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
};
</script>

<style scoped>
.contact-info {
  margin-bottom: 20px;
  color: #302f2f;
}

.principal {
  background-color: rgb(172, 172, 172);
  width: 100%;

}

p.text-center {
  color: #302f2f;
  /* Texto blanco */
}
</style>

  