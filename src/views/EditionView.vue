<template>
  <v-app>
    <LoadingPage :isLoading="loading" />
    <v-container>
      <v-row>
        <v-col>
          <!-- Tabla de ediciones -->
          <v-data-table :headers="headers" :items="editions" :items-per-page="20" class="elevation-1">
            <template v-slot:top>
              <!-- Barra de Herramientas que contieen el titulo y el boton agregar -->
              <v-toolbar flat>
                <v-toolbar-title>Ediciones</v-toolbar-title>
                <v-spacer></v-spacer>
                <!--Botón para agregar-->
                <v-btn prepend-icon="mdi-plus-circle" class="add-button" @click="openAddEdition()">
                  <template v-slot:prepend>
                    <v-icon color="green darken-1"></v-icon>
                  </template>
                  Agregar
                </v-btn>
                <!--Dialog que contiene el formulario-->
                <v-dialog v-model="dialog" max-width="40rem" persistent>
                  <!-- Formulario para agregar edición -->
                  <v-card>
                    <form @submit.prevent="selectAddOrUpdate">
                      <v-card-title>{{ dialogTitle }}</v-card-title>
                      <v-card-text>
                        <!-- Contenido del formulario -->
                        <v-text-field v-model="codeCourseField" label="Código de la edición" required></v-text-field>
                        <v-select v-model="selectedCourse" :items="coursesItems" label="Selecciona un curso"
                          required></v-select>
                        <v-select v-model="selectedProfessor" :items="professorItems" label="Selecciona un profesor"
                          required></v-select>
                        <v-select v-model="selectedStudents" :items="studentItems" label="Selecciona los estudiantes"
                          multiple required></v-select>
                        <v-text-field v-model="placefield" label="Lugar del curso" required></v-text-field>
                        <v-select v-model="selectedPeriod" :items="sessionPeriods" label="Selecciona un horario" required>
                        </v-select>
                        <v-date-picker v-model="selectedDate" title="Fecha de Inicio" label="Fecha de Inicio"
                          required></v-date-picker>
                      </v-card-text>
                      <v-card-actions>
                        <v-btn type="submit">Guardar</v-btn>
                        <v-btn @click="cerrarFormulario">Cancelar</v-btn>
                      </v-card-actions>
                    </form>
                  </v-card>
                </v-dialog>
                <!-- Fin del Dialog -->
              </v-toolbar>
            </template>

            <!-- Agregamos la columna de acciones -->
            <template v-slot:item.actions="{ item }">
              <v-btn class="edit" icon @click="openUpdateEdition(item)" flat>
                <v-icon color="blue darken-1">mdi-pencil</v-icon>
              </v-btn>
              <v-btn class="delete" icon @click="deleteEdition(item)" flat>
                <v-icon color="red darken-1">mdi-delete</v-icon>
              </v-btn>
              <v-btn class="info" icon @click="openDialogDetail(item)" flat>
                <v-icon color="yellow darken-1">mdi-information-variant-circle-outline</v-icon>
              </v-btn>
            </template>

            <!-- Fin de la columna de acciones -->
          </v-data-table>
        </v-col>
      </v-row>
      <!--Mensaje que notifica la acción-->
      <v-snackbar v-model="snackbar" :timeout="timeout" :color="color" top>
        {{ message }}
      </v-snackbar>

      <EditionDetail :edition="edition" ref="detail_dialog" />

    </v-container>
    <!--Fin del contenedor principal-->
  </v-app>
</template>

<script>
import moment from 'moment';
import LoadingPage from '../components/LoadingPage.vue'
import EditionDetail from '@/components/EditionDetail.vue';
import { useAuthStore } from '@/store/auth';
import { confirmation } from '@/function';

export default {
  name: 'EditionView',
  components: {
    LoadingPage,
    EditionDetail,
  },
  data() {
    return {
      //Controlar el loading
      loading: false,
      //Notificacion
      snackbar: false,
      message: '',
      color: '',
      timeout: 2000,
      //Variable del dialog
      dialog: false,
      dialogTitle: '',
      //Datos del formulario   
      codeCourseField: null,
      placefield: null,
      selectedCourse: null,
      courses: [],
      selectedProfessor: null,
      professor: [],
      selectedPeriod: null,
      sessionPeriods: ['Tiempo Completo', 'Mañana', 'Tarde'],
      selectedDate: new Date(),
      //Estudiantes de la edición
      students: [],
      selectedStudents: [],
      editions: [],
      //Datos de las tablas
      headers: [
        { title: 'Código', key: 'code_id' },
        { title: 'Curso', value: 'course.name' },
        { title: 'Profesor', value: 'employee.name' },
        { title: 'Lugar', value: 'place' },
        { title: 'Sesión', value: 'session_period' },
        { title: 'Fecha Inicio', value: 'date' },
        { title: 'Acciones', value: 'actions', sortable: false },
      ],
      //Controlando si está agregando o modificando
      isAdd: true,
      //Edición, variable necesaria cuando se va a modificar y eliminar
      edition: null,
    };
  },
  methods: {
    /*Este método lo activa el submit del formulario, es decir, cuando se da en guardar;
    lo que se hace es decidir si se está agregando o modificando el objeto teniendo en cuenta
    que se utiliza el mismo dialog para agregar y modificar   
    */
    selectAddOrUpdate() {
      if (this.isAdd) {
        this.addEdition();
      } else {
        this.updateEdition();
      }
    },

    //Abrir el dialog del formulario en modo agregar
    openAddEdition() {
      //Modificar la variable isAdd para que se sepa que está agregando
      this.isAdd = true;
      this.dialog = true;
      this.dialogTitle = "Agregando Edición";
      this.selectedStudents = new Array();
    },

    //Abrir el dialog del formulario en modo actualizar
    openUpdateEdition(edition) {
      try {
        //Modificar la variable isAdd para que se sepa que está modificando
        this.isAdd = false;
        //Darle valor a los campos
        this.codeCourseField = edition.code_id;
        this.selectedProfessor = edition.employee.id;
        this.selectedCourse = edition.course.id;
        //Poner los estudiantes de esa edition seleccionados
        this.selectedStudents = new Array(); //limpiar la lista
        for (let student of edition.students) {
          this.selectedStudents.push(student.id);
        }
        this.placefield = edition.place;
        this.selectedPeriod = edition.session_period;
        // Parse and format the date using moment.js, esto es necesario porque date-picker solo
        // entiende el tipo Date() de js
        this.selectedDate = moment(edition.date, 'DD/MM/YYYY').toDate();
        this.edition = edition;
        //Activar el dialog
        this.dialog = true;
        this.dialogTitle = "Modificando Edición";
      } catch (error) {
        console.error("Error al cargar el dialog", error)
      }
    },
    //Cerrar el formulario de agregar y modificar
    cerrarFormulario() {
      //Datos del formulario
      this.codeCourseField = null;
      this.selectedCourse = null;
      this.selectedProfessor = null;
      this.placefield = null;
      this.selectedPeriod = null;
      this.selectedDate = new Date();
      //Dialog
      this.dialog = false;
    },

    //Creando un edición
    async addEdition() {
      try {
        let editionJson = {
          code_id: this.codeCourseField,
          course_id: this.selectedCourse,
          employee_id: this.selectedProfessor,
          place: this.placefield,
          session_period: this.selectedPeriod,
          date: this.selectedDate,
          students: this.selectedStudents
        }
        const response = await this.$axios.post('/api/edition', editionJson); // El segundo parámetro es un JSON que es el request
        this.editions.push(response.data.edition);
        this.cerrarFormulario();
        //preparar mensaje
        this.message = response.data.message;
        this.color = 'success';
        this.snackbar = true;
      } catch (error) {
        console.error('Error al agregar edición:', error);
        if (error.response && error.response.status == 422) {
          const validationErrors = error.response.data.errors;
          //preparar mensaje
          this.message = validationErrors;
          this.color = 'error';
          this.snackbar = true;
        }
      }
    },

    //Actualizando un edición
    async updateEdition() {
      try {
        let editionJson = {
          code_id: this.codeCourseField,
          course_id: this.selectedCourse,
          employee_id: this.selectedProfessor,
          place: this.placefield,
          session_period: this.selectedPeriod,
          date: this.selectedDate,
          students: this.selectedStudents
        }
        console.log(this.dateFormat(this.selectedDate));
        const response = await this.$axios.put(`/api/edition/${this.edition.id}`, editionJson);
        //Poner el elemento devuelto en la lista desde el server en la lista
        let edition_response = response.data.edition;
        let editionIndex = this.editions.findIndex(e => e.id == edition_response.id);
        this.editions[editionIndex] = edition_response;
        //Cerrar el formulario
        this.cerrarFormulario();
        //preparar mensaje
        this.message = response.data.message;
        this.color = 'success';
        this.snackbar = true;
      } catch (error) {
        console.error('Error al modificar la edición:', error);
        if (error.response && error.response.status == 422) {
          const validationErrors = error.response.data.errors;
          //preparar mensaje
          this.message = validationErrors;
          this.color = 'error';
          this.snackbar = true;
        }
      }
    },

    //Eliminando un edición
    async deleteEdition(edition) {
      let message = `la edición ${edition.code_id} del curso ${edition.course.name}`;
      confirmation(message, `/api/edition/${edition.id}`, '/edition');
    },

    //Abrir el diaglo de detalles
    openDialogDetail(edition) {
      //Se llama a las referencias del componente y se activa sus metodos
      this.$refs.detail_dialog.abrir();
      this.edition = edition;
    },

    //Formatear la fecha enviada al server
    dateFormat(date) {
      const formattedDate = date.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: '2-digit', // Cambiado a '2-digit' para obtener el mes como dos dígitos
        year: 'numeric'
      }).split('/').join('-');
      return formattedDate;
    },
    //Activar y desactiva el loading
    toggleLoading() {
      this.loading = !this.loading;
    },
    //Cargando todos los ediciones
    async fetchData() {
      this.toggleLoading();
      try {
        //Cargar las ediciones
        const response_editions = await this.$axios.get('/api/edition');
        this.editions = response_editions.data;
        //Cargar los cursos
        const response_courses = await this.$axios.get('/api/course');
        this.courses = response_courses.data;
        //Cargar los trabajadores para llenar la lista de estudiantes a elegir
        const response_students = await this.$axios.get('/api/employee');
        this.students = response_students.data;
        //Cargar los trabajadores que son posibles profesores
        const response_professor = await this.$axios.get('/api/professor');
        this.professor = response_professor.data;

      } catch (error) {
        console.error('Error al obtener ediciones:', error);
      } finally {
        this.toggleLoading();
      }
    }
  },
  //Todo lo definido en esta región son propiedades reactivas que cambian su valor de forma dinámica
  computed: {
    //función que devuelve la estructura del del select de profesores
    professorItems() {
      return this.professor.map(p => ({
        title: p.name, //valor que se muestra
        value: p.id //valor que se guarda en la variable del v-model
      }))
    },
    //función que devuelve la estructura del del select de cursos
    coursesItems() {
      return this.courses.map(c => ({
        title: c.name, //valor que se muestra
        value: c.id //valor que se guarda en la variable del v-model
      }))
    },
    //función que devuelve la estructura del del select de cursos
    studentItems() {
      return this.students.map(s => ({
        title: s.name, //valor que se muestra
        value: s.id //valor que se guarda en la variable del v-model
      }))
    }
  },
  mounted() {
    const authStore = useAuthStore();
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + authStore.authToken;
    this.fetchData();
  },
};
</script>
<style>
.delete {
  width: 2rem;
  height: 2rem;
}

.edit {
  width: 2rem;
  height: 2rem;
}

.add-button {
  font-size: 1.2rem;
}

.dialog-bottom-transition-enter-active,
.dialog-bottom-transition-leave-active {
  transition: transform .2s ease-in-out;
}
</style>
