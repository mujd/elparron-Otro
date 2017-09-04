var recepcion = {
	nombre: "recepcion",
	paginaInicial: "recepcion.html",
	listar: function () { }
}

function recepcionProgramacionNormalDesplegarTortas(oData) {

	var pnHtmlFila = "";
	$(oData).each(function () {
		pnHtmlFila = pnHtmlFila + `
			<tbody><tr class='item'>
				<td>` + this.masaTipo_nombre + ` ` + this.masaSabor_nombre + ` ` + this.sabor_nombre + `</td>
				<td><input type='text' value='0' id='txtRecepcionCantidad` + this.id + `_1' readonly></td>
				<td><input type='text' value='0' id='txtRecepcionCantidad` + this.id + `_2' readonly></td>
				<td><input type='text' value='0' id='txtRecepcionCantidad` + this.id + `_3' readonly></td>
				<td><input type='text' value='0' id='txtRecepcionCantidad` + this.id + `_4' readonly></td>
				<td id='tdTotalRecepcionProgramacionNormal_` + this.id + `'></td>
			</tr></tbody>`;
	});

	$("#tabRecepcionProgramacionNormal").append(pnHtmlFila);
	$("#tabRecepcionProgramacionNormal").append(`
		<tfoot><tr>
			<th>Total</th>
			<th id='tdTotalRecepcionProgramacionNormal06'></th>
			<th id='tdTotalRecepcionProgramacionNormal12'></th>
			<th id='tdTotalRecepcionProgramacionNormal18'></th>
			<th id='tdTotalRecepcionProgramacionNormal24'></th>
			<th id='tdTotalRecepcionProgramacionNormalGlobal'></th>
		</tr><tfoot>`);

	recepcionProgramacionNormalTotaliza(oData);
	$("input").blur(function () {
		recepcionProgramacionNormalTotaliza();
	});
	$("input").focus(function () {
		$(this).select();
	});
	$("").click(function () {
		recepcionProgramacionNormalBuscar();
	});
}

function recepcionProgramacionNormalBuscar() {
	var recepcionProgramacionNormalDate = $("#dateRecepcion").datepicker('getDate'),
		recepcionProgramacionNormalDiaSemana = recepcionProgramacionNormalDate.getDay();
	var recepcionProgramacionNormalSucursal = $("#cmbRecepcionSucursal").val();
	ajaxGet(rutaURL + "/semana/" + recepcionProgramacionNormalDiaSemana + "/" + recepcionProgramacionNormalSucursal, recepcionProgramacionNormalDesplegarDias);
}

function recepcionProgramacionNormalDesplegarDias(oData) {
	var item;
	recepcionNuevo(true);
	for (var x = 0; x < oData[0].detalle.length; x++) {
		item = oData[0].detalle[x];
		$("#txtRecepcionCantidad" + item.torta_id + "_" + item.tamano_id).val(item.cantidad);
	}
	recepcionProgramacionNormalTotaliza();
}

function recepcionProgramacionNormalTotaliza() {

	var sumaFila = 0;
	var suma06 = 0;
	var suma12 = 0;
	var suma18 = 0;
	var suma24 = 0;
	var sumaTotal = 0;
	var col = 0;

	try {

		var fila;
		$("#tabRecepcionProgramacionNormal .item").each(function () {
			sumaFila = 0;
			col = 0;
			fila = $(this);
			fila.find("input").each(function () {
				sumaFila = sumaFila + parseInt($(this).val());
				sumaTotal = sumaTotal + parseInt($(this).val());
				switch (col) {
					case 0:
						suma06 = suma06 + parseInt($(this).val());
						break;
					case 1:
						suma12 = suma12 + parseInt($(this).val());
						break;
					case 2:
						suma18 = suma18 + parseInt($(this).val());
						break;
					case 3:
						suma24 = suma24 + parseInt($(this).val());
						fila.find("td")[5].innerHTML = sumaFila;
						break;
				}
				col++;
			});
			sumaFila++;
		});
		$("#tdTotalRecepcionProgramacionNormal06").html(suma06);
		$("#tdTotalRecepcionProgramacionNormal12").html(suma12);
		$("#tdTotalRecepcionProgramacionNormal18").html(suma18);
		$("#tdTotalRecepcionProgramacionNormal24").html(suma24);
		$("#tdTotalRecepcionProgramacionNormalGlobal").html(sumaTotal);

	} catch (e) {
		alert(e);
	}

}

function recepcionNuevo(tipo) {

	$("input[id^=txtRecepcionCantidad_]").val("0");
	$("input[id^=txtRecepcionSobranteCantidad_]").val("0");
	// $("input[id^=txtEspecialCantidad_]").val("0");	
	$("td[id^=tdTotalRecepcionProgramacionNormal_]").html("0");
	$("td[id^=tdRecepcionSobranteTotal_]").html("0");
	$("#tdTotalRecepcionProgramacionNormal06").html("0");
	$("#tdTotalRecepcionProgramacionNormal12").html("0");
	$("#tdTotalRecepcionProgramacionNormal18").html("0");
	$("#tdTotalRecepcionProgramacionNormal24").html("0");
	$("#tdTotalRecepcionProgramacionNormalGlobal").html("0");
	$("#tdRecepcionSobranteTotal06").html("0");
	$("#tdRecepcionSobranteTotal12").html("0");
	$("#tdRecepcionSobranteTotal18").html("0");
	$("#tdRecepcionSobranteTotal24").html("0");
	$("#tdRecepcionSobranteTotalGlobal").html("0");
	if (!tipo) {
		$("#cmbRecepcionSucursal").val("");
		$("#cmbRecepcionSucursal").focus();
		$('#dateSobrante').datepicker('setDate', 'now');
	}

}

/* INICIO Recepcion Sobrantes */

function sobranteRecepcionDesplegarTortas(oData) {

	var htmlFilaS = "";
	$(oData).each(function () {
		htmlFilaS = htmlFilaS + `
			<tbody><tr class='item'>
				<td>` + this.masaTipo_nombre + ` ` + this.masaSabor_nombre + ` ` + this.sabor_nombre + `</td>
				<td><input type='text' value='0' id='txtRecepcionSobranteCantidad_` + this.id + `_1' readonly></td>
				<td><input type='text' value='0' id='txtRecepcionSobranteCantidad_` + this.id + `_2' readonly></td>
				<td><input type='text' value='0' id='txtRecepcionSobranteCantidad_` + this.id + `_3' readonly></td>
				<td><input type='text' value='0' id='txtRecepcionSobranteCantidad_` + this.id + `_4' readonly></td>
				<td id='tdRecepcionSobranteTotal_` + this.id + `'></td>
			</tr></tbody>`;
	});

	$("#tabRecepcionSobrante").append(htmlFilaS);
	$("#tabRecepcionSobrante").append(`
		<tfoot><tr>
			<th>Total</th>
			<th id='tdRecepcionSobranteTotal06'></th>
			<th id='tdRecepcionSobranteTotal12'></th>
			<th id='tdRecepcionSobranteTotal18'></th>
			<th id='tdRecepcionSobranteTotal24'></th>
			<th id='tdRecepcionSobranteTotalGlobal'></th>
		</tr><tfoot>`);

	recepcionTotalizaSobrante(oData);
	$("input").blur(function () {
		recepcionTotalizaSobrante();
	});
	$("input").focus(function () {
		$(this).select();
	});
	$("").click(function () {
		recepcionSobranteBuscar();
	});
}

function recepcionSobranteBuscar() {
	var recepcionSobranteFecha = $("#dateRecepcion").val().split("/")[2] + $("#dateRecepcion").val().split("/")[1] + ($("#dateRecepcion").val().split("/")[0]) - 1;
	var recepcionSobranteSucural = $("#cmbRecepcionSucursal").val();
	ajaxGet(rutaURL + "/sobrante/" + recepcionSobranteFecha + "/" + recepcionSobranteSucural, recepcionSobranteDesplegar);
}

function recepcionSobranteDesplegar(oData) {
	var sobItem;
	recepcionNuevo(true);
	for (var i = 0; i < oData[0].detalleSob.length; i++) {
		sobItem = oData[0].detalleSob[i];
		$("#txtRecepcionSobranteCantidad_" + sobItem.torta_id + "_" + sobItem.tamano_id).val(sobItem.cantidad);
	}
	// alert(JSON.stringify(oDataSob));
	recepcionTotalizaSobrante();
}

function recepcionTotalizaSobrante() {

	var sumaFila = 0;
	var suma06 = 0;
	var suma12 = 0;
	var suma18 = 0;
	var suma24 = 0;
	var sumaTotal = 0;
	var col = 0;

	try {

		var fila;
		$("#tabRecepcionSobrante .item").each(function () {
			sumaFila = 0;
			col = 0;
			fila = $(this);
			fila.find("input").each(function () {
				sumaFila = sumaFila + parseInt($(this).val());
				sumaTotal = sumaTotal + parseInt($(this).val());
				switch (col) {
					case 0:
						suma06 = suma06 + parseInt($(this).val());
						break;
					case 1:
						suma12 = suma12 + parseInt($(this).val());
						break;
					case 2:
						suma18 = suma18 + parseInt($(this).val());
						break;
					case 3:
						suma24 = suma24 + parseInt($(this).val());
						fila.find("td")[5].innerHTML = sumaFila;
						break;
				}
				col++;
			});
			sumaFila++;
		});
		$("#tdRecepcionSobranteTotal06").html(suma06);
		$("#tdRecepcionSobranteTotal12").html(suma12);
		$("#tdRecepcionSobranteTotal18").html(suma18);
		$("#tdRecepcionSobranteTotal24").html(suma24);
		$("#tdRecepcionSobranteTotalGlobal").html(sumaTotal);

	} catch (e) {
		alert(e);
	}

}



/* FIN Recepcion sobrantes */

/* Fecha */
function recepcionCargarFecha() {
	$('#dateRecepcion').datepicker({
		format: 'dd/mm/yyyy',
		todayBtn: "linked",
		clearBtn: true,
		language: "es",
		autoclose: true,
		todayHighlight: true,
		toggleActive: true
	});
	$('#dateRecepcion').datepicker('setDate', 'now');
}

function recepcionDesplegarSucursal(oData) {
	$("#cmbRecepcionSucursal option").remove();
	$("#cmbRecepcionSucursal").append("<option value=''>:: Seleccione ::</option>");
	$(oData).each(function () {
		$("#cmbRecepcionSucursal").append("<option value='" + this.id + "'>" + this.nombre + "</option>");
	});
}

function recepcionSucursalListar() {
	ajaxGet(rutaURL + "/sucursal", recepcionDesplegarSucursal);
}

function recepcionTortaListar() {
	ajaxGet(rutaURL + "/torta", recepcionProgramacionNormalDesplegarTortas);
	ajaxGet(rutaURL + "/torta", sobranteRecepcionDesplegarTortas);
}

function recepcionCargar() {
	$("#cma-layout").load("recepcion.html", function () {
		recepcionTortaListar();
		recepcionSucursalListar();
		recepcionNuevo(true);
		$("#cmbRecepcionSucursal").click(function () {
			recepcionProgramacionNormalBuscar();recepcionSobranteBuscar();
		}).blur(function () {
			recepcionProgramacionNormalBuscar();recepcionSobranteBuscar();
		});
		$("#dateRecepcion").click(function () {
			recepcionProgramacionNormalBuscar();recepcionSobranteBuscar();
		}).blur(function () {
			recepcionProgramacionNormalBuscar();recepcionSobranteBuscar();
		});
	});
}
