import React from 'react'
import { loadState } from '../../utils/utils'
import { useAppDispatch } from '../../app/hooks'
import './jobLetter.css'
import styles from './../newUserPage/NewUserPage.module.css'
import { getJobLetter } from '../../models/jobLetter/jobLetterSlice'
import './../resumeFixPage/resumeFixPage.css'
import styleSearch from './../../components/search/Search.module.css'
import { PushSpinner, WhisperSpinner } from 'react-spinners-kit'

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
  const setFocus = () => { refTextArea.current?.focus() }

  return (
    <>
      <div style={{ width: '100vw', bottom: '0', position: 'absolute', left: '0' }}>
        <svg style={{ width: '100%', height: 'fit-content', display: 'block' }} id="visual" viewBox="0 0 900 450" width="900" height="450" xmlns="http://www.w3.org/2000/svg" version="1.1"><path d="M0 155L18.8 152.8C37.7 150.7 75.3 146.3 112.8 141.8C150.3 137.3 187.7 132.7 225.2 144.2C262.7 155.7 300.3 183.3 337.8 192.2C375.3 201 412.7 191 450.2 185.7C487.7 180.3 525.3 179.7 562.8 180C600.3 180.3 637.7 181.7 675.2 184.3C712.7 187 750.3 191 787.8 187.3C825.3 183.7 862.7 172.3 881.3 166.7L900 161L900 451L881.3 451C862.7 451 825.3 451 787.8 451C750.3 451 712.7 451 675.2 451C637.7 451 600.3 451 562.8 451C525.3 451 487.7 451 450.2 451C412.7 451 375.3 451 337.8 451C300.3 451 262.7 451 225.2 451C187.7 451 150.3 451 112.8 451C75.3 451 37.7 451 18.8 451L0 451Z" fill="#2c264e"></path><path d="M0 173L18.8 182C37.7 191 75.3 209 112.8 222.8C150.3 236.7 187.7 246.3 225.2 248.2C262.7 250 300.3 244 337.8 232.3C375.3 220.7 412.7 203.3 450.2 205.3C487.7 207.3 525.3 228.7 562.8 235.2C600.3 241.7 637.7 233.3 675.2 231.5C712.7 229.7 750.3 234.3 787.8 238.3C825.3 242.3 862.7 245.7 881.3 247.3L900 249L900 451L881.3 451C862.7 451 825.3 451 787.8 451C750.3 451 712.7 451 675.2 451C637.7 451 600.3 451 562.8 451C525.3 451 487.7 451 450.2 451C412.7 451 375.3 451 337.8 451C300.3 451 262.7 451 225.2 451C187.7 451 150.3 451 112.8 451C75.3 451 37.7 451 18.8 451L0 451Z" fill="#292443"></path><path d="M0 289L18.8 285.5C37.7 282 75.3 275 112.8 275.5C150.3 276 187.7 284 225.2 277.7C262.7 271.3 300.3 250.7 337.8 248.3C375.3 246 412.7 262 450.2 262.7C487.7 263.3 525.3 248.7 562.8 251.2C600.3 253.7 637.7 273.3 675.2 280.2C712.7 287 750.3 281 787.8 269.8C825.3 258.7 862.7 242.3 881.3 234.2L900 226L900 451L881.3 451C862.7 451 825.3 451 787.8 451C750.3 451 712.7 451 675.2 451C637.7 451 600.3 451 562.8 451C525.3 451 487.7 451 450.2 451C412.7 451 375.3 451 337.8 451C300.3 451 262.7 451 225.2 451C187.7 451 150.3 451 112.8 451C75.3 451 37.7 451 18.8 451L0 451Z" fill="#272239"></path><path d="M0 334L18.8 332.8C37.7 331.7 75.3 329.3 112.8 323.5C150.3 317.7 187.7 308.3 225.2 299C262.7 289.7 300.3 280.3 337.8 276.7C375.3 273 412.7 275 450.2 285.8C487.7 296.7 525.3 316.3 562.8 316.8C600.3 317.3 637.7 298.7 675.2 289.7C712.7 280.7 750.3 281.3 787.8 289C825.3 296.7 862.7 311.3 881.3 318.7L900 326L900 451L881.3 451C862.7 451 825.3 451 787.8 451C750.3 451 712.7 451 675.2 451C637.7 451 600.3 451 562.8 451C525.3 451 487.7 451 450.2 451C412.7 451 375.3 451 337.8 451C300.3 451 262.7 451 225.2 451C187.7 451 150.3 451 112.8 451C75.3 451 37.7 451 18.8 451L0 451Z" fill="#23202f"></path><path d="M0 336L18.8 337.7C37.7 339.3 75.3 342.7 112.8 347.5C150.3 352.3 187.7 358.7 225.2 354.8C262.7 351 300.3 337 337.8 333.5C375.3 330 412.7 337 450.2 342.7C487.7 348.3 525.3 352.7 562.8 353.7C600.3 354.7 637.7 352.3 675.2 352.7C712.7 353 750.3 356 787.8 351.5C825.3 347 862.7 335 881.3 329L900 323L900 451L881.3 451C862.7 451 825.3 451 787.8 451C750.3 451 712.7 451 675.2 451C637.7 451 600.3 451 562.8 451C525.3 451 487.7 451 450.2 451C412.7 451 375.3 451 337.8 451C300.3 451 262.7 451 225.2 451C187.7 451 150.3 451 112.8 451C75.3 451 37.7 451 18.8 451L0 451Z" fill="#1f1d25"></path><path d="M0 387L18.8 388C37.7 389 75.3 391 112.8 394.8C150.3 398.7 187.7 404.3 225.2 401.2C262.7 398 300.3 386 337.8 381.8C375.3 377.7 412.7 381.3 450.2 385.8C487.7 390.3 525.3 395.7 562.8 399.2C600.3 402.7 637.7 404.3 675.2 403.8C712.7 403.3 750.3 400.7 787.8 396.7C825.3 392.7 862.7 387.3 881.3 384.7L900 382L900 451L881.3 451C862.7 451 825.3 451 787.8 451C750.3 451 712.7 451 675.2 451C637.7 451 600.3 451 562.8 451C525.3 451 487.7 451 450.2 451C412.7 451 375.3 451 337.8 451C300.3 451 262.7 451 225.2 451C187.7 451 150.3 451 112.8 451C75.3 451 37.7 451 18.8 451L0 451Z" fill="#1b1b1b"></path></svg>
      </div>
    <div className='resumePage' style={ (loading === loadState.res) ? { justifyContent: 'center' } : { justifyContent: 'initial' }}>
      <div className={'fullResBlock'}>
      <div className={'resumeInput ' + styles.widjet}>
        <form className='resumeBlock' onSubmit={handleSubmit}>
          <div className={'uploadBlock'}>
            <span>добавьте резюме PDF</span>
            <label htmlFor="upload-photo" className={styles.tag + ' submit fileUpload'}>{ !selectedFile ? 'выбрать файл' : (selectedFile as File).name}</label>
            <input id="upload-photo" style={{ display: 'none' }} type="file" onChange={handleFileSelect} accept=".pdf" />
          </div>
          <input placeholder='введите ссылку на вакансию hh.ru' id='jobLetter' className={styleSearch.search} type="text" onChange={handleUrlSelect}/>
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
      <div className='letter'>
                {(loading === loadState.res) &&
                    <>
                    {(loading === loadState.res) && <button className='copy' onClick={copyToClipboard}>
                      <svg className='copySvg' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g id="Edit / Copy"> <path id="Vector" d="M9 9V6.2002C9 5.08009 9 4.51962 9.21799 4.0918C9.40973 3.71547 9.71547 3.40973 10.0918 3.21799C10.5196 3 11.0801 3 12.2002 3H17.8002C18.9203 3 19.4801 3 19.9079 3.21799C20.2842 3.40973 20.5905 3.71547 20.7822 4.0918C21.0002 4.51962 21.0002 5.07967 21.0002 6.19978V11.7998C21.0002 12.9199 21.0002 13.48 20.7822 13.9078C20.5905 14.2841 20.2839 14.5905 19.9076 14.7822C19.4802 15 18.921 15 17.8031 15H15M9 9H6.2002C5.08009 9 4.51962 9 4.0918 9.21799C3.71547 9.40973 3.40973 9.71547 3.21799 10.0918C3 10.5196 3 11.0801 3 12.2002V17.8002C3 18.9203 3 19.4801 3.21799 19.9079C3.40973 20.2842 3.71547 20.5905 4.0918 20.7822C4.5192 21 5.07899 21 6.19691 21H11.8036C12.9215 21 13.4805 21 13.9079 20.7822C14.2842 20.5905 14.5905 20.2839 14.7822 19.9076C15 19.4802 15 18.921 15 17.8031V15M9 9H11.8002C12.9203 9 13.4801 9 13.9079 9.21799C14.2842 9.40973 14.5905 9.71547 14.7822 10.0918C15 10.5192 15 11.079 15 12.1969L15 15" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g> </g></svg>
                  </button>}
                  <textarea autoFocus className={'letterArea ' + styles.widjet} ref={refTextArea}>{(loading === loadState.res) ? renderLetter(data) : 'здесь будет ваше сопроводительное письмо'}</textarea>
                </>
                }
                </div>
      </div>
    </div>
    </>
  )
}
