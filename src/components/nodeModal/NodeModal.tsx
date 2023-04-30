import React, { useState } from 'react'
import './NodeModal.css'
import { Button } from 'antd'
import { getNodeProf, selectDataTops, selectListJobs } from '../../models/tops/topsSlice'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { PushSpinner } from 'react-spinners-kit'
import { fetchNodeTips } from '../../models/nodeData/nodeDataService'
import { loadState, updTips } from '../../utils/utils'
import { getNodeData } from '../../models/nodeData/nodeDataSlice'
import Tag from '../Tag/Tag'
import stylesTag from '../Tag/Tag.module.css'
import { setFinished, unSetFinished } from '../../models/check/checkNodeSlice'
import Linkify from 'linkify-react'
import { chechUrlSlice, selectSendUrl, sendText, sendUrl } from '../../models/urlCheck/urlCheckSlice'
// import { selectGrade } from '../../models/gradeFilter/gradeSlice'

const NodeModal = ({ onClose, node, isChecked, sendJob }): JSX.Element => {
  // const textURls = useAppSelector(selectSendUrl)
  const colors = [
    '#7bf36a',
    '#c5fa59',
    '#faf754',
    '#ef7e5b'
  ]
  React.useEffect(() => {

  }, [])

  const ref = React.useRef<HTMLDivElement | null>(null)
  const dispatch = useAppDispatch()
  const [data, setData] = useState([])
  const [tips, setTips] = useState('')
  const [listJobs, setListJobs] = useState([])
  const [
    loading,
    setLoad
  ] = React.useState(loadState.base)
  React.useEffect(() => {
    if (node) {
      setChecked(node.isChecked)
      void dispatch(getNodeProf(node.technology_name)).then(data => {
        if (!data.payload) {
          setLoad(loadState.error)
        } else {
          setLoad(loadState.res)
          setTips(updTips(data.payload.tips_to_learn))
          setListJobs(data.payload.professions)
        }
      })
    }
  }, [node])

  React.useEffect(() => {
    const checkIfClickedOutside = (e): void => {
      if (!node) {
        onClose()
      }
    }
    document.addEventListener('click', checkIfClickedOutside)
    return () => {
      document.removeEventListener('click', checkIfClickedOutside)
    }
  }, [onClose])
  // React.useEffect(() => {
  //   // eslint-disable-next-line no-debugger
  //   if (data.length > 0) {
  //     setLoad(false)
  //   } else { setLoad(true) }
  // }, [data])

  const renderJobs = (data) => {
    if (data.length) {
      return data.map(el => <span className='profTitle' onClick={ () => { onClose(); sendJob({ value: el.profession, isTechSearch: true }) }}>{el.profession}</span>).slice(0, 5)
    }
  }

  const translateProf = (prof: number) => {
    switch (prof) {
      case 0:
        return 'нет опыта'
      case 1:
        return '1-3 лет'
      case 2:
        return '3-6 лет'
      case 3:
        return 'более 6 лет'
    }
  }

  const [checked, setChecked] = useState(node.isChecked)

  const toggleChecked = () => {
    if (!checked) {
      void dispatch(setFinished(node.technology_name)).then((data) => {
        // @ts-expect-error awd
        if (!data.payload.errMessage) {
          isChecked(node.technology_name)
          setChecked(true)
        }
      })
    } else {
      void dispatch(unSetFinished(node.technology_name)).then((data) => {
        // @ts-expect-error awd
        if (!data.payload.errMessage) {
          isChecked(node.technology_name)
          setChecked(false)
        }
      })
    }
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

  return (<div
      className='nodeModal'
      ref={ref}
          >
    <div className='titleBlock'><span className='nodeTitle'>{node.technology_name}</span>
      <button className='checkBtn' onClick={toggleChecked}>
        {!checked ? 'не изучено' : 'изучено'}
      </button>
    <svg onClick={() => {
      onClose()
    }
    } width='2rem' height='2rem' cursor='pointer' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path opacity="0.4" d="M16.19 2H7.81C4.17 2 2 4.17 2 7.81V16.18C2 19.83 4.17 22 7.81 22H16.18C19.82 22 21.99 19.83 21.99 16.19V7.81C22 4.17 19.83 2 16.19 2Z" fill="#003980"></path> <path d="M13.0594 12.0001L15.3594 9.70011C15.6494 9.41011 15.6494 8.93011 15.3594 8.64011C15.0694 8.35011 14.5894 8.35011 14.2994 8.64011L11.9994 10.9401L9.69937 8.64011C9.40937 8.35011 8.92937 8.35011 8.63938 8.64011C8.34938 8.93011 8.34938 9.41011 8.63938 9.70011L10.9394 12.0001L8.63938 14.3001C8.34938 14.5901 8.34938 15.0701 8.63938 15.3601C8.78938 15.5101 8.97937 15.5801 9.16937 15.5801C9.35937 15.5801 9.54937 15.5101 9.69937 15.3601L11.9994 13.0601L14.2994 15.3601C14.4494 15.5101 14.6394 15.5801 14.8294 15.5801C15.0194 15.5801 15.2094 15.5101 15.3594 15.3601C15.6494 15.0701 15.6494 14.5901 15.3594 14.3001L13.0594 12.0001Z" fill="#003980"></path> </g></svg>
    </div>
    <span className='percentTitle'>упоминаемость {Math.round(node.distance * 100)}%</span>
  {/*  <span className='gradeTitle'>уровень подготовки* </span> */}
  {/*  <Tag style={{ cursor: 'auto' }} */}
  {/*  className={[ */}
  {/*    stylesTag.zeroTag, */}
  {/*    stylesTag.junTag, */}
  {/*    stylesTag.midTag, */}
  {/*    stylesTag.senTag */}
  {/*  ][node.professionalism]} */}
  {/*  id='10' */}
  {/*  title={{ title: translateProf(node.professionalism) }} */}
  {/* /> */}
      <div className='preloader'>
      <PushSpinner
        color="#686769"
        id="preloader"
        loading={loading === loadState.load}
        size={30}
      />
    </div>
    {(loading === loadState.res) &&
        <div id='tips' className='tips' onWheel={(e) => { e.stopPropagation() }}>{textToLink()}</div>
    }
    <div className='profList' onWheel={(e) => { e.stopPropagation() }}> <div className='jobTitle'>этот навык также требуется в специальностях:</div>{renderJobs(listJobs)}</div>

  </div>)
}

export default NodeModal
