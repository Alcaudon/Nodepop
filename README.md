Inicio de trabajo con el proyecto.

Instalamos las dependencias

    npm install

Generamos los datos de la base de datos

    npm run installDB

        Adenda Mongo DB.-

        Para arrancar MongoDB escribimos:

            bin/mongod --dbpath ./data/db --directoryperdb

        Y para conectarnos con el cliente desde la consola escribimos:

            bin/mongo


El sistema de plantillas utilizado para el proyecto es EJS. 

Los archivos estátocos los servimos en:

Imágenes.- /images/anuncios/
CSS.-/stylesheets

Hemos utilizado la librería i18n para la internacionalización de mensajes en idiomas español e ingles. Anque de momento solo lo utilizaremos para los mensajes de error.