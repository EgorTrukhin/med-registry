const ExcelJS = require("exceljs");

export default class Report {
    data;
    workbook;
    worksheet;

    constructor(data) {
        this.data = data;
    }

    async createWorkBook() {
        const workbook = new ExcelJS.Workbook();

        workbook.creator = 'admin';
        workbook.lastModifiedBy = 'admin';
        workbook.created = new Date();
        workbook.modified = new Date();

        // Force workbook calculation on load
        workbook.calcProperties.fullCalcOnLoad = true;

        this.workbook = workbook;

        this.worksheet = workbook.addWorksheet('Лист назначений');

        this.setDataRows();

        return workbook.xlsx.writeBuffer();
    }

    setDataRows() {
        const matrix = {
            ["ИНЪЕКЦИИ"]: ["B10", "A10"],
            ["ВНУТРЕННЕЕ"]: ["F10", "E10"],
            ["Местное лечение"]: ["J4", "I4"],
            ["Физиотерапевтическое лечение"]: ["N4", "M4"],
            ["Исследования"]: ["R4", "Q4"],
        };

        Object.keys(matrix).forEach(key => {
            let value = "";
            let date = "";
            const treats = this.data[key];
            treats.forEach(treat => {
                const offset = Math.ceil(treat.name.length / 25);
                date += treat.date + "\n";
                for (let i = 0; i < offset; i++) {
                    date += "\n";
                }
                value += treat.name + "\n\n";
            })
            let cell = this.worksheet.getCell(matrix[key][0]);
            cell.value = value;
            cell.alignment = { wrapText: true, vertical: 'top', horizontal: 'left' };

            cell = this.worksheet.getCell(matrix[key][1]);
            cell.value = date;
            cell.alignment = { wrapText: true, vertical: 'top', horizontal: 'left' };
        });
    }
}