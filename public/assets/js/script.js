/**
 * File script.js
 *
*/
//VARIABLES DEFAULT
var baseurl = window.location.href;
var ajaxFile = window.location.href + 'inc/backend_api.php';
var contenidoUrl = baseurl + 'contenido/';
var centerMapDefault = [-34.591444, -58.428068];
var zoomDefault = 10;//original era 7
var videoLoad = false;
var numeroPagina;
var nombreVideo = '';
var autoSlideLocation;
var slideSpeed = 10000;

document.addEventListener('DOMContentLoaded', function() {
    
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


    /*
     * prepara el boton de buscar por ubicacion
     */
    document.querySelector('#zona-form').addEventListener('submit', function(e){
        e.preventDefault();
        document.querySelector('#close-btn').click();

        var prov = document.querySelector('#zona-provincia').value;

        if (prov == undefined){
            prov = null;
        }
        
        getLocationsByUbicacion(prov);
    });

    /*
     * prepara el boton de buscar por mi ubicacion
     */
    /*document.querySelector('#myLocationBtn').addEventListener('click', function(e){
        //cierra el popup si esta abierto
        document.querySelector('#close-btn').click();

        myGeoLocation();
    });*/

    /*
    * arma las ubicaciones del select
    */
    getSelectUbicaciones();

});


window.addEventListener('load', function() {

    /*
     * busca los ultimos kioskos y paginacion
     */
    //llama a las ultimas locacitions, pagina 0
    getLastLocations(0);
    
    //inicia el mapa buscando locaciones
    getLocationsByUbicacion(null);

});




/*
 * FUNCIONES
*/

//sirve para poner el video del header o para precargarlo en el movil
function playVideo() {
    
    //se carga el video
    var html = '';
    var backgroundHeader = document.querySelector('.background-header');
    var degradado = backgroundHeader.querySelector('.degradado');
    var videoWrapper = document.querySelector('#video-wrapper');
    var imagenHeader = document.querySelector('#imagen-header');
    var pantallaWidth = window.innerWidth;
    var btnCerrar = document.querySelector('#closevideo');
    var headerContent = document.querySelector('.header-content');

    if ( pantallaWidth > 960 ) {
        //cuando no es movil va mute es el video que dice sin placa
        html += '<div style="width:100%; height:0; position: relative; padding-bottom:177.77777777777777%"><iframe src="//neulandtv-argentina.videomarketingplatform.co/v.ihtml/player.html?token=d48d4229592f5ab26b760df6a699effc&source=embed&photo%5fid=54601734&autoPlay=1&endOn=thumbnail&hideBigPlay=1&loop=1&ambient=1&showTray=0" style="width:100%; height:100%; position: absolute; top: 0; left: 0;" frameborder="0" border="0" scrolling="no" allowfullscreen="1" mozallowfullscreen="1" webkitallowfullscreen="1" allow="autoplay; fullscreen"></iframe></div>';
    } else {
        //cuando es movil tiene sonido y es otro video
        html += '<div style="width:100%; height:0; position: relative; padding-bottom:177.77777777777777%"><iframe src="//neulandtv-argentina.videomarketingplatform.co/v.ihtml/player.html?token=d07e044be7ac6f203219b203697a591d&source=embed&photo%5fid=54601748&autoPlay=1&endOn=thumbnail&hideBigPlay=1&loop=1&ambient=0&showTray=0" style="width:100%; height:100%; position: absolute; top: 0; left: 0;" frameborder="0" border="0" scrolling="no" allowfullscreen="1" mozallowfullscreen="1" webkitallowfullscreen="1" allow="autoplay; fullscreen"></iframe></div>';
    }
    videoWrapper.innerHTML = html;
   
    /*if ( pantallaWidth > 960 ) {
        videoWrapper.querySelector('iframe').onload = function() {
            imagenHeader.style.opacity = 0;   
            //imagenHeader.style.zIndex = 1;  
        }
    } else {*/
        //subo el z index del fondo
        
        backgroundHeader.style.zIndex = 1111111111;
        headerContent.style.opacity = 0;
        imagenHeader.style.opacity = 0;   
        imagenHeader.style.zIndex = 1; 
        btnCerrar.style.zIndex = 1111;
        btnCerrar.style.opacity = 1;
        degradado.style.display = 'none';

        //activo el boton
        btnCerrar.addEventListener('click', function(){
            headerContent.style.opacity = 1;
            backgroundHeader.style.zIndex = 1;
            videoWrapper.innerHTML = '';
            imagenHeader.style.opacity = 1;  
            imagenHeader.style.zIndex = 11; 
            btnCerrar.style.zIndex = 1;
            btnCerrar.style.opacity = 0; 
            degradado.style.display = 'block';
        }, true);
    //}else q quedo borrado arriba
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
    if ( sessionStorage.getItem('pages_'+page) ) {
        
        //si esta guardado lo insertamos desde aca
        htmlLocationsThumbnails( JSON.parse( sessionStorage.getItem('pages_'+page) ) );

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
                //console.log(resultado)
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
                        sessionStorage.setItem('pages_'+page, JSON.stringify(resultado.data));
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

//setea las paginas de los locator pidiendo info al servidor
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

                clearInterval(autoSlideLocation);

                autoSlideLocation = setInterval(startAutoSlidePagesLocation, slideSpeed);
                
            });

            contenedorPages.appendChild(li);

        }
        
        autoSlideLocation = setInterval(startAutoSlidePagesLocation, slideSpeed);

    }
    
}


//ejecuta el paginado automatico
function startAutoSlidePagesLocation() {
    var liPages = document.querySelectorAll('#contenedor-paginas li');

    //quitamos la clase activo de todos
    for (var i = 0; i < liPages.length; i++) {
        liPages[i].classList.remove('activo');
    }

    //aumentamos la pagina
    numeroPagina++;
    
    if ( numeroPagina == liPages.length ) {

        ///vuelvo a cero las paginas
        numeroPagina = 0;
        getLastLocations(numeroPagina);    
        
        //marcamos cual pagina esta activa
        liPages[0].classList.add('activo');

    } else {

        //busca la otra pagina
        getLastLocations(numeroPagina);
        //marcamos cual pagina esta activa
        liPages[numeroPagina].classList.add('activo');
        
    }
    

}

function htmlLocationsThumbnails(locations) {
    var contenedorLocations = document.querySelector('#contenedor-artes');
    contenedorLocations.innerHTML = '';

    for (var i = 0; i < locations.length; i++) {
        var location = locations[i];
        var html = '';

        var li = document.createElement('li');
        
        html +=    '<article data-id="'+location.id+'" class="art-elementor animate-fade-in" onclick="openMore(this)">';
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
                
        html +=        '<div class="wrapper-fav" data-id="'+location.id+'" onclick="oneMoreLike(this)">';
        html +=            '<span class="number">'+location.likes+'</span>';
        html +=        '</div>';

        html +=    '</article>'
        
        li.innerHTML = html;

        contenedorLocations.appendChild(li);

    }
    
}

//suma likes al location
function oneMoreLike (e, id) {
    event.stopImmediatePropagation();
    
    if (id == undefined) {
        id = e.getAttribute('data-id');
    }

    var objAjax;

    var parametros = 'function=me_gusta';
    parametros+= '&id='+id;
    
    objAjax = new XMLHttpRequest();
    objAjax.addEventListener('error', errorAjax);
    objAjax.addEventListener('load', function(){
        if (objAjax.status != 200) {
            errorAjax();
        } else {
            //console.log(objAjax.responseText)
            var resultado = JSON.parse(objAjax.responseText);
            
            if ( resultado.respuesta.status != 'ok' ) {

                console.log(resultado.respuesta.error);

            } else {
                
                //muestra que se sumo un numero a los likes
                e.children[0].textContent = parseInt(e.children[0].textContent)+1;

                updateFilesSaved(id);
                
            }
        }
    });

    objAjax.open('POST', ajaxFile);

    //Send the proper header information along with the request
    objAjax.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    objAjax.send(parametros);

}


//esta funcion busca la location por id en la sesion store y actualiza sus datos, solo tiene que actualizar que se agregó un like
function updateFilesSaved(id) {
    
    if (! sessionStorage) {
        return true;
    }

    if ( sessionStorage.length > 0 ) {
        for (var key in sessionStorage) {
            if (sessionStorage.hasOwnProperty(key)) {

                var element = JSON.parse(sessionStorage[key]);
                //si la key tiene pages, es un paginado
                if ( key.indexOf('pages') != -1 ) {
                    //recorre los objetos a ver si encuentra
                    for (var j = 0; j < element.length; j++) {
                        if (element[j].id == id ) {
                            element[j].likes = parseInt(element[j].likes)+1;
                        }
                    }
                } else if ( key.indexOf('location') != -1 ) {
                    //si la key tiene location es un post simple

                    if (element.id == id ) {
                        element.likes = parseInt(element.likes)+1;
                    }
                }
            
            }
        }
    }
    
}

//abre el popup de las locations
function openMore (e, id) {
    var location;
    var wrapper = document.querySelector('.more-content-wrapper');
    var contenedor = document.querySelector('.more-content-inner ');
    var closeButton = document.querySelector('#close-btn');
    var contenido = document.querySelector('#contenido');

    if (id == undefined) {
        id = e.getAttribute('data-id');
    }


    //agrega el loader al contenido para que se vea que está cargando
    contenido.innerHTML = '<div class="loader" style="height:400px"><img src="assets/images/loader.gif" alt="loader"></div>';

    //display block to wrapper para que sea visible
    wrapper.style.display = 'block'
    
    //asigna el tamaño al contenedor interno para que haga la animacion
    setTimeout( function(){
        contenedor.style.width = wrapper.getBoundingClientRect().width + 'px';
        contenedor.style.height = wrapper.getBoundingClientRect().height + 'px';
    },100);

    if ( sessionStorage.getItem('location_'+id) ) {
        
        location = JSON.parse(sessionStorage.getItem('location_'+id));
        //busca el contenido localmente
        makeContentPopup(location);

    } else {
        //busca el contenido por ajax

        var objAjax;

        var parametros = 'function=load-location';
        parametros+= '&id='+id;
        
        objAjax = new XMLHttpRequest();
        objAjax.addEventListener('error', errorAjax);
        objAjax.addEventListener('load', function(){
            if (objAjax.status != 200) {
                errorAjax();
            } else {
                //console.log(objAjax.responseText)
                var resultado = JSON.parse(objAjax.responseText);
                
                if ( resultado.respuesta.status != 'ok' ) {

                    console.log(resultado.respuesta.error);

                    //si el error es que no hay mas posts, avisa que no hay más post y luego carga el anterior
                    if (resultado.respuesta.error == 'no-posts') {
                        contenido.innerHTML = '<p class="no-more-posts">No hay más lugares para cargar</p>';

                        setTimeout(function(){
                            var idAnterior = parseInt(id)-1;
                            openMore(null, idAnterior);
                        }, 2000);
                    }

                } else {
                    makeContentPopup(resultado.data);
                    
                    //guardamos la info en el navegador para que no haya que cargarla de nuevo
                    sessionStorage.setItem('location_'+id, JSON.stringify(resultado.data));
                }
            }
        });

        objAjax.open('POST', ajaxFile);

        //Send the proper header information along with the request
        objAjax.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

        objAjax.send(parametros);
    }

    //agrega el evento para cerrar la ventana
    closeButton.addEventListener('click', closeMore, true);

    wrapper.addEventListener('click', function(){
        var inner = document.querySelector('.more-content-inner');
        if ( event.target == inner ) {
            closeMore();
        }
    }, true);
    
}

function closeMore() {
    var closeButton = document.querySelector('#close-btn');
    var wrapper = document.querySelector('.more-content-wrapper');
    var contenedor = document.querySelector('.more-content-inner ');
    var btnLeft = document.querySelector('#pops-pag-left');
    var btnRight = document.querySelector('#pops-pag-right');

    //asigna el tamaño al contenedor interno para que vuelva a cero
    contenedor.style.width = '0';
    contenedor.style.height = '0';

    //display none to wrapper
    setTimeout( function(){
        wrapper.style.display = 'none';
    },900);

    //remueve el evento cerrar la ventana
    closeButton.removeEventListener('click', closeMore, false);

    wrapper.removeEventListener('click', function(){
        var inner = document.querySelector('.more-content-inner');
        if ( event.target == inner ) {
            closeMore();
        }
    }, true);

    //remueve el evento de los navegadores
    if (btnLeft != null ) {
        btnLeft.removeEventListener('click', navigateLocation);
    }
    if (btnRight != null ) {
        btnRight.removeEventListener('click', navigateLocation);
    }
}

//esta funcion es cuando se hace clic en las flechitas de navegacion de los popups
function navigateLocation() {
    var id = this.getAttribute('data-id');

    var btnLeft = document.querySelector('#pops-pag-left');
    var btnRight = document.querySelector('#pops-pag-right');

    if ( id == 0 ) {
        return false;
    }

    //quitamos eventos de navegacion
    btnLeft.removeEventListener('click', navigateLocation);
    btnRight.removeEventListener('click', navigateLocation);

    openMore (null, id);
}

/*
 * ARMA EL CONTENIDO DEL POPUP
 * busca en locations cargada a travez del id que recibe como parametro
*/
function makeContentPopup(location) {
    var html = '';
    var contenido = document.querySelector('#contenido');
    var closeButton = document.querySelector('#close-btn');

    //remueve el contenido
    contenido.innerHTML = '';

    //arma el contenido de la ventana   
    if ( location == 'none' ) {
        html = '<p>No se encontró el  contenido</p>';
    } else {
        var titulo, tag, video, texto, direccion, imagen, imagenes, likes;
        var kiosko = location.titulo != '' ? location.titulo : '';
        var titulo = location.data.titulo != '' ? location.data.titulo : '';
        var tag = location.data.tag != '' ? location.data.tag : '';
        var texto = location.data.texto != '' ? location.data.texto : '';
        var imagen = location.data.imagen != '' ? location.data.imagen : '';
        var direccion = location.data.direccion != '' ? location.data.direccion : '';
        var video = location.data.video;
        var imagenes = location.data.imagenes;
        var likes = location.likes != '' ? location.likes : '';
        
        html = `
            <article class="art-popup-wrapper">
                <div class="video-wrapper">
                    <div class="title-wrapper"></div>
                    <div class="video">`
                    if( video != '' ) {
                        `<button class="playbtn" id="play" onclick="videoToogle(this)"></button>`;
                    }
                        html +=  '<video id="videolocator" height="100%" poster="'+contenidoUrl+imagen[0]+'">';
                            for (var i = 0; i < video.length; i++) {
                                html += '<source src="';
                                
                                html += contenidoUrl + video[i];
                                
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
                            html += '<img src="'+contenidoUrl+imagen[0]+'">';
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
                        <div class="title-wrapper">`;

            if ( tag != '' ) {
                html += '<h5>Artista: '+ tag + '</h5>';
            }
            if ( titulo != '' ) {
                html += '<h1 class="title">Obra: '+ titulo + '</h1>';
            }
                            
        html +=         `</div>
                        <div class="text">`
                            + texto + 
                        `</div>
                        <div class="direccion">`
                            + direccion +
                        `</div>
                    </div>
                </div>
                `;
                if(imagenes != '') {
                    html +=  '<div class="galeria-wrapper">';
                    //galeria antes y despues
                    html +=  '<div id="before-after" class="before-after"></div>';
                        html += '<div id="data-before-after" class="before-after" data-before-after style="display:none">';
                    if ( imagenes.antes.length > 1 || imagenes.despues.length > 1) {
                        html += '<img src="'+contenidoUrl+imagenes.antes[0]+'" srcset="';

                        if (imagenes.antes.length > 1) {
                            for (var im = 0; im < imagenes.antes.length; im++) {
                                html += contenidoUrl+imagenes.antes[im] + ' '+ im+1 + 'x,';
                            }
                        }

                        html += '"></img>';
                        html += '<img src="'+contenidoUrl+imagenes.despues[0]+'" srcset="';
                        if (imagenes.despues.length > 1) {
                            for (var ima = 0; ima < imagenes.despues.length; ima++) {
                                html += contenidoUrl+imagenes.despues[ima] + ' '+ ima+1 + 'x,';
                            }
                        }   

                        html += '"></img>';
                    
                    } else {
                        //imagenes por defecto
                        html += '<img src="'+contenidoUrl+imagenes.antes[0]+'">';
                        html += '<img src="'+contenidoUrl+imagenes.despues[0]+'"></img>';
                    }
                    html += '</div>';
                }
                html += '</div>';
        html += ` 
                <div class="wrapper-pag">
                    <span data-id="`+(parseInt(location.id)-1)+`" id="pops-pag-left" class="pag-direction"></span>
                    <span data-id="`+(parseInt(location.id)+1)+`" id="pops-pag-right" class="pag-direction"></span>
                    <ul class="pagination-art">
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                    </ul>
                </div>
            </article>
        `;
    }

    //inserta el contenido
    contenido.innerHTML = html;

    //activa galeria before after
    setTimeout(function(){
        var dataGaleria = document.querySelector('#data-before-after');
        if ( dataGaleria != null) {
            new beforeAfter({
                'el'     : 'before-after', // or just the node object
                'before' : dataGaleria.children[0].src,
                'after'  : dataGaleria.children[1].src
            });
        }
    },900)
    

    //agrega los botones de navegacion
    var btnLeft = document.querySelector('#pops-pag-left');
    var btnRight = document.querySelector('#pops-pag-right');

    btnLeft.addEventListener('click', navigateLocation);
    btnRight.addEventListener('click', navigateLocation);
    
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
/*function initMap() {
    console.log('hola')
    google.maps.event.addDomListener(window, 'load', initArtLocator);
}*/

//al hacer clic en ver mas en los markers, se pasa el objeto para rescatar el id del marker y luego pasarla a la funcion de abrir el popup
function openMoreId(object) {
    var id = object.getAttribute('data-id');
    openMore(null, id);
}


//esta funcion inica el mapa
function initArtLocator(latitud, longitud, zoomMapa, locations) {
    var divMap = document.getElementById('map');
    divMap.innerHTML = '';
    var center = new google.maps.LatLng(latitud, longitud);
    
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
        zoom: zoomMapa,
        center: center,
        mapTypeControl: false,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    var map = new google.maps.Map(divMap,mapOptions);

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
        var imagenMarker = '';
        if (locations[i].markerImage != '') {
            imagenMarker = contenidoUrl + locations[i].markerImage;
        }
        marker = new google.maps.Marker({
          position: new google.maps.LatLng(locations[i].lat, locations[i].long),
          map: map,
          icon: {
            url: imagenMarker,
            scaledSize: new google.maps.Size(33,43)
          },
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
                html +=     '<img src="' + contenidoUrl + contenido.data.imagen[0] + '"';
                if ( contenido.data.imagen.length > 1 ) {
                    html +=     'srcset="' + contenidoUrl + contenido.data.imagen[0] + ' 1x, ' + contenidoUrl + contenido.data.imagen[1] + ', 2x"';
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
        parametros += '&ubicacion=' + ubicacion;
    }
    
    objAjax = new XMLHttpRequest();
    objAjax.addEventListener('load', function(){

        if (objAjax.status != 200) {
            errorAjax();
        } else {
            //console.log(objAjax.responseText);
            
            var resultado = JSON.parse(objAjax.responseText);

            if ( resultado.respuesta.status != 'ok' ) {
                console.log(resultado.respuesta.error);
            } else {
                //console.log(resultado);

                let latitud = centerMapDefault[0],
                    longitud = centerMapDefault[1]
                    zoom = zoomDefault;
                   
                if (resultado.ubicacion != null ) {
                    if (resultado.ubicacion.latitud != '') {
                        latitud = resultado.ubicacion.latitud;
                    }
                    if (resultado.ubicacion.longitud != '') {
                        longitud = resultado.ubicacion.longitud;
                    }
                    if (resultado.ubicacion.zoom != '') {
                        zoom = parseFloat(resultado.ubicacion.zoom);
                    } 
                }
                
                initArtLocator(latitud, longitud, zoom, resultado.data);
            }

        }
    });

    objAjax.open('POST', ajaxFile);

    //Send the proper header information along with the request
    objAjax.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    objAjax.send(parametros);
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
                    sendMsjNavigation('No se ha permitido el acceso a la posición del usuario.');
				break;
				case objPositionError.POSITION_UNAVAILABLE:
                    console.log("No se ha podido acceder a la información de su posición.");
                    sendMsjNavigation('No se ha podido acceder a la información de su posición.');
				break;
				case objPositionError.TIMEOUT:
                    console.log("El servicio ha tardado demasiado tiempo en responder.");
                    sendMsjNavigation('El servicio no responde');
				break;
				default:
                    console.log("Error desconocido.");
                    sendMsjNavigation('Geolocalización no permitida');
			}
		}, {
            enableHighAccuracy: false,//Si el dispositivo y el usuario lo permiten el navegador intentará obtener la ubicación del usuario con una mayor precisión. Esto suele suponer un mayor coste de recursos.
			maximumAge: 75000,//Antigüedad máxima en milisegundos. Con el valor por defecto (0), cada vez que se pide la posición se vuelve a calcular. Si ponemos algún valor mayor que cero, se busca en la caché y si hay una posición tomada anteriormente no más antigua que el valor dado, se devuelve inmediatamente, ahorrando muchos recursos. Con el valor Infinity siempre se devolverá un valor de la caché.
			timeout: 15000//Tiempo de espera máximo para obtener la posición en milisegundos. Este tiempo empieza a contar desde que el usuario da su permiso, no antes.
		});
	}
	else
	{
        console.log('Su navegador no soporta la API de geolocalización.');
        sendMsjNavigation('Geolocalización no permitida');
	}
}

function sendMsjNavigation(msj) {
    var btn = document.querySelector('#myLocationBtn');
        btn.parentElement.innerHTML = '<p style="font-size:10px;">'+msj+'</p>';
}

function smoothScroll(eID) {

    //toma la posicion del elemento, el cual debe pasarse para que sea uno solo por queryselector: '.clase', '#id', 'tag'
    function elmYPosition(eID) {
        var elm = document.querySelector(eID);
        var y = elm.offsetTop;
        var node = elm;
        while (node.offsetParent && node.offsetParent != document.body) {
            node = node.offsetParent;
            y += node.offsetTop;
        }
        return y;
    }
    
    //toma la posicion actual de la ventana
    function currentYPosition() {
        // Firefox, Chrome, Opera, Safari
        if (self.pageYOffset) return self.pageYOffset;
        // Internet Explorer 6 - standards mode
        if (document.documentElement && document.documentElement.scrollTop)
            return document.documentElement.scrollTop;
        // Internet Explorer 6, 7 and 8
        if (document.body.scrollTop) return document.body.scrollTop;
        return 0;
    }


    //smoth scroll
    var startY = currentYPosition();
    var stopY = elmYPosition(eID);
    var distance = stopY > startY ? stopY - startY : startY - stopY;
    if (distance < 100) {
        scrollTo(0, stopY); return;
    }
    var speed = Math.round(distance / 100);
    if (speed >= 20) speed = 20;
    var step = Math.round(distance / 25);
    var leapY = stopY > startY ? startY + step : startY - step;
    var timer = 0;
    if (stopY > startY) {
        for ( var i=startY; i<stopY; i+=step ) {
            setTimeout("window.scrollTo(0, "+leapY+")", timer * speed);
            leapY += step; if (leapY > stopY) leapY = stopY; timer++;
        } return;
    }
    for ( var i=startY; i>stopY; i-=step ) {
        setTimeout("window.scrollTo(0, "+leapY+")", timer * speed);
        leapY -= step; if (leapY < stopY) leapY = stopY; timer++;
    }
}