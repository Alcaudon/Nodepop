
const mongoose = require('mongoose');
const Anuncio = require('../models/Anuncio');
const anuncios=require( './anuncios' )
const db = mongoose.connection;

//Conectamos a la BBDD
mongoose.connect('mongodb://localhost:27017/nodepop');
//Función para borrar la BBDD
async function borrarDatos(){
    return (db.dropDatabase(function(err){
        if(err){
         console.log('Error', err);
         next(err);         
         return;
        }
        console.log("Base de datos Borrada");
     }));
 } 
//Función para insertar los anunciós desde fichero json
async function insertarAnuncios(){
    return (
      db.collection("anuncios").insertMany(anuncios, function(err, insertados) {
          if (err) throw err;
           console.log("Numero de anuncios insertados " + insertados.insertedCount);
           db.close()
      }));
}

async function main() {
    await borrarDatos();
    await insertarAnuncios();
}

main();