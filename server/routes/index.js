/*
Configurar Rutas y estructura REST-ful API
*/

var       _ = require('lodash'),
    express = require('express'),
     router = express.Router(),
       uuid = require('node-uuid'),
     moment = require('moment'),
     logger = require('../logger'),
     modelo = require('../models/index');
   // controllers = require('../controllers');
   
var  isProduction = process.env.NODE_ENV === 'production';

router.get('/', function(req, res, next) {
    res.render('index', {
        title: "Prueba Full Stack Javascript",
        env : isProduction
        });
  });

// Productos ----------------------------------------------
router.get('/api/productos/:id', function(req, res, next) {
    
    modelo.Productos.findAll({ where : {
                            id : req.params.id },
                            }).then(function (prod) {
          res.json(prod);
        });
});
router.get('/api/productos/', function(req, res, next) {
     
    modelo.Productos.findAll({}).then(function (prod) {
          res.json(prod);
        });
});


// Clientes--------------------------------------------
router.get('/api/clientes/:id', function(req, res, next) {
    
    modelo.Clientes.findAll({ where : {
                            id : req.params.id }
                             }).then(function (cli) {
          res.json(cli);

        });
});
router.get('/api/clientes/', function(req, res, next) {
    
    modelo.Clientes.findAll({}).then(function (cli) {
          res.json(cli);
        });
});

router.get('/api/compras/:documento', function(req, res, next) {
    
    modelo.Compras.findAll({attributes:['id','id_producto',
                                            'id_sede','id_cliente',
                                            'precio','descripcion',
                                            'fecha'],
                                include:[{
                                  model: modelo.Productos,
                                  as : "Prodcuto"
                                }]
      }).then(function (comp) {
            res.json(comp);
      })
});





router.get('/inicio',function(req,res,next) {

    modelo.usuario.findAll({
        attributes :['id','nombre','usuario','nivel']
        ,where : {
          usuario : req.query.nombreUsuario,
          contraseña : req.query.clave
        }
      }).then(function (usuarios) {
      if (usuarios == null){
        return null;
      } else {
        res.jsonp(usuarios);
        }
    })
});

router.post('/inicio', function (req, res, next) {
  modelo.usuario.create({
    usuario : req.query.nombreUsuario,
    nombre : req.query.nombre + ' ' + req.query.apellido,
    contraseña : req.query.contraseña,
    nivel : 10,
    activo :'S',
    correo : req.query.correo,
    nota : ''
  }).then(function (a) {
     modelo.directorio.create({
       nombre :req.query.nombre ,
       apellido :  req.query.apellido,
       ubicacion:  req.query.ubicacion,
       extension:  req.query.telefono,
       correo :  req.query.correo
     })
  })
})


router.get('/error/500', function(req, res, next) {
    res.render('error', {
        title: 'Error 500 - Falla del servidor',
        message: 'Error Desconocido',
        error: {
            status: 'ha ocurrido algun error fatal',
            stack: ''
        }
    });
});



module.exports = router;
