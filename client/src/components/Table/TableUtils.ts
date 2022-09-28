import { 
  Paragraph, 
  AlignmentType, 
  TextRun,
  TableCell,
  TableRow,
  WidthType
} from "docx";

interface ITableCellOptions {
  content: string;
  header?: boolean;
}

const getText = (text: string, size: string = "11pt", font: string = "Calibri") => {
  return new TextRun({text, size, font});
}

const getParagraph = (content: string, header: boolean = false) => {
  return new Paragraph({
    alignment: header ? AlignmentType.CENTER : AlignmentType.LEFT,
    spacing: {before: 100, after: 100},
    children: [getText(content)]
  });
}

const getTableCell = (options: ITableCellOptions) => {
  const {content, header} = options; 
  return  new TableCell({
    children: [getParagraph(content, header)],
  });
}

export const tableHeader = () => {    
  const headerRow = new TableRow({
    children: [
        getTableCell({content: "Дата назначения"}),
        getTableCell({content: "ИНЪЕКЦИИ"}),
        getTableCell({content: "Дата отмены"}),
        getTableCell({content: "Дата назначения"}),
        getTableCell({content: "ВНУТРЕННЕЕ"}),
        getTableCell({content: "Дата отмены"}),
    ]
  })

  return headerRow;
}