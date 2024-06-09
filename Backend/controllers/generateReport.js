const PDFDocument = require("pdfkit-table");
const moment = require("moment")
const CronJob = require("cron").CronJob;
const fs = require('fs');
const path = require('path')


 function generateReportPdf(headers, rows, patient, hospital, startDate, endDate) {
    try{

    let doc = new PDFDocument({ margin: 30, size: 'A3'});

    let date = new Date();
    let val = moment(date).format("DD-MM-YYYY____HH:mm:ss")
    const pdfName = `Medical_Report_${patient.name}_${val}`;

    doc.pipe(fs.createWriteStream(`${path.join(__dirname, `${pdfName}.pdf`)}`));

    const table = {
        title: { label: `${hospital.name}`, fontSize: 30, color: '#292929', fontFamily: 'Helvetica'},
        subtitle: { label: `Patient Name: ${patient.name}\nPatient Address: ${patient.address}\nStart Date: ${moment(startDate).format("DD-MM-YYYY____HH:mm:ss")}\nEnd Date: ${moment(endDate).format("DD-MM-YYYY____HH:mm:ss")}`},
        headers: headers,
        rows: rows
    }

    doc.table(table, {
        columnSpacing: 10,
        padding: 10,
        columnSize: [45, 95, 45, 40, 40, 40, 40, 40, 40, 40, 95, 45, 40, 40, 40],
        //width: 800,
        align: "center",
        prepareHeader: () => doc.fontSize(7),
        prepareRow: (row, indexColumn, indexRow, rectRow, rectCell) => {
            
            const { x, y, width, height} = rectCell;

            if(indexColumn === 0) {
                doc
                .lineWidth(-5)
                .moveTo(x, y)
                .lineTo(x, y + height)
                .stroke('#999999')
            }

            doc
            .lineWidth(-5)
            .moveTo(x + width, y)
            .lineTo(x + width, y + height)
            .stroke('#999999')

            if(indexColumn == 1 || indexColumn == 9){
                doc.fontSize(9).fillColor('#292929')
            }else{
                doc.fontSize(8).fillColor('#292929')
            }


        }
    })

    doc.end();

    }catch(err) {
        console.log(err);
    }
}

module.exports = {
    generateReportPdf
}