import React, { useState } from 'react'
// import { PdfReader } from '../../features/pdfReader/pdfReader'
import { Document, Page, pdfjs } from 'react-pdf'
import 'react-pdf/dist/esm/Page/AnnotationLayer.css'
import 'react-pdf/dist/esm/Page/TextLayer.css'
import { useAppDispatch } from '../../app/hooks'
import { getResResume } from '../../models/resume/resumeFixSlice'
import * as fs from 'fs'
// eslint-disable-next-line no-template-curly-in-string
pdfjs.GlobalWorkerOptions.workerSrc = '//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js'
// eslint-disable-next-line @typescript-eslint/no-var-requires
export const ResumeFixPage = () => {
  const [file, setFile] = useState('')
  const dispatch = useAppDispatch()
  const [selectedFile, setSelectedFile] = React.useState(null)

  const handleSubmit = async (event) => {
    event.preventDefault()
    // eslint-disable-next-line no-debugger
    debugger
    const formData = new FormData()
    // @ts-expect-error qwer
    formData.append('file', selectedFile)
    try {
      void dispatch(getResResume(formData.get('file')
      )).then(data => {
        // eslint-disable-next-line no-debugger
        debugger
      })
    } catch (error) {
      console.log(error)
    }
  }

  const handleFileSelect = (event) => {
    setSelectedFile(event.target.files[0])
  }

  React.useEffect(() => { pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js` })
  return (
    <div>
      <span>добавьте резюме</span>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileSelect}/>
        <input type="submit" value="Upload File" />
      </form>
      <Document file= {file}>
      </Document>
    </div>
  )
}
