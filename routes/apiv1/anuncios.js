"use strict";

const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Anuncio = require('../../models/Anuncio');

// GET /
router.get('/', (req, res, next) => {

  const nombre = req.query.nombre;
  const venta = req.query.venta;
  const tags = req.query.tags;
  const precio = req.query.precio;
  const skip = parseInt(req.query.skip);
  const limit = parseInt(req.query.limit);

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
        const range = precio.split('-');
        const pmin = parseInt(range[0]);
        filtro.precio = {};
        if (pmin) {
          filtro.precio.$gte = pmin;
        }
        const pmax = parseInt(range[1]);
        if (pmax) {
          filtro.precio.$lte = pmax;
        }
    } else {
      filtro.precio = parseInt(precio);
    }
}

  Anuncio.lista(filtro, skip, limit).then(lista => {
    res.json({
      success: true,
      rows: lista
    });
  }).catch(err => {
    err.message = __('list_error');
    console.log('Error', err);
    next(err);
    return;
  });
});

// GET /:id
// Recupera un solo documento
router.get('/:id', (req, res, next) => {
  const _id = req.params.id;
  Anuncio.findOne({
    _id: _id
  }, (err, anuncio) => {
    if (err) {
      err.message = __('find_no_one');
      next(err); // para que retorne la página de error
      return;
    }
    res.json({
      success: true,
      row: anuncio
    });
  })
});

// POST / 
router.post('/', (req, res, next) => {
  console.log(req.body);

  const anuncio = new Anuncio(req.body);

  anuncio.save((err, anuncioGuardado) => {
    if (err) {
      err.message = __('post_error');
      next(err); // para que retorne la página de error
      return;
    }
    res.json({
      success: true,
      result: anuncioGuardado
    });
  });
});

// PUT /
router.put('/:clavedelanuncio', (req, res, next) => {
  const _id = req.params.clavedelanuncio;

  Anuncio.findOneAndUpdate({
    _id: _id
  }, req.body, {
    new: true
  }, (err, anuncioActualizado) => {
    if (err) {
      err.message = __('error_find_One_And_Update');
      next(err);
      return;
    }
    res.json({
      success: true,
      result: anuncioActualizado
    });
  });
});

//DELETE
router.delete('/:id', (req, res, next) => {
  const _id = req.params.id;
  Anuncio.remove({
    _id: _id
  }, (err) => {
    if (err) {
      err.message = __('delete');
      next(err);
      return;
    }
    res.json({
      success: true
    });
  })
});

module.exports = router;