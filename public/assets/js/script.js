/**
 * File script.js
 *
*/
//VARIABLES DEFAULT
var baseurl = window.location.href;
var ajaxFile = window.location.href + 'inc/backend_api.php';
var contenidoUrl = baseurl + 'contenido/';
var centerMapDefault = [-34.591444, -58.428068];
var videoLoad = false;
var numeroPagina;
console.log(numeroPagina);

document.addEventListener('DOMContentLoaded', function() {
    console.log('ready');
    /*
     * PRIMERO SE BORRA LA SESION PARA QUE CARGUE TODO DE NUEVO
    */
    if (sessionStorage) {
        sessionStorage.clear();
    }

    /*
     * PLAY VIDEO
     */
    document.querySelector('#play').addEventListener('click', playVideo);

    if (window.innerWidth > 960) {
        //playVideo();
    }

    /*
     * prepara el boton de buscar por ubicacion
     */
    document.querySelector('#zona-form').addEventListener('submit', function(e){
        e.preventDefault();
        console.log('buscar por ubicacion');
    });

    /*
     * prepara el boton de buscar por mi ubicacion
     */
    document.querySelector('#myLocationBtn').addEventListener('click', function(e){
        console.log('buscar por mi ubicación');
    });

    /*
    * arma las ubicaciones del select
    */
    getSelectUbicaciones();

});

window.addEventListener('load', function() {
    console.log('load');
    

    /*
     * busca los ultimos kioskos y paginacion
     */
    //llama a las ultimas locacitions, pagina 0
    getLastLocations(0);
    //inicia el mapa
    //initArtLocator();

});




/*
 * FUNCIONES
*/

//sirve para poner el video del header o para precargarlo en el movil
function playVideo() {

    if (videoLoad ) {

        var video = document.getElementById("videolocator");
        if ( video.paused ) {
            video.play();
        } else {
            video.pause();
        }
        
    } else {
        //se carga el video

        var html = '';
        var videoWrapper = document.querySelector('#video-wrapper');
        var imagenHeader = document.querySelector('#imagen-header');
        var pantallaWidth = window.innerWidth;

        var nombreVideo = 'movie.mp4';

        html += '<video id="videolocator" height="100%" muted autoplay>';
            html += '<source src="'+ baseurl + '/contenido/' + nombreVideo;
            html += '" type="video/mp4';//ogg o webm
            html += '">'
            html += '<img src="">';//por si no soporta elemento video
        html += '</video>';

        videoWrapper.innerHTML = html;

        var video = document.getElementById("videolocator");

        video.onloadeddata = function() {
            imagenHeader.style.opacity = 0;
        };

        //coloco la variable como true asi no hay que cargarlo de nuevo
        videoLoad = true;
    }
}


//funcion estandar que arroja error si falla el ajax
function errorAjax() {

    var error = objAjax.status;

    console.log(error);
}

function getSelectUbicaciones() {
    var select = document.querySelectorAll('select[name="zona-provincia"]')[0];
    var html = '<option>Seleccionar ubicación</option>';

    var objAjax;

    var parametros = 'function=load-ubicaciones';
    
    objAjax = new XMLHttpRequest();
    objAjax.addEventListener('error', errorAjax);
    objAjax.addEventListener('load', function () {
        if (objAjax.status != 200) {
            errorAjax();
        } else {
            var resultado = JSON.parse(objAjax.responseText);
            //console.log(resultado)
            
            for (var index = 0; index < resultado.length; index++) {
                //console.log(resultado[index].nombre)
                html += '<option value="'+resultado[index].id+'">'+resultado[index].titulo+'</option>';
                
            }

            select.innerHTML = html;

        }
    });

    objAjax.open('POST', ajaxFile);

    //Send the proper header information along with the request
    objAjax.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    objAjax.send(parametros);

}

//busca las ultimas locaciones y las va paginando
function getLastLocations(page) {
    numeroPagina = page;
    var loader = document.querySelector('#loader-arts');
    
    //primero vemos si esta guardado
    if ( sessionStorage && sessionStorage.getItem('page-'+page) ) {
        
        //si esta guardado lo insertamos desde aca
        htmlLocationsThumbnails( JSON.parse( sessionStorage.getItem('page-'+page) ) );

        //si esta quitamos el loader
        loader.classList.add('off');

    } else {
    //si no esta guardado, buscamos la info en el servidor por ajax


        //colocamos el loader
        loader.classList.remove('off');
        //limpiamos el contenedor
        document.querySelector('#contenedor-artes').innerHTML = '';
        
        var objAjax;

        var parametros = 'function=load-locations-by-last-date-paginated';
        parametros+= '&pagina='+page;
        
        objAjax = new XMLHttpRequest();
        objAjax.addEventListener('error', errorAjax);
        objAjax.addEventListener('load', function(){
            if (objAjax.status != 200) {
                errorAjax();
            } else {
                //console.log(objAjax.responseText)
                var resultado = JSON.parse(objAjax.responseText);
                console.log(resultado)
                if ( resultado.respuesta.status != 'ok' ) {

                    console.log(resultado.respuesta.error);

                } else {
                    
                    //si esta quitamos el loader
                    loader.classList.add('off');

                    //chequeamos data y cargamos a continuacion
                    if (resultado.data.length > 0) {
                        
                        htmlLocationsThumbnails(resultado.data);
                        //se cargan las paginas
                        setPages(resultado.pagina);
                        //guardamos la info en el navegador para que no haya que cargarla de nuevo
                        sessionStorage.setItem('page-'+page, JSON.stringify(resultado.data));
                    } 
                }
            }
        });

        objAjax.open('POST', ajaxFile);

        //Send the proper header information along with the request
        objAjax.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

        objAjax.send(parametros);
    }
}

function setPages(paginas) {
    var contenedorPages = document.querySelector('#contenedor-paginas');
    
    //si ya están las paginas se omite
    if ( contenedorPages.childElementCount > 0){
        
        return false;

    } else {

        //de lo contrario se arman las paginas

        for (var i = 0; i < paginas.totales; i++) {
            
            var li = document.createElement('li');
            li.setAttribute('data-page', i);
            if ( i == 0 ) {
                li.classList.add('activo');
            }
            
            li.addEventListener('click', function(){
                
                getLastLocations(this.getAttribute('data-page'));

                var liPages = document.querySelectorAll('#contenedor-paginas li');
                
                for (var j = 0; j < liPages.length; j++) {
                    liPages[j].classList.remove('activo');
                }
        
                //le agrego la clase activo
                this.classList.add('activo');
                
            });

            contenedorPages.appendChild(li);
        }
    }
}

function htmlLocationsThumbnails(locations) {
    var contenedorLocations = document.querySelector('#contenedor-artes');
    contenedorLocations.innerHTML = '';

    for (var i = 0; i < locations.length; i++) {
        var location = locations[i];
        var html = '';

        var li = document.createElement('li');
        
        html +=    '<article data-id="'+location.id+'" class="art-elementor animate-fade-in">';
            //imagen vacia
            if ( location.data.imagen.length == 0 || ( location.data.imagen.length == 1 && location.data.imagen.length == ' ') ) {
                html += '<img src="contenido/muestra1@3x.jpg" srcset="contenido/muestra1.jpg 1x, contenido/muestra1@2x.jpg 2x, contenido/muestra1@3x.jpg 3x" alt="Art Locator Chesterfield" class="imagen">';

            } else if ( location.data.imagen.length < 1 ) {
                //imagen unica
                html +=  '<img src="'+contenidoUrl + location.data.imagen[0] +'" alt="'+location.data.titulo+'" class="imagen">';
            } else {
                //muchas imagenes
                html +=  '<img src="'+contenidoUrl + location.data.imagen[0] +'" srcset="';
                for (var j = 0; j < location.data.imagen.length; j++) {
                    image = location.data.imagen[j];
                    html += contenidoUrl + location.data.imagen[j] + ' ' + parseInt(j+1) + 'x, ';
                }
                html +=  '" alt="'+location.data.titulo+'" class="imagen">';
            }
                
        html +=        '<div class="wrapper-fav" data-id="'+location.id+'">';
        html +=            '<span class="number">'+location.likes+'</span>';
        html +=        '</div>';

        html +=    '</article>'
        
        li.innerHTML = html;

        contenedorLocations.appendChild(li);

    }
    
}

function openMore (id) {
    //wrapper
    var wrapper = document.querySelector('.more-content-wrapper');
    var contenedor = document.querySelector('.more-content-inner ');
    var contenido = document.querySelector('#contenido');
    var closeButton = document.querySelector('#close-btn');

    if ( contenido.getAttribute('data-id') != id ) {

        //remueve el contenido
        contenido.innerHTML = '';

        //arma el contenido de la ventana   
        var html = makeContentPopup(id);

        contenido.innerHTML = html;

        //activa galeria before after
        var dataGaleria = document.querySelector('#data-before-after');
        if ( dataGaleria != null) {
            new beforeAfter({
                'el'     : 'before-after', // or just the node object
                'before' : dataGaleria.children[0].src,
                'after'  : dataGaleria.children[1].src
            });
        }

    } 
    

    //display block to wrapper
    wrapper.style.display = 'block'

    //asigna el tamaño al contenedor interno
    setTimeout( function(){
        contenedor.style.width = wrapper.getBoundingClientRect().width + 'px';
        contenedor.style.height = wrapper.getBoundingClientRect().height + 'px';
    },100);
    
    //agrega el evento para cerrar la ventana
    closeButton.addEventListener('click', closeMore, false);
}

function closeMore() {
    var closeButton = document.querySelector('#close-btn');
    var wrapper = document.querySelector('.more-content-wrapper');
    var contenedor = document.querySelector('.more-content-inner ');

    //asigna el tamaño al contenedor interno para que vuelva a cero
    contenedor.style.width = '0';
    contenedor.style.height = '0';

    //display none to wrapper
    setTimeout( function(){
        wrapper.style.display = 'none';
    },900);

    //remueve el evento
    closeButton.removeEventListener('click', closeMore, false);
}

/*
 * ARMA EL CONTENIDO DEL POPUP
 * busca en locations cargada a travez del id que recibe como parametro
*/
function makeContentPopup(id) {
    var html, marker;

    for (var index = 0; index < locations.length; index++) {
        if ( locations[index].id == id ) {
            marker = locations[index];
            break;
        }
    }

    if ( marker == undefined ) {
        html = '<p>No se encontró el  contenido</p>';
    } else {
        var titulo, tag, video, texto, direccion, imagen, imagenes, likes;

        titulo = marker.data.titulo != '' ? marker.data.titulo : '';
        tag = marker.data.tag != '' ? marker.data.tag : '';
        texto = marker.data.excerpt != '' ? marker.data.excerpt : '';
        imagen = marker.data.imagen != '' ? marker.data.imagen : '';
        direccion = marker.data.direccion != '' ? marker.data.direccion : '';
        video = marker.data.video;
        imagenes = marker.data.imagenes;
        likes = marker.likes != '' ? marker.likes : '';
        
        html = `
            <article class="art-popup-wrapper">
                <div class="video-wrapper">
                    <div class="title-wrapper">
                        <h1 class="title">`
                        + titulo +    
                        `</h1>
                        <h5>`
                        + tag +   
                        `</h5>
                    </div>
                    <div class="video">
                        <button class="playbtn" id="play" onclick="videoToogle(this)"></button>`;

                        html +=  '<video id="videolocator" height="100%" poster="'+imagen[0]+'">';
                            for (var i = 0; i < video.length; i++) {
                                html += '<source src="'
                                
                                html += video[i];
                                
                                html += '" type="video/';
                                    if ( video[i].search('mp4') != -1 ) {
                                        html += 'mp4';
                                    } else if ( video[i].search('ogg') != -1 ) {
                                        html += 'ogg';
                                    } else {
                                        html += 'webm';
                                    }
                                html += '">'
                            }
                            html += '<img src="'+imagen[0]+'">';
                        html += '</video>';

        html +=     `</div>
                </div>
                `;
        html += `        
                <div class="contenido-wrapper">`;

        if ( likes != '' ) {
            html +=     `
                        <div class="wrapper-fav">
                            <span class="number">`
                                +likes+
                            `
                            </span>
                        </div>`;
        }
        html +=     `
                    <div class="text-wrapper">
                        <div class="text">`
                            + texto + 
                        `</div>
                        <div class="direccion">`
                            + direccion +
                        `</div>
                    </div>
                </div>
                <div class="galeria-wrapper">
                `;
                    //galeria antes y despuess
                    if ( imagenes.length == 2 && ( imagenes[0] != '' || imagenes[1] != ''  ) ) {
                        html +=  '<div id="before-after" class="before-after"></div>';
                        html += '<div id="data-before-after" class="before-after" data-before-after style="display:none">';
                            html += '<img src="'+imagenes[0]+'"></img>';
                            html += '<img src="'+imagenes[1]+'"></img>';
                        html += '</div>';

                    } else if ( imagenes.length > 0 && ( imagenes[0] != '' || imagenes[1] != ''  ) ) {
                        if ( imagenes[0] != '' ) {
                            html += '<img src="'+imagenes[0]+'">';
                        } else {
                            if ( imagenes[1] != '' ) {
                                html += '<img src="'+imagenes[0]+'">';
                            }
                        }
                        
                    } else {
                        html += '<img src="'+imagen[0]+'">';
                    }
        html += ` 
                </div>
                <div class="wrapper-pag">
                    <span id="pops-pag-left" class="pag-direction"></span>
                    <span id="pops-pag-right" class="pag-direction"></span>
                    <ul class="pagination-art">
                        <li class="activo"></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                    </ul>
                </div>
            </article>
        `;
    }

    return html;
}

function videoToogle(el) {
    el.classList.toggle('playing');
    var video = document.getElementById('videolocator')
    if (video.paused ) {
        video.play();
    } else {
        video.pause();
    }
    
}

/*
 * MAPA
 * google maps api y markers
*/
function initMap() {
    console.log('hola')
    google.maps.event.addDomListener(window, 'load', initArtLocator);
}

//al hacer clic en ver mas en los markers, se pasa el objeto para rescatar el id del marker y luego pasarla a la funcion de abrir el popup
function openMoreId(object) {
    var id = object.getAttribute('data-id');
    openMore(id);
}

function initArtLocator() {

    var center = new google.maps.LatLng(centerMapDefault[0], centerMapDefault[1]);

    var colores = [
        {
          featureType: "all",
          elementType: "all",
          stylers: [
            { saturation: -100 }
          ]
        }
    ];

    var mapOptions = {
        zoom: 7,
        center: center,
        mapTypeControl: false,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    var map = new google.maps.Map(document.getElementById('map'),mapOptions);

    var estilo = new google.maps.StyledMapType(colores);
    map.mapTypes.set('mapa-bn', estilo);
    map.setMapTypeId('mapa-bn');
    
    // A new Info Window is created and set content
    var infowindow = new google.maps.InfoWindow({
        // Assign a maximum value for the width of the infowindow allows
        // greater control over the various content elements
        maxWidth: 350
    });
    
    // AGREGA LOS MARKERS DE LOCATIONS 
    // ademas agrega el clic en el marker
    var marker, i;

    for (i = 0; i < locations.length; i++) {  
        marker = new google.maps.Marker({
          position: new google.maps.LatLng(locations[i].lat, locations[i].long),
          map: map,
          title:locations[i].titulo,
        });
  
        google.maps.event.addListener(marker, 'click', (function(marker, i) {
          return function() {
            infowindow.setContent(makeContent(locations[i]));
            infowindow.open(map, marker);
          }
        })(marker, i));
      }

  
    // Event that closes the Info Window with a click on the map
    google.maps.event.addListener(map, 'click', function() {
        infowindow.close();
    });

    //arma el contenido del marker de acuerdo al array de locations
    function makeContent(contenido) {
        var html = '';
        if ( contenido.data === undefined || contenido.data == null || contenido.data == ''  ) {

            html += '<div class="mapinfo-wrapper"><div style="height: 30px;"></div><h1 class="title" style="padding-bottom:2em">';
            html +=         contenido.titulo;
            html +=     '</h1>';
            if ( contenido.data.popup ) {
                html +=     '<button onclick="openMoreId(this)" id="vermas-btn-marker" class="ver-mas-btn" data-id="';
                html +=         contenido.id;
                html +=     '">+ Ver más</button>';
            }
            html +=  '</div>';

        } else {

            html += '<div class="mapinfo-wrapper">';
            html +=    '<figure class="imagen-destacada">';
            if ( contenido.data.imagen.length > 0 && contenido.data.imagen[0] != '') {
                html +=     '<img src="' + contenido.data.imagen[0] + '"';
                if ( contenido.data.imagen.length > 1 ) {
                    html +=     'srcset="' + contenido.data.imagen[0] + ' 1x, ' + contenido.data.imagen[1] + ', 2x"';
                }
                html +=    '>';
            }
            if ( parseInt(contenido.likes) > 0 ) {
                html +=        '<div class="wrapper-fav"><span class="number">' + contenido.likes + '</span></div>';
            }
            html +=    '</figure>';
            html +=    '<h1 class="title">';
            html +=         contenido.data.titulo;
            html +=     '</h1>';
            html +=    '<h5 class="tag">';
            html +=     contenido.data.tag
            html +=     '</h5>';
            html +=     '<p class="excerpt">';
            html +=     contenido.data.excerpt
            html +=     '</p>';
            html +=     '<address class="direccion">';
            html +=     contenido.data.direccion;
            html +=     '</address>';
            if ( contenido.data.popup ) {
                html +=     '<button onclick="openMoreId(this)" id="vermas-btn-marker" class="ver-mas-btn" data-id="';
                html +=         contenido.id;
                html +=     '">Ver más</button>';
            }
            html +=  '</div>';

        }

        return html;
    }


    // *
    // START INFOWINDOW CUSTOMIZE.
    // The google.maps.event.addListener() event expects
    // the creation of the infowindow HTML structure 'domready'
    // and before the opening of the infowindow, defined styles are applied.
    // *
    google.maps.event.addListener(infowindow, 'domready', function() {

        //colocar el boton
        var btnCloseMarker = document.querySelector('.gm-style-iw-c').children[1];
        btnCloseMarker.style.backgroundColor = '#fff';
        btnCloseMarker.style.width = '40px';
        btnCloseMarker.style.height = '40px';
        btnCloseMarker.style.top = '0.5em';
        btnCloseMarker.style.right = '1em';
        btnCloseMarker.style.zIndex = '999';
        btnCloseMarker.style.borderRadius = '50%';
        //cambiar la cruz a blanco y editar estilos
        var imgCruz = btnCloseMarker.children[0];
        var imgSVG = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCI+PGRlZnM+PHN0eWxlPi5he2ZpbGw6bm9uZTt9LmJ7Y2xpcC1wYXRoOnVybCgjYSk7fS5je2ZpbGw6I2ZmZjt9LmR7ZmlsbDojM2UzZTNlO308L3N0eWxlPjxjbGlwUGF0aCBpZD0iYSI+PHJlY3QgY2xhc3M9ImEiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIvPjwvY2xpcFBhdGg+PC9kZWZzPjxnIGNsYXNzPSJiIj48Y2lyY2xlIGNsYXNzPSJjIiBjeD0iMjAiIGN5PSIyMCIgcj0iMjAiLz48cGF0aCBjbGFzcz0iZCIgZD0iTTguNzUsMjBWMTEuMjVIMFY4Ljc1SDguNzVWMGgyLjVWOC43NUgyMHYyLjVIMTEuMjVWMjBaIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSg2IDIwLjE0Mikgcm90YXRlKC00NSkiLz48L2c+PC9zdmc+'
        
        imgCruz.setAttribute('src', imgSVG);
        imgCruz.style.width = '40px';
        imgCruz.style.height = '40px';
        imgCruz.style.margin = '0';

    });
}//initartlocator

/*
 * FUNCIONES AJAX
*/
//recupera el contenido buscando locations
function getLocationsByUbicacion( ubicacion ) {
    var objAjax;
    var parametros = 'function=load-locations-ubicacion';
    if ( ubicacion != null ) {
        parametros += '&' + ubicacion;
    }
    
    objAjax = new XMLHttpRequest();
    objAjax.addEventListener('load', cargarCampos);
    objAjax.addEventListener('error', errorAjax);

    objAjax.open('POST', ajaxFile);

    //Send the proper header information along with the request
    objAjax.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    objAjax.send(parametros);

    function cargarCampos() {

        if (objAjax.status != 200) {
            errorAjax();
        } else {
            //console.log(objAjax.responseText);
            
            var resultado = JSON.parse(objAjax.responseText);
            
            console.log(resultado);

            return resultado;
        }
    }

    function errorAjax() {
        console.log('error');

        var error = objAjax.status;

        return error;
    }

}

function getLocationsPaginatedByDate( actualPage ) {
    var objAjax;

    var parametros = 'function=load-locations-by-last-date-paginated';
    parametros += '&pagina='+actualPage;
    
    objAjax = new XMLHttpRequest();
    objAjax.addEventListener('load', cargarCampos);
    objAjax.addEventListener('error', errorAjax);

    objAjax.open('POST', ajaxFile);

    //Send the proper header information along with the request
    objAjax.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    objAjax.send(parametros);

    function cargarCampos() {

        if (objAjax.status != 200) {
            errorAjax();
        } else {
            //console.log(objAjax.responseText);
            
            var resultado = JSON.parse(objAjax.responseText);
            
            console.log(resultado);

            return resultado;
        }
    }

    function errorAjax() {
        console.log('error');

        var error = objAjax.status;

        return error;
    }

}

function myGeoLocation(){

	if (navigator.geolocation)
	{
		navigator.geolocation.getCurrentPosition(function(objPosition)
		{
			var lon = objPosition.coords.longitude;
			var lat = objPosition.coords.latitude;

			console.log(lat, lon)

		}, function(objPositionError)
		{
			switch (objPositionError.code)
			{
				case objPositionError.PERMISSION_DENIED:
					console.log("No se ha permitido el acceso a la posición del usuario.");
				break;
				case objPositionError.POSITION_UNAVAILABLE:
					console.log("No se ha podido acceder a la información de su posición.");
				break;
				case objPositionError.TIMEOUT:
					console.log("El servicio ha tardado demasiado tiempo en responder.");
				break;
				default:
					console.log("Error desconocido.");
			}
		}, {
            enableHighAccuracy: false,//Si el dispositivo y el usuario lo permiten el navegador intentará obtener la ubicación del usuario con una mayor precisión. Esto suele suponer un mayor coste de recursos.
			maximumAge: 75000,//Antigüedad máxima en milisegundos. Con el valor por defecto (0), cada vez que se pide la posición se vuelve a calcular. Si ponemos algún valor mayor que cero, se busca en la caché y si hay una posición tomada anteriormente no más antigua que el valor dado, se devuelve inmediatamente, ahorrando muchos recursos. Con el valor Infinity siempre se devolverá un valor de la caché.
			timeout: 15000//Tiempo de espera máximo para obtener la posición en milisegundos. Este tiempo empieza a contar desde que el usuario da su permiso, no antes.
		});
	}
	else
	{
		console.log("Su navegador no soporta la API de geolocalización.");
	}
}