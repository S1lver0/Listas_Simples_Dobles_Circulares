class Nodo{

    info=0;
    liga=null;
}
export class Lista{
  
   INICIO=null;
   canvas=null;
   consola=null;
   consolaY=0; //guarda Y se usa en dibujarconsola

   buscar(DATO){
    var encontrado=false;
    var	tmp=this.INICIO;
    while(tmp!=null){
        if(tmp.info==DATO){
            encontrado=true;
            break;
        }
        tmp=tmp.liga;
    }

    return encontrado;
   }///////////////////////////////////////////

    inserta_inicio(DATO){
       var P=this.INICIO;
       var Q=new Nodo();
       Q.info=DATO;
       Q.liga=P;
       P=Q;

       this.INICIO=P;
   }
   ///////////////////////////////////////////
    inserta_final(DATO){
        var P=this.INICIO;
        
        var T=P;
        while(T.liga!=null){
            T=T.liga; 
        }
        var Q=new Nodo();
        Q.info=DATO;
        Q.liga=null;
        T.liga=Q;
        
        this.INICIO=P;
    }/////////////////////////////////////////////

    inserta_antes_X (DATO,comp){
        var P_ini=this.INICIO;
        var adelante=P_ini;
        var BAND=1;
        var atras=null;
        while ( adelante.info!=comp && BAND==1 ){
            if(adelante.liga!=null){
                atras=adelante;
                adelante=adelante.liga;
            }
            else{
                BAND=0;
            }
        }
    
        if(BAND==1){
            var nuevo=new Nodo();
            nuevo.info=DATO;
            if(P_ini==adelante){
                nuevo.liga=P_ini;
                P_ini=nuevo;
            }
            else{
                atras.liga=nuevo;
                nuevo.liga=adelante;
            }
        }
        else{
            throw new Error("EL NODO DADO COMO REFERENCIA NO SE ENCUENTRA EN LA LISTA");
        }
        this.INICIO=P_ini;
    }

    inserta_despues_X (DATO,comp){
        var P_ini=this.INICIO;
        var atras=P_ini;
        var BAND=1;
        var adelante=null;
        
        while ( atras.info!=comp && BAND==1 ){
            if(atras.liga!=null){
                atras=atras.liga;
                adelante=atras.liga;
            }
            else{
                BAND=0;
            }
        }
        
        if(BAND==1){
            var nuevo=new Nodo();
            if(atras==P_ini){
                var aux=P_ini.liga;
                nuevo.info=DATO;
                atras.liga=nuevo;
                nuevo.liga=aux;
            }
            else{
                nuevo.info=DATO;
                atras.liga=nuevo;
                nuevo.liga=adelante;
            }
        }
        else{
            throw new Error("EL NODO DADO COMO REFERENCIA NO SE ENCUENTRA EN LA LISTA");
        } 
    }

    dibujarNodosLog(){

        var	tmp=this.INICIO;
        var cad="";
        while(tmp!=null){
            cad+=tmp.info+"::";
            tmp=tmp.liga;
        }
        console.log(cad);
    }
    dibujarNodos(valor){

        var canvas=this.canvas;
        var ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);//limpia el canva 
        var	tmp=this.INICIO;

        if(window.innerWidth>800){//escritorio
            canvas.width  = window.innerWidth*1;  // set the resolution to fill the page
            canvas.height = window.innerHeight*0.2; 
        }
        else{//mobiles
             canvas.width  = window.innerWidth*1;  // set the resolution to fill the page
        }


        var x=0;
        var y=0;
        var ctd=0;	
        var nodo = null;		

        while(tmp!=null){//dibuja toda la lista

            if(valor != undefined && tmp.info==valor){
                //Dibujar rectangulo
                ctx.beginPath();
                ctx.fillStyle = "rgb(125,125,125)";//GRIS
                ctx.fillRect (x,y, 55,30);
                
                nodo={};
                nodo.x=x;
                nodo.y=y;
                nodo.width=55;
                nodo.height=30;
                nodo.info=tmp.info;
            }
            else{
            //Dibujar rectangulo
            ctx.beginPath();
            ctx.fillStyle = "rgb(255,255,255)";
            ctx.fillRect (x,y, 55,30);
            }


            //texto
            ctx.fillStyle="black";
            ctx.font = '15px Arial';
            ctx.fillText(tmp.info,x+20,y+20);
            ctx.closePath();

            //Dibujar flecha
            //linea de la flecha
            ctx.beginPath();
            ctx.moveTo(x+55,y+15);
            ctx.lineTo(x+55+20,y+15);
            ctx.strokeStyle = "#FFFFFF";
            ctx.closePath();
            ctx.stroke();
            //cabeza de la flecha
            ctx.beginPath();
            ctx.fillStyle="white";
            ctx.moveTo(x+55+20,y+10);
            ctx.lineTo(x+55+20+5,y+15);
            ctx.lineTo(x+55+20,y+20);
            ctx.closePath();
            ctx.fill();
            if(x>canvas.width-150){ // para que baje si supera el limite
                //Dibujar flecha
                //FLECHA QUE VA A LA DERECHA 
                ctx.beginPath();
                ctx.moveTo(x+55,y+15);
                ctx.lineTo(x+55+20,y+15);
                ctx.closePath();
                ctx.stroke();
                //FLECHA QUE BAJA
                ctx.beginPath();
                ctx.moveTo(x+55+20,y+15);
                ctx.lineTo(x+55+20,y+40);
                ctx.closePath();
                ctx.stroke();
                ///fecha que va hacia la izquierda
                ctx.moveTo(x+55+20,y+40);
                ctx.lineTo(x+27-x,y+40);
                ///fecha que va para abajo
                ctx.moveTo(x+27-x,y+40);
                ctx.lineTo(x+27-x,y+45);
                /////////////////////////////
                ctx.closePath();
                ctx.stroke();
                //cabeza de la flecha
                ctx.beginPath();
                ctx.fillStyle="white";
                ctx.moveTo(x+27-x-5,y+45);
                ctx.lineTo(x+27-x+5,y+45);
                ctx.lineTo(x+27-x,y+45+5);
                ctx.closePath();
                ctx.fill();
                ctd=0;
                x=0;
                y=y+50;
            }
            else{
                x=80*++ctd;
            }
            tmp=tmp.liga;
        }

        if(nodo!=null){

            setTimeout(function(){

                ctx.beginPath();
                ctx.fillStyle = "rgb(255,255,255)";
                ctx.fillRect (nodo.x,nodo.y,nodo.width,nodo.height);
    
                //texto
                ctx.fillStyle="black";
                ctx.font = '15px Arial';
                ctx.fillText(nodo.info,nodo.x+20,nodo.y+20);
                ctx.closePath();

            },1000);
           
        }
    
    }

    //////algoritmos de eliminacion 

    eliminar_primero(){
        var P_ini = this.INICIO;
        P_ini=P_ini.liga;
        this.INICIO=P_ini;
    }


    eliminar_final(){
        var P_ini=this.INICIO;
        var aux=P_ini;
        var borrar=null;
        while(aux.liga!=null){
            borrar=aux;
            aux=aux.liga;
        }
        if(aux==P_ini){
            P_ini=null;
        }
        else{
            borrar.liga=null;
        }
        this.INICIO=P_ini;
    }

    eliminar_X(comp){
        var P_ini=this.INICIO;
        var eliminar = P_ini;
        var BAND=1;
        var atras=null;
        while(eliminar.info!=comp&&BAND==1){
            if(eliminar.liga!=null){
                atras=eliminar;
                eliminar=eliminar.liga;
            }else{
                BAND=0;
            }
        }
        if(BAND==1){
            if(eliminar==P_ini){
                P_ini=P_ini.liga;
            }
            else{
                atras.liga=eliminar.liga;
            }
        }
        else{
            throw new Error("El nodo no se encuentra en la lista");
        }
        this.INICIO=P_ini;
    }

    eliminar_Despues_X(comp){
        var P_ini=this.INICIO;
        var eliminar = P_ini;
        var BAND=1;
        var adelante=null;
        while(eliminar.info!=comp&&BAND==1){
            if(eliminar.liga!=null){
                eliminar=eliminar.liga;
                adelante=eliminar.liga;
            }else{
                BAND=0;
            }
        }
        if(BAND==1){
            if(eliminar==P_ini){
                if(P_ini.liga!=null){
                    P_ini.liga=P_ini.liga.liga;
                }
                else{
                    throw new Error("No existe un nodo despues de este");
                }
            }
            else{
                if(adelante!=null){
                    eliminar.liga=adelante.liga;
                }
                else{
                    throw new Error("No existe un nodo despues de este");
                }
            }
        }
        else{
            throw new Error("El nodo no se encuentra en la lista");
        }
        this.INICIO=P_ini;
    }

    eliminar_antes_X (DATO){
        var P_ini=this.INICIO;
        if(P_ini.info==DATO){
            throw new Error("No hay nodo antes de este");
        }
        else{
            var adelante=P_ini;
            var BAND=1;
            var atras=null;
            var aux=null;
            while (adelante.info!=DATO && BAND==1 ){
                if(adelante.liga!=null){
                    aux=atras;
                    atras=adelante;
                    adelante=adelante.liga;
                }
                else{
                    BAND=0;
                }
            }
            if(BAND==0){
                throw new Error("No se encuentra el dato ingresado");
            }
            if(P_ini.liga==adelante){
                P_ini=adelante;
            }
            else{
               aux.liga=adelante;
            }
        }
        this.INICIO=P_ini;
    }

    isVacio(){
        if(this.INICIO==null)
           return true;
        else 
           return false;
      }///////////////////////////////////////////


    ///////////////////////////////////////
    //consola
    ///////////////////////////////////////
    dibujarConsola(){
        var canvas=this.consola; 
        var ctx = canvas.getContext('2d');
    
        if(this.consolaY==0){ // se dibuja cuadro negro tamaño de canva
            ctx.fillStyle = "black";
            ctx.fillRect(0, 0,700,300);
        }
    
        var	tmp=this.INICIO;
        var x=0;			
        //estado actual de lista 
        var cad="";
        while(tmp!=null){
            cad+=tmp.info+"::";
            tmp=tmp.liga;
        }
        ctx.fillStyle="white";
        ctx.font = '20px Arial';
        ctx.fillText(">",x+20,this.consolaY+20); // se dibuja el >
        ctx.fillText(cad,x+35,this.consolaY+20); // se dibuja lista
        ctx.closePath();
        ctx.fillStyle = "black"; 
        ctx.fillRect(11, 7,x+20,this.consolaY); // se dibuja cuadrado negro de 11x7 para borrar > anterior 
        this.consolaY=this.consolaY+30 //y se actualiza para seguir bajando
        if(this.consolaY==90){ // si llega a 300 es que y esta en el final requiere reinicio 
            this.consolaY=0;
        }
    }
}



