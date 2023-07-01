import React from 'react'
import { loadState } from '../../utils/utils'
import { useAppDispatch } from '../../app/hooks'
import './jobLetterPage.sass'
import styles from '../newUserPage/NewUserPage.module.sass'
import { getJobLetter } from '../../models/jobLetter/jobLetterSlice'
import '../resumeFixPage/resumeFixPage.sass'
import styleSearch from '../../components/search/Search.module.sass'
import stylesTag from '../../components/Tag/Tag.module.sass'
import { CSSTransition } from 'react-transition-group'
import { Button } from 'antd'
import { Preloader } from '../../components/preloader/Preloader'

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
      // if (!url.origin.includes('hh.ru')) {
      //   setSelectedUrl(null)
      //   return
      // }
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
        }).catch(() => {
          setLoad(loadState.error)
        })
    } catch (error) {
      setLoad(loadState.error)
    }
  }

  const renderLetter = (text) => {
    setFocus()
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

  const refLetter = React.useRef(null)
  const setFocus = () => {
    refTextArea.current?.focus()
  }
  const letterNodeRef = React.useRef(null)
  const inputNodeRef = React.useRef(null)
  return (
    <>
      <div className='resumePage' ref={inputNodeRef}
           style={(loading === loadState.res) ? { justifyContent: 'center' } : { justifyContent: 'initial' }}>
        <Preloader loading={loading} tips={['полученное письмо будет связано с выбранным резюме и вакансией', 'скопируйте полученный результат в буфер', 'хотите улучшить сгенерированное письмо? Отредактируйте сразу после получения результата']}/>
        <div className={'fullResBlock'}>

          <><div className={'resumeInput ' + styles.widjet}>
              <form className='resumeBlock' onSubmit={handleSubmit}>
              <div className={'uploadBlock'}>
                <span>добавьте резюме PDF</span>
                <label style={{ margin: 0 }} htmlFor="upload-photo"
                       className={stylesTag.tag + ' fileUpload'}>{!selectedFile ? 'выбрать файл' : (selectedFile as File).name}</label>
                <input id="upload-photo" style={{ display: 'none' }} type="file" onChange={handleFileSelect}
                       accept=".pdf"/>
              </div>
              <div style={{ textAlign: 'center' }}>
              <input style={{ display: 'inline-block' }} autoComplete="off" placeholder='введите ссылку на вакансию hh.ru' id='jobLetter'
                     className={styleSearch.search} type="text" onChange={handleUrlSelect}/>
              </div>
              <div style={{ display: 'contents' }}><div style={{ textAlign: 'center' }}>
                <Button onClick={handleSubmit} className={styles.newPageColorBtn + ' ' + styles.newPageBtn} id ='inputScan' disabled={(!(selectedUrl && selectedFile))}>получить сопроводительное письмо</Button>
                {/* <a type="submit" style={{ padding: '0.6rem' }} className={styles.newPageColorBtn + ' ' + styles.newPageBtn}></a> */}
              </div>
                { window.innerWidth > 1000 && <div className='helpResume' data-title='после ввода необходимых данных, вы получите образец сопроводительного письма'><svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M12 17V16.9929M12 14.8571C12 11.6429 15 12.3571 15 9.85714C15 8.27919 13.6568 7 12 7C10.6567 7 9.51961 7.84083 9.13733 9M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="#3a3a3a" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
              </div>}</div>
              {(loading === loadState.error) && <div className='errDesr'>{errMessage}</div>}
            </form>
          </div></>
          <CSSTransition
              in={loading === loadState.res && !!data}
              nodeRef={letterNodeRef}
              timeout={3000}
              classNames="results"
              unmountOnExit
              onEnter={() => { setLoad(loadState.res) }}
              onExited={() => { setLoad(loadState.base) }}
              >
            <div className='letter' ref={letterNodeRef}>
              {(loading === loadState.res) &&
                <>
                  {(loading === loadState.res) && <button className='copy' onClick={copyToClipboard}>
                    <svg className='copySvg' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
                         stroke="#ffffff">
                      <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                      <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                      <g id="SVGRepo_iconCarrier">
                        <g id="Edit / Copy">
                          <path id="Vector"
                                d="M9 9V6.2002C9 5.08009 9 4.51962 9.21799 4.0918C9.40973 3.71547 9.71547 3.40973 10.0918 3.21799C10.5196 3 11.0801 3 12.2002 3H17.8002C18.9203 3 19.4801 3 19.9079 3.21799C20.2842 3.40973 20.5905 3.71547 20.7822 4.0918C21.0002 4.51962 21.0002 5.07967 21.0002 6.19978V11.7998C21.0002 12.9199 21.0002 13.48 20.7822 13.9078C20.5905 14.2841 20.2839 14.5905 19.9076 14.7822C19.4802 15 18.921 15 17.8031 15H15M9 9H6.2002C5.08009 9 4.51962 9 4.0918 9.21799C3.71547 9.40973 3.40973 9.71547 3.21799 10.0918C3 10.5196 3 11.0801 3 12.2002V17.8002C3 18.9203 3 19.4801 3.21799 19.9079C3.40973 20.2842 3.71547 20.5905 4.0918 20.7822C4.5192 21 5.07899 21 6.19691 21H11.8036C12.9215 21 13.4805 21 13.9079 20.7822C14.2842 20.5905 14.5905 20.2839 14.7822 19.9076C15 19.4802 15 18.921 15 17.8031V15M9 9H11.8002C12.9203 9 13.4801 9 13.9079 9.21799C14.2842 9.40973 14.5905 9.71547 14.7822 10.0918C15 10.5192 15 11.079 15 12.1969L15 15"
                                stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                        </g>
                      </g>
                    </svg>
                  </button>}
                  <textarea autoFocus className={'letterArea ' + styles.widjet}
                            ref={refTextArea}>{(loading === loadState.res) ? renderLetter(data) : 'здесь будет ваше сопроводительное письмо'}</textarea>
                </>
              }
            </div>
          </CSSTransition>
        </div>
      </div>
    </>
  )
}
