PRUEBA PRÁCTICA JAVASCRIPT

Utilizando el script de base de datos relacional o el .dump de base de datos no relacional adjunto a esta prueba, realizar:

Crear y compartir un repositorio con esta prueba.

Realizar la migración de dicha base de datos y realizar su respectivo CRUD para cada

Crear el API necesaria para que otra aplicación pueda realizar transacciones (Consultar y crear).

Crear una interfaz para realizar compras. Tener en cuenta:
Pueden existir compras sin sede.
No puede existir una factura sin un cliente.
El precio puede ser modificado y almacenado en la tabla compras, columna

Crear un pequeño formulario donde se escriba el documento del cliente y traer en forma de factura sus compras. Tener en cuenta:

Formato de factura HTML:

Documento: 
#######
Nombres:
######
id
productos Productos
sede
precio
######
######
######
######
######
######
######
######




Total Precio:
######

Si el precio en la tabla de compra no existe, se debe tomar por defecto el precio
Debe ser posible exportar a PDF y solicitar la información en formato JSON.

7.    Cada vez que se realice select, update o delete; se debe ingresar el registro en la tabla log, describiendo el tipo de movimiento y algún dato que crea necesario o de gran ayuda para una bitácora.

8. Plantear herramientas y tecnologías necesarias para su publicación, seguridad y mantenimiento de esta aplicación, bajo el supuesto de una concurrencia diaria de
500.000 a 1.000.000 usuarios.

9.  Crear un plan de escabilidad al momento de tener un alto volumen de datos, escrituras y lecturas en disco.

10.  Automatizar un reporte semanal, que sea enviado a un correo electrónico y contenga los siguientes cálculos:
a. Diferencia promedio, máxima y mínima entre tabla productos columna precio y tabla compras columna precio.
b. Número de compras.
c. Total ganancias.
d. Compras promedio por minuto.


NOTA:
	Se le hará llegar un script SQL y un archivo .JSON uno para trabajar con BD Relacional , y el otro para bd mongodb. Queda a su elección cuál base de datos usar 


Url archivo Mysql: https://drive.google.com/open?id=0B7Y2Jg6ddM0eTU9KOE5jbzVwUUU

