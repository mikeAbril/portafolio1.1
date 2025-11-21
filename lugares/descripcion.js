 

document.addEventListener("DOMContentLoaded", ()=>{

    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");

    axios.get("./lugares.json").then((res)=>{
        const data = res.data;
        const lugar = data.find((item)=> item.id == id);

          document.body.style.background = `linear-gradient(135deg, ${lugar.categoria.colorPrimario}, ${lugar.categoria.colorSecundario})`;

         
                const contenedor = document.createElement("div");
                contenedor.className = "contenido";

                const container = document.createElement("div")
                container.className = "container"
                const titulo = document.createElement("h1");
                titulo.textContent = lugar.nombre;

                const imagen = document.createElement("img");
                imagen.src = lugar.url_imagen;
                imagen.alt = lugar.nombre;

                let caja1 = document.createElement("div");
                caja1.className = "caja";

                const pais = document.createElement("h2");
                pais.textContent = `País: ${lugar.pais}`;
                const descripcion = document.createElement("h2");
                descripcion.textContent = `Descripcion: ${lugar.descripcion}`;

                 let caja2 = document.createElement("div");
                caja2.className = "caja";

                const titulocaja2 = document.createElement("h2");
                titulocaja2.textContent = "coordenadas"

                const coordenada1 = document.createElement("h3");
                coordenada1.textContent = `longuitud: ${lugar.coordenadas.latitud}`;
                
                const coordenada2 = document.createElement("h3");
                coordenada2.textContent = `longuitud: ${lugar.coordenadas.longitud}`;

                let caja3 = document.createElement("div");
                caja3.className = "caja";

                const tituloCaja3 = document.createElement("h2");
                tituloCaja3.textContent = `Datos interesantes`

                const datosInteresantes1 = document.createElement("h3");
                datosInteresantes1.textContent = ` ${lugar.datosInteresantes[0].titulo}: ${lugar.datosInteresantes[0].valor}`;
                
                const datosInteresantes2 = document.createElement("h3");
                datosInteresantes2.textContent = ` ${lugar.datosInteresantes[1].titulo}: ${lugar.datosInteresantes[1].valor}`;

                const datosInteresantes3 = document.createElement("h3");
                datosInteresantes3.textContent = ` ${lugar.datosInteresantes[2].titulo}: ${lugar.datosInteresantes[2].valor}`;
             
                let caja4 = document.createElement("div");
                caja4.className = "caja";

                const tituloCaja4 = document.createElement("h2");
                tituloCaja4.textContent = `Actividades recomendadas`

                const actividad1 = document.createElement("h3");
                actividad1.textContent = `${lugar.actividadesRecomendadas[0]}`;
                
                const actividad2 = document.createElement("h3");
                actividad2.textContent = `${lugar.actividadesRecomendadas[1]}`;

                const actividad3 = document.createElement("h3");
                actividad3.textContent = `${lugar.actividadesRecomendadas[2]}`;

                let caja5 = document.createElement("div");
                caja5.className = "caja";

                const tituloCaja5 = document.createElement("h2");
                tituloCaja5.textContent = `Categoria`

                const categoria = document.createElement("h3");
                categoria.textContent = lugar.categoria.nombre;
 
                const botonVolver = document.createElement("button");
                botonVolver.textContent = "Volver al inicio";
                botonVolver.onclick = () => {
                    window.location.href = "index.html";  
                };

      
                contenedor.appendChild(titulo);
                contenedor.appendChild(imagen);
                contenedor.appendChild(caja1);
                contenedor.appendChild(caja2);
                contenedor.appendChild(caja3);
                contenedor.appendChild(caja4);
                contenedor.appendChild(caja5);
                caja1.appendChild(pais);
                caja1.appendChild(descripcion);

                container.appendChild(caja2);
                container.appendChild(caja3);
                container.appendChild(caja4);
                container.appendChild(caja5);

                caja2.appendChild(titulocaja2);
                caja2.appendChild(coordenada1);
                caja2.appendChild(coordenada2);

                caja3.appendChild(tituloCaja3);
                caja3.appendChild(datosInteresantes1);
                caja3.appendChild(datosInteresantes2);
                caja3.appendChild(datosInteresantes3);
                
                caja4.appendChild(tituloCaja4);
                caja4.appendChild(actividad1);
                caja4.appendChild(actividad2);
                caja4.appendChild(actividad3);
               
                caja5.appendChild(tituloCaja5);
                caja5.appendChild(categoria);
                
                contenedor.appendChild(container);
                contenedor.appendChild(botonVolver);

         
                document.body.appendChild(contenedor);
    })
    
})