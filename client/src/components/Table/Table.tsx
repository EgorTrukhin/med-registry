import { 
  Document, 
  Packer, 
  Table, 
} from "docx";
import { useEffect } from "react";
import "./Table.css";
import { tableHeader } from "./TableUtils";
const Docx = require('docx-preview');

export const CustomTable = () => {  
  const test = () => {
    const table = new Table({
      rows: [tableHeader()]
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

    return doc;   
  }

  useEffect(() => {
    const doc = test();

    Packer.toBlob(doc).then((blob) => {      
      Docx.renderAsync(blob, document.getElementsByClassName("table-doc")[0]);
    });    
  });
  
  return (
    <div className="table-doc"></div>
  );
}