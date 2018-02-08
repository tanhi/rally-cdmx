var comments = [];
var $commentInput = $("#comment-Input");

function loadPage() {
  $('.modal').modal();
  $(".button-collapse").sideNav();
  $('.tap-target').tapTarget('open');
  $('.tap-target').tapTarget('close');
  $('.parallax').parallax();
  $("#form").submit(addComment);
  $commentInput.keyup(validateComment);
}

function validateComment () {
  var $containerAddComment = $("#add-comment");

  if($($commentInput).val().trim().length > 0) {
    $containerAddComment.removeAttr("disabled");
  } else {
    $containerAddComment.attr("disabled", true); 
  }
}

function addComment(e) {
  e.preventDefault();
  // Con estas lineas toman el valor del usuario agrega los inputs y los guarda en variables
  var comment = $commentInput.val();
  // Con las variables separadas que obtuvimos creamos una estructura de datos unica, un objeto por cada contacto
  var comment = {
    "newComment": comment,
  };

  // Agregamos el contacto a nuestra data para poder filtrar y eliminar posteriormente
  comments.push(comment);
  //console.log(comments);
  // Esta funcion pinta en el html
  paintCommentsInHtml(comment);
  
  // limpiando valores del form
  $commentInput.val(" ");
}

function paintCommentsInHtml (comment) {
  // crear elementos con DOM
  var $newComment = $("<div />", {
    "class": "card-panel hoverable"
  });
  var $containerComment = $("<p />");

  // Asignando valores
  $containerComment.text(comment.newComment);
  $newComment.append($containerComment);

   console.log($newComment);
  // agregamos lo que creamos con el Dom a un elemento existente del html


  $("#publish-comments").prepend($newComment);
  
}

//MAPA



function initMap() {
  var directionsService = new google.maps.DirectionsService;
  var directionsDisplay = new google.maps.DirectionsRenderer;
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 6,
    center: {lat: 41.85, lng: -87.65}
  });
  directionsDisplay.setMap(map);

  document.getElementById('submit').addEventListener('click', function() {
    calculateAndDisplayRoute(directionsService, directionsDisplay);
  });
}

function calculateAndDisplayRoute(directionsService, directionsDisplay) {
  var waypts = [];
  var checkboxArray = document.getElementById('waypoints');
  for (var i = 0; i < checkboxArray.length; i++) {
    if (checkboxArray.options[i].selected) {
      waypts.push({
        location: checkboxArray[i].value,
        stopover: true
      });
    }
  }

  directionsService.route({
    origin: document.getElementById('start').value,
    destination: document.getElementById('end').value,
    waypoints: waypts,
    optimizeWaypoints: true,
    travelMode: 'DRIVING'
  }, function(response, status) {
    if (status === 'OK') {
      directionsDisplay.setDirections(response);
      var route = response.routes[0];
      var summaryPanel = document.getElementById('directions-panel');
      summaryPanel.innerHTML = '';
      // For each route, display summary information.
      for (var i = 0; i < route.legs.length; i++) {
        var routeSegment = i + 1;
        summaryPanel.innerHTML += '<b>Route Segment: ' + routeSegment +
            '</b><br>';
        summaryPanel.innerHTML += route.legs[i].start_address + ' to ';
        summaryPanel.innerHTML += route.legs[i].end_address + '<br>';
        summaryPanel.innerHTML += route.legs[i].distance.text + '<br><br>';
      }
    } else {
      window.alert('Directions request failed due to ' + status);
    }
  });
}



  $(document).ready(loadPage);