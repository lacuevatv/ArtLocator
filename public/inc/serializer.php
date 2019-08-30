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

$imagen= array('suipachacaba-despues.jpg' );

echo serialize($imagen);

echo '<br><br>';

$imagenes= array(
    'antes' => array( 'sarmiento-antes.jpg' ),
    'despues' => array( 'sarmiento-despues.jpg' ),
);

echo serialize($imagenes);

echo '<br><br>';

$video = '';

echo serialize($video);

echo '<br><br>';

$kiosko = array(
    'titulo' => 'El rugido en la mirada',
    'latitud' => '-34.605715',
    'longitud' => '-58.3815995',
    'ubicacion_id' => 1,
    'marker' => 'marker-violeta.png',
    'likes' => 0,
    'data_titulo' => 'El rugido en la mirada',
    'data_imagen' => serialize($imagen),
    'data_tag' => 'Julián Cruz Solano ',
    'data_resumen' => 'Secretos que debemos aprender de los animales, están guardados en la pupila así como la memoria de la tierra guardada en la retina.',
    'data_video' => '',
    'data_texto' => 'Secretos que debemos aprender de los animales, están guardados en la pupila así como la memoria de la tierra guardada en la retina.',
    'data_direccion' => 'Suipacha 232 - CABA',
    'data_imagenes' => serialize($imagenes),
    'fecha' => '2019-08-15',
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