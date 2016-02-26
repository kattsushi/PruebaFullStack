'use strict'
//--------------------------------------------------------------
var Sequelize = require('sequelize'),
          pkg = require('../../package.json');
//--------------------------------------------------------------
// Configurar la base de datos con sequelize
//--------------------------------------------------------------
var sequelize = new Sequelize("pruebafsj","root","",{
      dialect:"mysql", //OTROS VALORES: postgres, mysql, mariadb
	    //la propiedad storage SOLO ES PARA sqlite
	    loggin: false
    });
//--------------------------------------------------------------
//EL CODIGO EN ESTA FUNCION SE EJECTUA
//SOLO HASTA QUE LA OPERCION ASINCRONA (AUTHENTICATE) TERMINA
sequelize.authenticate().then(function(){
  console.log('Base de datos lista para trabajar');
});
//--------------------------------------------------------------
// Mapeo de tablas
//--------------------------------------------------------------

// Clientes -----------------------------------

var Clientes = sequelize.define("clientes",{
      id: {
          primaryKey:true,
          type: Sequelize.INTEGER,
          autoIncrement :true
          },
      documento : Sequelize.INTEGER,
      nombres : Sequelize.TEXT,
      detalles: Sequelize.TEXT
      },
      { freezeTableName: true,
        tableName:"clientes"});
//--------------------------------------------

// Compras -----------------------------------

var Compras = sequelize.define("compras", {
      id: {
          primaryKey: true,
          type: Sequelize.INTEGER,
          autoIncrement: true
      },
      id_cliente: Sequelize.INTEGER,
      id_producto: Sequelize.INTEGER,
      id_sede: Sequelize.INTEGER,
      precio: Sequelize.INTEGER,
      descripcion: Sequelize.TEXT,
      fecha: Sequelize.DATE
      },{ freezeTableName :true,
          tableName: "compras"});
//-------------------------------------------

// Sedes ------------------------------------

var Sedes = sequelize.define("sedes", {
      id: {
        primaryKey: true,
        type:Sequelize.INTEGER,
        autoIncrement:true
      },
      sede:Sequelize.TEXT,
      direccion:Sequelize.TEXT
      },{freezeTableName:true,
         tableName: "sedes"});
//--------------------------------------------

// Productos ---------------------------------

var Productos = sequelize.define("productos",{
      id: {
          primaryKey: true,
          type: Sequelize.INTEGER,
          autoIncrement :true
          },
      producto: Sequelize.TEXT,
      precio: Sequelize.INTEGER,
      descripcion: Sequelize.TEXT
      },
      { freezeTableName: true,
        tableName:"productos"});
//-----------------------------------------------

// Log ------------------------------------------

var Log = sequelize.define("log",{
      id: {
          primaryKey: true,
          type: Sequelize.INTEGER,
          autoIncrement :true
          },
      fecha : Sequelize.DATE,
      descripcion : Sequelize.TEXT
      },
      { freezeTableName: true,
        tableName:"log"});

//--------------------------------------------------------------
//--Mapeo Productos - Compras - Submenu 1 - N
//--------------------------------------------------------------
Productos.hasMany(Compras,{
                    foreignKey:"id_producto"
                        });
//--------------------------------------------------------------
//--Mapeo Clientes - Compras 1 - N
//--------------------------------------------------------------
Clientes.hasMany(Compras,{
                     foreignKey:"id_cliente"
                        });
//--------------------------------------------------------------
//--Mapeo Sedes - Compras 1 - N
//--------------------------------------------------------------
Sedes.hasMany(Compras,{
                     foreignKey:"id_sede"
                        });                        
                        
//--------------------------------------------------------------
// Exportar modelos a otros modulos
//--------------------------------------------------------------
module.exports.Clientes  = Clientes;
module.exports.Compras   = Compras;
module.exports.Sedes     = Sedes;
module.exports.Productos = Productos;
module.exports.Log       = Log;
module.exports.sequelize = sequelize;

//---
module.exports.PRUEBA = "hola";
