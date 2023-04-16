import React from 'react'
import { loadState } from '../../utils/utils'
import { getResResume } from '../../models/resume/resumeFixSlice'
import { useAppDispatch } from '../../app/hooks'
import './jobLetter.css'
import { getJobLetter } from '../../models/jobLetter/jobLetterSlice'
import { PushSpinner } from 'react-spinners-kit'
export const JobLetterPage = () => {
  const dispatch = useAppDispatch()
  const [
    loading,
    setLoad
  ] = React.useState(loadState.base)
  const [selectedFile, setSelectedFile] = React.useState(null)

  const [selectedUrl, setSelectedUrl] = React.useState(null)
  const [data, setData] = React.useState(null)
  const refTextArea = React.useRef<HTMLTextAreaElement>(null)
  const [copySuccess, setCopySuccess] = React.useState('')
  const copyToClipboard = (e) => {
    refTextArea.current?.select()
    document.execCommand('copy')
    e.target.focus()
    setCopySuccess('Copied!')
  }

  const handleFileSelect = (event) => {
    setLoad(loadState.base)
    setSelectedFile(event.target.files[0])
  }
  const handleUrlSelect = (event) => {
    if (!isValidUrl(event.target.value)) {
      setSelectedUrl(null)
    } else {
      setLoad(loadState.base)
      setSelectedUrl(event.target.value)
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    // eslint-disable-next-line no-debugger
    if (!(selectedFile && selectedUrl)) {
      return
    }

    const formData = new FormData()
    formData.append('file', selectedFile)
    try {
      setLoad(loadState.load)
      void dispatch(getJobLetter({ file: formData.get('file'), link: selectedUrl }))
        .then(data => {
          if (!data.payload) {
            setLoad(loadState.error)
          } else {
            setLoad(loadState.res)
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error faefsf
            setData(data.payload)
          }
        }).catch(() => { setLoad(loadState.error) })
    } catch (error) {
      setLoad(loadState.error)
    }
  }

  const renderLetter = (text) => {
    return text
  }

  const isValidUrl = urlString => {
    const urlPattern = new RegExp('^(https?:\\/\\/)?' + // validate protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // validate domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))' + // validate OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // validate port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?' + // validate query string
      '(\\#[-a-z\\d_]*)?$', 'i') // validate fragment locator
    return urlPattern.test(urlString)
  }

  return (
    <div className='letterPage'>
      <div className='resumeInput'>

        <form className='letterBlock' onSubmit={handleSubmit}>
          <span>добавьте резюме PDF</span>
          <input type="file" onChange={handleFileSelect} accept=".pdf"/>
          <span>добавьте ссылку на вакансию</span>
          <input type="text" onChange={handleUrlSelect}/>
          <input type="submit" value="получить сопроводительное письмо" style={ (selectedFile && selectedUrl) ? { visibility: 'visible' } : { visibility: 'hidden' }} />
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
              <textarea ref={refTextArea}>{renderLetter(data)}</textarea>
              <div>
                  <button onClick={copyToClipboard}>Copy</button>
                {copySuccess}
              </div></>
      }

    </div>
  )
}
