
//  window.addEventListener("load",function(){
//     var boton=document.getElementById('btnGuardar');//boton=$('btnGuardar);
//     boton.addEventListener("click",agregar);
        //     localStorage.setItem("clave","valor");

        //    if(localStorage.getItem("clave")!=null) {

        //    }
        //    else{
        //     LeerGet();
        //    }
// });
var xml=new XMLHttpRequest();
window.addEventListener("load",LeerGet);
function $(id){
    return document.getElementById('id');
}
var arrayPersonas=[];
var FilaEliminarSeleccionada;
function Agregar(){
     var nombre=document.getElementById('inputNombreAgregar').value;
     var apellido=document.getElementById('inputApellidoAgregar').value;
     var telefono=document.getElementById('inputTelefonoAgregar').value;

     var fecha=document.getElementById('inputFechaAgregar').value;

    
     if(nombre=='')
     {
         nombre.className="Error";
     }
     if(apellido=='')
     {
         apellido.className="Error";
     }
     else{
        if(confirm("Esta seguro que desea agregar?")==true)
        {
            var tBody=document.getElementById('tCuerpo');
            var Fila=tBody.insertRow(0);
            var celdaNombre=Fila.insertCell(0);
            var celdaApellido=Fila.insertCell(1);
            var celdaFecha=Fila.insertCell(2);
            var celdaTelefono=Fila.insertCell(3);
            var celdaAccion=Fila.insertCell(4);
            var celdaModificar=Fila.insertCell(5);
            celdaNombre.innerHTML=nombre;
            celdaApellido.innerHTML=apellido;
            celdaFecha.innerHTML=fecha;
            celdaTelefono.innerHTML=telefono;
            celdaAccion.innerHTML="<a href=''> Borrar";
            celdaModificar.innerHTML="<a href=''> Modificar";
            
            // tBody.innerHTML=tBody.innerHTML + "<tr><td>"+nombre+"</td><td>"+apellido+"</td><td><a href=''>borrar</td></tr>"
        }
        var Persona={};
        Persona.Nombre=nombre;
        Persona.Apellido=apellido;
        Persona.Fecha=fecha;
        Persona.Telefono=telefono;
        var PersonaString=JSON.stringify(Persona);
        arrayPersonas.push(Persona);
        localStorage.setItem(Persona.Nombre+'_'+Persona.Apellido,PersonaString);
        tBody.innerHTML='';
        console.log("__________________________");
        CompletaTabla(arrayPersonas);
     }
     
}
function ModificarRegistro(){

     var nombre=document.getElementById('inputNombre').value;
     if(nombre==""||nombre==null)
     {
        nombre=document.getElementById('inputNombre').placeholder;
     }

     var apellido=document.getElementById('inputApellido').value;
     if(apellido==""||apellido==null)
     {
        apellido=document.getElementById('inputApellido').placeholder;
     }

     var telefono=document.getElementById('inputTelefono').value;
    if(telefono==""||telefono==null)
     {
        telefono=document.getElementById('inputTelefono').placeholder;
     }
     var fecha=document.getElementById('inputFecha').value;
    if(fecha==""||fecha==null)
     {
        fecha=document.getElementById('inputFecha').placeholder;
     }
    
     
     
        if(confirm("Esta seguro que desea Modificar?")==true)
        {
            var tBody=document.getElementById('tCuerpo');
            var Fila=tBody.insertRow(0);
            var celdaNombre=Fila.insertCell(0);
            var celdaApellido=Fila.insertCell(1);
            var celdaFecha=Fila.insertCell(2);
            var celdaTelefono=Fila.insertCell(3);
            var celdaAccion=Fila.insertCell(4);
            var celdaModificar=Fila.insertCell(5);
            celdaNombre.innerHTML=nombre;
            celdaApellido.innerHTML=apellido;
            celdaFecha.innerHTML=fecha;
            celdaTelefono.innerHTML=telefono;
            celdaAccion.innerHTML="<a href=''> Borrar";
            celdaModificar.innerHTML="<a href=''> Modificar";
            document.getElementById('divTablaModificar').style.display='none';
          document.getElementById('modificar').style.display='none';

        console.log(localStorage.getItem(nombre+'_'+apellido));

        document.getElementById('tBody').innerHTML="";
        console.log("__________________________");
        CompletaTabla(arrayPersonas);
            // tBody.innerHTML=tBody.innerHTML + "<tr><td>"+nombre+"</td><td>"+apellido+"</td><td><a href=''>borrar</td></tr>"
        }
     
     
}
function cerrar()
{
    document.getElementById('divIngreso').style.display='none';
}
function cerrarModificar()
{
    document.getElementById('divTablaModificar').style.display='none';
}
function AbrirAgregar(){
    document.getElementById('divIngreso').style.display='inline-block';
}



    //var btn= $('btn');
    //btn.addEventListener("click",LeerGet);
    // btn.addEventListener("click",enviarGet);
    
var indexSeleccionado;
function callback()
{
    if(xml.readyState===4){
        if(xml.status===200)
        {
            var respuesta=xml.responseText;      
                // alert("levanto ok");  
                //localStorage.setItem("storage",respuesta);
                //alert(localStorage.getItem("storage"));

                var listaPersonas=JSON.parse(respuesta);
                for(var i=0;i<listaPersonas.length;i++)
                { var auxiliar=JSON.stringify(listaPersonas[i]);
                    //console.log(listaPersonas[i].nombre);     
                    arrayPersonas.push(listaPersonas[i]);
                    localStorage.setItem(listaPersonas[i].nombre+'_'+listaPersonas[i].apellido,auxiliar);
                }
                CompletaTabla(arrayPersonas);            
        }
        
        else{
            alert("error en el servidor");
        }
    }
}
function LeerGet(){

        xml.open("GET","http://localhost:3000/personas",true);

        xml.onreadystatechange=callback;

        xml.send();

    }

function CompletaTabla(Personas)
{ 
    
    var Tabla=document.getElementById('tablaPersonas');

    for(var i=0;i<Personas.length;i++){
        console.log(Personas[i]);
        // var Fila=Tabla.insertRow(i+1);      
        // var CeldaNombre=Fila.insertCell(0);
        // var CeldaApellido=Fila.insertCell(1);
        // var CeldaFecha=Fila.insertCell(2);
        // var CeldaTelefono=Fila.insertCell(3);
        // var CeldaAccion=Fila.insertCell(4);

        var FilaRow=document.createElement('tr');
        var obj=Personas[i];
      
        var columns=Object.keys(obj); //retorna array string de claves
        for(var j=0;j<columns.length;j++)
        {     

            var cel=document.createElement('td');
            var text=document.createTextNode(obj[columns[j]]);
            cel.appendChild(text);
            FilaRow.appendChild(cel);
        }
        var cel=document.createElement('td');
        var link=document.createElement('a');
        link.setAttribute("href",'#');
        link.addEventListener("click",Eliminar);
        var text=document.createTextNode("borrar");
        link.appendChild(text);
        cel.appendChild(link);
        FilaRow.appendChild(cel);

         var celda=document.createElement('td');
         var link2=document.createElement('a');
         link2.setAttribute("href",'#');
         link2.addEventListener("click",Modificar);
         var text2=document.createTextNode("Modificar");
         link2.appendChild(text2);
         celda.appendChild(link2);
         FilaRow.appendChild(celda);
        // var CeldaNombreRow=document.createElement('td');
        // var CeldaApellidoRow=document.createElement('td');
        // var CeldaFechaRow=document.createElement('td');
        // var CeldaTelefonoRow=document.createElement('td');
        // var CeldaAccionRow=document.createElement('td');

        // CeldaNombreRow.innerHTML=Personas[i].nombre;
        // CeldaApellidoRow.innerHTML=Personas[i].apellido;
        // CeldaFechaRow.innerHTML=Personas[i].fecha;
        // CeldaTelefonoRow.innerHTML=Personas[i].telefono;
        // CeldaNombre.innerHTML=Personas[i].nombre;
        // CeldaApellido.innerHTML=Personas[i].apellido;
        // CeldaFecha.innerHTML=Personas[i].fecha;
        // CeldaTelefono.innerHTML=Personas[i].telefono;  
        // CeldaAccionRow.innerHTML='Borrar';
        // CeldaAccionRow.className='AccionBorrar';
        // CeldaAccionRow.onclick=function(){
            
        //     Eliminar(FilaRow);
        // }
        // CeldaAccion.innerHTML='Borrar';
        // CeldaAccion.className='AccionBorrar';
        // CeldaAccion.onclick=function(){
            
        //     Eliminar(FilaEliminarSeleccionada);
        // }
        
    //    FilaRow.appendChild(CeldaNombreRow);
    //    FilaRow.appendChild(CeldaApellidoRow);
    //    FilaRow.appendChild(CeldaFechaRow);
    //    FilaRow.appendChild(CeldaTelefonoRow);
    //    FilaRow.appendChild(CeldaAccionRow);
       Tabla.appendChild(FilaRow);
    }
    
}
    function Eliminar (event) {
        event.preventDefault();//saca valores por defecto del evento 
        event.target;//me devuelve el componente que lanza el evento
       var padre= (event.target.parentNode).parentNode;
       for(var i=0;i<arrayPersonas.length;i++)
       {
        if(arrayPersonas[i].nombre==padre.childNodes[0].innerHTML && arrayPersonas[i].apellido==padre.childNodes[1].innerHTML)
        {
            console.log(arrayPersonas.length);
            
            arrayPersonas.pop(arrayPersonas[i]);
            console.log(arrayPersonas.length);
            localStorage.removeItem(arrayPersonas[i].nombre+'_'+arrayPersonas[i].apellido);
            //console.log(arrayPersonas[i].nombre);
            //console.log(padre.childNodes[0].innerHTML);
            //console.log("___________________________");
            //console.log(arrayPersonas[i].apellido);
            //console.log(padre.childNodes[1].innerHTML);
            //console.log("___________________________");
        }
       }
       ;
       padre.parentNode.removeChild(padre);
       
    }

     function Modificar(event) //local storage
     {
         event.preventDefault();
         event.target;     
         //console.log(event.target);
        
         var padre=((event.target).parentNode).parentNode;
         var array=padre.children;
       var tBody=document.getElementById('tCuerpoModificar');
            var Fila=tBody.insertRow(0);
            var celdaNombre=document.getElementById('inputNombre');
            var celdaApellido=document.getElementById('inputApellido');
            var celdaFecha=document.getElementById('inputFecha');
            var celdaTelefono=document.getElementById('inputTelefono');
            var celdaAccion=document.getElementById('btnGuardar');
            //var celdaModificar=Fila.insertCell(5);
            celdaNombre.placeholder=array[0].innerHTML;
            celdaApellido.placeholder=array[1].innerHTML;
            celdaFecha.placeholder=array[2].innerHTML;
            celdaTelefono.placeholder=array[3].innerHTML;
          document.getElementById('divTablaModificar').style.display='block';
          document.getElementById('modificar').style.display='block';    
    }
       