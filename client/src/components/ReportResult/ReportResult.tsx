import "./ReportResult.css"
import {Context} from "../../index";
import { useContext, useState } from "react";
import { observer } from "mobx-react-lite";
import Report from "./report";
import { Viewer } from '@react-pdf-viewer/core';
import { Worker } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';


export const ReportResult = observer(() => {
  const {dataStore} = useContext(Context);

  const data = dataStore.getReportResultData();

  const download = () => {
    new Report(data).createWorkBook().then((data) => {
      const blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8' });
      const file = new File([blob], "test.xlsx", { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8' })
      console.log(file)

      // saveAs(blob, 'test.xlsx');

      // const a: HTMLAnchorElement = document.createElement('a');
      // a.style.display = 'none';
      // document.body.appendChild(a);
      //
      // const url: string = window.URL.createObjectURL(blob);
      //
      // a.href = url;
      // a.download = 'test.xlsx';
      //
      // a.click();
      //
      // window.URL.revokeObjectURL(url);
      //
      // if (a && a.parentElement) {
      //   a.parentElement.removeChild(a);
      // }
    });


  }

  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  // http://localhost:5000/test.jpg
  return (
    <div className="report-result-wrapper">
      <button onClick={() => download()}>test</button>
      <Worker workerUrl={process.env.REACT_APP_API_URL + "pdf.worker.min.js"}>
        <Viewer fileUrl={process.env.REACT_APP_API_URL + "test.pdf"} />
      </Worker>

    </div>
  );
});