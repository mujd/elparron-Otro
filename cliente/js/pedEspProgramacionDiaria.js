/* INICIO Programacion Diaria PedidoEspecials */

function pedidoEspecialProgramacionDiariaDesplegarTortas(oData) {

	$("#tabPedidoEspecialProgramacionDiaria tbody").remove();
	var anterior = 0;
	var total = 0;
	var granTotal = 0;
	var htmlFilaPE = "";


	$(oData).each(function () {
		if (this.diet == 0) {
			this.diet = 'No';
		} else {
			this.diet = 'Si';
		}
		if (this.forma == 0) {
			this.forma = 'Redonda';
		} else {
			this.forma = 'Cuadrada';
		}
		
		htmlFilaPE = htmlFilaPE + `
			<tbody><tr class=''>
				<td>` + this.id + `</td>
				<td>` + this.masaTipo_nombre + ` ` + this.masaSabor_nombre + ` ` + this.sabor_nombre + `</td>
				<td>` + this.personas + `</td>
				<td>` + this.forma + `</td>
				<td>` + this.diet + `</td>
			</tr></tbody>`;
		granTotal = granTotal + total;
		total = 0;
		total = total + 1;
		anterior = this.id;
	});
	granTotal = granTotal + total;

	$("#tabPedidoEspecialProgramacionDiaria").append(htmlFilaPE);
	$("#tabPedidoEspecialProgramacionDiaria tfoot").remove();
	$("#tabPedidoEspecialProgramacionDiaria").append(`
		<tfoot>
			<tr>
				<th colspan=4>Total</th>
				<th id='thEspecialGranTotal'>` + granTotal + `</th>
			</tr>
		</tfoot>
		`);
}

function programacionDiariaBuscarPedidoEspecial() {
	var pedidoEspecialFecha = $("#dateProgramacionDiaria").val().split("/")[2] + $("#dateProgramacionDiaria").val().split("/")[1] + ($("#dateProgramacionDiaria").val().split("/")[0]);
	var pedidoEspecialSucural = $("#cmbProgramacionDiariaSucursal").val();
	ajaxGet(rutaURL + "/pedidoEspecial/" + pedidoEspecialFecha + "/" + pedidoEspecialSucural, pedidoEspecialProgramacionDiariaDesplegarTortas);
}


/* FIN Programacion diaria pedidoEspecials */

function pedidoEspecialProDiariaCarga() {
	$("#cma-layout").load("programacionDiaria.html", function () {
		$("#cmbProgramacionDiariaSucursal").click(function () {
			programacionDiariaBuscarPedidoEspecial();
		}).blur(function () {
			programacionDiariaBuscarPedidoEspecial();
		});
		$("#dateProgramacionDiaria").click(function () {
			programacionDiariaBuscarPedidoEspecial();
		}).blur(function () {
			programacionDiariaBuscarPedidoEspecial();
		});
	});
}

