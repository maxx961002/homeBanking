// MENU
let saldo = 0;

let movimientos = [];

function mostrarMenu() {
    let opcion;
  
    do {
      opcion = prompt(
        `Bienvenido a tu Home Banking\n\n` +
        `Tu saldo actual es: $${saldo}\n\n` +
        `¿Qué desea hacer hoy?\n` +
        `1️⃣ Cargar saldo\n` +
        `2️⃣ Solicitar préstamo\n` +
        `3️⃣ Retirar saldo\n`+
        `4️⃣ Ver historial de movimientos\n` +
        `5️⃣ Ver saldo\n` +
        `6️⃣ Salir`
      );
  
      switch (opcion) {
        case "1":
          cargarSaldo();
          break;
        case "2":
            solicitarPrestamo();
            break;
        case "3":
          retirarSaldo();
          break;
        case "4":
          mostrarHistorial();
          break;
        case "5":
          mostrarSaldo();
          break;
        case "6":
          alert("Gracias por utilizar nuestro simulador. ¡Hasta pronto!");
          break;
        default:
          alert(" Opción inválida. Por favor ingrese un número del 1 al 6.");
      }
    } while (opcion !== "6");
  }
  
  // CARGAR SALDO

    function cargarSaldo() {
        const montosDisponibles = [10, 20, 50, 100, 200, 500, 1000];
        let mensaje = "Seleccione un monto para cargar:\n";
        montosDisponibles.forEach((monto, index) => {
            mensaje += `${index + 1}. $${monto}\n`;
            }
        );
    mensaje += "\nIngrese el numero del monto que desea cargar:";
    let opcion = prompt(mensaje);
    let indice = parseInt(opcion) - 1;
    if (indice >= 0 && indice < montosDisponibles.length) {
        let montoCargado = montosDisponibles[indice];
        saldo += montoCargado;
        movimientos.push({
            tipo: "Carga",
            monto: montoCargado,
            fecha: new Date().toLocaleString()  
        }
        );
        alert(` Cargaste $${montoCargado}. Tu nuevo saldo es: $${saldo}`);
    }
    else {
        alert(" Opción inválida. No se realizo ninguna carga.");
    }
    }


// SOLICITAR PRESTAMO

function solicitarPrestamo() {
    let montoPrestamo = parseFloat(prompt("Cuánto dinero deseas solicitar?"));
    if (isNaN(montoPrestamo) || montoPrestamo <= 0) {
        alert(" Monto inválido. Ingresa un número mayor a 0.");
        return;
    }
    let meses = parseInt(prompt(
        "¿En cuántos meses devolverías el préstamo?\n" +
        "1️⃣ - 1 mes (2.5%)\n" +
        "2️⃣ - 3 meses (5%)\n" +
        "3️⃣ - 6 meses (7.5%)\n" +
        "4️⃣ - 12 meses (10%)"
      ));
    
    let interes = 0;

    switch (meses) {
        case 1:
            interes = 0.025;
            break;
        case 2:
            interes = 0.05;
            break;
        case 3:
            interes = 0.075;
            break;
        case 4:
            interes = 0.1;
            break;
        default:
            alert(" Opción inválida. No se realizó el préstamo.");
            return;
    }
    let totalAPagar = montoPrestamo + (montoPrestamo * interes);
    let confirmacion = confirm(
        `Estas solicitando $${montoPrestamo} a devolver en ${meses} meses.\n` +
        `Interes aplicado: ${interes * 100}%\n` +
        `Total a devolver: $${totalAPagar.toFixed(2)}\n\n` +
        `¿Deseas continuar?`
    )
if (confirmacion) {
        saldo += montoPrestamo;
        movimientos.push({
            tipo: "Préstamo",
            monto: montoPrestamo,
            fecha: new Date().toLocaleString()  
        }
        );
        alert(`Préstamo aprobado. Se acreditaron $${montoPrestamo}.\n Tu nuevo saldo es: $${saldo}`);
    }
else {
        alert(" Préstamo cancelado.");
    }
}

// RETIRAR SALDO
    
    function retirarSaldo() {
        let monto = parseFloat(prompt(" Ingrese el monto a retirar:"));
        if (isNaN(monto) || monto <= 0) {
            alert(" Monto inválido. Ingresa un numero mayor a 0.");
            return;
        }
        if (monto > saldo) {
            let opcion = confirm("Saldo insuficiente. ¿Deseás solicitar un préstamo?");
            if (opcion) {
              solicitarPrestamo();
            }
            return;
          }
          
        saldo -= monto;
        movimientos.push({
            tipo: "Retiro",
            monto: monto,
            fecha: new Date().toLocaleString()  
        }
        );
        alert(` Retiro exitoso. Se descontaron $${monto}.\n Tu nuevo saldo es: $${saldo}`);
    }


// HISTORIAL DE MOVIMIENTOS

function mostrarHistorial() {
    if (movimientos.length === 0) {
      alert("No hay movimientos registrados todavía.");
      return;
    }
  
    let resumen = "Historial de movimientos:\n\n";
  
    movimientos.forEach((mov, index) => {
      resumen += `${index + 1}. ${mov.tipo} - $${mov.monto} - ${mov.fecha}\n`;
    });
  
    alert(resumen);
  }
  
// MOSTRAR SALDO

function mostrarSaldo() {
    alert(`Tu saldo actual es: $${saldo}`);
  }
  

// REGISTRO 

let usuario;
let contraseña;

do {
  usuario = prompt(" Crea tu nombre de usuario (mínimo 3 letras):");
  if (!usuario || usuario.length < 3) {
    alert(" El usuario debe tener al menos 3 letras.");
  }
} while (!usuario || usuario.length < 3);

do {
  contraseña = prompt(" Crea tu contraseña (mínimo 6 caracteres):");
  if (!contraseña || contraseña.length < 6) {
    alert(" La contraseña debe tener al menos 6 caracteres.");
  }
} while (!contraseña || contraseña.length < 6);


// LOGIN

let usuarioIngresado = prompt(" Ingresá tu nombre de usuario:");
let contraseñaIngresada = prompt(" Ingresá tu contraseña:");

if (usuarioIngresado === usuario && contraseñaIngresada === contraseña) {
  alert("¡Bienvenido " + usuarioIngresado + "! Iniciaste sesión con éxito.");
  mostrarMenu(); 
} else {
  alert(" Usuario o contraseña incorrectos. Acceso denegado.");
}

