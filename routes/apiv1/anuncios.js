"use strict";

const express = require('express');
const router = express.Router();

const customError = require('../../models/CustomError');
const Anuncio = require('../../models/Anuncio');

// GET /
router.get('/', (req, res, next) => {

  const nombre = req.query.nombre;
  const venta = req.query.venta;
  const start = req.query.start;
  const skip = parseInt(req.query.skip);
  const limit = parseInt(req.query.limit);

  const filter = {};

  if (nombre) {
    filter.nombre = nombre;
  }

  if (venta) {
    filter.venta = venta;
  }

  Anuncio.lista(filter, skip, limit).then( lista => {
    res.json({ success: true, rows: lista });
  }).catch( err => {
    console.log('Error', err);
    next(err); 
    return;
  });
});

// GET /:id
// Recupera un solo documento
router.get('/:id', (req, res, next) => {
  const _id = req.params.id;
  Anuncio.findOne({ _id: _id }, (err, anuncio) => {
    if (err) {
      err.message=customError.errorMessage('findOne');
      next(err); // para que retorne la página de error
      return;
    }
    res.json({ success: true, row: anuncio});
  })
});

// POST / 
router.post('/', (req, res, next) => {
  console.log(req.body);
  
  const anuncio = new Anuncio(req.body);

  anuncio.save((err, anuncioGuardado) => {
    if (err) {
      console.log('Error', err);
      next(err); // para que retorne la página de error
      return;
    }
    res.json({ success: true, result: anuncioGuardado});
  });
});

// PUT /
router.put('/:clavedelanuncio', (req, res, next) => {
  const _id = req.params.clavedelanuncio;

  Anuncio.findOneAndUpdate({_id: _id}, req.body, {new: true}, (err, anuncioActualizado) => {
    if (err) {
      console.log('Error', err);
      next(err); 
      return;
    }
    res.json({ success: true, result: anuncioActualizado});    
  });
});

//DELETE
router.delete('/:id', (req, res, next) => {
  const _id = req.params.id;
  Anuncio.remove({ _id: _id }, (err) => {
    if (err) {
      console.log('Error', err);
      next(err); 
      return;
    }
    res.json({ success: true });
  })
});

module.exports = router;