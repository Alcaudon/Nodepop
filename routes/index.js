'use strict';

const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');
const Anuncio = require('../models/Anuncio');

//Ruta donde mostrara los anuncios
router.get('/', (req, res, next) => {
   const start=parseInt(req.query.start);
   const limit=parseInt(req.query.limit);
   delete req.query.start
   delete req.query.limit
   Anuncio.lista(req.query,start,limit, (err, list) => {
        if (err) {
            next(err);
            return;
        }
        res.render('index', {list: list});
    });
});

module.exports = router;