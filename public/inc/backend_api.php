<?php
/*
 * archivo que nuclea todos los pedidos ajax
 * primero chequea si es una llamado ajax y si el campo function de la variable $_POST esta completo
 */
require_once('functions.php');

$function = isset( $_POST['function'] ) ? $_POST['function'] : '';

if ( $function == '') {
    return 'error';
}

sleep(1);

switch ($function) {
    //de acuerdo a la $funcion pasada ejecuta y busca la funcion q corresponda devolviendo siempre un json y listo para usar

    case 'load-ubicaciones':

        $respuesta = getUbicacionesData();

        echo json_encode($respuesta);
    break;

    case 'load-locations-ubicacion':

        $ubicacion = isset( $_POST['ubicacion'] ) ? $_POST['ubicacion'] : null;
        $respuesta = getLocations(null, $ubicacion);
        
        echo json_encode($respuesta);
    break;

    case 'load-location':

        $id = isset( $_POST['id'] ) ? $_POST['id'] : null;
        
        $respuesta = getLocation($id);

        echo json_encode($respuesta);
    break;

    case 'load-locations-by-last-date-paginated' :
    
        $numeroPagina = isset( $_POST['pagina'] ) ? $_POST['pagina'] : 1;
        $cantidadporpagina = POSTPERPAG;
        $limit = ( ($numeroPagina )*$cantidadporpagina).", ".$cantidadporpagina;
        $orden = 'fecha DESC';

        $locations = getLocations ( $limit, null, $orden );
        $locations['pagina'] = array(
            'actual' => (int) $numeroPagina,
            'totales' => getTotalPages(),
        );

        echo json_encode($locations);

    break;

    case 'me_gusta' :

        $id = isset( $_POST['id'] ) ? $_POST['id'] : null;

        if ($id != null || $id != '' ) {
            $respuesta = addLike($id);    
        }

        echo json_encode($respuesta);

    break;
    
}//switch

