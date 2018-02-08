var filterElements = function (e) {
    var selectedIndex = e.target.selectedIndex;
    //manejamos los atributos data
    var index = e.target[selectedIndex].dataset.index;
    console.log(index);
  
    obtenerDatos(ruta, index)
  
  }
 
  var obtenerDatos = function(ruta, index){
    
    var name= ruta[index]["name"];
    var vicinity=ruta[index]["vicinity"];
    var description=ruta[index]["info"];    
    console.log(name);
    console.log(vicinity);
    console.log(description);
    

    paintCard(name, description, vicinity)
}

