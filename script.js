const button = document.querySelector("#btn_escaneo");

button.addEventListener('click', (e) => {
	
	const $resultados = document.querySelector("#resultado");
	$resultados.textContent = " ";

	const $indicacion = document.querySelector("#txt_indicaciones");
	$indicacion.textContent = "Dirija la cámara al código de barras";
	Quagga.init({
		inputStream: {
			constraints: {
				width: 1920,
				height: 1080,
			},
			name: "Live",
			type: "LiveStream",
			target: document.querySelector('#contenedor'), // Pasar el elemento del DOM
		},
		decoder: {
			readers: ["ean_reader"]
		}
	}, function (err) {
		if (err) {
			console.log(err);
			return
		}
		console.log("Iniciado correctamente");
		Quagga.start(); 
		document.getElementById('contenedor').style.display = 'block';
		
	});

	Quagga.onDetected((data) => {
		$resultados.textContent = data.codeResult.code;
		// Imprimimos todo el data para que puedas depurar
		console.log(data);
		Quagga.stop();
		document.getElementById('contenedor').style.display = 'none';
		$indicacion.textContent = "Presione el boton para iniciar el escaneo";
	});
});