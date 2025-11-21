// Arrays para almacenar los datos
let mesas = [];
let reservas = [];

// Función para inicializar datos desde localStorage
function inicializarDatos() {
    try {
        const mesasGuardadas = localStorage.getItem('mesas');
        if (mesasGuardadas && mesasGuardadas !== 'null') {
            mesas = JSON.parse(mesasGuardadas);
            console.log('Mesas cargadas desde localStorage:', mesas);
        } else {
            mesas = [];
            console.log('No hay mesas en localStorage, inicializando array vacío');
        }
        
        const reservasGuardadas = localStorage.getItem('reservas');
        if (reservasGuardadas && reservasGuardadas !== 'null') {
            reservas = JSON.parse(reservasGuardadas);
            console.log('Reservas cargadas desde localStorage:', reservas);
        } else {
            reservas = [];
            console.log('No hay reservas en localStorage, inicializando array vacío');
        }
        
        pintarMesas();
        actualizarSelectMesas();
    } catch (error) {
        console.error('Error al cargar datos desde localStorage:', error);
        mesas = [];
        reservas = [];
    }
}

// Función para guardar en localStorage
function guardarEnLocalStorage() {
    try {
        localStorage.setItem('mesas', JSON.stringify(mesas));
        localStorage.setItem('reservas', JSON.stringify(reservas));
        console.log('Datos guardados en localStorage');
    } catch (error) {
        console.error('Error al guardar en localStorage:', error);
    }
}

// Variables para controlar la edición
let editandoMesa = false;
let indiceMesaEditando = -1;

// Función para guardar mesa (CORREGIDA)
function guardarMesa() {
    const idMesa = document.getElementById("mesa").value.trim();
    const capacidad = document.getElementById("capacidad").value.trim();
    const ubicacion = document.getElementById("ubicacion").value.trim();
    const estado = "Disponible"; // Siempre disponible al crear/editar

    // Validaciones
    if (!validarFormularioMesa(idMesa, capacidad, ubicacion)) {
        return;
    }

    // Verificar si es edición o creación
    if (editandoMesa) {
        if (indiceMesaEditando >= 0 && indiceMesaEditando < mesas.length) {
            const mesaExistente = mesas.findIndex((mesa, index) => 
                mesa.idMesa === idMesa && index !== indiceMesaEditando
            );
            
            if (mesaExistente !== -1) {
                mostrarError("Ya existe otra mesa con ese número");
                return;
            }

            mesas[indiceMesaEditando] = { 
                idMesa: idMesa, 
                capacidad: parseInt(capacidad), 
                ubicacion: ubicacion, 
                estado: estado 
            };

            mostrarExito("Mesa actualizada correctamente");
            resetearModoEdicion();
        }
    } else {
        if (mesas.some(mesa => mesa.idMesa === idMesa)) {
            mostrarError("Ya existe una mesa con ese número");
            return;
        }

        let mesa = { 
            idMesa: idMesa, 
            capacidad: parseInt(capacidad), 
            ubicacion: ubicacion, 
            estado: "Disponible"
        };
        
        mesas.push(mesa);
        mostrarExito("Mesa registrada correctamente");
    }
    
    guardarEnLocalStorage();
    pintarMesas();
    actualizarSelectMesas();
    limpiarFormularioMesa();
    cerrarModal("modalMesa");
}

// Función de validación (CORREGIDA - sin validar estado)
function validarFormularioMesa(idMesa, capacidad, ubicacion) {
    if (!idMesa) {
        mostrarError("Debe ingresar el número de mesa");
        return false;
    }

    if (!/^\d+$/.test(idMesa)) {
        mostrarError("El número de mesa debe contener solo números");
        return false;
    }

    if (!capacidad) {
        mostrarError("Debe ingresar la capacidad de la mesa");
        return false;
    }

    const capacidadNum = parseInt(capacidad);
    if (isNaN(capacidadNum) || capacidadNum <= 0 || capacidadNum > 20) {
        mostrarError("La capacidad debe ser un número entre 1 y 20");
        return false;
    }

    if (!ubicacion) {
        mostrarError("Debe seleccionar la ubicación de la mesa");
        return false;
    }

    return true;
}

// Funciones para mostrar mensajes
function mostrarError(mensaje) {
    Swal.fire({
        icon: "error",
        title: "Error",
        text: mensaje,
    });
}

function mostrarExito(mensaje) {
    Swal.fire({
        icon: "success",
        title: "¡Éxito!",
        text: mensaje,
        timer: 2000,
        showConfirmButton: false
    });
}

// Función para resetear modo edición
function resetearModoEdicion() {
    editandoMesa = false;
    indiceMesaEditando = -1;
    
    const modalTitle = document.querySelector("#modalMesa .modal-title");
    if (modalTitle) {
        modalTitle.textContent = "🪑 Creación de Mesa";
    }
    
    const btnGuardar = document.querySelector("#modalMesa .btn-success");
    if (btnGuardar) {
        btnGuardar.textContent = "Guardar Mesa";
    }
}

// Función para editar mesa
function editarMesa(indice) {
    if (indice < 0 || indice >= mesas.length) {
        mostrarError("Mesa no encontrada");
        return;
    }

    const mesa = mesas[indice];
    
    editandoMesa = true;
    indiceMesaEditando = indice;
    
    document.getElementById("mesa").value = mesa.idMesa;
    document.getElementById("capacidad").value = mesa.capacidad;
    document.getElementById("ubicacion").value = mesa.ubicacion;
    
    const modalTitle = document.querySelector("#modalMesa .modal-title");
    if (modalTitle) {
        modalTitle.textContent = "✍️ Editar Mesa";
    }
    
    const btnGuardar = document.querySelector("#modalMesa .btn-success");
    if (btnGuardar) {
        btnGuardar.textContent = "Actualizar Mesa";
    }
    
    const modal = new bootstrap.Modal(document.getElementById('modalMesa'));
    modal.show();
}

// Función para pintar las mesas
function pintarMesas() {
    const container = document.getElementById("bodyDataMesas");
    
    if (!container) {
        console.error('No se encontró el elemento bodyDataMesas');
        return;
    }
    
    if (mesas.length === 0) {
        container.innerHTML = `
            <div class="text-center text-muted p-4">
                <i class="bi bi-table" style="font-size: 3rem;"></i>
                <p class="mt-2">No hay mesas registradas</p>
                <p>Agrega la primera mesa usando el botón "Agregar Mesa"</p>
            </div>
        `;
        return;
    }

    let html = '<div class="row">';
    
    mesas.forEach((mesa, indice) => {
        const estadoClass = getEstadoClass(mesa.estado);
        const estadoIcon = getEstadoIcon(mesa.estado);
        
        html += `
            <div class="col-md-4 col-lg-3 mb-3">
                <div class="card mesa-card ${estadoClass}" style="border-width: 2px;">
                    <div class="card-header text-center" style="font-weight: bold;">
                        <h5 class="card-title mb-0">
                            🪑 Mesa ${mesa.idMesa}
                        </h5>
                    </div>
                    <div class="card-body text-center">
                        <p class="card-text">
                            <strong>👥 Capacidad:</strong> ${mesa.capacidad} personas<br>
                            <strong>📍 Ubicación:</strong> ${mesa.ubicacion}<br>
                            <strong>🔷 Estado:</strong> ${estadoIcon} ${mesa.estado}
                        </p>
                    </div>
                    <div class="card-footer text-center">
                        <button class="btn btn-danger btn-sm" onclick="eliminarMesa(${indice})">🗑️ Eliminar</button>
                        <button class="btn btn-warning btn-sm" onclick="editarMesa(${indice})">✍️ Editar</button>
                        <button class="btn btn-success btn-sm" onclick="reservarMesa(${indice})">📖 Reservar</button>
                    </div>
                </div>
            </div>
        `;
    });
    
    html += '</div>';
    container.innerHTML = html;
}

// Función para reservar mesa
function reservarMesa(indice) {
    if (indice < 0 || indice >= mesas.length) {
        mostrarError("Mesa no encontrada");
        return;
    }

    const mesa = mesas[indice];
    
    if (mesa.estado !== 'Disponible') {
        mostrarError(`La mesa ${mesa.idMesa} no está disponible para reservar. Estado actual: ${mesa.estado}`);
        return;
    }
    
    window.location.href = `./reserva.html?mesa=${mesa.idMesa}`;
}

// Función para obtener la clase CSS según el estado
function getEstadoClass(estado) {
    switch(estado) {
        case 'Disponible': return 'border-success';
        case 'Ocupada': return 'border-danger';
        case 'Reservada': return 'border-warning';
        case 'Mantenimiento': return 'border-secondary';
        default: return 'border-primary';
    }
}

// Función para obtener el ícono según el estado
function getEstadoIcon(estado) {
    switch(estado) {
        case 'Disponible': return '✅';
        case 'Ocupada': return '🔴';
        case 'Reservada': return '⚠️';
        case 'Mantenimiento': return '🔧';
        default: return '📍';
    }
}

// Función para actualizar el select de mesas
function actualizarSelectMesas() {
    const select = document.getElementById("mesaReserva");
    if (!select) return;
    
    select.innerHTML = '<option value="">Seleccione mesa</option>';
    
    mesas.forEach(mesa => {
        if (mesa.estado === 'Disponible') {
            select.innerHTML += `<option value="${mesa.idMesa}">Mesa ${mesa.idMesa} - ${mesa.ubicacion} (${mesa.capacidad} personas)</option>`;
        }
    });
}

// Función para limpiar formulario
function limpiarFormularioMesa() {
    document.getElementById("mesa").value = "";
    document.getElementById("capacidad").value = "";
    document.getElementById("ubicacion").value = "";
    resetearModoEdicion();
}

// Función para cerrar modal
function cerrarModal(modalId) {
    let modalElement = document.getElementById(modalId);
    let modal = bootstrap.Modal.getInstance(modalElement);
    if (modal) {
        modal.hide();
    }
    
    if (modalId === "modalMesa") {
        setTimeout(() => {
            limpiarFormularioMesa();
        }, 300);
    }
}

// Función para eliminar mesa
function eliminarMesa(indice) {
    if (indice < 0 || indice >= mesas.length) {
        mostrarError("Mesa no encontrada");
        return;
    }

    const mesa = mesas[indice];
    
    const reservasActivas = reservas.filter(reserva => 
        reserva.mesaAsignada === mesa.idMesa && 
        ['pendiente', 'confirmada'].includes(reserva.estado)
    );
    
    if (reservasActivas.length > 0) {
        Swal.fire({
            icon: 'warning',
            title: 'No se puede eliminar',
            text: `La mesa ${mesa.idMesa} tiene ${reservasActivas.length} reserva(s) activa(s). Cancele las reservas primero.`,
        });
        return;
    }

    Swal.fire({
        title: '¿Estás seguro?',
        text: `¿Deseas eliminar la Mesa ${mesa.idMesa}? No podrás revertir esta acción`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            mesas.splice(indice, 1);
            guardarEnLocalStorage();
            pintarMesas();
            actualizarSelectMesas();
            Swal.fire('Eliminado', `La Mesa ${mesa.idMesa} ha sido eliminada correctamente`, 'success');
        }
    });
}

// Event listeners
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM cargado, inicializando datos...');
    inicializarDatos();
    
    const modalMesa = document.getElementById('modalMesa');
    if (modalMesa) {
        modalMesa.addEventListener('show.bs.modal', function(event) {
            const trigger = event.relatedTarget;
            if (trigger && trigger.getAttribute('data-bs-target') === '#modalMesa') {
                resetearModoEdicion();
                limpiarFormularioMesa();
            }
        });
    }
    
    window.addEventListener('beforeunload', function() {
        guardarEnLocalStorage();
    });
});