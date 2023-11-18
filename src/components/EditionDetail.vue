<template>
    <!--Dialog Detail-->
    <v-dialog v-model="dialog" fullscreen :scrim="false" transition="dialog-bottom-transition">
        <v-card>
            <v-toolbar dark>
                <v-toolbar-title>{{ 'Edición ' + edition.code_id + ' del curso "' + edition.course.name + '"' }}</v-toolbar-title>
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
                            <v-list-item title="Código" :subtitle="edition.code_id">
                            </v-list-item>
                            <v-list-item title="Curso" :subtitle="edition.course.name">
                            </v-list-item>
                            <v-list-item title="Profesor" :subtitle="edition.employee.name">
                            </v-list-item>
                            <v-list-item title="Lugar" :subtitle="edition.place">
                            </v-list-item>
                            <v-list-item title="Sesión" :subtitle="edition.session_period">
                            </v-list-item>
                            <v-list-item title="Fecha inicio" :subtitle="edition.date">
                            </v-list-item>
                        </v-list>
                    </v-col>
                    <v-col>
                        <v-list lines="two" subheader>
                            <v-list-subheader>LISTADO DE ESTUDIANTES</v-list-subheader>
                            <li v-for="student in edition.students" :key="edition.id">
                                {{ student.name + ' ' + student.last_names }}
                            </li>
                        </v-list>
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
        edition: Object
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
  