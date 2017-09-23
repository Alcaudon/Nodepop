"use strict";

const mongoose = require('mongoose');

// definir un esquema
const anuncioSchema = mongoose.Schema({
  nombre: {
    type: String,
    index: true
  },
  venta: Boolean,
  precio: Number,
  foto: String,
  tags: [String]
}, { 
  //collection: 'anuncios' // para elegir nosotros como se llamará la colección 
                           // en la base de datos
});

anuncioSchema.statics.lista = function( filter, skip, limit, callback) {

  console.log(filter)
  const query = Anuncio.find(filter);

  query.skip(skip);
  query.limit(limit);
  
    return query.exec(callback); // ejecutamos la consulta
  };

// crear el modelo
const Anuncio = mongoose.model('Anuncio', anuncioSchema);

module.exports = Anuncio;