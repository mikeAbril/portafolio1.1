document.addEventListener("DOMContentLoaded", async () => {
  const titulo = document.createElement("div");
  titulo.classList = "titulo"
  const h1 = document.createElement("h1");
  h1.textContent = "Lugares Históricos del Mundo";

  const p = document.createElement("p");
  p.textContent = "Acompáñame a revisar las maravillas del mundo";

  titulo.appendChild(h1);
  titulo.appendChild(p);
  document.body.insertBefore(titulo, document.body.firstChild);

  try {
    const info = await axios.get("./lugares.json");
    const data = info.data;

    const world = document.getElementById("world");

    data.forEach((lugar) => {
      const item = document.createElement("div");
      item.className = "item";

      const img = document.createElement("img");
      img.src = lugar.url_imagen;
      img.alt = lugar.nombre;

      const nombre = document.createElement("h2");
      nombre.textContent = lugar.nombre;

      const pais = document.createElement("p");
      pais.textContent = lugar.pais;

      const boton = document.createElement("button");
      boton.textContent = "Mirar";

      boton.onclick = () => {
 
      window.location.href = "descripcion.html?id=" + lugar.id;
      };


      item.appendChild(img);
      item.appendChild(pais);
      item.appendChild(nombre);
      item.appendChild(boton);

 
      world.appendChild(item);
    });
  } catch (error) {
    console.error("Error al cargar JSON:", error);
  }
});
