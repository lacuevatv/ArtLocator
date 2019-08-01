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

$imagen= array('chascomus-despues.jpg' );

echo serialize($imagen);

echo '<br><br>';

$imagenes= array(
    'antes' => array( 'chascomus-antes.jpg' ),
    'despues' => array( 'chascomus-despues.jpg' ),
);

echo serialize($imagenes);

echo '<br><br>';

$video = '';

echo serialize($video);

echo '<br><br>';

$kiosko = array(
    'titulo' => 'Ruartes Julio Javier',
    'latitud' => '-35.5768292',
    'longitud' => '-58.0087402',
    'ubicacion_id' => 2,
    'marker' => 'marker-amarillo.png',
    'likes' => 0,
    'data_titulo' => 'Plantas de Chascomús',
    'data_imagen' => serialize($imagen),
    'data_tag' => 'Pedro Arteaga (El Pit)',
    'data_resumen' => 'Una combinación de colores y formas naturales que crean un espacio atractivo para el ambiente callejero.',
    'data_video' => '',
    'data_texto' => 'Una combinación de colores y formas naturales que crean un espacio atractivo para el ambiente callejero.',
    'data_direccion' => 'Avda Lastra 500 – CHASCOMUS',
    'data_imagenes' => serialize($imagenes),
    'fecha' => '2019-08-01',
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