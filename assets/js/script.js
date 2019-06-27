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
 * MAPA
*/
function initMap() {
    google.maps.event.addDomListener(window, 'load', initArtLocator);
}

// InfoWindow content
/*var contentEjemplo = '<div id="iw-container">' +
'<div class="iw-title">Porcelain Factory of Vista Alegre</div>' +
'<div class="iw-content">' +
'<div class="iw-subTitle">History</div>' +
'<img src="http://maps.marnoto.com/en/5wayscustomizeinfowindow/images/vistalegre.jpg" alt="Porcelain Factory of Vista Alegre" height="115" width="83">' +
'<p>Founded in 1824, the Porcelain Factory of Vista Alegre was the first industrial unit dedicated to porcelain production in Portugal. For the foundation and success of this risky industrial development was crucial the spirit of persistence of its founder, José Ferreira Pinto Basto. Leading figure in Portuguese society of the nineteenth century farm owner, daring dealer, wisely incorporated the liberal ideas of the century, having become "the first example of free enterprise" in Portugal.</p>' +
'<div class="iw-subTitle">Contacts</div>' +
'<p>VISTA ALEGRE ATLANTIS, SA<br>3830-292 Ílhavo - Portugal<br>'+
'<br>Phone. +351 234 320 600<br>e-mail: geral@vaa.pt<br>www: www.myvistaalegre.com</p>'+
'</div>' +
'<div class="iw-bottom-gradient"></div>' +
'</div>';*/

var contentEjemplo = `
<div class="mapinfo-wrapper">
<figure class="imagen-destacada">
<img src="assets/images/imagen-destacada.png">
</figure>
<h1 class="title">
MARTE (Argentina)
</h1>
<h5 class="tag">
@marte_
</h5>
<p class="excerpt">
In efforts to expand our horizons, we welcome every investment-minded individual to join us.
</p>
<button onclick="openMoreId(this)" id="vermas-btn-marker" class="ver-mas-btn" data-id="#">+ Ver más</button>
</div>
`;

function openMoreId(object) {
    var id = object.getAttribute('data-id');
    console.log(id);
    openMore(id);
}

// marker options
var locations = [
    [1, 'Ciudad de Buenos Aires', -34.6078603, -58.383111, 4, contentEjemplo],
    [2, 'La Plata', -34.9205233, -57.9881898, 5, contentEjemplo],
    [3, 'Rosario', -32.9521898, -60.7666797, 3, contentEjemplo],
    [4, 'Mar del Plata', -38.0174836, -57.7406185, 2, contentEjemplo],
];

function initArtLocator() {

    var center = new google.maps.LatLng(-34.591444, -58.428068);

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
        //content: content,

        // Assign a maximum value for the width of the infowindow allows
        // greater control over the various content elements
        maxWidth: 350
    });
    
    // AGREGA LOS MARKERS DE LOCATIONS 
    // ademas agrega el clic en el marker
    var marker, i;

    for (i = 0; i < locations.length; i++) {  
        marker = new google.maps.Marker({
          position: new google.maps.LatLng(locations[i][2], locations[i][3]),
          map: map,
          title:locations[i][1],
        });
  
        google.maps.event.addListener(marker, 'click', (function(marker, i) {
          return function() {
            infowindow.setContent(locations[i][5]);
            infowindow.open(map, marker);
          }
        })(marker, i));
      }

  
    // Event that closes the Info Window with a click on the map
    google.maps.event.addListener(map, 'click', function() {
        infowindow.close();
    });



    // *
    // START INFOWINDOW CUSTOMIZE.
    // The google.maps.event.addListener() event expects
    // the creation of the infowindow HTML structure 'domready'
    // and before the opening of the infowindow, defined styles are applied.
    // *
    google.maps.event.addListener(infowindow, 'domready', function() {

        // Reference to the DIV that wraps the bottom of infowindow
        /*var iwOuter = $('.gm-style-iw');

        /* Since this div is in a position prior to .gm-div style-iw.
        * We use jQuery and create a iwBackground variable,
        * and took advantage of the existing reference .gm-style-iw for the previous div with .prev().
        */
        /*var iwBackground = iwOuter.prev();

        // Removes background shadow DIV
        /*iwBackground.children(':nth-child(2)').css({'display' : 'none'});

        // Removes white background DIV
        /*iwBackground.children(':nth-child(4)').css({'display' : 'none'});

        // Moves the infowindow 115px to the right.
        /*iwOuter.parent().parent().css({left: '115px'});

        // Moves the shadow of the arrow 76px to the left margin.
        /*iwBackground.children(':nth-child(1)').attr('style', function(i,s){ return s + 'left: 76px !important;'});

        // Moves the arrow 76px to the left margin.
        /*iwBackground.children(':nth-child(3)').attr('style', function(i,s){ return s + 'left: 76px !important;'});

        // Changes the desired tail shadow color.
        /*iwBackground.children(':nth-child(3)').find('div').children().css({'box-shadow': 'rgba(72, 181, 233, 0.6) 0px 1px 6px', 'z-index' : '1'});

        // Reference to the div that groups the close button elements.
        /*var iwCloseBtn = iwOuter.next();

        // Apply the desired effect to the close button
        /*iwCloseBtn.css({opacity: '1', right: '38px', top: '3px', border: '7px solid #48b5e9', 'border-radius': '13px', 'box-shadow': '0 0 5px #3990B9'});*/

        // If the content of infowindow not exceed the set maximum height, then the gradient is removed.
        /*if($('.iw-content').height() < 140){
            $('.iw-bottom-gradient').css({display: 'none'});
        }*/

        // The API automatically applies 0.7 opacity to the button after the mouseout event. This function reverses this event to the desired value.
        /*iwCloseBtn.mouseout(function(){
            $(this).css({opacity: '1'});
        });*/
    });
}