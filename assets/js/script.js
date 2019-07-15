/**
 * File script.js
 *
*/
document.addEventListener('DOMContentLoaded', function() {
    
    console.log('ready');
    
});


window.addEventListener('load', function() {
    
    console.log('load');

});

/*
 * FUNCIONES
*/
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
        contenedor.style.width = window.innerWidth + 'px';
        contenedor.style.height = window.innerHeight + 'px';
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
        var titulo, tag, video, texto, direccion, imagen, imagenes;

        titulo = marker.data.titulo != '' ? marker.data.titulo : '';
        tag = marker.data.tag != '' ? marker.data.tag : '';
        texto = marker.data.excerpt != '' ? marker.data.excerpt : '';
        imagen = marker.data.imagen != '' ? marker.data.imagen : '';
        direccion = marker.data.direccion != '' ? marker.data.direccion : '';
        video = marker.data.video;
        imagenes = marker.data.imagenes;
        
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

                        html +=  '<video id="videolocator" height="100%" poster="'+imagen+'">';
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
                            html += '<img src="'+imagen+'">';
                        html += '</video>';

        html +=     `</div>
                </div>
                `;
        html += `        
                <div class="contenido-wrapper">
                    <div class="text-wrapper">
                        <div class="text">`
                            + texto + 
                        `</div>
                        <div class="direcion">`
                            + direccion +
                        `</div>
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
                        html += '<img src="'+imagen+'">';
                    }
        html += ` 
                    </div>
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
    google.maps.event.addDomListener(window, 'load', initArtLocator);
}

//al hacer clic en ver mas en los markers, se pasa el objeto para rescatar el id del marker y luego pasarla a la funcion de abrir el popup
function openMoreId(object) {
    var id = object.getAttribute('data-id');
    openMore(id);
}

function initArtLocator() {

    var center = new google.maps.LatLng(centerMap[0], centerMap[1]);

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
        btnCloseMarker.style.backgroundColor = '#000';
        btnCloseMarker.style.top = '0.5em';
        btnCloseMarker.style.right = '1em';
        //cambiar la cruz a blanco
        var imgCruz = btnCloseMarker.children[0];
        
        var imgSVG = 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAxNi4yLjEsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+DQo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4Ig0KCSB3aWR0aD0iNTEycHgiIGhlaWdodD0iNTEycHgiIHZpZXdCb3g9IjAgMCA1MTIgNTEyIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA1MTIgNTEyOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+DQo8cGF0aCBmaWxsPSIjZmZmZmZmIiBkPSJNNDM3LjUsMzg2LjZMMzA2LjksMjU2bDEzMC42LTEzMC42YzE0LjEtMTQuMSwxNC4xLTM2LjgsMC01MC45Yy0xNC4xLTE0LjEtMzYuOC0xNC4xLTUwLjksMEwyNTYsMjA1LjFMMTI1LjQsNzQuNQ0KCWMtMTQuMS0xNC4xLTM2LjgtMTQuMS01MC45LDBjLTE0LjEsMTQuMS0xNC4xLDM2LjgsMCw1MC45TDIwNS4xLDI1Nkw3NC41LDM4Ni42Yy0xNC4xLDE0LjEtMTQuMSwzNi44LDAsNTAuOQ0KCWMxNC4xLDE0LjEsMzYuOCwxNC4xLDUwLjksMEwyNTYsMzA2LjlsMTMwLjYsMTMwLjZjMTQuMSwxNC4xLDM2LjgsMTQuMSw1MC45LDBDNDUxLjUsNDIzLjQsNDUxLjUsNDAwLjYsNDM3LjUsMzg2LjZ6Ii8+DQo8L3N2Zz4NCg==';

        imgCruz.setAttribute('src', imgSVG);

    });
}