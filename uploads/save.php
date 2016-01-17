<?php
	error_reporting(-1);
	ini_set("display_errors", 1);
	
	try {
		
		
		function guardarArchivo($key) {
			$target_dir  = "../";
			$target_file  = $target_dir . basename($_FILES[$key]['name']);
			$ext = pathinfo($target_file, PATHINFO_EXTENSION);
			
			if($ext != "zip") {
				return "Solo zip esta permitido";
			}
			
			if (!move_uploaded_file($_FILES[$key]['tmp_name'], $target_file)) {
				return "Error al cargar el archivo.";
			}
			
			return "ok";
		}
				
		if ($_POST['password'] != "abcd1234") {
			echo "<script language='javascript'> 
			alert('Password Incorrecto.'); 
			history.go(-1);
			</script>";
			die();
		}

		$esValido = true;
		$anstmp = guardarArchivo('archivo');
		$errorDetail = "";
		if ($anstmp != "ok") {
			$esValido = false;
			$errorDetail .= "#No se ha podido cargar el archivo -> ".$anstmp.".\\n";
		}
		
		if (!$esValido) {
			echo "<script language='javascript'> 
			alert('Error: \\n". $errorDetail."'); 
			history.go(-1);
			</script>";
		} else {
			echo "<script language='javascript'> 
			alert('El archivo ha sido subido correctamente'); 
			history.go(-1);
			</script>";
		}
	} catch (Exception $e) {
		print "¡Error!: " . $e->getMessage() . "<br/>";
		die();
	}	
?>
