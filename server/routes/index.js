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
  

router.post('/api/clientes/', function(req, res, next) {
    var data = req.body;
    modelo.Clientes.create({
      documento : data.documento,
      nombres : data.nombres,
      detalles: data.detalles
    }).then(function (cli) {
        modelo.Log.create({
          fecha: new Date(),
          descripcion: data.id + " " + data.documento + " INSERT CLIENTE"  
          }).then(function (e) {
            console.log("se creo correctamente el registro en la tabla Clientes");
      })
    })
    console.log("este es mi dni: " + data.documento);
});  
  
    
router.put('/api/clientes/:id', function(req, res, next) {
    var id = req.params.id;
    console.log("este es mi id: " + id);
});  
  
router.delete('/api/clientes/:id', function(req, res, next) {
    var id = req.params.id;
    
    modelo.Clientes.destroy({
                  where: {
                      id: id //this will be your id that you want to delete
                  }
        }).then(function(rowDeleted){ // rowDeleted will return number of rows deleted
          if(rowDeleted === 0){
             modelo.Log.create({
                          fecha: new Date(),
                          descripcion: id + " DELETE CLIENTE"  
                              }).then(function (e) {
                                console.log('Eliminado registro del cliente');                
                            })
              }     
        }, function(err){
            console.log("algo salio mal -- " + err); 
        });
    
    console.log("este es mi id: " + id);
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




// Sedes --------------------------------------------

router.get('/api/sedes/:id', function(req, res, next) {
    
    modelo.Sedes.findAll({ where : {
                            id : req.params.id }
                             }).then(function (sed) {
          res.json(sed);

        });
});

router.get('/api/sedes/', function(req, res, next) {
    
    modelo.Sedes.findAll({}).then(function (sed) {
          res.json(sed);
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
