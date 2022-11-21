const ExcelJS = require("exceljs");

export default class Report {
    data: any;
    workbook: any;
    worksheet: any;

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

        this.setColumnsWidth();
        this.mergeCells();
        this.fillAndStyleHeaderValues();
        this.fillTableBorders();
        this.setDataColumns();
        this.setDataRows();

        return workbook.xlsx.writeBuffer();
    }

    setDataColumns() {
        const startDate = "Дата назначения";
        const endDate = "Дата отмены";
        const alignmentDate = { wrapText: true, vertical: 'middle', horizontal: 'left' };
        const alignmentTypes = { wrapText: true, vertical: 'middle', horizontal: 'center' };
        const dateFontSize = { size: 8 };

        let cell;

        // Инъекции
        cell = this.worksheet.getCell('A8');
        cell.value = startDate;
        cell.alignment = alignmentDate;
        cell.font = dateFontSize;

        cell = this.worksheet.getCell('B8');
        cell.value = "ИНЪЕКЦИИ";
        cell.alignment = alignmentTypes;

        cell = this.worksheet.getCell('D8');
        cell.value = endDate;
        cell.alignment = alignmentDate;
        cell.font = dateFontSize;

        // Внутреннее
        cell = this.worksheet.getCell('E8');
        cell.value = startDate;
        cell.alignment = alignmentDate;
        cell.font = dateFontSize;

        cell = this.worksheet.getCell('F8');
        cell.value = "ВНУТРЕННЕЕ";
        cell.alignment = alignmentTypes;

        cell = this.worksheet.getCell('H8');
        cell.value = endDate;
        cell.alignment = alignmentDate;
        cell.font = dateFontSize;

        // Местное лечение
        cell = this.worksheet.getCell('I1');
        cell.value = startDate;
        cell.alignment = alignmentDate;
        cell.font = dateFontSize;

        cell = this.worksheet.getCell('J1');
        cell.value = "Местное лечение";
        cell.alignment = alignmentTypes;

        cell = this.worksheet.getCell('L1');
        cell.value = endDate;
        cell.alignment = alignmentDate;
        cell.font = dateFontSize;

        // Физ лечение
        cell = this.worksheet.getCell('M1');
        cell.value = startDate;
        cell.alignment = alignmentDate;
        cell.font = dateFontSize;

        cell = this.worksheet.getCell('N1');
        cell.value = "Физиотерапевтическое лечение";
        cell.alignment = alignmentTypes;

        cell = this.worksheet.getCell('P1');
        cell.value = endDate;
        cell.alignment = alignmentDate;
        cell.font = dateFontSize;

        // Исследование
        cell = this.worksheet.getCell('Q1');
        cell.value = startDate;
        cell.alignment = alignmentDate;
        cell.font = dateFontSize;

        cell = this.worksheet.getCell('R1');
        cell.value = "Исследование";
        cell.alignment = alignmentTypes;

        cell = this.worksheet.getCell('T1');
        cell.value = endDate;
        cell.alignment = alignmentDate;
        cell.font = dateFontSize;
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

    fillTableBorders() {
        const border = {
            top: {style:'thin'},
            left: {style:'thin'},
            bottom: {style:'thin'},
            right: {style:'thin'}
        };

        this.worksheet.getCell('A8').border = border;
        this.worksheet.getCell('A10').border = border;
        this.worksheet.getCell('B8').border = border;
        this.worksheet.getCell('B10').border = border;
        this.worksheet.getCell('D8').border = border;
        this.worksheet.getCell('D10').border = border;
        this.worksheet.getCell('E8').border = border;
        this.worksheet.getCell('E10').border = border;
        this.worksheet.getCell('F8').border = border;
        this.worksheet.getCell('F10').border = border;
        this.worksheet.getCell('H8').border = border;
        this.worksheet.getCell('H10').border = border;

        this.worksheet.getCell('I1').border = border;
        this.worksheet.getCell('I4').border = border;
        this.worksheet.getCell('J1').border = border;
        this.worksheet.getCell('J4').border = border;
        this.worksheet.getCell('L1').border = border;
        this.worksheet.getCell('L4').border = border;
        this.worksheet.getCell('M1').border = border;
        this.worksheet.getCell('M4').border = border;
        this.worksheet.getCell('N1').border = border;
        this.worksheet.getCell('N4').border = border;
        this.worksheet.getCell('P1').border = border;
        this.worksheet.getCell('P4').border = border;
        this.worksheet.getCell('Q1').border = border;
        this.worksheet.getCell('Q4').border = border;
        this.worksheet.getCell('R1').border = border;
        this.worksheet.getCell('R4').border = border;
        this.worksheet.getCell('T1').border = border;
        this.worksheet.getCell('T4').border = border;
    }

    fillAndStyleHeaderValues() {
        // Согласованно
        let cell = this.worksheet.getCell('A1');
        cell.value = "Согласовано с заведующим стационаром";
        cell.alignment = { vertical: 'top', horizontal: 'right' };

        // Заголовок (Лист назначений)
        cell = this.worksheet.getCell('A3');
        cell.value = "ЛИСТ НАЗНАЧЕНИЙ";
        cell.alignment = { vertical: 'middle', horizontal: 'center' };
        cell.font = {
            size: 14,
            bold: true
        };

        // ФИО
        cell = this.worksheet.getCell('A5');
        cell.value = "Ф.И.О. больного";

        // Палата
        cell = this.worksheet.getCell('D5');
        cell.value = "Палата №";

        // Диета
        cell = this.worksheet.getCell('E5');
        cell.value = "Диета";
        cell.alignment = { vertical: 'top', horizontal: 'center' };

        // Режим
        cell = this.worksheet.getCell('G5');
        cell.value = "Режим";
        cell.alignment = { vertical: 'top', horizontal: 'center' };
    }

    mergeCells() {
        this.worksheet.mergeCells('A1', 'H2'); // Согласованно
        this.worksheet.mergeCells('A3', 'H4'); // Заголовок
        this.worksheet.mergeCells('A5', 'C5'); // ФИО
        this.worksheet.mergeCells('A6', 'C7'); // ФИО поле
        this.worksheet.mergeCells('D6', 'D7'); // Палата поле
        this.worksheet.mergeCells('E5', 'F5'); // Диета
        this.worksheet.mergeCells('E6', 'F7'); // Диета поле
        this.worksheet.mergeCells('G5', 'H5'); // Режим
        this.worksheet.mergeCells('G6', 'H7'); // Режим поле

        // Инъекции
        this.worksheet.mergeCells('A8', 'A9'); // Дата назначения (заголовок)
        this.worksheet.mergeCells('A10', 'A52'); // Дата назначения (колонка)
        this.worksheet.mergeCells('B8', 'C9'); // Инъекции (заголовок)
        this.worksheet.mergeCells('B10', 'C52'); // Инъекции (колонка)
        this.worksheet.mergeCells('D8', 'D9'); // Дата отмены (заголовок)
        this.worksheet.mergeCells('D10', 'D52'); // Дата отмены (колонка)

        // Внутреннее
        this.worksheet.mergeCells('E8', 'E9'); // Дата назначения (заголовок)
        this.worksheet.mergeCells('E10', 'E52'); // Дата назначения (колонка)
        this.worksheet.mergeCells('F8', 'G9'); // Внутреннее (заголовок)
        this.worksheet.mergeCells('F10', 'G52'); // Внутреннее (колонка)
        this.worksheet.mergeCells('H8', 'H9'); // Дата отмены (заголовок)
        this.worksheet.mergeCells('H10', 'H52'); // Дата отмены (колонка)

        // Местное лечение
        this.worksheet.mergeCells('I1', 'I3'); // Дата назначения (заголовок)
        this.worksheet.mergeCells('I4', 'I52'); // Дата назначения (колонка)
        this.worksheet.mergeCells('J1', 'K3'); // Местное лечение (заголовок)
        this.worksheet.mergeCells('J4', 'K52'); // Местное лечение (колонка)
        this.worksheet.mergeCells('L1', 'L3'); // Дата отмены (заголовок)
        this.worksheet.mergeCells('L4', 'L52'); // Дата отмены (колонка)

        // Физ лечение
        this.worksheet.mergeCells('M1', 'M3'); // Дата назначения (заголовок)
        this.worksheet.mergeCells('M4', 'M52'); // Дата назначения (колонка)
        this.worksheet.mergeCells('N1', 'O3'); // Физ лечение (заголовок)
        this.worksheet.mergeCells('N4', 'O52'); // Физ лечение (колонка)
        this.worksheet.mergeCells('P1', 'P3'); // Дата отмены (заголовок)
        this.worksheet.mergeCells('P4', 'P52'); // Дата отмены (колонка)

        // Исследования
        this.worksheet.mergeCells('Q1', 'Q3'); // Дата назначения (заголовок)
        this.worksheet.mergeCells('Q4', 'Q52'); // Дата назначения (колонка)
        this.worksheet.mergeCells('R1', 'S3'); // Исследования (заголовок)
        this.worksheet.mergeCells('R4', 'S52'); // Исследования (колонка)
        this.worksheet.mergeCells('T1', 'T3'); // Дата отмены (заголовок)
        this.worksheet.mergeCells('T4', 'T52'); // Дата отмены (колонка)

    }

    setColumnsWidth() {
        this.worksheet.pageSetup.margins = {
            left: 0.21, right: 0.21,
            top: 0.21, bottom: 0.21,
            header: 0.21, footer: 0.21
        };

        this.worksheet.columns = [
            { width: 9.94 },    // A
            { width: 9.94 },    // B
            { width: 21.42 },   // C
            { width: 9.94 },    // D
            { width: 9.94 },    // E
            { width: 9.94 },    // F
            { width: 21.42 },   // G
            { width: 9.94 },    // H
            { width: 7.81 },    // I
            { width: 9.28 },    // J
            { width: 9.28 },    // K
            { width: 7.71 },    // L
            { width: 7.81 },    // M
            { width: 9.28 },    // N
            { width: 9.28 },    // O
            { width: 7.71 },    // P
            { width: 7.81 },    // Q
            { width: 9.28 },    // R
            { width: 9.28 },    // S
            { width: 7.71 },    // T
        ];
    }
}