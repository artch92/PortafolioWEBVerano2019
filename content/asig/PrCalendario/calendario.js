//Arrays de datos:
meses = ["enero","febrero","marzo","abril","mayo","junio","julio","agosto","septiembre","octubre","noviembre","diciembre"];
lasemana = ["Domingo","Lunes","Martes","Miércoles","Jueves","Viernes","Sábado"];
diassemana = ["lun","mar","mié","jue","vie","sáb","dom"];

window.onload = function() {
  //fecha actual
    hoy = new Date(); //objeto fecha actual
    diasemhoy = hoy.getDay(); //dia semana actual
    diahoy = hoy.getDate(); //dia mes actual
    meshoy = hoy.getMonth(); //mes actual 
    annohoy = hoy.getFullYear(); //año actual 
    
    //Elementos del DOM: en cabecera de calendario
    tit = document.getElementById("titulos"); //cabecera del calendario
    ant = document.getElementById("anterior"); //mes anterior
    pos = document.getElementById("posterior"); //mes posterior
    
    // Elementos del DOM en primera fila 
    f0=document.getElementById("fila0"); 

    //Pie de calendario
    pie=document.getElementById("fechaactual"); 
    pie.innerHTML+=lasemana[diasemhoy]+", "+diahoy+" de "+meses[meshoy]+" de " + annohoy;

    //Formulario: datos oficiales: 
    document.buscar.buscaanno.value = annohoy; 

    //Definir elementos iniciales: 
    mescal = meshoy; //mes principal 
    annocal = annohoy; //año principal 

    //Iniciar calendario: 
    cabecera();
    primeralinea();
    escribirdias(); 
}

function cabecera() {
    tit.innerHTML=meses[mescal]+" de "+annocal;
    mesant=mescal-1; //mes anterior
    mespos=mescal+1; //mes posterior
    if (mesant<0){mesant=11;}
    if (mespos>11){mespos=0;}
    ant.innerHTML=meses[mesant];
    pos.innerHTML=meses[mespos];
    }

//primera línea de tabla: días de la semana.
function primeralinea() {
        for (i=0;i<7;i++) {
            celda0=f0.getElementsByTagName ("th")[i];
            celda0.innerHTML=diassemana[i];
        }
    }

function escribirdias() { 
    //Buscar dia de la semana del dia 1 del mes: 
    primeromes=new Date(annocal, mescal, "1"); // buscar primer dia del mes 
    prsem=primeromes.getDay(); //buscar dia de la semana del dia 1 
    prsem--; // adaptar al calendario espanol (empezar por lunes)
    if (prsem==-1){
        prsem=6;
    } 
    //buscar fecha para primera celda: 
    diaprmes=primeromes.getDate(); 
    prcelda=diaprmes - prsem; // restar dias que sobran de la semana 
    empezar=primeromes.setDate(prcelda); //empezar= tiempo UNIX 1 celda 
    diames=new Date(); //convertir en fecha 
    diames.setTime(empezar); // diames=fechd primera celda.
    //Recorrer I as celdas para escribir el dia: 
    for(i=1;i<7;i++){ //localizar fila
        fila=document.getElementById("fila"+i);
        for(j=0;j<7;j++){
            midia=diames.getDate();
            mimes=diames.getMonth();
            mianno=diames.getFullYear();
            celda=fila.getElementsByTagName("td")[j];
            celda.innerHTML=midia;
            //Recuperar estado inicial al cambiar de mes:
            celda.style.backgroundC010r= "#9bfSff";
            celda.style.color= "#492736";
            //domingos en rojo
            if(mimes!=mescal){
                celda.style.color="#a0babc";
            }
            //destacar la fecha actual
            if(mimes==meshoy && midia==diahoy && mianno==annohoy){
                celda.style.backgroundColor="#f0b19e";
                celda.innerHTML="<cite title='Fecha Actual'>"+midia+"</cite>";
            }
            //pasar al siguiente dia
            midia=midia+1;
            diames.setDate(midia);
            }
        }
    }

function mesantes(){
    nuevomes=new Date(); //nuevo objeto de fecha
    primeromes--; //Restamos un día al 1 del mes visualizado
    nuevomes.setTime(primeromes); //cambiamos fecha al mes anterior
    mescal=nuevomes.getMonth(); //cambiamos las variables que usarán las funciones
    annocal=nuevomes.getFullYear();
    cabecera(); //llamada a funcion de cambio de cevecera
    escribirdias(); //llamada a funcion de cambio de tabla
}

function mesdespues(){
    nuevomes=new Date(); //nuevo objeto fecha
    tiempounix=primeromes.getTime(); //tiempo de primero mes visible
    tiempounix=tiempounix+(45*24*60*60*1000); //le añadimos 45 días
    nuevomes.setTime(tiempounix); //fecha con mes posterior.
    mescal=nuevomes.getMonth(); //cambiamos variables
    annocal=nuevomes.getFullYear();
    cabecera(); //escribir la cabecera
    escribirdias(); //escribir la tabla
}

//volver al mes actual
function actualizar(){
    mescal=hoy.getMonth(); //cambiar a mes actual
    annocal=hoy.getFullYear(); //cambiar a año actual
    cabecera(); //escribir la cabecera
    escribirdias(); //escribir la tabla
}