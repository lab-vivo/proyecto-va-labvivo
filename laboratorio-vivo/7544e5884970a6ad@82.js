// https://observablehq.com/@lab-vivo/laboratorio-vivo@82
export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], function(md){return(
md`# Laboratorio VIVO`
)});
  main.variable(observer()).define(["md"], function(md){return(
md `### Autores`
)});
  main.variable(observer()).define(["md"], function(md){return(
md `* Jorge Andres Gonzalez Sierra https://www.linkedin.com/in/jorge-andres-gonzalez-sierra-60865710/
* Hermes Puentes Navarro https://www.linkedin.com/in/hermes-puentes-navarro-1898b2b3/`
)});
  main.variable(observer()).define(["md"], function(md){return(
md `Combining code from: 
* Mohd Sanad’s block https://bl.ocks.org/mohdsanadzakirizvi/6fc325042ce110e1afc1a7124d087130 
* Massimo Santini’s block https://bl.ocks.org/mapio/53fed7d84cd1812d6a6639ed7aa83868  
* Paul Govan’s block http://bl.ocks.org/paulgovan/6ca7a08a16b33d419ba0/06674f143eae407e5fdb00fcd672e1235d1b6c1d`
)});
  main.variable(observer("d3")).define("d3", ["require"], function(require){return(
require("d3@5")
)});
  main.variable(observer()).define(["html"], function(html){return(
html`<style>
      svg *::selection {
         background : transparent;
      }
     
      svg *::-moz-selection {
         background:transparent;
      } 
     
      svg *::-webkit-selection {
         background:transparent;
      }
      rect.selection {
        stroke          : #333;
        stroke-dasharray: 4px;
        stroke-opacity  : 0.5;
        fill            : transparent;
      }

      rect.cell-border {
        stroke: #eee;
        stroke-width:0.3px;   
      }

      rect.cell-selected {
        stroke: rgb(51,102,153);
        stroke-width:0.5px;   
      }

      rect.cell-hover {
        stroke: #F00;
        stroke-width:0.3px;   
      }

      text.mono {
        font-size: 8pt;
        font-family: Consolas, courier;
        fill: #aaa;
      }

      text.mono2 {
        font-size: 8pt;
        font-family: Consolas, courier;
      }

      text.text-selected {
        fill: #000;
      }

      text.text-highlight {
        fill: #c00;
      }
      text.text-hover {
        fill: #00C;
      }
      
      .axis line {
        stroke: #D4D8DA;
      }

      .tick  {
        font-size: 8pt;
        font-family: Consolas, courier;
      }

    </style>
`
)});
  main.variable(observer()).define(["md"], function(md){return(
md `### Archivo git datos:`
)});
  main.variable(observer("viewof thefile")).define("viewof thefile", ["d3","html"], function(d3,html)
{const inputType = d3.select(html`<input type="text" value="clean_base1.csv" id="fileinfo"></input>`);
return inputType.node();}
);
  main.variable(observer("thefile")).define("thefile", ["Generators", "viewof thefile"], (G, _) => G.input(_));
  main.variable(observer("data")).define("data", ["d3","thefile"], async function(d3,thefile){return(
await d3.csv("https://raw.githubusercontent.com/hpuentes/proyecto-va-labvivo/master/"+thefile,(d) => {
  return {
    FragmentID : d.FragmentID,
    SessionEndDate : d[" SessionEndDate"],
    edad : +d.Edad,
    estudios : d.EstudiosAcudiente,
    vives : d.Familia,
    grado : +d.Grado,
    genero : d["Género"],
    colegios : d["Institucion Educativa Distrital"],
    temas : d.Temas,
    tono : d["Tono emocional"],
    cuando : d["¿Cuándo sucedieron"],
    numcolegio : d["¿En cuántos colegios/escuelas has estado?"],
    experiencia : d["¿La experiencia que compartiste es?"],
    tiempo : d["¿Por cuánto tiempo?"],
    saber : d["¿Quién crees que debe saber sobre esta historia?"],
    comun : d["¿Qué tan común?"],
    control : d["Sentí que tuve…"],
    aplicado : d["El aprendizaje aplicado..."],
    materias : d['Las materias en clase...'],
    describe : d['Describe algo que es…'],
    auto : d['El auto-aprendizaje...'],
    descubrimiento : d['El aprendizaje por descubrimiento...'],
    involucra : d.AreaLaHistoriaInvolucra,
    ensenho : d.AreaEstaHistoriaMeEnseño,
    impacto : d.AreaLaLeccionImpactoEn,
    importante : d.AreaEsImportante,
    text : d.FragmentEntry,
    titulo : d.StoryTitle
  };
}).then((data) => {
      return data;
  })
)});
  main.variable(observer("schools")).define("schools", ["d3","data"], function(d3,data){return(
d3.nest()
  .key(d => d.colegios)
  .entries(data)
  .map(val => val.key)
)});
  main.variable(observer("age")).define("age", ["d3","data"], function(d3,data){return(
d3.nest()
  .key(d => d.edad)
  .entries(data)
  .map(val => +val.key)
  .sort((x,y) => d3.ascending(x, y))
)});
  main.variable(observer("grade")).define("grade", ["d3","data"], function(d3,data){return(
d3.nest()
  .key(d => d.grado)
  .entries(data)
  .map(val => +val.key)
  .sort((x,y) => d3.ascending(x, y))
  .filter((value, index, arr) => {
    return !isNaN(value);
  })
)});
  main.variable(observer()).define(["md"], function(md){return(
md `### Instrucciones: 
* El heatmap es el habilitador dinámico de las demás visualizaciones. Para usar esta característica, se seleccionan con el mouse las coordenadas que se deseen. Si se desea seleccionar coordenadas no adyacentes, usar la combinación Clic + Tecla Alt. Se puede ver de inmediato el cambio en las demás visualizaciones.
* El barchart muestra la distribución de frecuencia de las historias asociadas con la variable objeto de análisis escogida.
* El force directed, para minimizar la oclusión, puede colocar el mouseover sobre cualquier palabra, donde se resaltará su relación con otras palabras dentro del texto. Esto le permitirá tener los conceptos clave de la historia, sin tener que leerla.
* En filtrado de historias, para cada una de las variables, puede seleccionar una o varias categorías que serán el filtrado inicial para la visualización.
* Para la selección de las variables, escoger la variable objeto de análisis (Eje x) y la variable para evaluar distribución (Eje y). Para ambas variables, se pueden seleccionar todos los atributos disponibles,por lo que se pueden hacer n(n-1) cruces; es decir, 552 heatmap diferentes.`
)});
  main.variable(observer()).define(["md"], function(md){return(
md `### Filtrado de historias`
)});
  main.variable(observer("viewof UserInput")).define("viewof UserInput", ["schools","age","grade"], function(schools,age,grade)
{
  
  var table = document.createElement("table");
  table.setAttribute("border",1);
  
  function createHeader(header,titleRow,colspan){
    var titleCol = document.createElement("th");
    if(colspan !== 'undefined')
      titleCol.setAttribute("colspan",colspan)
    var textCol = document.createElement("p");
    textCol.appendChild(document.createTextNode(header));
    titleCol.appendChild(textCol);
    titleRow.appendChild(titleCol);
  }
  
  function createSelectComponent(selectboxName, list, row, pixels,colspan){
    var container = document.createElement("td");
    if(colspan !== 'undefined')
      container.setAttribute("colspan",colspan)
    container.setAttribute("width","20%")
    container.setAttribute("valign","top")
    row.appendChild(container);
    
    var select = document.createElement("select");
    select.id = selectboxName;
    select.setAttribute("multiple", "true");
    select.setAttribute("style",pixels);
    select.setAttribute("size", "4");
    var index = 0; 
    while(index < list.length)
    {
      var op = document.createElement("option");
      op.text = list[index];
      op.value = selectboxName+"_"+list[index];
      op.setAttribute("selected", "true");
      index ++;
      select.appendChild(op);
    }
    container.appendChild(select);
  }
  
  var titleRowObj1 = document.createElement("tr");
  table.appendChild(titleRowObj1);
 
  createHeader("Tono emocional",titleRowObj1);
  createHeader("¿La experiencia que compartiste es?",titleRowObj1);
  createHeader("¿Cuando sucedio?",titleRowObj1);
  createHeader("¿Por cuánto tiempo?",titleRowObj1);
  createHeader("¿Que tan común?",titleRowObj1);
  
  var tonoEmocionalList = ["Muy Feliz", "Feliz", "Indiferente", "Triste", "Muy Triste"];
  var cuandoSucedioList = ["Hace más de dos años","Hace dos años","Hace un año", "Hace seis meses", "El mes pasado", "No se"];
  var experienciaList = ["Experiencia personal","Una experiencia que alguien te compartió","Una opinión", "Una historia que escuchaste por ahí"];
  var tiempoList = ["Por siempre","Por mucho tiempo","Por algun tiempo", "Se me va a olvidar"];
  var comunList = ["Pasa todo el tiempo","Común","Pasa una vez cada tanto", "Muy rara y única"];
  
  var rowObj1 = document.createElement("tr");
  table.appendChild(rowObj1);
  createSelectComponent("tono",tonoEmocionalList,rowObj1,"width:100px;")
  createSelectComponent("experiencia",experienciaList,rowObj1,"width:280px;");
  createSelectComponent("cuando",cuandoSucedioList,rowObj1,"width:170px;");
  createSelectComponent("tiempo",tiempoList,rowObj1,"width:150px;");
  createSelectComponent("comun",comunList,rowObj1,"width:170px;");
  
  var titleRowObj2 = document.createElement("tr");
  table.appendChild(titleRowObj2);
  
  createHeader("Genero",titleRowObj2);
  createHeader("Institucion Educativa Distrital",titleRowObj2);
  createHeader("¿Quién debe saber sobre esta historia?",titleRowObj2);
  createHeader("¿En cuántos colegios/escuelas has estado?",titleRowObj2);
  createHeader("Temas",titleRowObj2);
  
  var rowObj2 = document.createElement("tr");
  table.appendChild(rowObj2);
  
  var generoList = ["masculino", "femenino"];
  createSelectComponent("genero",generoList,rowObj2,"width:100px;")
  createSelectComponent("colegios",schools,rowObj2,"width:280px;")
  
  var saberList = ["Todo el mundo", "Los profesores y las directivas", "Los compañeros", "Nadie"];
  createSelectComponent("saber",saberList,rowObj2,"width:170px;")
  var numcolegiosList = ["En más de 4", "En 3","En 2","Sólo en este"];
  createSelectComponent("numcolegio",numcolegiosList,rowObj2,"width:150px;")
  
  var temasList = ["Tecnología", "La seguridad en el colegio","Educación / aprendizaje","Bullying / matoneo","Comida","Valores","Salud","Justicia","Innovación / creatividad","Relación con los compañeros","Relación con la familia","Relación con los profesores","Ninguna de las anteriores"];
  createSelectComponent("temas",temasList,rowObj2,"width:170px;")
  
  var titleRowObj3 = document.createElement("tr");
  table.appendChild(titleRowObj3);
  
  createHeader("¿Con quién vives?",titleRowObj3);
  createHeader("Nivel estudios acudiente",titleRowObj3);
  createHeader("Edad",titleRowObj3);
  createHeader("Grado",titleRowObj3);
  
  var rowObj3 = document.createElement("tr");
  table.appendChild(rowObj3);
  
  var vivesList = ["Papá", "mamá", "Hermanos", "otros familiares","otros"];
  createSelectComponent("vives",vivesList,rowObj3,"width:100px;")
  var nivelEstudiosList = ["No tiene educación formal", "Primaria", "Bachiller", "Técnico","Pregrado (profesional)","Postgrado (especialización maestría)"];
  createSelectComponent("estudios",nivelEstudiosList,rowObj3,"width:280px;")
  createSelectComponent("edad",age,rowObj3,"width:170px;")
  createSelectComponent("grado",grade,rowObj3,"width:150px;")
  
  var titleRowObj4 = document.createElement("tr");
  table.appendChild(titleRowObj4);
  
  createHeader("El aprendizaje aplicado...",titleRowObj4,"2");
  createHeader("Las materias en clase...",titleRowObj4,"2");
  createHeader("Describe algo que es…",titleRowObj4);
  
  var rowObj4 = document.createElement("tr");
  table.appendChild(rowObj4);
  
  var cuadranteList = ["Me interesa poco / Importa poco para mi futuro", "Me interesa mucho / Importa poco para mi futuro", "Me interesa poco / Importa mucho para mi futuro", "Me interesa mucho / Importa mucho para mi futuro"];
  createSelectComponent("aplicado",cuadranteList,rowObj4,"width:300px;","2")
  createSelectComponent("materias",cuadranteList,rowObj4,"width:300px;","2")
  var describeList = ["Completamente novedoso","Novedoso","Pasa frecuentemente","Pasa todo el tiempo"];
  createSelectComponent("describe",describeList,rowObj4,"width:170px;")
  
  var titleRowObj5 = document.createElement("tr");
  table.appendChild(titleRowObj5);
  
  createHeader("El auto-aprendizaje...",titleRowObj5,"2");
  createHeader("El aprendizaje por descubrimiento...",titleRowObj5,"2");
   createHeader("Sentí que tuve…",titleRowObj5);
  
  var rowObj5 = document.createElement("tr");
  table.appendChild(rowObj5);
  
  createSelectComponent("auto",cuadranteList,rowObj5,"width:300px;","2")
  createSelectComponent("descubrimiento",cuadranteList,rowObj5,"width:300px;","2")
  var controlList = ["Total control","Control","Poco control","Absolutamente ningun control"];
  createSelectComponent("control",controlList,rowObj5,"width:170px;")
  
  
  var titleRowObj6 = document.createElement("tr");
  table.appendChild(titleRowObj6);
  
  createHeader("La historia involucra...",titleRowObj6,"1");
  createHeader("Esta historia me enseñó",titleRowObj6,"1");
  createHeader("La lección impacto en...",titleRowObj6,"1");
  createHeader("Es importante",titleRowObj6,"1");
  
  var rowObj6 = document.createElement("tr");
  table.appendChild(rowObj6);
  
  var involucraList = ["Familia comunidad amigos","A mi","Profesores","A mi/Profesores","A mi/Familia comunidad amigos","Familia comunidad amigos/Profesores","Neutro"];
  createSelectComponent("involucra",involucraList,rowObj6,"width:100px;")
  var ensenhoList = ["Comprender como son cosas","Nuevas conocimientos habilidades","Importancia de experimentar","Nuevas conocimientos habilidades/Importancia de experimentar","Nuevas conocimientos habilidades/Comprender como son cosas","Comprender como son cosas/Importancia de experimentar","Neutro"];
  createSelectComponent("ensenho",ensenhoList,rowObj6,"width:280px;")
  var impactoList = ["Oportunidades futuro","Relación demás","Entender sucede alrededor","Relación demás/Entender sucede alrededor","Relación demás/Oportunidades futuro","Oportunidades futuro/Entender sucede alrededor","Neutro"];
  createSelectComponent("impacto",impactoList,rowObj6,"width:170px;")
  var importanteList = ["Ser el mejor","Trabajar en equipo","Comprender a los otros","Trabajar en equipo/Comprender a los otros","Trabajar en equipo/Ser el mejor","Ser el mejor/Comprender a los otros","Neutro"];
  createSelectComponent("importante",importanteList,rowObj6,"width:150px;")
  
  function getSelection(selectBox,selection){
    for(var i = 0;i < selectBox.length; i++){
      if(selectBox[i].selected != true)
        selection.push(selectBox[i].value);
    }
  }
  
  var f = ({target}) => {
    var arr = [];
    var tonoSelect = table.querySelector('#tono').options;
    var experienciaSelect = table.querySelector('#experiencia').options;
    var cuandoSelect = table.querySelector('#cuando').options;
    var tiempoSelect = table.querySelector('#tiempo').options;
    var comunSelect = table.querySelector('#comun').options;
    
    var generosSelect = table.querySelector('#genero').options;
    var colegiosSelect = table.querySelector('#colegios').options;
    var saberSelect = table.querySelector('#saber').options;
    var numcolegioSelect = table.querySelector('#numcolegio').options;
    var temasSelect = table.querySelector('#temas').options;
    
    var vivesSelect = table.querySelector('#vives').options;
    var estudiosSelect = table.querySelector('#estudios').options;
    var edadSelect = table.querySelector('#edad').options;
    var gradoSelect = table.querySelector('#grado').options;
    var controlSelect = table.querySelector('#control').options;
    
    var aplicadoSelect = table.querySelector('#aplicado').options;
    var materiasSelect = table.querySelector('#materias').options;
    var describeSelect = table.querySelector('#describe').options;
    
    var autoSelect = table.querySelector('#auto').options;
    var descubrimientoSelect = table.querySelector('#descubrimiento').options;
    
    var involucraSelect = table.querySelector('#involucra').options;
    var ensenhoSelect = table.querySelector('#ensenho').options;
    var impactoSelect = table.querySelector('#impacto').options;
    var importanteSelect = table.querySelector('#importante').options;
    
    getSelection(tonoSelect,arr);
    getSelection(experienciaSelect,arr);
    getSelection(cuandoSelect,arr);
    getSelection(tiempoSelect,arr);
    getSelection(comunSelect,arr);
    
    getSelection(generosSelect,arr);
    getSelection(colegiosSelect,arr);
    getSelection(saberSelect,arr);
    getSelection(numcolegioSelect,arr);
    getSelection(temasSelect,arr);
    
    getSelection(vivesSelect,arr);
    getSelection(estudiosSelect,arr);
    getSelection(edadSelect,arr);
    getSelection(gradoSelect,arr);
    getSelection(controlSelect,arr);
    
    getSelection(aplicadoSelect,arr);
    getSelection(materiasSelect,arr);
    getSelection(describeSelect,arr);
    
    getSelection(autoSelect,arr);
    getSelection(descubrimientoSelect,arr);
    
    getSelection(involucraSelect,arr);
    getSelection(ensenhoSelect,arr);
    getSelection(impactoSelect,arr);
    getSelection(importanteSelect,arr);
    
    table.value = arr;
    return table.value;}
  
  table.querySelector('#tono').oninput = f
  table.querySelector('#experiencia').oninput = f
  table.querySelector('#cuando').oninput = f
  table.querySelector('#tiempo').oninput = f
  table.querySelector('#comun').oninput = f
  
  table.querySelector('#genero').oninput = f
  table.querySelector('#colegios').oninput = f
  table.querySelector('#saber').oninput = f
  table.querySelector('#numcolegio').oninput = f
  table.querySelector('#temas').oninput = f
  
  table.querySelector('#vives').oninput = f
  table.querySelector('#estudios').oninput = f
  table.querySelector('#edad').oninput = f
  table.querySelector('#grado').oninput = f
  table.querySelector('#control').oninput = f
  
  table.querySelector('#aplicado').oninput = f
  table.querySelector('#materias').oninput = f
  table.querySelector('#describe').oninput = f
  
  table.querySelector('#auto').oninput = f
  table.querySelector('#descubrimiento').oninput = f
  
  table.querySelector('#involucra').oninput = f
  table.querySelector('#ensenho').oninput = f
  table.querySelector('#impacto').oninput = f
  table.querySelector('#importante').oninput = f
  
  table.value = []
  
  return table
}
);
  main.variable(observer("UserInput")).define("UserInput", ["Generators", "viewof UserInput"], (G, _) => G.input(_));
  main.variable(observer()).define(["md"], function(md){return(
md `### Top palabras`
)});
  main.variable(observer("viewof topNodesToGraph")).define("viewof topNodesToGraph", ["d3","html"], function(d3,html)
{const inputType = d3.select(html`<input type="number" value="25" id="topWords" pattern="\d+"></input>`);
return inputType.node();}
);
  main.variable(observer("topNodesToGraph")).define("topNodesToGraph", ["Generators", "viewof topNodesToGraph"], (G, _) => G.input(_));
  main.variable(observer()).define(["md"], function(md){return(
md `### Extraer texto de`
)});
  main.variable(observer("viewof textFrom")).define("viewof textFrom", ["d3","html"], function(d3,html)
{
  const selectType = d3.select(html`<select id="wordsFrom">
  <option value="titulo" selected>Título</option> 
  <option value="tituloTexto">Título y texto</option> 
  </select>`);
  return selectType.node();
}
);
  main.variable(observer("textFrom")).define("textFrom", ["Generators", "viewof textFrom"], (G, _) => G.input(_));
  main.variable(observer()).define(["md"], function(md){return(
md `### Variable objeto de análisis`
)});
  main.variable(observer("viewof objvar")).define("viewof objvar", ["d3","html"], function(d3,html)
{
  const selectType = d3.select(html`<select id="objvar">
  <option value="tono" selected>Tono emocional</option> 
  <option value="experiencia">¿La experiencia que compartiste es?</option> 
  <option value="cuando">¿Cuando sucedio?</option> 
  <option value="tiempo">¿Por cuánto tiempo?</option> 
  <option value="comun">¿Que tan común?</option> 
  <option value="saber">¿Quién debe saber sobre esta historia?</option> 
  <option value="numcolegio">¿En cuántos colegios/escuelas has estado?</option> 
  <option value="temas">Temas</option> 
  <option value="vives">¿Con quién vives?</option> 
  <option value="estudios">Nivel estudios acudiente</option> 
  <option value="control">Sentí que tuve…</option> 
  <option value="aplicado">El aprendizaje aplicado...</option> 
  <option value="materias">Las materias en clase...</option> 
  <option value="describe">Describe algo que es...</option> 
  <option value="auto">El auto-aprendizaje...</option> 
  <option value="descubrimiento">El aprendizaje por descubrimiento...</option> 
  <option value="involucra">La historia involucra...</option> 
  <option value="ensenho">Esta historia me enseñó</option> 
  <option value="impacto">La lección impacto en...</option> 
  <option value="importante">Es importante</option> 
  </select>`);
  return selectType.node();
}
);
  main.variable(observer("objvar")).define("objvar", ["Generators", "viewof objvar"], (G, _) => G.input(_));
  main.variable(observer()).define(["md"], function(md){return(
md `### Variable de distribución`
)});
  main.variable(observer("viewof distvar")).define("viewof distvar", ["d3","html"], function(d3,html)
{
  const selectType = d3.select(html`<select id="distvar">
  <option value="tono">Tono emocional</option> 
  <option value="experiencia">¿La experiencia que compartiste es?</option> 
  <option value="cuando">¿Cuando sucedio?</option> 
  <option value="tiempo">¿Por cuánto tiempo?</option> 
  <option value="comun">¿Que tan común?</option> 
  <option value="saber">¿Quién debe saber sobre esta historia?</option> 
  <option value="numcolegio">¿En cuántos colegios/escuelas has estado?</option> 
  <option value="temas" selected>Temas</option> 
  <option value="vives">¿Con quién vives?</option> 
  <option value="estudios">Nivel estudios acudiente</option> 
  <option value="control">Sentí que tuve…</option> 
  <option value="aplicado">El aprendizaje aplicado...</option> 
  <option value="materias">Las materias en clase...</option> 
  <option value="describe">Describe algo que es...</option> 
  <option value="auto">El auto-aprendizaje...</option> 
  <option value="descubrimiento">El aprendizaje por descubrimiento...</option> 
  <option value="involucra">La historia involucra...</option> 
  <option value="ensenho">Esta historia me enseñó</option> 
  <option value="impacto">La lección impacto en...</option> 
  <option value="importante">Es importante</option> 
  </select>`);
  return selectType.node();
}
);
  main.variable(observer("distvar")).define("distvar", ["Generators", "viewof distvar"], (G, _) => G.input(_));
  main.variable(observer("chart")).define("chart", ["objvar","distvar","data","d3","UserInput","textFrom","topNodesToGraph"], function(objvar,distvar,data,d3,UserInput,textFrom,topNodesToGraph)
{
  function getSelectVarOptions(selectName){
    var selectList = document.querySelector("#"+selectName).options;
    var labels = []
    for(var i = 0;i < selectList.length; i++){
      labels.push(selectList[i].label);
    }
    return labels;
  }
  
  var colLabel = getSelectVarOptions(objvar);
  var rowLabel = getSelectVarOptions(distvar);
  var dataRaw = data;
  
  if(objvar == "vives" || distvar == "vives" 
     || objvar == "estudios" || distvar == "estudios" 
     || objvar == "temas" || distvar == "temas"){
    dataRaw = data.flatMap(row => {
        var myMap = new Map();
        var numVars = 0;
        if(objvar == "vives" || distvar == "vives"){
          if(row.vives != ""){
            myMap.set("vives",row.vives.split(','));
            numVars ++;
          }
        }
        if(objvar == "estudios" || distvar == "estudios"){
          if(row.estudios != "")
          {
            myMap.set("estudios",row.estudios.split(','));
            numVars ++;
          }
        }
        if(objvar == "temas" || distvar == "temas"){
          if(row.temas != "")
          {
            myMap.set("temas",row.temas.split(','));
            numVars ++;
          }
        }
        if(numVars == 0){
          return row;
        }
        else if(numVars == 1)
        {
          var keys = myMap.keys();
          var var1 = keys.next().value;
          var arrayValues = myMap.get(var1);
          var newRows = [];
          for(var i = 0; i < arrayValues.length; i++)
          {
            var value = arrayValues[i];
            var cloneRow = Object.assign({}, row);
            if(var1 == "vives")
              cloneRow.vives = value;
            else if(var1 == "temas")
              cloneRow.temas = value;
            else if(var1 == "estudios")
              cloneRow.estudios = value;
            newRows.push(cloneRow)
          }
          return newRows;
        }
        else //if(numVars == 2)
        {
          var keys = myMap.keys();
          var var1 = keys.next().value;
          var var2 = keys.next().value;
          var arrayVar1 = myMap.get(var1);
          var arrayVar2 = myMap.get(var2);
          var newRows = [];
          for(var i = 0; i < arrayVar1.length; i++)
          {
            var valueVar1 = arrayVar1[i];
            for(var j = 0; j < arrayVar2.length; j++)
            {
              var valueVar2 = arrayVar2[j];
              var cloneRow = Object.assign({}, row);
              if(var1 == "vives")
                cloneRow.vives = valueVar1;
              else if(var1 == "temas")
                cloneRow.temas = valueVar1;
              else if(var1 == "estudios")
                cloneRow.estudios = valueVar1;
              if(var2 == "vives")
                cloneRow.vives = valueVar2;
              else if(var2 == "temas")
                cloneRow.temas = valueVar2;
              else if(var2 == "estudios")
                cloneRow.estudios = valueVar2;
              newRows.push(cloneRow)
            } 
          }
          return newRows;
        }
    });
  }
  
  var allHistories = new Map()
  var dataFiltered = d3.entries(dataRaw)
  .filter((value, index, arr) => {
    //Filter the data when the objvar or distvar have invalid values
    if(value.key == "columns")
      return false;
    if(objvar == "tono" || distvar == "tono"){
      if(value.value.tono == "lastOption" || value.value.tono == "")
        return false;
    }
    if(objvar == "cuando" || distvar == "cuando"){
      if(value.value.cuando == "NULL VALUE")
        return false;
    }
    if(objvar == "grado" || distvar == "grado"){
      if(isNaN(value.value.grado))
        return false;
    }
    if(objvar == "control" || distvar == "control"){
      if(value.value.control == "")
        return false;
    }
    if(objvar == "aplicado" || distvar == "aplicado"){
      if(value.value.aplicado == "")
        return false;
    }
    if(objvar == "materias" || distvar == "materias"){
      if(value.value.materias == "")
        return false;
    }
    if(objvar == "describe" || distvar == "describe"){
      if(value.value.describe == "")
        return false;
    }
    if(objvar == "auto" || distvar == "auto"){
      if(value.value.auto == "")
        return false;
    }
    if(objvar == "descubrimiento" || distvar == "descubrimiento"){
      if(value.value.descubrimiento == "")
        return false;
    }
    if(objvar == "involucra" || distvar == "involucra"){
      if(value.value.involucra == "")
        return false;
    }
    if(objvar == "ensenho" || distvar == "ensenho"){
      if(value.value.ensenho == "")
        return false;
    }
    if(objvar == "impacto" || distvar == "impacto"){
      if(value.value.impacto == "")
        return false;
    }
    if(objvar == "importante" || distvar == "importante"){
      if(value.value.importante == "")
        return false;
    }
    //Filter the data with the selected values from the form
    for(var i = 0; i < UserInput.length; i++){
      var ui = UserInput[i];
      var varName = ui.substring(0,ui.indexOf("_"));
      var varValue = ui.substring(ui.indexOf("_")+1,ui.length);
      if(value.value[varName]+"" == varValue)
        return false;
      else if(varName == "temas" || varName == "vives" || varName == "estudios"){
        if(value.value[varName].includes(varValue)){
          return false;
        }
      }
    }
    return true;
  })
  .map(d => {
    var history = d.value;
    if(!allHistories.has(history.FragmentID))
      allHistories.set(history.FragmentID,history)
    return history;
  });
  
  var dataGrouped = d3.nest()
    .key(d => { return d[objvar]+"-"+d[distvar]; })
    .key(d => { return d.FragmentID; })
    .rollup(v => { return v.length; })
    .entries(dataFiltered)
    .map(v => { 
      var k1 = v.key.substring(0,v.key.indexOf("-"));
      var k2 = v.key.substring(v.key.indexOf("-")+1,v.length);
      var col = -1,row = -1;
      for(var i = 0; i < colLabel.length; i++){
        if(colLabel[i] == k1){
          col = i;
          break;
        }
      }
      for(var i = 0; i < rowLabel.length; i++){
        if(rowLabel[i] == k2){
          row = i;
          break;
        }
      }
      
      return{
        colName : k1,
        rowName : k2,
        values : v.values,
        col : col,
        row : row,
        value : v.values.length
      }
    })
  
  var margin = { top: 30, right: 10, bottom: 50, left: 250 },
  cellSize=28;

  var col_number=colLabel.length;
  var row_number=rowLabel.length;
  
  var max = 0, min = -1;
  for(var i = 0; i < dataGrouped.length; i++){
    if(dataGrouped[i].value > max){
      max = dataGrouped[i].value
    }
    if(min == -1){
      min = dataGrouped[i].value;
    }
    else if(dataGrouped[i].value < min){
      min = dataGrouped[i].value;
    }
  }
  
  var width = cellSize*70, 
  height = cellSize*70 , 
  legendElementWidth = cellSize*2,
  colorBuckets = 9,
  colors = d3.schemeBlues[9];
  
  var colorScale = d3.scaleQuantile()
  .domain([ min, max])
  .range(colors);

  var svg = d3.create("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      //.attr("viewBox", [0, 0, 1060, 480])
      //.attr("viewBox", [0, 0, 3000, 480])
      .attr("overflow","auto");
  
  var objVarHtml = document.querySelector("#objvar")
  var distVarHtml = document.querySelector("#distvar")
  svg.append("text")
    .attr("class", "mono2")  
    .attr('x',0)
    .attr('y',280)
    .text(objVarHtml.options[objVarHtml.selectedIndex].text);
  svg.append("text")
    .attr("class", "mono2")  
    .attr('x',0)
    .attr('y',290)
    .text("X");
  svg.append("text")
    .attr("class", "mono2")  
    .attr('x',0)
    .attr('y',300)
    .text(distVarHtml.options[distVarHtml.selectedIndex].text);
   
  var node = svg
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + (margin.top+300) + ")");
  
  var rowSortOrder=false;
  var colSortOrder=false;
  var rowLabels = node.append("g")
  .selectAll(".rowLabelg")
  .data(rowLabel)
  .enter()
  .append("text")
  .text((d) => { return d; })
  .attr("x", 0)
  .attr("y",(d, i) => { return i * cellSize; })
  .style("text-anchor", "end")
  .attr("transform", "translate(-6," + cellSize / 1.5 + ")")
  .attr("class",(d,i) => { return "rowLabel mono r"+i;} ) 
  .on("mouseover",(d,e,f) => {d3.select(f[e]).classed("text-hover",true);})
  .on("mouseout" ,(d,e,f) => {d3.select(f[e]).classed("text-hover",false);})
  .on("click",(d,i) => {rowSortOrder=!rowSortOrder; sortbylabel("r",i,rowSortOrder);});

  var colLabels = node.append("g")
  .selectAll(".colLabelg")
  .data(colLabel)
  .enter()
  .append("text")
  .text((d) => { return d; })
  .attr("x", 0)
  .attr("y",(d, i) => { return i * cellSize; })
  .style("text-anchor", "left")
  .attr("transform", "translate("+cellSize/2 + ",-6) rotate (-90)")
  .attr("class",(d,i) => { return "colLabel mono c"+i;} )
  .on("mouseover",(d,e,f) => {d3.select(f[e]).classed("text-hover",true);})
  .on("mouseout" ,(d,e,f) => {d3.select(f[e]).classed("text-hover",false);})
  .on("click",(d,i) => {colSortOrder=!colSortOrder;  sortbylabel("c",i,colSortOrder);});

  var heatMap = node.append("g").attr("class","g3")
  .selectAll(".cellg")
  .data(dataGrouped,(d) => {return d.row+":"+d.col;})
  .enter()
  .append("rect")
  .attr("x",(d) => { return (d.col) * cellSize; })
  .attr("y",(d) => { return (d.row) * cellSize; })
  .attr("class",(d) => {return "cell cell-border cr"+(d.row-1)+" cc"+(d.col-1);})
  .attr("width", cellSize)
  .attr("height", cellSize)
  .style("fill",(d) => { return colorScale(d.value); })
  .on("mouseover",(d,e,f) => {
    //highlight text
    d3.select(f[e]).classed("cell-hover",true);
    d3.selectAll(".rowLabel").classed("text-highlight",(r,ri) => { return ri==(d.row);});
    d3.selectAll(".colLabel").classed("text-highlight",(c,ci) => { return ci==(d.col);});

    //Update the tooltip value
    d3.select("#tooltip")
      .text(rowLabel[d.row]+" - "+colLabel[d.col]+" - Historias: "+d.value);  
    //Show the tooltip
    d3.select("#tooltip").classed("hidden", false);
  })
  .on("mouseout",(d,e,f) => {
    d3.select(f[e]).classed("cell-hover",false);
    d3.selectAll(".rowLabel").classed("text-highlight",false);
    d3.selectAll(".colLabel").classed("text-highlight",false);
    d3.select("#tooltip").classed("hidden", true);
  });
  
  svg.append("text")
    .attr('id', "histories")
    .attr("class", "mono2")  
    .attr('x',0)
    .attr('y', (cellSize*rowLabel.length)+cellSize/2+cellSize*3+300)
    .text("Historias seleccionadas: 0");
  
  node.append("text")
    .attr('id', "tooltip")
    .attr("class", "mono2")  
    .attr('x',(d, i) => { return legendElementWidth * i; })
    .attr('y', (cellSize*rowLabel.length)+cellSize/2);
  
  var dif = max - min;
  var jump = dif / colorBuckets;
  var legValues = new Array(colorBuckets);
  
  for(var i = 0; i < colorBuckets; i++){
    legValues[i] = Math.floor((i * jump)+min);
  }
 
  var legend = node.selectAll(".legend")
  .data(legValues)
  .enter().append("g")
  .attr("class", "legend");

  legend.append("rect")
    .attr("x",(d, i) => { return legendElementWidth * i; })
    .attr("y", (cellSize*rowLabel.length)+cellSize)
    .attr("width", legendElementWidth)
    .attr("height", cellSize)
    .style("fill",(d, i) => { return colors[i]; });

  legend.append("text")
    .attr("class", "mono2")
    .text((d) => { return d; })
    .attr("width", legendElementWidth)
    .attr("x", (d, i) => { return legendElementWidth * i; })
    .attr("y", (cellSize*rowLabel.length)+cellSize*2.5);

  // Change ordering of cells

  function sortbylabel(rORc,i,sortOrder){
    var t = node.transition().duration(3000);
    var log2r;
    if(rORc=="r")
      log2r = new Array(rowLabels.length);
    else
      log2r = new Array(colLabels.length);
    var sorted; // sorted is zero-based index
    d3.selectAll(".c"+rORc+(i-1)) 
      .filter((ce) => {
      if(rORc=="r")
        log2r[ce.col] = ce.value;
      else
        log2r[ce.row] = ce.value;
    });
    for(var i = 0; i < log2r.length; i++){
      if(!log2r[i])
        log2r[i] = 0;
    }
    if(rORc=="r"){ 
      sorted=d3.range(col_number).sort((a,b) => { if(sortOrder){ return log2r[b]-log2r[a];}else{ return log2r[a]-log2r[b];}});
      t.selectAll(".cell")
        .attr("x",(d) => { return sorted.indexOf(d.col) * cellSize; });
      t.selectAll(".colLabel")
        .attr("y",(d, i) => { return sorted.indexOf(i) * cellSize; });
    }else{ // sort log2ratio of a contrast
      sorted=d3.range(row_number).sort((a,b) => {if(sortOrder){ return log2r[b]-log2r[a];}else{ return log2r[a]-log2r[b];}});
      t.selectAll(".cell")
        .attr("y",(d) => { return sorted.indexOf(d.row) * cellSize; });
      t.selectAll(".rowLabel")
        .attr("y",(d, i) => { return sorted.indexOf(i) * cellSize; });
    }
  } 
  
  var preseSelectedCells = [];
  var selectedCells = new Map();
  var selectedHistories = new Map();
  var numSelectedHistories = 0;
  
  var sa=node.select(".g3")
  .on("mousedown", function() {
    if( !d3.event.altKey) {
      //console.log("clean all")
      cleanSelectedCells()
      d3.selectAll(".cell-selected").classed("cell-selected",false);
      d3.selectAll(".rowLabel").classed("text-selected",false);
      d3.selectAll(".colLabel").classed("text-selected",false);
    }
    var p = d3.mouse(this);
    sa.append("rect")
      .attr("x",Math.round(p[0]))
      .attr("y",Math.round(p[1]))
      .attr("rx",0)
      .attr("ry",0)
      .attr("class","selection")
      .attr("width",1)
      .attr("height",1)
  })
  .on("mousemove", function() {
    var s = sa.select("rect.selection");
    if(!s.empty()) {
      var p = d3.mouse(this),
          d = {
            x       : parseInt(s.attr("x"), 10),
            y       : parseInt(s.attr("y"), 10),
            width   : parseInt(s.attr("width"), 10),
            height  : parseInt(s.attr("height"), 10)
          },
          move = {
            x : p[0] - d.x,
            y : p[1] - d.y
          }
      ;
      if(move.x < 1 || (move.x*2<d.width)) {
        d.x = p[0];
        d.width -= move.x;
      } else {
        d.width = move.x;       
      }

      if(move.y < 1 || (move.y*2<d.height)) {
        d.y = p[1];
        d.height -= move.y;
      } else {
        d.height = move.y;       
      }
      s.attr(d);

      // deselect all temporary selected state objects
      d3.selectAll('.cell-selection.cell-selected').classed("cell-selected", false);
      d3.selectAll(".text-selection.text-selected").classed("text-selected",false);
      //console.log("recalculate selection")
      cleanPreSelectedCells();
      d3.selectAll('.cell').filter(function(cell_d, i) {
        if(
          !d3.select(this).classed("cell-selected") && 
          (this.x.baseVal.value)+cellSize >= d.x && (this.x.baseVal.value)<=d.x+d.width && 
          (this.y.baseVal.value)+cellSize >= d.y && (this.y.baseVal.value)<=d.y+d.height
        ) {
          //console.log(cell_d)//Hermes: NEW SELECTED CELLS
          addPreSelectedCell(cell_d);
          d3.select(this)
            .classed("cell-selection", true)
            .classed("cell-selected", true);

          d3.select(".r"+(cell_d.row))
            .classed("text-selection",true)
            .classed("text-selected",true);

          d3.select(".c"+(cell_d.col))
            .classed("text-selection",true)
            .classed("text-selected",true);
        }
      });
    }
  })
  .on("mouseup", function() {
    //console.log("selection created")
    movePreCellsToSelected();
    
    drawBarAndGraphChart();
    // remove selection frame
    sa.selectAll("rect.selection").remove();
    d3.selectAll('.cell-selection').classed("cell-selection", false);
    d3.selectAll(".text-selection").classed("text-selection",false);
  });
  
  function movePreCellsToSelected(){
    //console.log(preseSelectedCells)
    for (var i = 0; i < preseSelectedCells.length; i++) {
      //console.log(preseSelectedCells[i])
      addSelectedCell(preseSelectedCells[i]);
    }
  }
  
  function addPreSelectedCell(cell){
    preseSelectedCells.push(cell);
  }
  
  function addSelectedCell(cell){
    if(!selectedCells.has(cell.colName + "-"+ cell.rowName)){
      selectedCells.set(cell.colName + "-"+ cell.rowName,cell);
      //console.log(cell.colName + "-"+ cell.rowName)
      var cellHistories = cell.values
      //console.log(cellHistories)
      for(var i = 0; i < cellHistories.length; i++ ){
        if(!selectedHistories.has(cellHistories[i].key)){
          var history = allHistories.get(cellHistories[i].key)
          selectedHistories.set(history.FragmentID,history)
        }
      }
      //Update the histories number text
        numSelectedHistories += cellHistories.length
        d3.select("#histories")
            .text("Historias seleccionadas: "+numSelectedHistories);  
    }
  }
  
  function cleanPreSelectedCells(){
    preseSelectedCells = []
  }
  
  function cleanSelectedCells(){
    preseSelectedCells = []
    selectedCells.clear()
    selectedHistories.clear()
    numSelectedHistories = 0;
    d3.select("#histories")
            .text("Historias seleccionadas: "+numSelectedHistories);  
  }
  
  function drawBarAndGraphChart()
  {
    //console.log("filter...")
    //console.log(selectedCells)
    //console.log(selectedHistories)
    var dataRefiltered = d3.entries(dataFiltered)
    .filter((value, index, arr) => {
      if(selectedCells.size == 0)
        return true
      if(selectedCells.has(value.value[objvar]+"-"+value.value[distvar]))
        return true
      return false
    })
    .map(d => {return d.value;})
    
    //console.log(dataFiltered)
    //console.log(dataRefiltered)
    
    var dataBar = d3.nest()
    .key(d => { return d[objvar]; })
    .rollup(v => { return v.length; })
    .entries(dataRefiltered)
    setDataBar(dataBar)
    
    var dataGraph = []
    for (let iterator = selectedHistories.values(), r; !(r = iterator.next()).done; ) {
        dataGraph.push({FragmentID:r.value.FragmentID,
                        tono: r.value.tono,
                        text: r.value.text,
                        titulo: r.value.titulo,
                       });
    }
    setDataGraph(dataGraph)
    //console.log(dataGraph)
    //console.log(dataBar)
  }
  
  let gBar;
  let container;
   
  function setDataBar(theDataBar) {
    if(gBar)
      gBar.selectAll("*").remove();
    
    gBar = svg.append("g")
    .attr("transform", `translate(${margin.left},${margin.top+rowLabel.length*cellSize+cellSize*4+300})`)
    
    let barSize = gBar.append("text")
    .attr("class", "mono2");
  
    const x = d3.scaleLinear()
      .domain([0, d3.max(theDataBar, d => d.value)])
      .range([0, 340]);
    const y = d3.scaleBand()
      .range([colLabel.length*20, 0])
      .domain(colLabel);
    
    gBar.append("g")
          .attr("class", "x axis")
          .attr("transform", "translate(0,"+colLabel.length*20+")")
          .call(d3.axisBottom(x)
              .ticks(10)
              .tickSizeInner([-colLabel.length*20]));

    gBar.append("g")
          .attr("class", "y axis")
          .call(d3.axisLeft(y));
  
    gBar.selectAll(".bar")
          .data(theDataBar)
        .enter().append("rect")
          .attr("class", "bar")
          .attr("x", 0)
          .attr("height", 15)
          .attr("y", d => { return y(d.key); })
          .attr("width", d => { return x(d.value); })
          .attr("fill", d => {
            return "#69b3a2";
          })
          .on("mousemove", d => {
              barSize
                .attr("x", x(d.value))
                .attr("y", y(d.key)+10)
                .style("display", "inline-block")
                .html("" + (d.value));
          })
          .on("mouseout", d => { barSize.style("display", "none");});
  }
  
  function setDataGraph(theDataGraph){
    var flattedNodes = theDataGraph.flatMap(history => {
      var words;
      if(textFrom == "titulo"){
        if(history.titulo.trim() == "")
          words = "";
        else
          words = history.titulo;
      }
      else
        words = history.text+(history.titulo.trim().length>0?" "+history.titulo:"");
      
      var wordsArr = words.split(" ")
      wordsArr = wordsArr.map(word => {
        return {word: word, tono: history.tono}
      })
      return wordsArr;
    }).filter(v => {return v.word != "";});
    
    flattedNodes = d3.nest()
    .key(d => { return d.word+"-"+d.tono; })
    .rollup(v => { return v.length; })
    .entries(flattedNodes)
    .map(v => { 
      var word = v.key.substring(0,v.key.indexOf("-"));
      var tono = v.key.substring(v.key.indexOf("-")+1,v.length);
      return {word:word,tono:tono,count:v.value}
    })
    
    var allnodes = d3.nest()
    .key(d => d.word)
    .key(d => d.tono)
    .rollup(v => { return d3.sum(v, (d) => {return d.count;}); })
    .entries(flattedNodes)
    .map(v => { 
      var word = v.key;
      var countTotal = 0;
      var maxTonoCount = 0;
      var maxTonoValue = "";
      var tonos = v.values;
      for(var i = 0; i < tonos.length; i++){
        var tono = tonos[i];
        countTotal += tono.value;
        if(maxTonoValue == "" || maxTonoCount < tono.value){
          maxTonoValue = tono.key
          maxTonoCount = tono.value
        }       
      }
      return {id:word,countTotal:countTotal,maxTono:maxTonoValue}
    })
    .sort((x, y) => {
      return d3.descending(x.countTotal, y.countTotal);
    })
    var firstNNodes = allnodes.slice(0, topNodesToGraph);
    var mapNNodes = new Map();
    firstNNodes.forEach(n => {mapNNodes.set(n.id,n);});
    
    const process = (one, two) => {if(one != two){return {source:one, target:two};} else{return {source:"",target:""}}};
    
    var flattedLinks = theDataGraph.flatMap(history => {
      var words = history.text+(history.titulo.length>0?" "+history.titulo:"");
      var wordsArr = words.split(" ")
      wordsArr = wordsArr.filter(word => {return mapNNodes.has(word);})
      let output = wordsArr.reduce((result, one) => result.concat(wordsArr.map(two => process(one, two))), []);
      return output
    });
    flattedLinks = flattedLinks.filter(link => {return link.source != "";})
    
    flattedLinks = d3.nest()
    .key(d => { return d.source+"-"+d.target; })
    .rollup(v => { return v.length; })
    .entries(flattedLinks)
    .map(v => { 
      var source = v.key.substring(0,v.key.indexOf("-"));
      var target = v.key.substring(v.key.indexOf("-")+1,v.length);
      return {source:source,target:target,weight:v.value}
    })
    .sort((x, y) => {
      return d3.descending(x.weight, y.weight);
    })
    
    if(container)
      container.selectAll("*").remove();
    
    container = svg.append("g")
    .attr("transform", `translate(0,${margin.top+rowLabel.length*cellSize+colLabel.length*cellSize+350})`)
    
    var width = 800;
    var height = 600;
    
    var colors = d3.schemeSet1;
    var tonoColor = new Map()
    tonoColor.set("Muy Feliz",colors[0])
    tonoColor.set("Feliz",colors[4])
    tonoColor.set("Indiferente",colors[8])
    tonoColor.set("Triste",colors[1])
    tonoColor.set("Muy Triste",colors[3])

    var graph = {nodes : firstNNodes, links: flattedLinks}

    var label = {
        'nodes': [],
        'links': []
    };

    graph.nodes.forEach(function(d, i) {
        label.nodes.push({node: d});
        label.nodes.push({node: d});
        label.links.push({
            source: i * 2,
            target: i * 2 + 1
        });
    });

    var labelLayout = d3.forceSimulation(label.nodes)
        .force("charge", d3.forceManyBody().strength(-50))
        .force("link", d3.forceLink(label.links).distance(0).strength(2));

    var graphLayout = d3.forceSimulation(graph.nodes)
        .force("charge", d3.forceManyBody().strength(-3000))
        .force("center", d3.forceCenter(width / 2, height / 2))
        .force("x", d3.forceX(width / 2).strength(1))
        .force("y", d3.forceY(height / 2).strength(1))
        .force("link", d3.forceLink(graph.links).id(function(d) {return d.id; }).distance(50).strength(1))
        .on("tick", ticked);

    var adjlist = [];

    graph.links.forEach(function(d) {
        adjlist[d.source.index + "-" + d.target.index] = true;
        adjlist[d.target.index + "-" + d.source.index] = true;
    });

    function neigh(a, b) {
        return a == b || adjlist[a + "-" + b];
    }
    
    var link = container.append("g").attr("class", "links")
        .selectAll("line")
        .data(graph.links)
        .enter()
        .append("line")
        .attr("stroke", "#aaa")
        .attr("stroke-width", (d) => {
          if(d.weight >= 1000)
            return 10
          else if(d.weight < 1000 && d.weight >= 100)
            return 5
          else if(d.weight < 100 && d.weight >= 10)
            return 2
          else
            return 1
        });

    var node = container.append("g").attr("class", "nodes")
        .selectAll("g")
        .data(graph.nodes)
        .enter()
        .append("circle")
        .attr("r", (d) => {
          if(d.countTotal >= 1000)
            return (d.countTotal/1000)*100
          else if(d.countTotal < 1000 && d.countTotal >= 100)
            return d.countTotal/100 *10
          else if(d.countTotal < 100 && d.countTotal >= 10)
            return d.countTotal/10 + 10
          else
            return d.countTotal+5
        })
        .attr("fill", function(d) {return tonoColor.get(d.maxTono); })
    
    container.append("text")
      .attr('id', "nodeinfo")
      .attr("class", "mono2")  
      .attr('x',0)
      .attr('y',200);
    
    function focusNode(d) {
        var index = d3.select(d3.event.target).datum().index;
        node.style("opacity", function(o) {
            return neigh(index, o.index) ? 1 : 0.1;
        });
        labelNode.attr("display", function(o) {
          return neigh(index, o.node.index) ? "block": "none";
        });
        link.style("opacity", function(o) {
            return o.source.index == index || o.target.index == index ? 1 : 0.1;
        });
        d3.select("#nodeinfo")
          .text("Palabra: "+d.id+" - Cantidad: "+d.countTotal);  
    }

    function unfocusNode() {
       d3.select("#nodeinfo")
          .text("");  
       labelNode.attr("display", "block");
       node.style("opacity", 1);
       link.style("opacity", 1);
       
    }
    
    function focusLink(d) {
      d3.select("#nodeinfo").text("Link: "+d.source.id+" - "+d.target.id+" (Weigth:"+d.weight+")");
    }
    function unfocusLink() {
      d3.select("#nodeinfo").text("");
    }
    
    node.on("mouseover", focusNode).on("mouseout", unfocusNode);
    link.on("mouseover", focusLink).on("mouseout", unfocusLink);

    node.call(
        d3.drag()
            .on("start", dragstarted)
            .on("drag", dragged)
            .on("end", dragended)
    );

    var labelNode = container.append("g").attr("class", "labelNodes")
        .selectAll("text")
        .data(label.nodes)
        .enter()
        .append("text")
        .text(function(d, i) { return i % 2 == 0 ? "" : d.node.id; })
        .style("fill", "black")
        .style("font-family", "Arial")
        .style("font-size", 12)
        .style("pointer-events", "none"); // to prevent mouseover/drag capture

    function ticked() {

        node.call(updateNode);
        link.call(updateLink);

        labelLayout.alphaTarget(0.3).restart();
        labelNode.each(function(d, i) {
            if(i % 2 == 0) {
                d.x = d.node.x;
                d.y = d.node.y;
            } else {
                var b = this.getBBox();

                var diffX = d.x - d.node.x;
                var diffY = d.y - d.node.y;

                var dist = Math.sqrt(diffX * diffX + diffY * diffY);

                var shiftX = b.width * (diffX - dist) / (dist * 2);
                shiftX = Math.max(-b.width, Math.min(0, shiftX));
                var shiftY = 16;
                this.setAttribute("transform", "translate(" + shiftX + "," + shiftY + ")");
            }
        });
        labelNode.call(updateNode);

    }

    function fixna(x) {
        if (isFinite(x)) return x;
        return 0;
    }

    function updateLink(link) {
        link.attr("x1", function(d) { return fixna(d.source.x); })
            .attr("y1", function(d) { return fixna(d.source.y); })
            .attr("x2", function(d) { return fixna(d.target.x); })
            .attr("y2", function(d) { return fixna(d.target.y); });
    }

    function updateNode(node) {
        node.attr("transform", function(d) {
            return "translate(" + fixna(d.x) + "," + fixna(d.y) + ")";
        });
    }

    function dragstarted(d) {
        d3.event.sourceEvent.stopPropagation();
        if (!d3.event.active) graphLayout.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
    }

    function dragged(d) {
        d.fx = d3.event.x;
        d.fy = d3.event.y;
    }

    function dragended(d) {
        if (!d3.event.active) graphLayout.alphaTarget(0);
        d.fx = null;
        d.fy = null;
    }
    
    var legValues = new Array(5);
  
    legValues.push("Muy Feliz")
    legValues.push("Feliz")
    legValues.push("Indiferente")
    legValues.push("Triste")
    legValues.push("Muy Triste")

    var legend = container.selectAll(".legend")
    .data(legValues)
    .enter().append("g")
    .attr("class", "legend");

    legend.append("rect")
      .attr("x",(d, i) => { return legendElementWidth*1.7 * i; })
      .attr("y", 550)
      .attr("width", legendElementWidth*1.7)
      .attr("height", cellSize)
      .style("fill",(d, i) => {
        if(d)
          return tonoColor.get(d);
        else
          return d3.rgb(255,255,255)});

    legend.append("text")
      .attr("class", "mono2")
      .text((d) => { return d; })
      .attr("width", legendElementWidth*1.5)
      .attr("x", (d, i) => { return legendElementWidth*1.7 * i; })
      .attr("y", 590);
  }
  drawBarAndGraphChart()
  
  return svg.node();
}
);
  return main;
}
