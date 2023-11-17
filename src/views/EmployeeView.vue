<template>
  <v-app>
    <LoadingPage :isLoading="loading" />
    <v-container>
      <v-row>
        <v-col>
          <!-- Tabla de empleados -->
          <v-data-table :headers="headers" :items="employees" :items-per-page="20" class="elevation-1">
            <template v-slot:top>
              <v-toolbar flat>
                <v-toolbar-title>Empleados</v-toolbar-title>
                <v-spacer></v-spacer>
                <!--Botón para agregar-->
                <v-btn prepend-icon="mdi-plus-circle" class="add-button" @click="openAddEmployee()">
                  <template v-slot:prepend>
                    <v-icon color="green darken-1"></v-icon>
                  </template>
                  Agregar
                </v-btn>
                <!--Dialog que contiene el formulario-->
                <v-dialog v-model="dialog" max-width="40rem" persistent>
                  <!-- Formulario para agregar empleado -->
                  <v-card>
                    <form @submit.prevent="selectAddOrUpdate">
                      <v-card-title>{{ dialogTitle }}</v-card-title>
                      <v-card-text>
                        <!-- Contenido del formulario -->
                        <v-text-field v-model="nameField" label="Nombre" required></v-text-field>
                        <v-text-field v-model="lastNameField" label="Apellidos" required></v-text-field>
                        <v-text-field v-model="addressField" label="Dirección" required></v-text-field>
                        <v-text-field v-model="phoneField" label="Teléfono" required></v-text-field>
                        <v-text-field v-model="nifField" label="NIF" required></v-text-field>
                        <v-text-field v-model="nationalityField" label="Nacionalidad" required></v-text-field>
                        <v-text-field v-model="salaryField" label="Salario" required></v-text-field>
                        <v-select v-model="selectedSex" :items="sexo" label="Selecciona una opción"></v-select>
                        <v-checkbox :disabled="isProfesor" v-model="isQualified" label="¿Está calificado para dar clases?"
                          @click="toggleCheckbox"></v-checkbox>
                        <v-date-picker v-model="dateSelected" title="Fecha de Nacimiento" label="Fecha de Nacimiento"
                          required></v-date-picker>
                        <!-- Agrega otros campos según la estructura de tu migración -->
                      </v-card-text>
                      <v-card-actions>
                        <v-btn type="submit">Guardar</v-btn>
                        <v-btn @click="cerrarFormulario">Cancelar</v-btn>
                      </v-card-actions>
                    </form>
                  </v-card>
                </v-dialog>
              </v-toolbar>
            </template>
            <!-- Agregamos la columna de acciones -->
            <template v-slot:item.actions="{ item }">
              <v-btn class="edit" icon @click="openUpdateEmployee(item)" flat>
                <v-icon color="blue darken-1">mdi-pencil</v-icon>
              </v-btn>
              <v-btn class="delete" icon @click="deleteEmployee(item)" flat>
                <v-icon color="red darken-1">mdi-delete</v-icon>
              </v-btn>
            </template>
          </v-data-table>
        </v-col>
      </v-row>
      <v-snackbar v-model="snackbar" :timeout="timeout" :color="color" top>
        {{ message }}
      </v-snackbar>
    </v-container>
  </v-app>
</template>

<script>
import moment from 'moment';
import LoadingPage from '../components/LoadingPage.vue'

export default {
  name: 'EmployeeView',
  components: {
    LoadingPage,
  },
  data() {
    return {
      //Controlar el loading
      loading: false,
      //Notificacion
      snackbar: false,
      message: '',
      color: '',
      timeout: 3000,
      //Variable del dialog
      dialog: false,
      dialogTitle: '',
      //Datos del formulario   
      nameField: null,
      lastNameField: null,
      addressField: null,
      phoneField: null,
      nifField: null,
      nationalityField: null,
      salaryField: null,
      selectedSex: null,
      isQualified: false,
      dateSelected: new Date(),
      sexo: ['Masculino', 'Femenino'],
      //Datos de las tablas
      employees: [], // Aquí deberías cargar los datos de tus empleados desde Laravel
      headers: [
        { title: 'Nombre', key: 'name' },
        { title: 'Apellidos', value: 'last_names' },
        { title: 'Dirección', value: 'address' },
        { title: 'Teléfono', value: 'phone' },
        { title: 'NIF', value: 'nif' },
        { title: 'Nacionalidad', value: 'nationality' },
        { title: 'Salario', value: 'salary' },
        { title: 'Sexo', value: 'sex' },
        { title: '¿Está calificado?', value: 'is_qualified' },
        { title: 'Fecha Nacimiento', value: 'date_birth' },
        { title: 'Acciones', value: 'actions', sortable: false },
      ],
      //Controlando si está agregando o modificando
      isAdd: true,
      //Variable necesaria para controlar si el checbox se habilita o no
      isProfesor: false,
      //Empleado, variable necesaria cuando se va a modificar
      employee: null,
    };
  },
  methods: {

    /*Este método lo activa el submit del formulario, es decir, cuando se da en guardar;
    lo que se hace es decidir si se está agregando o modificando el objeto teniendo en cuenta
    que se utiliza el mismo dialog para agregar y modificar   
    */
    selectAddOrUpdate() {
      if (this.isAdd) {
        this.addEmployee();
      } else {
        this.updateEmployee();
      }
    },
    openAddEmployee() {
      //Modificar la variable isAdd para que se sepa que está agregando
      this.isAdd = true;
      this.dialog = true;
      this.dialogTitle = "Agregando Empleado";
      //Habilitar checkbox
      this.isProfesor = true;
    },
    async openUpdateEmployee(employee) {
      try {
        //Modificar la variable isAdd para que se sepa que está modificando
        this.isAdd = false;
        //Darle valor a los campos
        this.nameField = employee.name;
        this.lastNameField = employee.last_names;
        this.addressField = employee.address;
        this.phoneField = employee.phone;
        this.nifField = employee.nif;
        this.nationalityField = employee.nationality;
        this.salaryField = employee.salary;
        this.selectedSex = this.selectedSex == 'M' ? 'Masculino' : 'Femenino';
        this.isQualified = employee.is_qualified;
        // Parse and format the date using moment.js, esto es necesario porque date-picker solo
        // entiende el tipo Date() de js
        this.dateSelected = moment(employee.date_birth, 'DD/MM/YYYY').toDate();
        //Consultar si es profesor en alguna edición
        const response = await this.$axios.get(`/isprofesor/${employee.id}`);
        this.isProfesor = response.data.isProfesor;
        this.employee = employee;
        //Activar el dialog
        this.dialog = true;
        this.dialogTitle = "Modificando Empleado";
      } catch (error) {
        console.error("Error al cargar el dialog", error.response.data)
      }

    },
    cerrarFormulario() {
      //Datos del formulario
      this.nameField = null;
      this.lastNameField = null;
      this.addressField = null;
      this.phoneField = null;
      this.nifField = null;
      this.nationalityField = null;
      this.salaryField = null;
      this.selectedSex = null;
      this.isQualified = false,
        this.dateSelected = new Date(),
        //Dialog
        this.dialog = false;
    },

    //Creando un empleado
    async addEmployee() {
      try {
        let employee = {
          name: this.nameField,
          last_names: this.lastNameField,
          address: this.addressField,
          phone: this.phoneField,
          nif: this.nifField,
          nationality: this.nationalityField,
          salary: this.salaryField,
          sex: this.selectedSex == 'Masculino' ? 'M' : 'F',
          is_qualified: this.isQualified,
          date_birth: this.dateFormat(this.dateSelected),
        }
        const response = await this.$axios.post('/employee', employee); // El segundo parámetro es un JSON que es el request
        this.employees.push(response.data.employee);
        this.cerrarFormulario();
        //preparar mensaje
        this.message = response.data.message;
        this.color = 'success';
        this.snackbar = true;
      } catch (error) {
        console.error('Error al agregar tarea:', error.response.data);
        if (error.response && error.response.status == 422) {
          const validationErrors = error.response.data.errors;
          //preparar mensaje
          this.message = validationErrors;
          this.color = 'error';
          this.snackbar = true;
        }
      }
    },

    //Actualizando un empleado
    async updateEmployee() {
      try {
        let employee_json = {
          name: this.nameField,
          last_names: this.lastNameField,
          address: this.addressField,
          phone: this.phoneField,
          nif: this.nifField,
          nationality: this.nationalityField,
          salary: this.salaryField,
          sex: this.selectedSex == 'Masculino' ? 'M' : 'F',
          is_qualified: this.isQualified,
          date_birth: this.dateFormat(this.dateSelected),
        }
        const response = await this.$axios.put(`/employee/${this.employee.id}`, employee_json);
        this.cerrarFormulario();
        //preparar mensaje
        this.message = response.data.message;
        this.color = 'success';
        this.snackbar = true;
        //Recargar visual
        this.fetchData();
      } catch (error) {
        console.error('Error al modificar la tarea:', error.response.data);
        if (error.response && error.response.status == 422) {
          const validationErrors = error.response.data.errors;
          //preparar mensaje
          this.message = validationErrors;
          this.color = 'error';
          this.snackbar = true;
        }
      }
    },

    //Eliminando un empleado
    async deleteEmployee(employee) {
      try {
        console.log(employee);
        const response = await this.$axios.delete(`/employee/${employee.id}`);
        this.employees = this.employees.filter(e => e.id !== employee.id); // esto elimina la tarea eliminada de la lista
        //preparar mensaje
        this.message = response.data.message;
        this.color = 'success';
        this.snackbar = true;
      } catch (error) {
        console.error('Error al eliminar tarea:', error.response.data);
        if (error.response && error.response.status == 422) {
          const validationErrors = error.response.data.errors;
          //preparar mensaje
          this.message = validationErrors;
          this.color = 'error';
          this.snackbar = true;
        }
      }
    },

    //Controlar que el checkbox se seleccione por problemas con el v-model
    toggleCheckbox() {
      this.isQualified = !this.isQualified;
    },

    //Formatear una fecha
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
    //Cargando todos los empleados
    async fetchData() {
      this.toggleLoading();
      try {
        const response = await this.$axios.get('/employee');
        this.employees = response.data;
      } catch (error) {
        console.error('Error al obtener tareas:', error.response.data);
      } finally {
        this.toggleLoading();
      }
    }
  },
  mounted() {
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
</style>
