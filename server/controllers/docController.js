
const path = require('path');
const fs = require('fs');
const ExcelJS = require('exceljs');
const docx = require('html-docx-js');

class DocController {
    async word(req, res) {
        if (req?.body) {
            const {templateText, values} = req.body;

            let result = templateText;
            console.log(result)
            Object.keys(values).forEach(key => {
                const ident = `{{${key}}}`;
                result = result.replace(ident, values[key]);
            })
            console.log(result)

            const converted = docx.asBlob(result);

            // Save the file to disk temporarily
            fs.writeFileSync('temp.docx', converted);

            // Send the file to the frontend
            res.download('temp.docx', 'document.docx', (err) => {
                // Clean up the temporary file after it's been sent
                fs.unlinkSync('temp.docx');
                if (err) {
                    console.error(err);
                    res.status(500).send('Error sending file');
                }
            });
        }
    }

    async excel(req, res) {
        const filename = 'test.xlsx';
        const filepath = path.join(__dirname, '..', 'static', filename);

        if (req?.body) {
            const {header, content} = req.body;
            const workbook = new ExcelJS.Workbook();
            fs.readFile(filepath, (err, data) => {
                if (err) throw err;

                workbook.xlsx.load(data).then(() => {
                    const worksheet = workbook.worksheets[0];

                    const {patient, diet, treatment, room} = header;
                    worksheet.getCell(["A6"]).value = patient && patient.firstName + " " + patient.secondName + " " + patient.middleName || "";

                    worksheet.getCell(["D6"]).value = room || "";

                    worksheet.getCell(["E6"]).value = diet?.dietName || "";

                    worksheet.getCell(["G6"]).value = treatment?.treatmentName || "";

                    const matrix = {
                        ["инъекции"]: ["B10", "A10"],
                        ["внутреннее"]: ["F10", "E10"],
                        ["местное лечение"]: ["J4", "I4"],
                        ["физиотерапевтическое лечение"]: ["N4", "M4"],
                        ["исследования"]: ["R4", "Q4"],
                    };

                    Object.keys(content).forEach(key => {
                        let value = "";
                        let date = "";
                        const treats = content[key];
                        (treats || []).forEach(treat => {
                            const offset = Math.ceil(treat.name.length / 25);
                            date += (treat.date || "") + "\n";
                            for (let i = 0; i < offset; i++) {
                                date += "\n";
                            }
                            value += treat.name + "\n\n";
                        })
                        let cell = worksheet.getCell(matrix[String(key).toLowerCase()][0]);
                        cell.value = value;
                        cell.alignment = { wrapText: true, vertical: 'top', horizontal: 'left' };

                        cell = worksheet.getCell(matrix[String(key).toLowerCase()][1]);
                        cell.value = date;
                        cell.alignment = { wrapText: true, vertical: 'top', horizontal: 'left' };
                    });

                    workbook.xlsx.writeFile(filepath).then(() => {
                        const filestream = fs.createReadStream(filepath);
                        res.setHeader('Content-Disposition', 'attachment; filename=' + filename);
                        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
                        filestream.pipe(res);
                    });
                });
            });
        }


    }
}

module.exports = new DocController();