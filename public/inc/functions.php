<?php 
/*
 * FUNCTIONS
 * archivos de funciones
 * 
*/
require_once dirname( __FILE__ ) . '/config.php';

/**
 * Checks if a request is a AJAX request
 * @return bool
 */
function isAjax() {
    return (isset($_SERVER['HTTP_X_REQUESTED_WITH']) && $_SERVER['HTTP_X_REQUESTED_WITH']  == 'XMLHttpRequest');
}

//esta funcion ordena los datos de los posts para recibirlos de manera ordenada y hacer una devolución acorde
function reOrderData($post = array()) {
    $dato = array(
        'id' => $post['id'],
        'titulo' => $post['titulo'],
        'lat' => $post['latitud'],
        'long' => $post['longitud'],
        'ubicacion' => getUbicacionDataById($post['ubicacion_id']),
        'markerImage' => $post['marker'],
        'likes' => $post['likes'],
        'data' => array(
            'titulo' => $post['data_titulo'],
            'imagen' => unserialize($post['data_imagen']),
            'tag' => $post['data_tag'],
            'excerpt' => $post['data_resumen'],
            'popup' => $post['data_popup'],
            'video' => unserialize($post['data_video']),
            'texto' => $post['data_texto'],
            'direccion' => $post['data_direccion'],
            'imagenes' => unserialize($post['data_imagenes']),
            'fecha' => $post['fecha'],
        ),
    );

    return $dato;
}

/*
 *
 * FUNCIONES CON BASE DE DATOS
 *
*/
function connectDB () {
	global $connection;
  $connection = mysqli_connect(DB_SERVER, DB_USER, DB_PASS, DB_NAME);
  // Test if connection succeeded
  if( mysqli_connect_errno() ) {
    die("Database connection failed: " . mysqli_connect_error() . 
         " (" . mysqli_connect_errno() . ")"
    );
  }

  if (!mysqli_set_charset($connection, "utf8")) {
    printf("Error cargando el conjunto de caracteres utf8: %s\n", mysqli_error($connection));
    exit();
	} else {
		mysqli_character_set_name($connection);
	}
  return $connection;
}

//cierre base de datos
function closeDataBase( $connection ){
	if ( isset($connection) ) {
    	mysqli_close( $connection );
    }
}

/*
* GET ANYTHING FROM DATABASE
* @return $arrayposts/null
* Esta funcion se la llama para recuperar todo, funcion básica.
*
* Si se quiere hacer pagination hay que usar limit como offset:
* $limit = ( ($numeroPagina )*$cantidadporpagina).", ".$cantidadporpagina;
* Si en cambio se quiere limitar se usa limit como numero
* $limit = $cantidadporpagina
* 
* En la variable $condition se pasa solo la condicion:
* $condition = 'id="2"' or $condition = 'id="2" AND provincia="caba"'
*
* En la variable $orden lo mismo, se pasa solo la columna y si se quiere el asc o desc
* $orden = 'provincias ASC'
*/
function getPostsFromTabla( $tabla, $limit = null, $condition = null, $orden = null ) {
	$connection = connectDB();

	//queries según parámetros
    $query = "SELECT * FROM " .$tabla;
    
	//condicion
	if ( $condition != null ) {
		$query  .= " WHERE " . $condition;
	}
    
    //order
    if ( $orden != null ) {
        $query  .= " ORDER by ".$orden;
    }

    //limite
    if ($limit != null ) {
        $query  .= " LIMIT ".$limit;
    }
	
	$result = mysqli_query($connection, $query);
	
	if ( $result->num_rows == 0 ) {

        $posts = null;
        
	} else {

		while ( $row = $result->fetch_assoc() ) {
			$posts[] = $row;
        }
    }

    closeDataBase( $connection );

    return $posts;
}

/*
* GET POST FROM TABLE BY
* Esta funcion se la llama para recuperar un solo post y la variable by te indica por como buscar:
* (id, slug, etc)
* $by = 'user_id="2"'
* @return $postarraydata/null
*/
function getPostFromTabla( $tabla, $by ) {
	$connection = connectDB();

	//queries según parámetros
    $query = "SELECT * FROM " .$tabla;
    //
	$query  .= " WHERE " . $by;
	
	$result = mysqli_query($connection, $query);
	
	if ( $result->num_rows == 0 ) {

        $post =  null;
        
	} else {

		$post = $result->fetch_assoc();
        
    }

    closeDataBase( $connection );

    return $post;
}

//update
function updateFromTabla( $tabla, $set, $where ) {
	$connection = connectDB();

	//queries según parámetros
    $updateQuery = "UPDATE " .$tabla . " set " . $set . " WHERE " . $where . " LIMIT 1";
	
	$result = mysqli_query($connection, $updateQuery);
	
	if ( $result ) {

        $respuesta = 'updated';
        
	} else {

		$respuesta = 'error-update';
        
    }

    closeDataBase( $connection );

    return $respuesta;
}

//trae todas las ubicaciones
function getUbicacionesData() {
    $tabla = 'ubicaciones';

    $ubicaciones = getPostsFromTabla( $tabla);
    
    return $ubicaciones;
}

//recupera informacion sobre la ubicacion en base al id
//no devuelve id, sino que devuelve un array prearmado
function getUbicacionDataById($id) {
    $tabla = 'ubicaciones';
    $by = "id='".$id."'";

    $ubicacion = getPostFromTabla( $tabla, $by );
    if ( $ubicacion == null ) {
        $ubicacion = array(
            'id' => '0',
            'slug' => 'none',
            'nombre' => 'Ubicación',
        );
    }
    return $ubicacion;
}



/*
 * recupera las locaciones segund parametro
 * Ya devuelve el array completo para devolver con error o sin error 
*/
function getLocations ( $limit = null, $ubicacion = null, $orden = null  ) {
    //prepara la respuesta
    $datos  = array(
        'respuesta' => array(
            'error' => 'none',
            'status' => 'error',
        ),
        'data' => null,
    );

    //prepara la consulta
    $tabla = 'kioskos';
    $condition = null;

    if ( $ubicacion != null ) {
        $condition = "ubicacion_id='".$ubicacion."'";
    }

    $posts = getPostsFromTabla( $tabla, $limit, $condition, $orden);

    if ( $posts != null ) {
        $datos['respuesta']['status'] = 'ok';

        //convierte los datos desde la base de datos para armar un array corecta para el json
        foreach ( $posts as $post ) {
            $datos['data'][] = reOrderData($post);
        }
        
    } else {
        $datos['respuesta']['status'] = 'error';
        $datos['respuesta']['error'] = 'no-posts';
    }

    return $datos;
}

function getTotalPages() {
    
    $pages = getPostsFromTabla( 'kioskos' );

    return count($pages) / POSTPERPAG;
}

//recupera una sola locación para mostrar de a una
function getLocation($id) {
    //prepara la respuesta
    $datos  = array(
        'respuesta' => array(
            'error' => 'none',
            'status' => 'error',
        ),
        'data' => null,
    );

    //prepara la consulta
    $tabla = "kioskos";
    $by = "id='".$id."'";
    $post = getPostFromTabla( $tabla, $by );

    if ( $post != null ) {
        $datos['respuesta']['status'] = 'ok';
        $datos['data'] = reOrderData($post);
        
    } else {
        $datos['respuesta']['status'] = 'error';
        $datos['respuesta']['error'] = 'no-posts';
    }

    return $datos;
}

//registra un nuevo like
function addLike($id) {
    $datos  = array(
        'respuesta' => array(
            'error' => 'none',
            'status' => 'error',
        ),
    );

    $tabla = "kioskos";
    $set = "likes=likes+1";
    $where = "id='".$id."'";

    $update = updateFromTabla( $tabla, $set, $where );

    if ($update == 'updated') {
        $datos['respuesta']['status'] = 'ok';
    } else {
        $datos['respuesta']['error'] = $update;
    }

    return $datos;

}
