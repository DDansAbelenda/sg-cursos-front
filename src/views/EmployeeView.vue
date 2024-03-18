<template>
  <v-app>
    <LoadingPage :isLoading="loading" />
    <v-container>
      <div id="header"></div>
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
                        <v-select v-model="selectedSex" :items="sexo" label="Selecciona el Sexo"></v-select>
                        <v-checkbox :disabled="isProfessor" v-model="isQualified"
                          label="¿Está calificado para dar clases?" @click="toggleCheckbox"></v-checkbox>
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
              <v-btn class="info" icon @click="openDialogDetail(item)" flat>
                <v-icon color="yellow darken-1">mdi-information-variant-circle-outline</v-icon>
              </v-btn>
            </template>


            <!-- Definimos estructura de los valores de ¿Está calificado? -->
            <template v-slot:item.is_qualified="{ item }">
              <div class="text-end">
                <v-chip :color="item.is_qualified ? 'green' : 'red'" :text="item.is_qualified ? 'Sí' : 'No'"
                  class="text-uppercase" label size="small"></v-chip>
              </div>
            </template>
          </v-data-table>
        </v-col>
      </v-row>
      <EmployeeDetail :employee="employee" ref="detail_dialog" />
    </v-container>
  </v-app>
</template>

<script>
import moment from 'moment';
import LoadingPage from '../components/LoadingPage.vue'
import EmployeeDetail from '../components/EmployeeDetail.vue'
import axios from 'axios';
import { useAuthStore } from '@/store/auth';
import { confirmation, show_alert } from '@/function';

export default {
  name: 'EmployeeView',
  components: {
    LoadingPage,
    EmployeeDetail,
  },
  data() {
    return {
      //Controlar el loading
      loading: false,
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
      employees: [],
      headers: [
        { title: 'Nombre', key: 'name' },
        { title: 'Apellidos', value: 'last_names' },
        { title: 'NIF', value: 'nif' },
        { title: 'Nacionalidad', value: 'nationality' },
        { title: 'Salario', value: 'salary' },
        { title: '¿Está calificado?', value: 'is_qualified' },
        { title: 'Fecha Nacimiento', value: 'date_birth' },
        { title: 'Acciones', value: 'actions', sortable: false },
      ],
      //Controlando si está agregando o modificando
      isAdd: true,
      //Variable necesaria para controlar si el checbox se habilita o no
      isProfessor: false,
      //Empleado, variable necesaria cuando se va a modificar y eliminar
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
      this.isProfessor = false;
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
        this.selectedSex = employee.sex;
        this.isQualified = employee.is_qualified;
        // Parse and format the date using moment.js, esto es necesario porque date-picker solo
        // entiende el tipo Date() de js
        this.dateSelected = moment(employee.date_birth, 'DD/MM/YYYY').toDate();
        //Consultar si es professor en alguna edición
        const response = await this.$axios.get(`/api/isprofessor/${employee.id}`);
        this.isProfessor = response.data.isProfessor;
        this.employee = employee;
        //Activar el dialog
        this.dialog = true;
        this.dialogTitle = "Modificando Empleado";
      } catch (error) {
        console.error("Error al cargar el dialog", error)
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

    //Abrir el diaglo de detalles
    async openDialogDetail(employee) {
      //Se llama a las referencias del componente y se activa sus metodos
      try {
        const response = await this.$axios.get(`/api/employeeall/${employee.id}`);
        let employee_all = {
          'info': employee,
          'study_in': response.data.study_in,
          'teach_in': response.data.teach_in,
        };
        console.log(response.data.study_in);
        this.employee = employee_all;
        this.$refs.detail_dialog.abrir();
      } catch (error) {
        console.error(error.response.data);
      }
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
          sex: this.selectedSex,
          is_qualified: this.isQualified,
          date_birth: this.dateSelected,
        }
        const response = await this.$axios.post('/api/employee', employee); // El segundo parámetro es un JSON que es el request
        this.employees.push(response.data.employee);
        this.cerrarFormulario();
        //Enviar mensaje
        show_alert(response.data.message, 'success', '');
      } catch (error) {
        console.error('Error al agregar empleado:', error);
        if (error.response && error.response.status == 422) {
          const validationErrors = error.response.data.errors;
          this.dialog = false;
          const swal = show_alert(validationErrors, 'error', '');
          //Auto confirmar en 2 segundos y volver abrir el dialog
          const timeoutID = setTimeout(() => {
            swal.clickConfirm();
            this.dialog = true;
          }, 2000);
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
          sex: this.selectedSex,
          is_qualified: this.isQualified,
          date_birth: this.dateSelected,
        }
        const response = await this.$axios.put(`/api/employee/${this.employee.id}`, employee_json);
        //Poner el elemento devuelto en la lista desde el server en la lista
        let employee_response = response.data.employee;
        let employeeIndex = this.employees.findIndex(e => e.id == employee_response.id);
        this.employees[employeeIndex] = employee_response;
        //Cerrar el formulario    
        this.cerrarFormulario();
        //preparar mensaje
        show_alert(response.data.message, 'success', '');
      } catch (error) {
        console.error('Error al modificar la empleado:', error);
        if (error.response && error.response.status == 422) {
          const validationErrors = error.response.data.errors;
          this.dialog = false;
          const swal = show_alert(validationErrors, 'error', '');
          //Auto confirmar en 2 segundos y volver abrir el dialog
          const timeoutID = setTimeout(() => {
            swal.clickConfirm();
            this.dialog = true;
          }, 2000);
        }
      }
    },

    //Eliminando un empleado
    async deleteEmployee(employee) {
      confirmation(employee.name, `/api/employee/${employee.id}`, '/employee');
    },

    //Controlar que el checkbox se seleccione por problemas con el v-model
    toggleCheckbox() {
      this.isQualified = !this.isQualified;
    },

    //Activar y desactiva el loading
    toggleLoading() {
      this.loading = !this.loading;
    },

    //Cargando todos los empleados
    fetchData() {
      this.toggleLoading();
      async function fetchEmployeeData(url) {
        const response = axios.get(url);
        return response;
      }
      fetchEmployeeData('/api/employee').then(
        (response) => {
          this.employees = response.data;
          this.toggleLoading();
        },
        (error) => {
          console.error('Error al obtener empleados:', error);
          this.toggleLoading();
        }
      );
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
</style>
