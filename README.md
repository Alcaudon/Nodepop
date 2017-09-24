Inicio de trabajo con el proyecto.

-   Instalamos las dependencias

**npm install**

-   Generamos los datos de la base de datos

**npm run installDB**

-   Pondremos en marcha el servidor.

>   Si tenemos instalado nodemon : **nodemon**

>   Sino**: npm start**

*Adenda Mongo DB.*

*Para arrancar MongoDB escribimos:*

*bin/mongod --dbpath ./data/db --directoryperdb*

*Y para conectarnos con el cliente desde la consola escribimos:*

*bin/mongo*

Notas del proyecto.

El sistema de plantillas utilizado para el proyecto es **EJS**.

Los archivos estáticos los servimos en:

Imágenes.- **/images/anuncios/**

CSS.- **/stylesheets**

Hemos utilizado la librería **i18n** para la internacionalización de mensajes en
idiomas español e inglés. Anqué de momento solo lo utilizaremos para los
mensajes de error.

La ruta para trabajar con el API es:

<http://localhost:3000/apiv1/anuncios>

Para que el Api nos devuelva los tags permitidos:

*http://localhost:3000/apiv1/tags*

También podemos probar los datos en la WEB con:

*http://localhost:3000*