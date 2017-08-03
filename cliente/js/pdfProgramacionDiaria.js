function imprimirProgramacionDiaria(oData) {
    var data = oData;

    var doc = new jsPDF('p', 'mm', 'letter');
    //Dimension of A4 in pts: 595 × 842
    //Dimension of Letter in pts and mm: 612x792 | 216 x 279 mm	
    
    // doc.setDisplayMode('fullpage', 'continuous', 'UseOutlines');

    /* Color de fondo depende de pdfSucursal */
    if ($("#cmbProgramacionDiariaSucursal").val() == 0) {
        doc.setTextColor(0, 0, 0);
    }
    if ($("#cmbProgramacionDiariaSucursal").val() == 1) {
        doc.setTextColor(0, 0, 255);
    }
    if ($("#cmbProgramacionDiariaSucursal").val() == 2) {
        doc.setTextColor(239, 206, 16);
    }
    if ($("#cmbProgramacionDiariaSucursal").val() == 3) {
        doc.setTextColor(239, 15, 15);
    }
    if ($("#cmbProgramacionDiariaSucursal").val() == 4) {
        doc.setTextColor(26, 239, 15);
    }
    /* Etiqueta 1 */
    doc.rect(0, 0, 108, 69.75, '');
    /* Etiqueta 2 */
    doc.rect(108, 0, 107.6, 69.75, '');
    /* Etiqueta 3 */
    doc.rect(0, 69.75, 108, 69.75, '');
    /* Etiqueta 4 */
    doc.rect(108, 69.75, 107.6, 69.75, '');
    /* Etiqueta 5 */
    doc.rect(0, 139.5, 108, 69.75, '');
    /* Etiqueta 6 */
    doc.rect(108, 139.5, 107.6, 69.75, '');
    /* Etiqueta 7 */
    doc.rect(0, 209.25, 108, 69.75, '');
    /* Etiqueta 8 */
    doc.rect(108, 209.25, 107.6, 69.75, '');

    var pageWidth = 216;
    var pageHeight = 279;

    var pageMargin = 2;

    pageWidth -= pageMargin * 1;
    pageHeight -= pageMargin * 1;

    var cellPadding = 2.5;
    var cellWidth = 100;
    var cellHeight = 69.75;
    var lineHeight = 5;

    var startX = pageMargin;
    var startY = pageMargin;


    doc.setFontSize(12);

    function createCard(item) {

        //cell projection
        var requiredWidth = startX + cellWidth + (cellPadding * 2);

        var requiredHeight = startY + cellHeight; /* Aqui iba el cellpading * 2 que se acumulaba y bajaba los items */



        if (requiredWidth <= pageWidth) {

            textWriter(item, startX + cellPadding, startY + cellPadding);

            startX = requiredWidth;
            //  startY += cellHeight + cellPadding;

        } else {
            if (requiredHeight > pageHeight) {
                doc.addPage();

                /* Color de fondo depende de pdfSucursal */
                if ($("#cmbProgramacionDiariaSucursal").val() == 0) {
                    // doc.setFillColor(255, 255, 255);
                    doc.setTextColor(0, 0, 0);
                }
                if ($("#cmbProgramacionDiariaSucursal").val() == 1) {
                    doc.setTextColor(0, 0, 255);
                }
                if ($("#cmbProgramacionDiariaSucursal").val() == 2) {
                    doc.setTextColor(239, 206, 16);
                }
                if ($("#cmbProgramacionDiariaSucursal").val() == 3) {
                    doc.setTextColor(239, 15, 15);
                }
                if ($("#cmbProgramacionDiariaSucursal").val() == 4) {
                    doc.setTextColor(26, 239, 15);
                }
                /* Etiqueta 1 */
                doc.rect(0, 0, 108, 69.75, '');
                /* Etiqueta 2 */
                doc.rect(108, 0, 107.6, 69.75, '');
                /* Etiqueta 3 */
                doc.rect(0, 69.75, 108, 69.75, '');
                /* Etiqueta 4 */
                doc.rect(108, 69.75, 107.6, 69.75, '');
                /* Etiqueta 5 */
                doc.rect(0, 139.5, 108, 69.75, '');
                /* Etiqueta 6 */
                doc.rect(108, 139.5, 107.6, 69.75, '');
                /* Etiqueta 7 */
                doc.rect(0, 209.25, 108, 69.75, '');
                /* Etiqueta 8 */
                doc.rect(108, 209.25, 107.6, 69.75, '');

                startY = pageMargin;
            } else {
                startY = requiredHeight;
            }

            startX = pageMargin;


            textWriter(item, startX + cellPadding, startY + cellPadding);

            startX = startX + cellWidth + (cellPadding * 2);
        }

    }

    function textWriter(item, xAxis, yAxis) {
        if (item.diet == 0) {
            item.diet = ' ';
        } else {
            item.diet = '*Diet';
        }
        if (item.forma == 0) {
            item.forma = '*Redonda';
        } else {
            item.forma = '*Cuadrada';
        }
        doc.setFontSize(14);
        doc.text(item.solicitante.toUpperCase(), xAxis, yAxis + 1);
        doc.text("N° 1", xAxis + 88, yAxis);
        doc.setFontSize(12);
        doc.text("Fono: " + item.telefono, xAxis, yAxis + 5);
        doc.text("Valor: " + item.precio, xAxis + 75, yAxis + 5);
        doc.text(item.personas + " Personas", xAxis + 75, yAxis + 10);
        doc.text(item.forma, xAxis + 75, yAxis + 15);
        doc.text(item.diet, xAxis + 75, yAxis + 20);
        doc.text(item.masaTipo_nombre + " " + item.masaSabor_nombre + " " + item.sabor_nombre.toUpperCase() + " " + "#" + item.num, xAxis + 23, yAxis + 25);
        doc.text(item.caracteristicas, xAxis + 30, yAxis + 30);
        doc.text(item.mensaje.toUpperCase(), xAxis + 25, yAxis + 35);
        doc.text("Abono: " + item.abono, xAxis, yAxis + 60);
        doc.text("Hora: " + item.fechaEntrega, xAxis + 75, yAxis + 60);
    }


    for (var i = 0; i < data.length; i++) {
        createCard(data[i]);
    }

    doc.save('grid.pdf');
}
function imprimirProgramacionDiariaOtro(oData) {
    var doc = new jsPDF("p", "mm", "letter");

    /* Configuracion General */
    doc.setFontSize(14);/* Tamaño de la fuente */
    // doc.setFont("times","italic");
    // doc.setTextColor(255, 0, 0);

    /* Color de fondo depende de pdfSucursal */
    if ($("#cmbProgramacionDiariaSucursal").val() == 0) {
        // doc.setFillColor(255, 255, 255);
        doc.setTextColor(0, 0, 0);
    }
    if ($("#cmbProgramacionDiariaSucursal").val() == 1) {
        doc.setTextColor(0, 0, 255);
    }
    if ($("#cmbProgramacionDiariaSucursal").val() == 2) {
        doc.setTextColor(239, 206, 16);
    }
    if ($("#cmbProgramacionDiariaSucursal").val() == 3) {
        doc.setTextColor(239, 15, 15);
    }
    if ($("#cmbProgramacionDiariaSucursal").val() == 4) {
        doc.setTextColor(26, 239, 15);
    }

    /* Etiqueta 1 */
    doc.rect(0, 0, 108, 69.75, '');
    /* Etiqueta 2 */
    doc.rect(108, 0, 107.6, 69.75, '');
    /* Etiqueta 3 */
    doc.rect(0, 69.75, 108, 69.75, '');
    /* Etiqueta 4 */
    doc.rect(108, 69.75, 107.6, 69.75, '');
    /* Etiqueta 5 */
    doc.rect(0, 139.5, 108, 69.75, '');
    /* Etiqueta 6 */
    doc.rect(108, 139.5, 107.6, 69.75, '');
    /* Etiqueta 7 */
    doc.rect(0, 209.25, 108, 69.75, '');
    /* Etiqueta 8 */
    doc.rect(108, 209.25, 107.6, 69.75, '');

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
        if (employee.id == 1) {
            doc.text(4, 8, employee.solicitante);
            doc.text(4, 16, "Fono: " + employee.telefono);
            doc.text(93, 8, "N°: 1");
            doc.text(75, 16, "Valor: " + employee.precio);
            doc.text(80, 24, employee.personas + " Personas");
            doc.text(20, 35, employee.masaTipo_nombre);
            doc.text(41, 35, employee.masaSabor_nombre);
            doc.text(59, 35, employee.sabor_nombre);
            doc.text(72, 35, "#" + employee.num);
            doc.text(33, 40, employee.caracteristicas);
            doc.text(33, 45, employee.mensaje);
            doc.text(4, 65, "Abono: " + employee.abono);
            doc.text(75, 65, "Hora: " + employee.fechaEntrega);
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

/* function textWriter(item, xAxis, yAxis) {
        doc.text("Solicitante: " + item.solicitante + "N° 1", xAxis + 2, yAxis);
        doc.text("Fono: " + item.telefono + "Valor: " + item.precio, xAxis, yAxis + (lineHeight * 1));
        doc.text(item.personas + " Personas", xAxis, yAxis + (lineHeight * 2));
        doc.text(item.masaTipo_nombre + item.masaSabor_nombre + item.sabor_nombre + "#" + item.num, xAxis, yAxis + (lineHeight * 5));
        doc.text(item.caracteristicas, xAxis, yAxis + (lineHeight * 9));
        doc.text(item.mensaje, xAxis, yAxis + (lineHeight * 10));
        doc.text("Abono: " + item.abono + "Hora: " + item.fechaEntrega, xAxis, yAxis + (lineHeight * 14));
    } */