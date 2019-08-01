<?php 
//require_once('functions.php');
/*$var = array('imagen-destacada.png');

echo serialize($var);
*/
//$numeroPagina = 0;
//$cantidadporpagina = POSTPERPAG;
//$limit = ( ($numeroPagina )*$cantidadporpagina).", ".$cantidadporpagina;
//$orden = 'fecha DESC';

/*$locations = getLocations ( $limit, null, $orden );
$locations['pagina'] = $numeroPagina;

var_dump($locations);

/*$kiosko = getLocation(4);
var_dump($kiosko);*/

$ar= array('sanjusto-despues.jpg', 'sanjusto-despues@2x.jpg' );

echo serialize($ar);

echo '<br><br>';

$ars= array(
    'antes' => array( 'sanjusto-antes.jpg', 'sanjusto-antes@2x.jpg' ),
    'despues' => array( 'sanjusto-despues.jpg', 'sanjusto-despues@2x.jpg' ),
);

echo serialize($ars);