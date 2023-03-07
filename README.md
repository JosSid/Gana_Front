# GANA FRONT

Este proyecto se apoya en el backend del repositorio Gana, el cual puedes descargarte en este enlace : [https://github.com/JosSid/Gana](https://github.com/JosSid/Gana).

El proyecto esta desarrollado en React.

Una vez tengas descargado el proyecto en tu ordenador deberas crear en la carpeta raiz un fichero **.env** y copiar en el el contenido del fichero **.env.example** donde esta la URL de conexion al api.

A continuacion deberas instalarte las dependencias de la aplicación, para ello desde la carpeta raiz ejecutaras el siguiente comando en la consola:

```
npm install
```

A continuación puedes ver las opciones para arrancar el proyecto.

Para arrancar el proyecto en modo development:

```
npm start
```

## Interface

Al abrir la pagina debera verse una tabla como la siguiente.

Los contratos con fondo rojo han sido marcados para borrarlos despues.

En la parte superior puede hacer click y se desplegara un formulario para registrar un nuevo contrato.

![](/public/img/tabla.png)

Para editar un contrato, marcarlo para borrarlo o borrarlo definitivamente de la base de datos debera pulsar el boton de acciones Editar o Borrar.

Esto abrirá un panel como el siguiente:

![](/public/img/panelid.png)

En el panel debera intruducir el ID del contrato a modificar y a continuación elegir la acción que desee :

1-En caso de pulsar **editar** se desplegara un formulario donde deberá rellenar el campo que desee modificar. 

2-Si desea **marcar un contrato para borrarlo despues** solamente debera pulsar en esa opción asegurandose de que el id introducido es correwcto.

3-Si un contrato esta marcado para borrar y desea desmarcarlo puede hacerlo desde el formulario de edicion mandando la petición sin rellenar ningún campo, esto desmarcara de nuevo el contrato.

4-Si desea borrarlo definitívamente asegurese de introducir el id correcto y pulse **Borrar**. Esta acción elimina el contrato de la base de datos.

El formulario de registro se vera asi:

![](/public/img/formulario.png)

El formulario de modificación se vera asi:

![](/public/img/formularioUp.png)

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
