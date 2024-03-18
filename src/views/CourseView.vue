<template>
    <v-app>
        <LoadingPage :isLoading="loading" />
        <v-container>
            <v-row>
                <v-col>
                    <!-- Tabla de cursos -->
                    <v-data-table :headers="headers" :items="courses" :items-per-page="20" class="elevation-1">
                        <template v-slot:top>
                            <v-toolbar flat>
                                <v-toolbar-title>Cursos</v-toolbar-title>
                                <v-spacer></v-spacer>
                                <!--Botón para agregar-->
                                <v-btn prepend-icon="mdi-plus-circle" class="add-button" @click="openAddCourse()">
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
                                                <v-text-field v-model="descriptionField" label="Descripción"
                                                    required></v-text-field>
                                                <v-text-field v-model="numerHoursField" label="Número de horas"
                                                    required></v-text-field>
                                                <v-text-field v-model="costField" label="Costo" required></v-text-field>
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
                            <v-btn class="edit" icon @click="openUpdateCourse(item)" flat>
                                <v-icon color="blue darken-1">mdi-pencil</v-icon>
                            </v-btn>
                            <v-btn class="delete" icon @click="deleteCourse(item)" flat>
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
import LoadingPage from '../components/LoadingPage.vue'
import { useAuthStore } from '@/store/auth';
import { confirmation } from '@/function';

export default {
    name: 'CourseView',
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
            timeout: 2000,
            //Variable del dialog
            dialog: false,
            dialogTitle: '',
            //Datos del formulario   
            nameField: null,
            descriptionField: null,
            numerHoursField: null,
            costField: null,
            //Datos de las tablas
            courses: [],
            headers: [
                { title: 'Nombre', key: 'name' },
                { title: 'Descripción', value: 'description' },
                { title: 'Número de horas', value: 'number_hours' },
                { title: 'Costo', value: 'cost' },
                { title: 'Acciones', value: 'actions', sortable: false },
            ],
            //Controlando si está agregando o modificando
            isAdd: true,
            //course, variable necesaria cuando se va a modificar y eliminar
            course: null,
        };
    },
    methods: {

        /*Este método lo activa el submit del formulario, es decir, cuando se da en guardar;
        lo que se hace es decidir si se está agregando o modificando el objeto teniendo en cuenta
        que se utiliza el mismo dialog para agregar y modificar   
        */
        selectAddOrUpdate() {
            if (this.isAdd) {
                this.addCourse();
            } else {
                this.updateCourse();
            }
        },
        openAddCourse() {
            //Modificar la variable isAdd para que se sepa que está agregando
            this.isAdd = true;
            this.dialog = true;
            this.dialogTitle = "Agregando Curso";
        },
        async openUpdateCourse(course) {
            try {
                //Modificar la variable isAdd para que se sepa que está modificando
                this.isAdd = false;
                //Darle valor a los campos
                this.nameField = course.name;
                this.descriptionField = course.description;
                this.numerHoursField = course.number_hours;
                this.costField = course.cost;
                this.course = course;
                //Activar el dialog
                this.dialog = true;
                this.dialogTitle = "Modificando Curso";
            } catch (error) {
                console.error("Error al cargar el dialog", error)
            }

        },
        cerrarFormulario() {
            //Datos del formulario
            this.nameField = null;
            this.descriptionField = null;
            this.numerHoursField = null;
            this.costField = null;
            //Dialog
            this.dialog = false;
        },

        //Creando un curso
        async addCourse() {
            try {
                let course = {
                    name: this.nameField,
                    description: this.descriptionField,
                    number_hours: this.numerHoursField,
                    cost: this.costField,
                }
                const response = await this.$axios.post('/api/course', course); // El segundo parámetro es un JSON que es el request
                this.courses.push(response.data.course);
                this.cerrarFormulario();
                //preparar mensaje
                this.message = response.data.message;
                this.color = 'success';
                this.snackbar = true;
            } catch (error) {
                console.error('Error al agregar curso:', error);
                if (error.response && error.response.status == 422) {
                    const validationErrors = error.response.data.errors;
                    //preparar mensaje
                    this.message = validationErrors;
                    this.color = 'error';
                    this.snackbar = true;
                }
            }
        },

        //Actualizando un curso
        async updateCourse() {
            try {
                let course_json = {
                    name: this.nameField,
                    description: this.descriptionField,
                    number_hours: this.numerHoursField,
                    cost: this.costField,
                }
                const response = await this.$axios.put(`/api/course/${this.course.id}`, course_json);
                //Poner el elemento devuelto en la lista desde el server en la lista
                let course_response = response.data.course;
                let courseIndex = this.courses.findIndex(e => e.id == course_response.id);
                this.courses[courseIndex] = course_response;
                this.cerrarFormulario();
                //preparar mensaje
                this.message = response.data.message;
                this.color = 'success';
                this.snackbar = true;
            } catch (error) {
                console.error('Error al modificar la curso:', error);
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
        async deleteCourse(course) {
            confirmation(course.name, `/api/course/${course.id}`, '/course');
        },

        //Activar y desactiva el loading
        toggleLoading() {
            this.loading = !this.loading;
        },
        //Cargando todos los empleados
        async fetchData() {
            this.toggleLoading();
            try {
                const response = await this.$axios.get('/api/course');
                this.courses = response.data;
            } catch (error) {
                console.error('Error al obtener cursos:', error);
            } finally {
                this.toggleLoading();
            }
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
