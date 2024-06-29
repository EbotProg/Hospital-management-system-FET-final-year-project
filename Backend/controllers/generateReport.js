const PDFDocument = require("pdfkit-table");
const moment = require("moment")
const CronJob = require("cron").CronJob;
const fs = require('fs');
const path = require('path')


 async function generateReportPdf(headers, rows, patient, hospital, startDate, endDate) {
    try{

    
    let doc = new PDFDocument({ margin: 30, size: 'A3'});

    return new Promise((resolve, reject)=>{

        const { outline } = doc;

        const top = outline.addItem('Top Level', { expanded: true });
    
        top.addItem('Sub-section');
    
        let date = new Date();
        let val = moment(date).format("DD-MM-YYYY____HH:mm:ss")
        const pdfName = `Medical_Report_${patient.firstName}_${patient.lastName}_${val}`;
    
        const writeStream = doc.pipe(fs.createWriteStream(`${path.join(__dirname, `/../pdfs/${pdfName}.pdf`)}`));
    console.log("pdf will be saved at", `${path.join(__dirname, `/../pdfs/${pdfName}.pdf`)}`)
    
    doc.fontSize(30)
    
    doc.font('Helvetica-Bold')
        .text(`DW`, {
      align: 'left'
    }
    );
    
    doc.fontSize(20)
    doc.font('Helvetica')
        .text(`email: digitalwaspital@gmail.com`, {
      align: 'right'
    }
    );
    
    // doc.moveDown();
    // doc.font('Helvetica-Bold')
    //     .text(`DigitalWaspital`, {
    //   align: 'center'
    // }
    // );
    
    doc.fontSize(30)
    doc.moveDown();
    doc.font('Helvetica-Bold')
        .text(`${hospital.name.toUpperCase()}`, {
      align: 'center'
    }
    );
    
    doc.fontSize(20)
    doc.moveDown();
    doc.font('Helvetica')
        .text(`Medical History of ${patient.firstName.toUpperCase()} ${patient.lastName.toUpperCase()}`, {
      align: 'center'
    }
    );
    
    doc.fontSize(15)
    doc.moveDown();
    doc.font('Helvetica')
        .text(`From ${moment(startDate).format("DD-MM-YYYY____HH:mm:ss")} to ${moment(endDate).format("DD-MM-YYYY____HH:mm:ss")}`, {
      align: 'center'
    }
    );
    
        // const table = {
        //     title: { label: `${hospital.name}`, fontSize: 30, color: '#292929', fontFamily: 'Helvetica'},
        //     subtitle: { label: `Patient Name: ${patient.firstName} ${patient.lastName}\nPatient Address: ${patient.address}\nStart Date: ${moment(startDate).format("DD-MM-YYYY____HH:mm:ss")}\nEnd Date: ${moment(endDate).format("DD-MM-YYYY____HH:mm:ss")}`},
        //     headers: headers,
        //     rows: rows
        // }
    
        const table = {
            title: { label: ""},
            subtitle: { label: ""},
            headers: headers,
            rows: rows
        }
    
        doc.table(table, {
            columnSpacing: 10,
            padding: 10,
            columnSize: [45, 95, 45, 40, 40, 40, 40, 40, 40, 40, 95, 45, 40, 40, 40],
            //width: 800,
            align: "center",
            prepareHeader: () => doc.fontSize(10),
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
    
                // if(indexColumn == 1 || indexColumn == 9){
                    doc.fontSize(10).fillColor('#292929')
                // }else{
                //     doc.fontSize(8).fillColor('#292929')
                // }
    
    
            }
        })
    
        doc.end()
        // await new Promise((resolve, reject) => {
        //     writeStream.on('finish', resolve(pdfName));
        //     writeStream.on('error', reject);
        //   });
        writeStream.on("finish", () => {
            console.log("i don mbole: pdfName", pdfName)
            resolve(pdfName)
        })
        writeStream.on('error', reject);
        // doc.end((err)=>{
        //     console.log("err", err)
        //     if (err) {
        //         reject(err);
        //       } else {
        //         console.log("pdfname", pdfName)
        //         resolve(pdfName)
        //     }
        // })
      
    
        


    })
    

    }catch(err) {
        console.log(err);
    }
}

module.exports = {
    generateReportPdf
}