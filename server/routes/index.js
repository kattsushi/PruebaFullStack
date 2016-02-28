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
    
    var data = req.body;
    
    modelo.Clientes.update(
                 {documento : data.documento,
                  nombres : data.nombres,
                  detalles : data.detalles},
                  {where: { id: id }}).then(function(rowUpdate){ 
          if(rowUpdate === 0){
             modelo.Log.create({
                          fecha: new Date(),
                          descripcion: id + " DELETE CLIENTE"  
                              }).then(function (e) {
                                console.log('Actualizado el registro del cliente'); 
                                console.log("este es mi id: " + id);               
                            }, function(err){
                              console.log("algo salio mal -- " + err); 
                          });
              }     
        }, function(err){
            console.log("algo salio mal -- " + err); 
        });
   
});  
  
router.delete('/api/clientes/:id', function(req, res, next) {
    var id = req.params.id;
    
    modelo.Clientes.destroy({
          where: { id: id }}).then(function(rowDeleted){ 
          if(rowDeleted === 0){
             modelo.Log.create({
                          fecha: new Date(),
                          descripcion: id + " DELETE CLIENTE"  
                              }).then(function (e) {
                                console.log('Eliminado registro del cliente');                
                            }, function(err){
                                console.log("algo salio mal -- " + err); 
                            });
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
     
    modelo.Productos.findAll({
      attributes : ['id','producto','precio','descripcion']
    }).then(function (prod) {
          res.json(prod);
        });
});


router.post('/api/productos/', function(req, res, next) {
    var data = req.body;
    modelo.Productos.create({
      producto : data.producto,
      precio : data.precio,
      descripcion: data.descripcion
    }).then(function (pro) {
        modelo.Log.create({
          fecha: new Date(),
          descripcion: data.id + " " + data.documento + " INSERT PRODUCTO"  
          }).then(function (e) {
            console.log("se creo correctamente el registro en la tabla pRODUCTOS");
      })
    })
    console.log("este es mi dni: " + data.documento);
});  
  
    
router.put('/api/productos/:id', function(req, res, next) {
    var id = req.params.id;
    
    var data = req.body;
    
    modelo.Productos.update(
                 {producto : data.producto,
                  precio : data.precio,
                  descripcion : data.descripcion},
                  {where: { id: id }}).then(function(rowUpdate){ 
          if(rowUpdate === 0){
             modelo.Log.create({
                          fecha: new Date(),
                          descripcion: id + " DELETE CLIENTE"  
                              }).then(function (e) {
                                console.log('Actualizado el registro del cliente'); 
                                console.log("este es mi id: " + id);               
                            }, function(err){
                              console.log("algo salio mal -- " + err); 
                          });
              }     
        }, function(err){
            console.log("algo salio mal -- " + err); 
        });
   
});  
  
router.delete('/api/productos/:id', function(req, res, next) {
    var id = req.params.id;
    
    modelo.Productos.destroy({
          where: { id: id }}).then(function(rowDeleted){ 
          if(rowDeleted === 0){
             modelo.Log.create({
                          fecha: new Date(),
                          descripcion: id + " DELETE PRODUCTOS"  
                              }).then(function (e) {
                                console.log('Eliminado registro del producto');                
                            }, function(err){
                                console.log("algo salio mal -- " + err); 
                            });
              }     
        }, function(err){
            console.log("algo salio mal -- " + err); 
        });
    
    console.log("este es mi id: " + id);
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
    
    modelo.Sedes.findAll({
      attributes : ['id','sede','direccion']
    }).then(function (sed) {
          res.json(sed);
        });
});


router.post('/api/sedes/', function(req, res, next) {
    var data = req.body;
    modelo.Sedes.create({
      sede : data.sede,
      direccion: data.direccion
    }).then(function (sed) {
        modelo.Log.create({
          fecha: new Date(),
          descripcion: data.id + " " + data.documento + " INSERT SEDE"  
          }).then(function (e) {
            console.log("se creo correctamente el registro en la tabla sedes");
      })
    })
    console.log("este es mi dni: " + data.documento);
});  
  
    
router.put('/api/sedes/:id', function(req, res, next) {
    var id = req.params.id;
    
    var data = req.body;
    
    console.log("esto esta bien" + id)
    modelo.Sedes.update(
                 {sede : data.sede,
                  direccion : data.direccion},
                  {where: { id: id }}).then(function(rowUpdate){ 
          if(rowUpdate === 0){
             modelo.Log.create({
                          fecha: new Date(),
                          descripcion: id + " DELETE CLIENTE"  
                              }).then(function (e) {
                                console.log('Actualizado el registro de la sede'); 
                                console.log("este es mi id: " + id);               
                            }, function(err){
                              console.log("algo salio mal -- " + err);
                              console.log("esto esta bien" + id + data.sede) 
                          });
              }     
        }, function(err){
            console.log("algo salio mal -- " + err); 
        });
   
});  
  
router.delete('/api/sedes/:id', function(req, res, next) {
    var id = req.params.id;
    
    modelo.Sedes.destroy({
          where: { id: id }}).then(function(rowDeleted){ 
          if(rowDeleted === 0){
             modelo.Log.create({
                          fecha: new Date(),
                          descripcion: id + " DELETE PRODUCTOS"  
                              }).then(function (e) {
                                console.log('Eliminado registro del producto');                
                            }, function(err){
                                console.log("algo salio mal -- " + err); 
                            });
              }     
        }, function(err){
            console.log("algo salio mal -- " + err); 
        });
    
    console.log("este es mi id: " + id);
});  

// Compras  --------------------------------------------
/*
router.get('/api/compras/:id', function(req, res, next) {
    
    modelo.Sedes.findAll({ where : {
                            id : req.params.id }
                             }).then(function (sed) {
          res.json(sed);

        });
});*/

router.get('/api/compras/', function(req, res, next) {

    modelo.Productos.findAll({include : [{
                                  model: modelo.Compras,
                                  as :"Compras",
                                  include :[{
                                   model: modelo.Sedes,
                                   as : "Sedes"
                                  },{
                                   model: modelo.Clientes,
                                   as : "Cliente",
                                   where : {
                                    documento : req.query.documento
                                  }, 
                                  }]
                                }],
                                
                          }).then(function (comp) {
          if (comp == null){
            return null;
          } else {
            res.jsonp(comp);
            }
    });



    
/*   modelo.Compras.findAll({
      attributes : ['id',
                    'id_cliente','id_producto',
                    'id_sede','precio','descripcion','fecha'],
      include:[{
              attributes : ['id','producto','precio','descripcion'],
              model: modelo.Productos,
              as : "Producto"
                   }]
    }).then(function (sed) {
          res.json(sed);
        });*/
});

/*
router.post('/api/compras/', function(req, res, next) {
    var data = req.body;
    modelo.Compras.create({
      id_cliente : data.id_cliente,
      id_producto: data.id_producto,
      id_sede: data.id_sede,
      precio: data.precio,
      descripcion: data.descripcion,
      fecha: new Date()
    }).then(function (sed) {
        modelo.Log.create({
          fecha: new Date(),
          descripcion: data.id + " " + data.documento + " INSERT Compras"  
          }).then(function (e) {
            console.log("se creo correctamente el registro en la tabla Compras");
      })
    })
    console.log("este es mi dni: " + data.documento);
});  */
  
    
router.put('/api/compras/:id', function(req, res, next) {
    var id = req.params.id;
    
    var data = req.body;
    
    console.log("esto esta bien" + id)
    modelo.Compras.update(
                 {id_cliente : data.id_cliente,
                  id_producto : data.id_producto,
                  id_sede : data.id_sede,
                  precio: data.precio,
                  descripcion: data.descripcion,
                  fecha : new Date()
                  },
                  {where: { id: id }}).then(function(rowUpdate){ 
          if(rowUpdate === 0){
             modelo.Log.create({
                          fecha: new Date(),
                          descripcion: id + " DELETE COMPRA"  
                              }).then(function (e) {
                                console.log('Actualizado el registro de la Compra'); 
                                console.log("este es mi id: " + id);               
                            }, function(err){
                              console.log("algo salio mal -- " + err);
                              console.log("esto esta bien" + id + data.sede) 
                          });
              }     
        }, function(err){
            console.log("algo salio mal -- " + err); 
        });
   
});  
  
router.delete('/api/compras/:id', function(req, res, next) {
    var id = req.params.id;
    
    modelo.Compras.destroy({
          where: { id: id }}).then(function(rowDeleted){ 
          if(rowDeleted === 0){
             modelo.Log.create({
                          fecha: new Date(),
                          descripcion: id + " DELETE compras"  
                              }).then(function (e) {
                                console.log('Eliminado registro del compra');                
                            }, function(err){
                                console.log("algo salio mal -- " + err); 
                            });
              }     
        }, function(err){
            console.log("algo salio mal -- " + err); 
        });
    
    console.log("este es mi id: " + id);
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
