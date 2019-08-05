<?php
/*
* CONFIG BASICO GRAL
*/

define ( 'VERSION', '1.0');

//URLS
define('SITIOSEGURO', 'http://');//aca se pone si es https
define ('CARPETASERVIDOR', '' );//esta variable se define si el sitio no está en el root del dominio y si está en una subcarpeta
define ('BASEURL', SITIOSEGURO . $_SERVER['HTTP_HOST'] . CARPETASERVIDOR );
define ('UPLOADSURL', BASEURL . '/contenido');//carpeta donde esta el contenido subido por el usuario

//CARPETAS
define ('ABSPATH', dirname( __FILE__ ) . '/../../' );
//directorio de pages y templates del front
define ( 'UPLOADS', ABSPATH . '/contenido' );

/*
* CONFIG BASE DE DATOS
*/
define('DB_SERVER', 'localhost');
define('DB_USER', 'homestead');
define('DB_PASS', 'secret');
define('DB_NAME', 'artlocator');


/*
 * CONFIGURACIONES
 * 
*/
define ('POSTPERPAG', 4);//indica al paginador cuantos se muestran por pagina para calcular el offset además de que el loop muestra solo esos