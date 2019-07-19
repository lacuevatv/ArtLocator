<?php 
require_once('functions.php');
/*$var = array('imagen-destacada.png');

echo serialize($var);
*/
$cantidadporpagina = 1;
$numeroPagina = 0;
//$limit = $numeroPagina.','.$cantidadporpagina;
$orden = 'fecha DESC';
$kioskos = getLocations ( null, null, $orden );

var_dump($kioskos);

/*$kiosko = getLocation(4);
var_dump($kiosko);*/