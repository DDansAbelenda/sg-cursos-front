<template>
    <!--Dialog Detail-->
    <v-dialog v-model="dialog" fullscreen :scrim="false" transition="dialog-bottom-transition">
        <v-card>
            <v-toolbar dark>
                <v-toolbar-title>{{ employee.info.sex == 'Masculino' ? 'Empleado ' + employee.info.name :'Empleada ' + employee.info.name }}</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-toolbar-items>
                    <v-btn icon dark @click="cerrar">
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                </v-toolbar-items>
            </v-toolbar>
            <v-container>
                <v-row>
                    <v-col>
                        <v-list lines="two" subheader>
                            <v-list-subheader>DATOS GENERALES</v-list-subheader>
                            <v-list-item title="Nombre" :subtitle="employee.info.name">
                            </v-list-item>
                            <v-list-item title="Apellidos" :subtitle="employee.info.last_names">
                            </v-list-item>
                            <v-list-item title="Dirección" :subtitle="employee.info.address">
                            </v-list-item>
                            <v-list-item title="Teléfono" :subtitle="employee.info.phone">
                            </v-list-item>
                        </v-list>
                    </v-col>
                    <v-col>
                        <v-list lines="two" subheader>
                            <v-list-item title="NIF" :subtitle="employee.info.nif">
                            </v-list-item>
                            <v-list-item title="Fecha de Nacimiento" :subtitle="employee.info.date_birth">
                            </v-list-item>
                            <v-list-item title="Nacionalidad" :subtitle="employee.info.nationality">
                            </v-list-item>
                            <v-list-item title="Salario" :subtitle="employee.info.salary">
                            </v-list-item>
                            <v-list-item title="Sexo" :subtitle="employee.info.sex">
                            </v-list-item>
                            <v-list-item title="¿Está calificado par dar clases?"
                                :subtitle="employee.info.is_qualified ? 'Sí' : 'No'">
                            </v-list-item>
                        </v-list>
                    </v-col>
                    <v-col>
                        <v-row>
                            <v-list lines="two" subheader>
                                <v-list-subheader>LISTADO DE CURSOS DONDE RECIBE CLASES</v-list-subheader>
                                <li v-for="course in employee.study_in" :key="course.id">
                                    {{ course.name }}
                                </li>
                            </v-list>
                        </v-row>
                        <v-row>
                            <v-list lines="two" subheader>
                                <v-list-subheader>LISTADO DE CURSOS DONDE IMPARTE CLASES</v-list-subheader>
                                <li v-for="course in employee.teach_in" :key="course.id">
                                    {{ course.name }}
                                </li>
                            </v-list>
                        </v-row>
                    </v-col>

                </v-row>
            </v-container>
        </v-card>
    </v-dialog>
</template>
  
<script>

export default {
    name: 'EditionDetail',
    props: {
        employee: Object
    },
    data() {
        return {
            dialog: false,
            notifications: false,
            sound: true,
            widgets: false,
        };
    },
    methods: {
        cerrar() {
            this.dialog = false;
        },
        abrir() {
            this.dialog = true;
        }
    }
}
</script>
<style scoped>
li {
    list-style-type: none;
    padding: 0;
    margin-bottom: 8px;
    padding-left: 20px;
    position: relative;
    /* Cambia la fuente según tus preferencias */
}

li:before {
    content: '\2022';
    /* Código Unicode para el caracter de viñeta (punto) */
    color: #2477cf;
    /* Color de la viñeta */
    font-weight: bold;
    /* Opcional: Hace que la viñeta sea más visible */
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
}
</style>
  