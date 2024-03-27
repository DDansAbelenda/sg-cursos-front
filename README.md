# Sistema de Gestión de Cursos (Frontend)

Este proyecto frontend en Vue.js consume una API implementada en Laravel para gestionar cursos, ediciones de cursos y empleados. El sistema proporciona funcionalidades de autenticación, así como operaciones CRUD para empleados, cursos y ediciones, y consultas específicas para obtener información sobre las clases recibidas e impartidas por un empleado, así como detalles de las ediciones.

## Requerimientos

- Node.js >= 12.x
- Vue CLI >= 4.x
- Vue >= 3.x
- API Laravel para gestionar los datos de los cursos, ediciones y empleados

## Project setup

1. Clona el repositorio:

```
git clone https://github.com/DDansAbelenda/sg-cursos-front.git
```

2. Instala las dependencias del proyecto con Yarn:

```
yarn install
```

## Configuración

Antes de ejecutar la aplicación, asegúrate de configurar correctamente las variables de entorno para la comunicación con la API Laravel. Esto se puede hacer en el archivo `.env` o utilizando variables de entorno específicas de Vue. Asegúrate de proporcionar la URL de la API y las credenciales de autenticación si es necesario.

## Uso

### Compilación y desarrollo local

Para compilar y ejecutar la aplicación en modo de desarrollo con recarga en caliente:

```
yarn serve
```

La aplicación estará disponible en `http://localhost:8080` por defecto.

### Compilación para producción

Para compilar y minificar la aplicación para producción:

```
yarn build
```

El resultado de la compilación estará en el directorio `dist`.

### Ejecución de pruebas unitarias

Para ejecutar las pruebas unitarias:

```
yarn test:unit
```

## Documentación

- [Vue CLI Configuration Reference](https://cli.vuejs.org/config/)
- [Vue.js Documentation](https://vuejs.org/v2/guide/)

## Contribuciones

¡Las contribuciones son bienvenidas! Si deseas contribuir a este proyecto, por favor abre un problema o envía una solicitud de extracción.
