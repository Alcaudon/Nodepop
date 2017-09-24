'use strict';

const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');
const Anuncio = require('../models/Anuncio');

//Ruta donde mostrara los anuncios en la web con los filtros y conciciones solicitados en la URL.
router.get('/', (req, res, next) => {  
   Anuncio.lista(req, (err, list) => {
        if (err) {
            next(err);
            return;
        }
        res.render('index', {list: list});
    });
});

module.exports = router;