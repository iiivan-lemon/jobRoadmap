import React, { useState } from 'react'
import './NodeModal.css'
import { getNodeProf } from '../../models/tops/topsSlice'
import { useAppDispatch } from '../../app/hooks'
import { PushSpinner } from 'react-spinners-kit'
const NodeModal = ({ onClose, node }): JSX.Element => {
  const ref = React.useRef<HTMLDivElement | null>(null)
  const dispatch = useAppDispatch()
  const [data, setData] = useState([])

  const [
    loading,
    setLoad
  ] = React.useState(true)
  React.useEffect(() => {
    if (node) {
      void dispatch(getNodeProf(node.technology_name)).then(d => {
        setData(d.payload.professions)
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
  React.useEffect(() => {
    // eslint-disable-next-line no-debugger
    if (data.length > 0) {
      setLoad(false)
    } else { setLoad(true) }
  }, [data])
  React.useEffect(
    () =>
    // Document.body.style.overflow = 'hidden'
      () => {
      // Document.body.style.overflow = 'auto'
      }
    , []
  )

  const renderJobs = (data) => {
    return data.map(el => <span className='profTitle'>{el.profession}</span>)
  }

  return (<div
      className='nodeModal'
      ref={ref}
          >
    <div className='titleBlock'><span className='nodeTitle'>{node.technology_name}</span>
    <svg onClick={() => {
      onClose()
    }
    } width='2rem' height='2rem' cursor='pointer' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path opacity="0.4" d="M16.19 2H7.81C4.17 2 2 4.17 2 7.81V16.18C2 19.83 4.17 22 7.81 22H16.18C19.82 22 21.99 19.83 21.99 16.19V7.81C22 4.17 19.83 2 16.19 2Z" fill="#003980"></path> <path d="M13.0594 12.0001L15.3594 9.70011C15.6494 9.41011 15.6494 8.93011 15.3594 8.64011C15.0694 8.35011 14.5894 8.35011 14.2994 8.64011L11.9994 10.9401L9.69937 8.64011C9.40937 8.35011 8.92937 8.35011 8.63938 8.64011C8.34938 8.93011 8.34938 9.41011 8.63938 9.70011L10.9394 12.0001L8.63938 14.3001C8.34938 14.5901 8.34938 15.0701 8.63938 15.3601C8.78938 15.5101 8.97937 15.5801 9.16937 15.5801C9.35937 15.5801 9.54937 15.5101 9.69937 15.3601L11.9994 13.0601L14.2994 15.3601C14.4494 15.5101 14.6394 15.5801 14.8294 15.5801C15.0194 15.5801 15.2094 15.5101 15.3594 15.3601C15.6494 15.0701 15.6494 14.5901 15.3594 14.3001L13.0594 12.0001Z" fill="#003980"></path> </g></svg>
    </div>
    <span className='percentTitle'>упоминаемость {Math.round(node.distance * 100)}%</span>
      <div className='preloader'>
      <PushSpinner
        color="#686769"
        id="preloader"
        loading={loading}
        size={30}
      />
    </div>
    {(!loading) &&
        <div className='profList' onWheel={(e) => { e.stopPropagation() }}>{renderJobs(data)}</div>
    }
  </div>)
}

export default NodeModal
