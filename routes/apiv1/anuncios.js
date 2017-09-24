"use strict";

const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Anuncio = require('../../models/Anuncio');

// GET / REcuperamos la llista de anuncios
router.get('/', (req, res, next) => {

  Anuncio.lista(req).then(lista => {
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

// POST / Añadimos un anuncio
router.post('/', (req, res, next) => {
  console.log(req.body);

  const anuncio = new Anuncio(req.body);

  anuncio.save((err, anuncioGuardado) => {
    if (err) {
      next(err); // para que retorne la página de error
      return;
    }
    res.json({
      success: true,
      result: anuncioGuardado
    });
  });
});

// PUT / Modificamos un anuncio
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

//DELETE Borramos un anuncio.
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