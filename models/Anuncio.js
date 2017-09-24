"use strict";
const mongoose = require('mongoose');

// definir un esquema
const anuncioSchema = mongoose.Schema({
  nombre: {
    type: String,
    index: true,
    //required: [true, 'El anuncio debe tener un titulo']
    required: [true, __('error_nombre')]
  },
  venta: {
    type: Boolean,
    index: true,
    required: [true, 'El anuncio debe tener un tipo']
    //required: [true, __('error_venta')]
  },
  precio: {
    type: Number,
    index: true,
    required: true,
    min: [1, 'El anuncio debe tener un precio y ser mayor de 0'],
  },
  foto: {
    type: String,
    index: true,
    required: [true, 'El anuncio debe tener una imagen']
    //required: [true, __('error_foto')]
  },
  tags: [{
    type: String,
    index: true,
    enum: {
        values: ['work', 'lifestyle', 'mobile', 'motor'],
        message:'El tag tiene que estar dentro de los permitidos'
        //message: __('error_tags')
    }
    
}]
});

anuncioSchema.statics.lista = function (req, callback) {
  const skip = parseInt(req.query.skip);
  const limit = parseInt(req.query.limit);
  const filtro = crearFiltro(req);

  const query = Anuncio.find(filtro);
  query.skip(skip);
  query.limit(limit);

  return query.exec(callback); // ejecutamos la consulta
};

function crearFiltro(req) {
  const nombre = req.query.nombre;
  const venta = req.query.venta;
  const tags = req.query.tags;
  const precio = req.query.precio;

  let filtro = {};

  if (nombre) {
    filtro.nombre = new RegExp('^' + nombre, 'i');
  }

  if (venta) {
    filtro.venta = venta;
  }

  if (tags) {
    filtro.tags = tags;
  }

  if (precio) {
    if (precio.indexOf('-') >= 0) {
      const precios = precio.split('-');
      const precioMin = parseInt(precios[0]);
      filtro.precio = {};
      if (precioMin) {
        filtro.precio.$gte = precioMin;
      }
      const precioMax = parseInt(precios[1]);
      if (precioMax) {
        filtro.precio.$lte = precioMax;
      }
    } else {
      filtro.precio = parseInt(precio);
    }
  }
  return filtro;
}

// crear el modelo
const Anuncio = mongoose.model('Anuncio', anuncioSchema);

module.exports = Anuncio;