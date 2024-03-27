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
Nota: En caso de conflicto entre dependencias ir al apartado: **Resolver conflictos de Node**

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

---

## Errores durante la configuración

### Resolver conflictos entre dependencias

Si al instalar las dependencias del proyecto surgen advertencias de posible comportamiento inapropiado, podemos estar en presencia de conflictos entre las dependencias que intentan instalar varios paquetes que proporcionan funcionalidades similares en el mismo directorio de destino.

Para resolver este problema, puedes intentar lo siguiente:

1. **Limpiar la caché de Yarn**: A veces, la caché de Yarn puede causar problemas. Puedes intentar limpiarla ejecutando el siguiente comando:
   ```
   yarn cache clean
   ```

2. **Actualizar Yarn y Node.js**: Asegúrate de tener la última versión de Yarn y Node.js instalada en tu sistema. Puedes actualizar Yarn ejecutando:
   ```
   npm install -g yarn
   ```
   Y puedes actualizar Node.js descargando la última versión desde el sitio web oficial. En caso de problemas con la conexión o errores al descargar ver el apartado: **Problema al instalar dependencias con npm**

3. **Eliminar el directorio `node_modules` y el archivo `yarn.lock`**: A veces, eliminar el directorio `node_modules` y el archivo `yarn.lock` y luego volver a instalar las dependencias puede resolver problemas de instalación. Ejecuta los siguientes comandos:
   ```
   rm -rf node_modules
   rm yarn.lock
   yarn install
   ```

4. **Revisar las dependencias del proyecto**: Verifica las dependencias de tu proyecto y asegúrate de que no haya conflictos entre ellas. Puedes revisar el archivo `package.json` y eliminar o actualizar las dependencias que estén causando conflictos.

Si ninguno de estos pasos resuelve el problema, puede ser útil buscar en línea el error específico que estás experimentando o consultar la documentación oficial de Yarn para obtener más información sobre cómo resolver problemas de instalación de dependencias.


### Problema al instalar dependencias con npm

En el caso de que demore la instalación de las dependencias o de error de conexión, para el caso de usuarios cubanos se puede utilizar el repositorio  npm de la UCLV configurando en las variables de npm con el siguiente comando:

`npm set registry https://nexus.uclv.edu.cu/repository/npm/`

