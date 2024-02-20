<template>
    <v-container>
        <v-row>
            <v-col cols="12">
                <h1 class="display-2 text-center">About Us</h1>
                <v-card>
                    <v-card-text>¡Bienvenido a nuestro proyecto de gestión de formación de empleados! Este innovador sistema
                        fue desarrollado por un equipo apasionado de estudiantes de la Universidad Central "Marta Abreu" de
                        Las Villas (UCLV) como parte de la orientación de la asignatura de Programación Web. Con dedicación
                        y entusiasmo, hemos creado una solución integral para satisfacer las necesidades de planificación y
                        gestión de la formación en el ámbito empresarial.</v-card-text>
                </v-card>
            </v-col>
        </v-row>

        <v-row>
            <v-col>
                <h2 class="headline text-center mt-5">Equipo de Trabajo</h2>
                <v-divider class="mx-auto" width="50%"></v-divider>
            </v-col>
        </v-row>
        <v-row>
            <v-col v-for="member in teamMembers" :key="member.name" cols="12">
                <v-card>
                    <v-card-title class="headline">{{ member.name }}</v-card-title>
                    <v-card-subtitle>{{ member.role }}</v-card-subtitle>
                    <v-card-text>{{ member.description }}</v-card-text>
                </v-card>
            </v-col>
        </v-row>

        <v-row>
            <v-col cols="12">
                <h2 class="headline text-center mt-5">Nuestra Historia</h2>
                <v-divider class="mx-auto" width="50%"></v-divider>
                <v-card>
                    <v-card-text>
                        Este proyecto nació como parte de nuestra formación académica en la UCLV. Guiados por la pasión por
                        la programación web y la resolución de problemas, nos propusimos crear una herramienta que
                        simplificara la gestión de la formación de empleados. A lo largo del proceso, enfrentamos desafíos,
                        aprendimos lecciones valiosas y, finalmente, entregamos una solución que esperamos que sea útil para
                        empresas en busca de eficiencia en la formación de su personal.
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>

        <v-row>
            <v-col cols="12">
                <h2 class="headline text-center mt-5">Nuestra Misión</h2>
                <v-divider class="mx-auto" width="50%"></v-divider>
                <v-card>
                    <v-card-text>
                        En el corazón de nuestro proyecto está el deseo de facilitar el proceso de planificación y gestión
                        de la formación empresarial. Creemos en la importancia del aprendizaje continuo y estamos
                        comprometidos a contribuir al crecimiento y desarrollo de las empresas a través de nuestra
                        aplicación.
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>
  
<script>
export default {
    data() {
        return {
            teamMembers: [
                {
                    name: 'Aida Rosa Calvo Fleites',
                    role: 'Desarrolladora Web',
                    description: 'Aida desempeñó un papel clave en el desarrollo front-end de nuestra aplicación, creando interfaces de usuario intuitivas y atractivas que mejoraron la experiencia del usuario.',
                },
                {
                    name: 'Daniel Dans Abelenda',
                    role: 'Desarrollador Web',
                    description: 'Daniel lideró el desarrollo back-end de la aplicación, implementando lógica empresarial compleja y asegurando la integridad de la base de datos.',
                },
                {
                    name: 'Lester Enrique Perez Carballedo',
                    role: 'Desarrollador Web',
                    description: 'Lester contribuyó significativamente al diseño y la arquitectura general de la aplicación, garantizando su escalabilidad y rendimiento óptimo.',
                },
            ],
        };
    },
};
</script>
  
<style scoped></style>
  