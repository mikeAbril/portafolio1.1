let datos = [];

function guardar() {
  const nombre = document.getElementById("nombre").value.trim();
  const apellidos = document.getElementById("apellidos").value.trim();
  const documento = document.getElementById("documento").value.trim();
  const correo = document.getElementById("correo").value.trim();

  if (!nombre) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "No puedes pasar sin digitar el nombre!",
    });
  } else if (!apellidos) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "No puedes pasar sin digitar el apellido!",
    });
  } else if (!documento) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "No puedes pasar sin digitar el documento!",
    });
  } else if (!correo) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "No puedes pasar sin digitar el correo!",
    });
  } else {
    let reg = { nombre, apellidos, documento, correo };
    datos.push(reg);
    console.log(datos);
    pintarDatos();

    document.getElementById("nombre").value = "";
    document.getElementById("apellidos").value = "";
    document.getElementById("documento").value = "";
    document.getElementById("correo").value = "";

 
    let modalElement = document.getElementById("miModal");
    let modal = bootstrap.Modal.getInstance(modalElement);
    if (modal) {
      modal.hide();
    }
  }
}

function pintarDatos() {
  const tbody = document.getElementById("bodyData");
  tbody.innerHTML = "";

  datos.forEach((item) => {
    tbody.innerHTML += `
      <tr>
        <td>${item.nombre}</td>
        <td>${item.apellidos}</td>
        <td>${item.documento}</td>
        <td>${item.correo}</td>
      </tr>
    `;
  });
}
    