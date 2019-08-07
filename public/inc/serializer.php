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

$imagen= array('gascon-despues.jpg' );

echo serialize($imagen);

echo '<br><br>';

$imagenes= array(
    'antes' => array( 'beiro-antes.jpg' ),
    'despues' => array( 'beiro-despues.jpg' ),
);

echo serialize($imagenes);

echo '<br><br>';

$video = '';

echo serialize($video);

echo '<br><br>';

$kiosko = array(
    'titulo' => '',
    'latitud' => '',
    'longitud' => '',
    'ubicacion_id' => 1,
    'marker' => 'marker-violeta.png',
    'likes' => 0,
    'data_titulo' => '',
    'data_imagen' => serialize($imagen),
    'data_tag' => '',
    'data_resumen' => '',
    'data_video' => '',
    'data_texto' => '',
    'data_direccion' => '',
    'data_imagenes' => serialize($imagenes),
    'fecha' => '2019-08-07',
);

$query = "INSERT into kioskos (titulo, latitud, longitud, ubicacion_id, marker, likes, data_titulo, data_imagen, data_tag, data_resumen, data_video, data_texto, data_direccion, data_imagenes, fecha) values(";

foreach ($kiosko as $key => $value) {
    
    $query .= "'" .$kiosko[$key] . "'";
    if ($key != 'fecha') {
        $query .= ", ";
    }
    
}

$query .= ")";

echo $query;


/*$kiosko = array(
    'titulo' => '',
    'latitud' => '',
    'longitud' => '',
    'ubicacion_id' => 2,
    'marker' => '',
    'likes' => 0,
    'data_titulo' => '',
    'data_imagen' => serialize($imagen),
    'data_tag' => '',
    'data_resumen' => '',
    'data_popup' => 1,
    'data_video' => serialize($video),
    'data_texto' => '',
    'data_direccion' => '',
    'data_imagenes' => serialize($imagenes),
    'fecha' => '2019-08-01',
);*/