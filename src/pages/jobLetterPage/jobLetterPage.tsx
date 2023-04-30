import React from 'react'
import { loadState } from '../../utils/utils'
import { getResResume } from '../../models/resume/resumeFixSlice'
import { useAppDispatch } from '../../app/hooks'
import './jobLetter.css'
import styles from './../newUserPage/NewUserPage.module.css'
import { getJobLetter } from '../../models/jobLetter/jobLetterSlice'
import './../resumeFixPage/resumeFixPage.css'
import { PushSpinner } from 'react-spinners-kit'
import styleSearch from './../../components/search/Search.module.css'
export const JobLetterPage = () => {
  const dispatch = useAppDispatch()
  const [
    loading,
    setLoad
  ] = React.useState(loadState.base)
  const [selectedFile, setSelectedFile] = React.useState(null)
  const [errMessage, setErrMessage] = React.useState('что-то пошло не так')
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
      const url = (new URL(event.target.value))
      if (!url.origin.includes('hh.ru')) {
        setSelectedUrl(null)
        return
      }
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
          if (data.payload.errMessage) {
            setErrMessage(data.payload.errMessage)
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

  const renderLetter = (text) => {
    return text
  }

  const isValidUrl = urlString => {
    const urlPattern = new RegExp('^(https?:\\/\\/)' + // validate protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // validate domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))' + // validate OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // validate port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?' + // validate query string
      '(\\#[-a-z\\d_]*)?$', 'i') // validate fragment locator
    return urlPattern.test(urlString)
  }

  return (
    <div className='letterPage'>
      <div className={'resumeInput ' + styles.widjet}>

        <form className='letterBlock' onSubmit={handleSubmit}>
          <span>добавьте резюме PDF</span>
          <label htmlFor="upload-photo" className={styles.tag + ' submit'}>{ !selectedFile ? 'выбрать файл' : (selectedFile as File).name}</label>
          <input id="upload-photo" style={{ display: 'none' }} type="file" onChange={handleFileSelect} accept=".pdf" />
          <span>введите ссылку на вакансию hh.ru</span>
          <input className={styleSearch.search} type="text" onChange={handleUrlSelect}/>
          <input type="submit" className={styles.tag + ' submit'} value="получить сопроводительное письмо" disabled={!(selectedFile && selectedUrl)} />
          { (loading === loadState.error) && <div className='errDesr'>{errMessage}</div>}
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
              <div className='letter'>
                  <button className='copy' onClick={copyToClipboard}>
                      <svg className='copySvg' xmlns="http://www.w3.org/2000/svg" version="1.1" width="512" height="512" x="0" y="0" viewBox="0 0 682.667 682.667" ><g><path d="M565 640H225c-41.36 0-75-33.64-75-75V225c0-41.36 33.64-75 75-75h340c41.36 0 75 33.64 75 75v340c0 41.36-33.64 75-75 75zM225 200c-13.785 0-25 11.215-25 25v340c0 13.785 11.215 25 25 25h340c13.785 0 25-11.215 25-25V225c0-13.785-11.215-25-25-25zM100 440H75c-13.785 0-25-11.215-25-25V75c0-13.785 11.215-25 25-25h340c13.785 0 25 11.215 25 25v23.75h50V75c0-41.36-33.64-75-75-75H75C33.64 0 0 33.64 0 75v340c0 41.36 33.64 75 75 75h25zm0 0" fill="#000000"/></g></svg>
                  </button>
                  <textarea className={styleSearch.search + ' letterArea'} ref={refTextArea}>{renderLetter(data)}</textarea>
                {copySuccess}
              </div></>
      }

    </div>
  )
}
