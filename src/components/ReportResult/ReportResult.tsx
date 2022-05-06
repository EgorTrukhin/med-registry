import { Document, Packer, Paragraph, Table, TableCell, TableRow, WidthType, HeightRule, TextRun } from "docx";

export const ReportResult = (props) => {
  const FileSaver = require('file-saver');
  const COLUMN_WIDTH = [1000, 3500, 1000, 1000, 3500, 1000];
  const tableCellText = (content) => {
    return new Paragraph({
      children: [
        new TextRun({
          text: content,
          size: "11pt",
          font: "Calibri",
          allCaps: true,
        })
      ]
    });
  }
  const getTableHeader = () => {    
    const headerRow = new TableRow({
      children: [
          new TableCell({
            width: {
              size: 1000,
              type: WidthType.DXA,
            },
            children: [tableCellText("Дата назначения")],
          }),
          new TableCell({
            width: {
              size: 3500,
              type: WidthType.DXA,
            },
            children: [tableCellText("ИНЪЕКЦИИ")],
          }),
          new TableCell({
            width: {
              size: 1000,
              type: WidthType.DXA,
            },
            children: [tableCellText("Дата отмены")],
          }),
          new TableCell({
            width: {
              size: 1000,
              type: WidthType.DXA,
            },
            children: [tableCellText("Дата назначения")],
          }),
          new TableCell({
            width: {
              size: 3500,
              type: WidthType.DXA,
            },
            children: [tableCellText("ВНУТРЕННЕЕ")],
          }),
          new TableCell({
            width: {
              size: 1000,
              type: WidthType.DXA,
            },
            children: [tableCellText("Дата отмены")],
          }),
      ],
    })

    return headerRow;
  }

  const test = () => {
    const table = new Table({
      columnWidths: COLUMN_WIDTH,
      rows: [getTableHeader()]
      });
    const doc = new Document({
      sections: [{
        properties: {
          page: {
              margin: {
                  top: 700,
                  right: 700,
                  bottom: 700,
                  left: 700,
              },
          },
        },
        children: [table],
      }],
    });

    Packer.toBlob(doc).then((blob) => {
      // saveAs from FileSaver will download the file
      FileSaver.saveAs(blob, "example.docx");
    });
  }

  return (
    <div>
      ReportResult
      <button onClick={test}>test</button>
    </div>
  );
}