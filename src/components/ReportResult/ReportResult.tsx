import { Document, Packer } from "docx"
import { saveAs } from "file-saver"

export const ReportResult = (props) => {
  /*const saveDocumentToFile = (doc, fileName) => {
    // Create new instance of Packer for the docx module
    const packer = new Packer()
    // Create a mime type that will associate the new file with Microsoft Word
    const mimeType =
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    // Create a Blob containing the Document instance and the mimeType
    packer.toBlob(doc).then(blob => {
      const docblob = blob.slice(0, blob.size, mimeType)
      // Save the file using saveAs from the file-saver package
      saveAs(docblob, fileName)
    })
  }

  const generateWordDocument = (event) => {
    let doc = new Document()
    doc.createParagraph("Title")
    doc.createParagraph("Subtitle")
    doc.createParagraph("Heading 1")
    doc.createParagraph("Heading 2")
    doc.createParagraph(
      "Aliquam gravida quam sapien, quis dapibus eros malesuada vel. Praesent tempor aliquam iaculis. Nam ut neque ex. Curabitur pretium laoreet nunc, ut ornare augue aliquet sed. Pellentesque laoreet sem risus. Cras sodales libero convallis, convallis ex sed, ultrices neque. Sed quis ullamcorper mi. Ut a leo consectetur, scelerisque nibh sit amet, egestas mauris. Donec augue sapien, vestibulum in urna et, cursus feugiat enim. Ut sit amet placerat quam, id tincidunt nulla. Cras et lorem nibh. Suspendisse posuere orci nec ligula mattis vestibulum. Suspendisse in vestibulum urna, non imperdiet enim. Vestibulum vel dolor eget neque iaculis ultrices."
    )
    saveDocumentToFile(doc, "New Document.docx")
  }*/

  return (
    <div>ReportResult</div>
  );
}