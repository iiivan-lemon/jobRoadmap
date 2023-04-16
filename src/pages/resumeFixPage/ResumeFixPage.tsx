import React, { useState } from 'react'
// import { PdfReader } from '../../components/pdfReader/pdfReader'
import { pdfjs } from 'react-pdf'
import 'react-pdf/dist/esm/Page/AnnotationLayer.css'
import 'react-pdf/dist/esm/Page/TextLayer.css'
import { useAppDispatch } from '../../app/hooks'
import { getResResume } from '../../models/resume/resumeFixSlice'
import { useNavigate } from 'react-router-dom'
import { PushSpinner } from 'react-spinners-kit'
import './resumeFixPage.css'
import { loadState } from '../../utils/utils'
// eslint-disable-next-line no-template-curly-in-string
pdfjs.GlobalWorkerOptions.workerSrc = '//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js'
// eslint-disable-next-line @typescript-eslint/no-var-requires
export const ResumeFixPage = () => {
  const [
    loading,
    setLoad
  ] = React.useState(loadState.base)

  const nav = useNavigate()

  const [file, setFile] = useState('')
  const dispatch = useAppDispatch()
  const [selectedFile, setSelectedFile] = React.useState(null)
  const [data, setData] = React.useState([])
  // React.useEffect(() => {
  //   // eslint-disable-next-line no-debugger
  //   if (!data) {
  //     nav('/')
  //   } else if (data.length > 0) {
  //     setLoad(0)
  //   } else { setLoad(2) }
  // }, [data])

  const handleSubmit = async (event) => {
    event.preventDefault()
    // eslint-disable-next-line no-debugger
    const formData = new FormData()
    // @ts-expect-error qwer
    formData.append('file', selectedFile)
    try {
      setLoad(loadState.load)
      void dispatch(getResResume(formData.get('file')))
        .then(data => {
          if (!data.payload) {
            setLoad(loadState.error)
          } else {
            setLoad(loadState.res)
            setData(data.payload)
          }
        }).catch(() => { setLoad(loadState.error) })
    } catch (error) {
      setLoad(loadState.error)
    }
  }

  const handleFileSelect = (event) => {
    setSelectedFile(event.target.files[0])
  }

  const renderResumeRes = (data) => {
    if (data) {
      return data.map(el => <div className='rec'><span className='profession'>{el.profession} </span><span className='match'> Совпадение: {(el.simularity).toFixed(2) * 100}% </span><span> Ваши навыки: {el.learned.join(' ') }</span><span> Что стоит изучить: {el.to_learn.join(' ') }</span></div>)
    }
  }

  React.useEffect(() => { pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js` })
  return (
    <div className='resumePage'>
      <div className='resumeInput'>
      <span>добавьте резюме PDF</span>
      <form onSubmit={handleSubmit}>
        <input placeholder='выбрать файл' type="file" onChange={handleFileSelect} accept=".pdf" />
        <input type="submit" id='inputScan' value="сканировать резюме" style={ selectedFile ? { visibility: 'visible' } : { visibility: 'hidden' }} />
      </form>
      </div>
      <div className='preloader'>
        <PushSpinner
          color="#686769"
          id="preloader"
          loading={loading === loadState.load}
          size={30}
        />
      </div>

      {(loading === loadState.res) &&
          <>
              <div className='allrecs'>{renderResumeRes(data)}</div></>
      }
    </div>
  )
}
