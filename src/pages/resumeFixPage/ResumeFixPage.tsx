import React, { useEffect, useState } from 'react'
import { pdfjs } from 'react-pdf'
import 'react-pdf/dist/esm/Page/AnnotationLayer.css'
import 'react-pdf/dist/esm/Page/TextLayer.css'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { getResResume } from '../../models/resume/resumeFixSlice'
import { useNavigate } from 'react-router-dom'
import { PushSpinner } from 'react-spinners-kit'
import './resumeFixPage.css'
import { debounce, loadState, replaceURLs, updTips } from '../../utils/utils'
import styles from '../newUserPage/NewUserPage.module.css'
import styleSearch from '../../components/search/Search.module.css'
import { clearRecommends, getRecommends, selectDataRecommends } from '../../models/recommend/recommendSlice'
import { getNodeProf } from '../../models/tops/topsSlice'
import Tag from '../../components/Tag/Tag'
import stylesTag from '../../components/Tag/Tag.module.css'
import Linkify from 'linkify-react'

import { Basic } from '../../components/dropZone/dropZone'
import { sendUrl } from '../../models/urlCheck/urlCheckSlice'
// eslint-disable-next-line @typescript-eslint/no-var-requires,import/no-duplicates
// eslint-disable-next-line no-template-curly-in-string
pdfjs.GlobalWorkerOptions.workerSrc = '//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js'
export const ResumeFixPage = () => {
  const [
    loading,
    setLoad
  ] = React.useState(loadState.base)
  const recommends = useAppSelector(selectDataRecommends)
  const nav = useNavigate()
  const [errMessage, setErrMessage] = React.useState('что-то пошло не так')
  const [file, setFile] = useState('')
  const dispatch = useAppDispatch()
  const [selectedFile, setSelectedFile] = React.useState(null)
  const [data, setData] = React.useState([])
  const [selectedJob, setSelectedJob] = React.useState(null)
  const [tips, setTips] = useState('')
  const [toLearn, setToLearn] = useState('')
  const handleJobSelect = (event) => {
    if (!event.target.value.trim()) {
      setSelectedJob(null)
    } else {
      setLoad(loadState.base)
      setSelectedJob(event.target.value)
    }
  }

  React.useEffect(() => {
    setLoad(loadState.base)
    setTips('')
  }, [selectedJob, selectedFile])

  const handleSubmit = async (event) => {
    event.preventDefault()
    void dispatch(clearRecommends())
    // eslint-disable-next-line no-debugger
    const formData = new FormData()
    // @ts-expect-error qwer
    formData.append('file', selectedFile)
    try {
      setLoad(loadState.load)
      void dispatch(getResResume({ file: formData.get('file'), role: selectedJob, n_tech: 10 }))
        .then(data => {
          // eslint-disable-next-line no-debugger
          if ((data.payload).errMessage) {
            setErrMessage(data.payload.errMessage)
            setLoad(loadState.error)
          } else {
            setLoad(loadState.res)
            setData(data.payload)
            if (data.payload[0].to_learn) {
              setToLearn(data.payload[0].to_learn.map(el => <Tag
                setTitleTag={getTips}
                className={
                  styles.tag}
                id='1'
                title={{ profession: el }} />))
            } else if (data.payload[0]['to learn']) {
              setToLearn(data.payload[0]['to learn'].map(el => <Tag
                setTitleTag={getTips}
                className={
                  styles.tag}
                id='1'
                title={{ profession: el }} />))
            }
          }
        }).catch(() => { setLoad(loadState.error) })
    } catch (error) {
      // eslint-disable-next-line no-debugger

      setLoad(loadState.error)
    }
  }

  const handleFileSelect = (event) => {
    setSelectedFile(event.target.files[0])
  }
  useEffect(() => {
    if (recommends.professions.length) { setHavRecommends(true) } else setHavRecommends(false)
  }, [recommends])
  const sendSearchValue = (e) => {
    setSelectedJob(e.target.value)
    void (dispatch(getRecommends(e.target.value)))
  }

  const getTips = (skill: string) => {
    if (!skill) { setTips(''); return }
    void dispatch(getNodeProf(skill)).then(data => {
      if (!data.payload) {
        setTips('')
      } else {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment

        setTips(updTips(data.payload.tips_to_learn))
      }
    })
  }

  const renderResumeRes = (data) => {
    if (data) {
      // if (!data[0].learned.length && data[0]['to learn'].length) {
      //   setLoad(loadState.error)
      //   setErrMessage('По вашему резюме/специальности ничего не найдено')
      //   // return <div className='rec'><span> По вашей специальности ничего не найдено</span></div>
      // }
      return (
        <div className={'rec ' + styles.widjet}><span> Ваши навыки:</span> <div className={'learnedTags'}>{data[0].learned.map((el: string) => (<div style={{ filter: ' grayscale(1) drop-shadow(2px 4px 6px black)' }} className={'learnedTag ' + styles.tag}>{el}</div>)) }</div></div>
      )
    }
  }
  const [haveRecommends, setHavRecommends] = useState(false)
  const renderRecommends = (recommends) => {
    if (recommends.professions.length) {
      return recommends.professions.map((el) =>
        <div className={styleSearch.titleRecommend} onClick={ (e) => {
          if ((document.getElementById('searchResume') as HTMLInputElement)) {
            (document.getElementById('searchResume') as HTMLInputElement).value = el
            if (!el.trim()) {
              setSelectedJob(null)
            } else {
              setLoad(loadState.base)
              setSelectedJob(el)
            }
          }

          setHavRecommends(false)
        }}>{el}</div>)
    }
  }

  const textToLink = () => {
    // if (textURls) {
    //   return textURls.tips
    // }
    return <Linkify options={{ render: renderLink }}>{tips}</Linkify>
  }

  React.useEffect(() => {
    checkLinks()
  }, [textToLink])

  const checkLinks = () => {
    const tipsHTML = document.getElementById('tips') as HTMLElement
    if (tipsHTML) {
      const listLinks = tipsHTML.getElementsByTagName('a');
      [].forEach.call(listLinks, function (el: HTMLAnchorElement) {
        if (el) {
          void dispatch(sendUrl(el.href)).then(data => {
            if (data.payload) {
              if (data.payload.is_work) {
                el.classList.add('linkTip')
                el.innerHTML = '<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#5452ff"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g id="Interface / Link"> <path id="Vector" d="M9.1718 14.8288L14.8287 9.17192M7.05086 11.293L5.63664 12.7072C4.07455 14.2693 4.07409 16.8022 5.63619 18.3643C7.19829 19.9264 9.7317 19.9259 11.2938 18.3638L12.7065 16.9498M11.2929 7.05L12.7071 5.63579C14.2692 4.07369 16.8016 4.07397 18.3637 5.63607C19.9258 7.19816 19.9257 9.73085 18.3636 11.2929L16.9501 12.7071" stroke="#0400ff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g> </g></svg>'
              } else {
                el.style.pointerEvents = 'none'
                // el.style.cursor = 'auto'
                el.innerHTML = '<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#5452ff"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g id="Interface / Link"> <path id="Vector" d="M9.1718 14.8288L14.8287 9.17192M7.05086 11.293L5.63664 12.7072C4.07455 14.2693 4.07409 16.8022 5.63619 18.3643C7.19829 19.9264 9.7317 19.9259 11.2938 18.3638L12.7065 16.9498M11.2929 7.05L12.7071 5.63579C14.2692 4.07369 16.8016 4.07397 18.3637 5.63607C19.9258 7.19816 19.9257 9.73085 18.3636 11.2929L16.9501 12.7071" stroke="#545353c4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g> </g></svg>'
              }
            }
          }
          )
        }
      })
    }
    // void dispatch(sendText(tipsHTML?.innerHTML))
  }

  const renderLink = ({ attributes, content }) => {
    const urlPattern = /^(https?:\/\/)/
    if (!urlPattern.test(content as string)) {
      return <span style={{ color: 'white' }}>{content}</span>
    }
    const { href, ...props } = attributes
    let updHref = <></>
    // void dispatch(sendUrl(href)).then(data => {
    //   if (data.payload) {
    //     if (!data.payload.is_work) {
    //       updHref = <></>
    //     } else {
    //       updHref = (<a href={href} {...props}><svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#5452ff"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g id="Interface / Link"> <path id="Vector" d="M9.1718 14.8288L14.8287 9.17192M7.05086 11.293L5.63664 12.7072C4.07455 14.2693 4.07409 16.8022 5.63619 18.3643C7.19829 19.9264 9.7317 19.9259 11.2938 18.3638L12.7065 16.9498M11.2929 7.05L12.7071 5.63579C14.2692 4.07369 16.8016 4.07397 18.3637 5.63607C19.9258 7.19816 19.9257 9.73085 18.3636 11.2929L16.9501 12.7071" stroke="#0400ff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g> </g></svg></a>)
    //     }
    //   }
    // }
    // )
    updHref = (<a href={href} {...props}></a>)

    return updHref
  }

  React.useEffect(() => { pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js` })
  return (
    <div className='resumePage' style={ (loading === loadState.res) ? { justifyContent: 'center' } : { justifyContent: 'initial' }}>
      <div style={{ width: '100vw', bottom: '0', position: 'absolute', left: '0' }}>
        <svg style={{ width: '100%', height: 'fit-content', display: 'block' }} id="visual" viewBox="0 0 900 450" width="900" height="450" xmlns="http://www.w3.org/2000/svg" version="1.1"><path d="M0 155L18.8 152.8C37.7 150.7 75.3 146.3 112.8 141.8C150.3 137.3 187.7 132.7 225.2 144.2C262.7 155.7 300.3 183.3 337.8 192.2C375.3 201 412.7 191 450.2 185.7C487.7 180.3 525.3 179.7 562.8 180C600.3 180.3 637.7 181.7 675.2 184.3C712.7 187 750.3 191 787.8 187.3C825.3 183.7 862.7 172.3 881.3 166.7L900 161L900 451L881.3 451C862.7 451 825.3 451 787.8 451C750.3 451 712.7 451 675.2 451C637.7 451 600.3 451 562.8 451C525.3 451 487.7 451 450.2 451C412.7 451 375.3 451 337.8 451C300.3 451 262.7 451 225.2 451C187.7 451 150.3 451 112.8 451C75.3 451 37.7 451 18.8 451L0 451Z" fill="#2c264e"></path><path d="M0 173L18.8 182C37.7 191 75.3 209 112.8 222.8C150.3 236.7 187.7 246.3 225.2 248.2C262.7 250 300.3 244 337.8 232.3C375.3 220.7 412.7 203.3 450.2 205.3C487.7 207.3 525.3 228.7 562.8 235.2C600.3 241.7 637.7 233.3 675.2 231.5C712.7 229.7 750.3 234.3 787.8 238.3C825.3 242.3 862.7 245.7 881.3 247.3L900 249L900 451L881.3 451C862.7 451 825.3 451 787.8 451C750.3 451 712.7 451 675.2 451C637.7 451 600.3 451 562.8 451C525.3 451 487.7 451 450.2 451C412.7 451 375.3 451 337.8 451C300.3 451 262.7 451 225.2 451C187.7 451 150.3 451 112.8 451C75.3 451 37.7 451 18.8 451L0 451Z" fill="#292443"></path><path d="M0 289L18.8 285.5C37.7 282 75.3 275 112.8 275.5C150.3 276 187.7 284 225.2 277.7C262.7 271.3 300.3 250.7 337.8 248.3C375.3 246 412.7 262 450.2 262.7C487.7 263.3 525.3 248.7 562.8 251.2C600.3 253.7 637.7 273.3 675.2 280.2C712.7 287 750.3 281 787.8 269.8C825.3 258.7 862.7 242.3 881.3 234.2L900 226L900 451L881.3 451C862.7 451 825.3 451 787.8 451C750.3 451 712.7 451 675.2 451C637.7 451 600.3 451 562.8 451C525.3 451 487.7 451 450.2 451C412.7 451 375.3 451 337.8 451C300.3 451 262.7 451 225.2 451C187.7 451 150.3 451 112.8 451C75.3 451 37.7 451 18.8 451L0 451Z" fill="#272239"></path><path d="M0 334L18.8 332.8C37.7 331.7 75.3 329.3 112.8 323.5C150.3 317.7 187.7 308.3 225.2 299C262.7 289.7 300.3 280.3 337.8 276.7C375.3 273 412.7 275 450.2 285.8C487.7 296.7 525.3 316.3 562.8 316.8C600.3 317.3 637.7 298.7 675.2 289.7C712.7 280.7 750.3 281.3 787.8 289C825.3 296.7 862.7 311.3 881.3 318.7L900 326L900 451L881.3 451C862.7 451 825.3 451 787.8 451C750.3 451 712.7 451 675.2 451C637.7 451 600.3 451 562.8 451C525.3 451 487.7 451 450.2 451C412.7 451 375.3 451 337.8 451C300.3 451 262.7 451 225.2 451C187.7 451 150.3 451 112.8 451C75.3 451 37.7 451 18.8 451L0 451Z" fill="#23202f"></path><path d="M0 336L18.8 337.7C37.7 339.3 75.3 342.7 112.8 347.5C150.3 352.3 187.7 358.7 225.2 354.8C262.7 351 300.3 337 337.8 333.5C375.3 330 412.7 337 450.2 342.7C487.7 348.3 525.3 352.7 562.8 353.7C600.3 354.7 637.7 352.3 675.2 352.7C712.7 353 750.3 356 787.8 351.5C825.3 347 862.7 335 881.3 329L900 323L900 451L881.3 451C862.7 451 825.3 451 787.8 451C750.3 451 712.7 451 675.2 451C637.7 451 600.3 451 562.8 451C525.3 451 487.7 451 450.2 451C412.7 451 375.3 451 337.8 451C300.3 451 262.7 451 225.2 451C187.7 451 150.3 451 112.8 451C75.3 451 37.7 451 18.8 451L0 451Z" fill="#1f1d25"></path><path d="M0 387L18.8 388C37.7 389 75.3 391 112.8 394.8C150.3 398.7 187.7 404.3 225.2 401.2C262.7 398 300.3 386 337.8 381.8C375.3 377.7 412.7 381.3 450.2 385.8C487.7 390.3 525.3 395.7 562.8 399.2C600.3 402.7 637.7 404.3 675.2 403.8C712.7 403.3 750.3 400.7 787.8 396.7C825.3 392.7 862.7 387.3 881.3 384.7L900 382L900 451L881.3 451C862.7 451 825.3 451 787.8 451C750.3 451 712.7 451 675.2 451C637.7 451 600.3 451 562.8 451C525.3 451 487.7 451 450.2 451C412.7 451 375.3 451 337.8 451C300.3 451 262.7 451 225.2 451C187.7 451 150.3 451 112.8 451C75.3 451 37.7 451 18.8 451L0 451Z" fill="#1b1b1b"></path></svg>
      </div>
      <div style={{ maxWidth: '18rem' }}>
      <div className={'resumeInput ' + styles.widjet}>
      <form className='resumeBlock' onSubmit={handleSubmit}>
        <span>добавьте резюме PDF</span>
        <label htmlFor="upload-photo" className={styles.tag + ' submit'}>{ !selectedFile ? 'выбрать файл' : (selectedFile as File).name}</label>
         <input id="upload-photo" style={{ display: 'none' }} placeholder='выбрать файл' type="file" onChange={handleFileSelect} accept=".pdf" />
        <span>введите вашу специальность</span>
        <div style={{ position: 'relative' }}>
        <input autoComplete="off" id='searchResume' className={styleSearch.search} type="text" onChange={
          debounce(sendSearchValue)
        }/>
        { !tips && haveRecommends && <div>{renderRecommends(recommends)}</div> }
        </div>

        <input className={styles.tag + ' submit'} type="submit" id='inputScan' value="сканировать резюме" disabled={(!(selectedJob && selectedFile))} />
        { (loading === loadState.error) && <div className='errDesr'>{errMessage}</div>}
      </form>

      </div>
        {(loading === loadState.res) &&
                renderResumeRes(data)
        }
      </div>
      <div className='preloader'>
        <PushSpinner
          color="#686769"
          id="preloader"
          loading={loading === loadState.load}
          size={30}
        />
      </div>
      {(loading === loadState.res && toLearn) &&
        <div className={styles.widjet + ' resResumeBlock'}>
        <div id='toLearn'><span>Что Вам стоит изучить: </span><div className={'tagToLearn '}>{toLearn}</div>
          </div>
            <>
                <div id='tips' className='tipsText' style={{ visibility: (tips) ? 'visible' : 'hidden' }}>{textToLink()}</div>
            </>

      </div>

      }
    </div>
  )
}
