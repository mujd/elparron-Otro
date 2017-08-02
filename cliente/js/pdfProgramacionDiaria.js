function imprimirProgramacionDiaria(oData) {
    var doc = new jsPDF("p", "mm", "letter");

    /* Configuracion General */
    doc.setFontSize(14);/* Tamaño de la fuente */
    // doc.setFont("times","italic");
    // doc.setTextColor(255, 0, 0);

    /* Color de fondo depende de pdfSucursal */
    if ($("#cmbProgramacionDiariaSucursal").val() == 0) {
        doc.setFillColor(255, 255, 255);
    }
    if ($("#cmbProgramacionDiariaSucursal").val() == 1) {
        doc.setFillColor(7, 141, 237);
    }
    if ($("#cmbProgramacionDiariaSucursal").val() == 2) {
        doc.setFillColor(239, 206, 16);
    }
    if ($("#cmbProgramacionDiariaSucursal").val() == 3) {
        doc.setFillColor(239, 15, 15);
    }
    if ($("#cmbProgramacionDiariaSucursal").val() == 4) {
        doc.setFillColor(26, 239, 15);
    }

    /* Etiqueta 1 */
    doc.rect(0, 0, 108, 69.75, 'DF');
    /* Etiqueta 2 */
    doc.rect(108, 0, 107.6, 69.75, 'DF');
    /* Etiqueta 3 */
    doc.rect(0, 69.75, 108, 69.75, 'DF');
    /* Etiqueta 4 */
    doc.rect(108, 69.75, 107.6, 69.75, 'DF');
    /* Etiqueta 5 */
    doc.rect(0, 139.5, 108, 69.75, 'DF');
    /* Etiqueta 6 */
    doc.rect(108, 139.5, 107.6, 69.75, 'DF');
    /* Etiqueta 7 */
    doc.rect(0, 209.25, 108, 69.75, 'DF');
    /* Etiqueta 8 */
    doc.rect(108, 209.25, 107.6, 69.75, 'DF');

    /*  var employees = [
        { "firstName": "John", "lastName": "Doe" },
        { "firstName": "Anna", "lastName": "Smith" },
        { "firstName": "Peter", "lastName": "Jones" },
        { "firstName": "John", "lastName": "Doe" },
        { "firstName": "Anna", "lastName": "Smith" },
        { "firstName": "Peter", "lastName": "Jones" }
    ];  */

    var employees = oData;

    employees.forEach(function (employee, i) {
        if(employee.id == 1){
            doc.text(4, 8, employee.solicitante);
            doc.text(4, 16, "Fono: " + employee.telefono);
            doc.text(93, 8, "N°: 1");
            doc.text(75, 16, "Valor: " + employee.precio);
            doc.text(80, 24, employee.personas + " Personas");
            doc.text(25, 35, employee.masaTipo_nombre);
            doc.text(50, 35, employee.masaSabor_nombre);
            doc.text(33, 40, employee.caracteristicas);
            doc.text(33, 45, employee.mensaje);
            doc.text(4, 65, "Abono: " +employee.abono);
            doc.text(55, 65, employee.fechaEntrega);
        }
    });

    /* var empleados = oData;

    empleados.forEach(function (empleado, i) {
        doc.text(113, 8 + (i * 5),
            "Solicitante: " + empleado.solicitante 
                
        );
    }); */
    
    /* employees.forEach(function (employee, i) {
        doc.text(4, 8 + (i * 20),
            "Solicitante: " + employee.solicitante +
            "Telefono: " + employee.telefono +
            "Valor: $" + employee.precio +
            employee.personas + "personas" +
            "Mensaje: " + employee.mensaje 
        );
    }); */
    
    /* doc.text(4, 8, "Etiqueta 1");
    doc.text(33, 35, "Mensaje Etiqueta 1"); */
    doc.text(113, 8, "Etiqueta 2");
    doc.text(142, 35, "Mensaje Etiqueta 2");
    doc.text(4, 78, "Etiqueta 3");
    doc.text(113, 78, "Etiqueta 4");
    doc.text(4, 148, "Etiqueta 5");
    doc.text(113, 148, "Etiqueta 6");
    doc.text(4, 218, "Etiqueta 7");
    doc.text(113, 218, "Etiqueta 8");  

    doc.save("etiquetas.pdf");
}

function pdfBuscar() {
	var pdfFecha = $("#dateProgramacionDiaria").val().split("/")[2] + $("#dateProgramacionDiaria").val().split("/")[1] + $("#dateProgramacionDiaria").val().split("/")[0];
	var pdfSucursal = $("#cmbProgramacionDiariaSucursal").val();
	ajaxGet(rutaURL + "/pedidoEspecial/" + pdfFecha + "/" + pdfSucursal, imprimirProgramacionDiaria);
}

/* function pdfSeria(oData){
    alert(JSON.stringify(oData));
} */

/* function imprimirOtro() {
    var employees = [
        { "firstName": "John", "lastName": "Doe" },
        { "firstName": "Anna", "lastName": "Smith" },
        { "firstName": "Peter", "lastName": "Jones" }
    ];

    var doc = new jsPDF();
    employees.forEach(function (employee, i) {
        doc.text(20, 10 + (i * 10),
            "First Name: " + employee.firstName +
            "Last Name: " + employee.lastName);
    });
    doc.save('Test.pdf');
} */