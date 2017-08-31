mysql = require("mysql");

function REST_ROUTER(router, connection, md5) {
	var self = this;
	self.handleRoutes(router, connection, md5);
}

REST_ROUTER.prototype.handleRoutes = function (router, connection, md5) {

	// BÃºsqueda por ID
	router.get("/programacionDiaria/:id", function (req, res) {
		connection.query("SELECT SCAB.id, DATE_FORMAT(SCAB.fecha,'%d/%m/%Y') AS fecha, SUC.id AS sucursal_id, SUC.nombre AS sucursal_nombre, SDET.cantidad, MTP.id AS masaTipo_id, MTP.nombre AS masaTipo_nombre, MSB.id AS masaSabor_id, MSB.nombre AS masaSabor_nombre, SAB.id AS sabor_id, SAB.nombre AS sabor_nombre, TAM.id AS tamano_id, TAM.personas AS personas FROM programacionDiariaCab SCAB INNER JOIN sucursal SUC ON SCAB.sucursal_id = SUC.id INNER JOIN programacionDiariaDet SDET ON SCAB.id = SDET.programacionDiariaCab_id INNER JOIN tamano TAM ON SDET.tamano_id = TAM.id INNER JOIN torta TOR ON SDET.torta_id = TOR.id INNER JOIN masaTipo MTP ON TOR.masaTipo_id = MTP.id INNER JOIN masaSabor MSB ON TOR.masaSabor_id = MSB.id INNER JOIN sabor SAB ON TOR.sabor_id = SAB.id WHERE SCAB.id = " + req.params.id + " ORDER BY SDET.id", function (err, rows) {
			if (err) {
				res.json({ "error": err });
			} else {
				var json = [];
				var anterior_id = 0;
				for (var item in rows) {
					if (rows[item].id != anterior_id) {
						json.push(
							{
								id: rows[item].id,
								fecha: rows[item].fecha,
								sucursal_id: rows[item].sucursal_id,
								sucursal_nombre: rows[item].sucursal_nombre,
								detalle: []
							}
						);
					}
					json[json.length - 1].detalle.push(
						{
							cantidad: rows[item].cantidad,
							masaTipo_id: rows[item].masaTipo_id,
							masaTipo_nombre: rows[item].masaTipo_nombre,
							masaSabor_id: rows[item].masaSabor_id,
							masaSabor_nombre: rows[item].masaSabor_nombre,
							sabor_id: rows[item].sabor_id,
							sabor_nombre: rows[item].sabor_nombre,
							tamano_id: rows[item].tamano_id,
							personas: rows[item].personas
						}
					);
					anterior_id = rows[item].id;
				}
				res.json(json);
			}
		});
	});


	// Buascar programacionDiaria por dia y sucursal
	router.get("/programacionDiaria/:fecha/:sucursal_id", function (req, res) {
		connection.query(`
			SELECT	SCAB.id,
					DATE_FORMAT(SCAB.fecha,'%d/%m/%Y') AS fecha,
					SUC.id AS sucursal_id,
					SUC.nombre AS sucursal_nombre,
					SDET.cantidad,
					MTP.id AS masaTipo_id,
					MTP.nombre AS masaTipo_nombre,
					MSB.id AS masaSabor_id,
					MSB.nombre AS masaSabor_nombre,
					SAB.id AS sabor_id,
					SAB.nombre AS sabor_nombre,
					TAM.id AS tamano_id,
					TAM.num AS num,
					TAM.personas AS personas,
					TOR.id AS torta_id
			FROM 	programacionDiariaCab SCAB INNER JOIN sucursal SUC ON SCAB.sucursal_id = SUC.id
					              INNER JOIN programacionDiariaDet SDET ON SCAB.id = SDET.programacionDiariaCab_id
					              INNER JOIN tamano TAM ON SDET.tamano_id = TAM.id
					              INNER JOIN torta TOR ON SDET.torta_id = TOR.id
					              INNER JOIN masaTipo MTP ON TOR.masaTipo_id = MTP.id
					              INNER JOIN masaSabor MSB ON TOR.masaSabor_id = MSB.id
					              INNER JOIN sabor SAB ON TOR.sabor_id = SAB.id
			WHERE 	SCAB.fecha = ` + req.params.fecha + ` AND
					SUC.id = ` + req.params.sucursal_id + `
			ORDER	BY
					TOR.id,
					TAM.id`, function (err, rows) {
				if (err) {
					res.json({ "error": err });
				} else {
					var json = [];
					var anterior_id = 0;
					for (var item in rows) {
						if (rows[item].id != anterior_id) {
							json.push(
								{
									id: rows[item].id,
									fecha: rows[item].fecha,
									sucursal_id: rows[item].sucursal_id,
									sucursal_nombre: rows[item].sucursal_nombre,
									detalle: []
								}
							);
						}
						json[json.length - 1].detalle.push(
							{
								id_diaria: rows[item].id,
								torta_id: rows[item].torta_id,
								cantidad: rows[item].cantidad,
								masaTipo_id: rows[item].masaTipo_id,
								masaTipo_nombre: rows[item].masaTipo_nombre,
								masaSabor_id: rows[item].masaSabor_id,
								masaSabor_nombre: rows[item].masaSabor_nombre,
								sabor_id: rows[item].sabor_id,
								sabor_nombre: rows[item].sabor_nombre,
								tamano_id: rows[item].tamano_id,
								num: rows[item].num,
								personas: rows[item].personas,
								fecha: rows[item].fecha
							}
						);
						anterior_id = rows[item].id;
					}
					res.json(json);
				}
			});
	});

	// Registrar programacion Diaria normal
	router.post("/programacionDiaria/normal", function (req, res) {

		connection.query(`
			SELECT	id
			FROM 	programacionDiariaCab
			WHERE 	fecha = ` + req.body.fecha + ` AND
					sucursal_id = ` + req.body.sucursal_id, function (err, rows) {
				if (err) {
					res.json({ "error": err });
				} else {
					var programacionDiariaCab_id = 0;
					var continuar = false;
					if (rows.length > 0) {
						query = `
						DELETE
						FROM  programacionDiariaNor
						WHERE programacionDiariaCab_id  =` + rows[0].id;
						connection.query(query, function (err, result) {
							if (err) {
								res.json({ "error": err });
							} else {
								programacionDiariaCab_id = rows[0].id;
								registrarDetalleNormal(res, programacionDiariaCab_id, req.body.detalleNormal);
							}
						});
					} else {
						query = `
						INSERT  INTO programacionDiariaCab(
								fecha,
								sucursal_id)
						VALUES(` + req.body.fecha + `, ` +
							req.body.sucursal_id + `)`;
						connection.query(query, function (err, result) {
							if (err) {
								res.json({ "error": err });
							} else {
								programacionDiariaCab_id = result.insertId;
								registrarDetalleNormal(res, programacionDiariaCab_id, req.body.detalleNormal);
							}
						});
					}
				}
			});
	});

	function registrarDetalleNormal(res, programacionDiariaCab_id, detalleNormal) {
		var itemOK = 0;
		for (var index = 0; index < detalleNormal.length; index++) {
			item = detalleNormal[index];
			connection.query(`
				INSERT  INTO programacionDiariaNor(
						programacionDiariaCab_id,
						torta_id,
						tamano_id)
				VALUES(` + programacionDiariaCab_id + `, ` +
				item.torta_id + `,` +
				item.tamano_id + 
				 `)`, function (err, result) {
					if (err) {
						res.json({ "error": err });
					} else {
						itemOK++;
					}
				});
		}
		registrarDetalleSobrante(programacionDiariaCab_id, res);
	}

	function registrarDetalleSobrante(programacionDiariaCab_id, res) {
		connection.query(`
			INSERT	INTO programacionDiariaSob(
				programacionDiariaCab_id,
				torta_id,
				tamano_id,
				cantidad)
			SELECT	PCAB.id,
					SDET.torta_id,
					SDET.tamano_id,
					SDET.cantidad
			FROM	sobranteCab SCAB INNER JOIN sobranteDet SDET ON SCAB.id = SDET.sobranteCab_id
					                 INNER JOIN programacionDiariaCab PCAB ON SCAB.fecha = DATE_ADD(PCAB.fecha, INTERVAL -1 DAY) AND
									                                          SCAB.sucursal_id = PCAB.sucursal_id
			WHERE   PCAB.id = ` + programacionDiariaCab_id, function (err, result) {
				if (err) {
					res.json({ "error": err });
				} else {
					registrarDetallePedido(programacionDiariaCab_id, res);
					// registrarDetalleEspecial(res, programacionDiariaCab_id);
				}
			});
	}

	function registrarDetallePedido(programacionDiariaCab_id, res) {
		connection.query(`
			INSERT	INTO programacionDiariaPed(
				programacionDiariaCab_id,
				torta_id,
				tamano_id)
			SELECT	PCAB.id,
					PED.torta_id,
					PED.tamano_id
			FROM	pedido PED INNER JOIN programacionDiariaCab PCAB ON DATE_FORMAT(PED.fechaEntrega, "%Y/%m/%d") = PCAB.fecha AND
									                                          PED.sucursalRetiro = PCAB.sucursal_id
			WHERE   PCAB.id = ` + programacionDiariaCab_id, function (err, result) {
				if (err) {
					res.json({ "error": err });
				} else {
					registrarDetalleEspecial(res, programacionDiariaCab_id);
				}
			});
	}

	function registrarDetalleEspecial(res, programacionDiariaCab_id) {
		connection.query(`
			INSERT	INTO programacionDiariaEsp(
				programacionDiariaCab_id,
				pedidoEspecial_id)
			SELECT	PCAB.id,
					ESP.id
			FROM	pedidoEspecial ESP INNER JOIN programacionDiariaCab PCAB ON DATE_FORMAT(ESP.fechaEntrega, "%Y/%m/%d") = PCAB.fecha AND
																			ESP.sucursal_id = PCAB.sucursal_id
			WHERE   PCAB.id = ` + programacionDiariaCab_id, function (err, result) {
				if (err) {
					res.json({ "error": err });
				} else {
					// registrarDetalleEspecial(programacionDiariaCab_id);
					// res.json({ "Mensaje": "Datos ingresados" });
				}
			});
	}

}
module.exports = REST_ROUTER;
