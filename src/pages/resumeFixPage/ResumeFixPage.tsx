import React, { useEffect, useState } from 'react'
import { pdfjs } from 'react-pdf'
import 'react-pdf/dist/esm/Page/AnnotationLayer.css'
import 'react-pdf/dist/esm/Page/TextLayer.css'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { getResResume } from '../../models/resume/resumeFixSlice'
import { useNavigate } from 'react-router-dom'
import { PushSpinner } from 'react-spinners-kit'
import './resumeFixPage.css'
import { debounce, loadState, updTips } from '../../utils/utils'
import styles from '../newUserPage/NewUserPage.module.css'
import styleSearch from '../../components/search/Search.module.css'
import { clearRecommends, getRecommends, selectDataRecommends } from '../../models/recommend/recommendSlice'
import { getNodeProf } from '../../models/tops/topsSlice'
import Tag from '../../components/Tag/Tag'
import Linkify from 'linkify-react'
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
        <div className={'rec '}><span> Ваши навыки:</span> <div className={'learnedTags'}>{data[0].learned.map((el: string) => (<div style={{ filter: ' grayscale(1) drop-shadow(2px 4px 6px black)' }} className={'learnedTag ' + styles.tag}>{el}</div>)) }</div></div>
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
      <div className={'fullResBlock'}>
        <div className={'resumeInput ' + styles.widjet }>
          <form className='resumeBlock' onSubmit={handleSubmit}>
            <div className={'uploadBlock'}>
            <span>добавьте резюме PDF</span>
            <label htmlFor="upload-photo" className={styles.tag + ' submit fileUpload'}>{ !selectedFile ? 'выбрать файл' : (selectedFile as File).name}</label>
             <input id="upload-photo" style={{ display: 'none' }} placeholder='выбрать файл' type="file" onChange={handleFileSelect} accept=".pdf" />
            </div>
              <div style={{ position: 'relative' }}>
            <input placeholder='введите профессию' autoComplete="off" id='searchResume' className={styleSearch.search} type="text" onChange={
              debounce(sendSearchValue)
            }/>
            { !tips && haveRecommends && <div>{renderRecommends(recommends)}</div> }
            </div>
            <input className={styles.tag + ' submit'} type="submit" id='inputScan' value="сканировать резюме" disabled={(!(selectedJob && selectedFile))} />
        { (loading === loadState.error) && <div className='errDesr'>{errMessage}</div>}
      </form>

        </div>

        { ((loading !== loadState.error) && (loading !== loadState.base)) && <div className={styles.widjet + ' resResumeBlock'}>
            <div className='preloader' style={{
              left: '50%',
              top: '25%'
            }}>
                <PushSpinner
                    color="#686769"
                    id="preloader"
                    loading={loading === loadState.load}
                    size={30}
                />
            </div>
          { loading === loadState.res && !!toLearn &&
              <>
                {(loading === loadState.res) &&
                  renderResumeRes(data)
                }
                  <div id='toLearn'><span>Что Вам стоит изучить: </span>
                      <div className={'tagToLearn '}>{toLearn}</div>
                  </div>

                  <div id='tips' className='tipsText' style={{ visibility: (tips) ? 'visible' : 'hidden' }}>{textToLink()}</div>
              </>
          }

        </div> }
      </div>
    </div>
  )
}
