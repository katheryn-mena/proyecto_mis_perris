function mensaje() {
	alert('¡Registrado con éxito!');
}

function validarFormulario() {
	var resp = validarRut();
	if (resp == false) {
		return false;
	}
	resp = validarFecha();
	if (resp == false) {
		return false;
	}
	resp = validarNombre();
	if (resp == false) {
		return false;
	}
	return true; 
}

function validarNombre() {
	var nombre = document.getElementById('txtNombre').value;
	if (nombre.trim().length == 0) {
		//alert('nombre vacío');
		Swal.fire({
			icon: 'error',
			title: 'nombre incorrecto',
			text: 'el nombre está vacío'
		      });
		return false;
	}
	if (largo < 3) {
		//alert('el nombre tiene un largo menor a 3 caracteres');
		Swal.fire({
			icon: 'error',
			title: 'nombre incorrecto',
			text: 'el nombre tiene un largo menor a 3 caracteres'
		      });
		return false;
	}
	return true;
}

function validarApellido() {
	var apellido = document.getElementById('txtApellido').value;
	if (apellido.trim().length == 0) {
		//alert('apellido vacío');
		Swal.fire({
			icon: 'error',
			title: 'apellido incorrecto',
			text: 'el apellido está vacío'
		      });
		return false;
	}
	if (largo < 3) {
		//alert('el nombre tiene un largo menor a 3 caracteres');
		Swal.fire({
			icon: 'error',
			title: 'apellido incorrecto',
			text: 'el apellido tiene un largo menor a 3 caracteres'
		      });
		return false;
	}
	return true;
}

function validarRut() {
	var rut = document.getElementById('txtRut').value;
	alert(rut);
	var num = 3;
	var suma = 0;
	for (let index = 0; index < 8; index++) {
		var caracter = rut.slice(index,index+1);
		//alert(caracter + ' x ' + num);
		suma = suma + (caracter * num);
		num = num -1;
		if (num == 1) {
			num = 7;
		}
	}
	//alert('Suma: '+suma);
	var resto = suma % 11;
	var dv = 11 - resto;
	if (dv > 9) {
		if (dv == 10) {
			dv = 'K';
		} else{
			dv = 0;
		}
	}
	//alert('DV: '+dv);
	var dv_usuario = rut.slice(-1).toUpperCase();
	if (dv != dv_usuario) {
		//alert('rut incorrecto');
		Swal.fire({
			icon: 'error',
			title: 'rut incorrecto',
			text: 'el dígito verificador de su rut es incorrecto'
		      });
		return false;
	}
	return true;
}

function validarFecha() {
	var fechaUsuario = document.getElementById('txtFechaNaci').value;
	var fechaSistema = new Date();
	console.log('Fecha Usuario: '+fechaUsuario);
	console.log('Fecha Sistema: '+fechaSistema);

	var ano = fechaUsuario.slice(0,4);
	var mes = fechaUsuario.slice(5,7);
	var dia = fechaUsuario.slice(8,10);
	console.log('A: '+ano+' M: '+mes+' D: '+dia);
	var fechaNuevaUsuario = new Date(ano,(mes-1),dia);
	console.log('Nueva Fecha: '+fechaNuevaUsuario);

	if (fechaNuevaUsuario > fechaSistema) {
		//alert('fecha de nacimiento mayor a la fecha actual');
		Swal.fire({
			icon: 'error',
			title: 'fecha de nacimiento incorrecta',
			text: 'fecha de nacimiento mayor a la fecha actual'
		      });
		return false;
	}

	var el_dia = 24 * 60 * 60 * 1000; //cuantos milisegundos son 1 día
	var dias = Math.trunc((fechaSistema.getTime() - fechaNuevaUsuario.getTime()) / el_dia);
	console.log('Días: '+dias);
	var anos = Math.trunc(dias / 365);
	if (anos < 18) {
		//alert('Usted es menor de edad, sólo tiene '+anos+' años');
		Swal.fire({
			icon: 'error',
			title: 'fecha de nacimiento',
			text: 'Usted es menor de edad, sólo tiene '+anos+' años'
		      });
		return false;
	}
	return true;
}

