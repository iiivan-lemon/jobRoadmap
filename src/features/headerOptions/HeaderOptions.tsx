/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import styles from '../header/Header.module.css'
import { Space, Tag } from 'antd'
import React, { useEffect, useRef } from 'react'
import ReactDOM from 'react-dom'

const HeaderOptions = ({ tags, onClose, setTitleTag }): any => {
  const ref = useRef<HTMLDivElement | null>(null)
  useEffect(() => {
    const checkIfClickedOutside = (e): void => {
      // eslint-disable-next-line no-debugger
      if (!(document.getElementById('search')?.contains(e.target))) {
        onClose()
      }
    }
    document.addEventListener('click', checkIfClickedOutside)
    return () => {
      document.removeEventListener('click', checkIfClickedOutside)
    }
  }, [onClose])

  useEffect(() => {
    // document.body.style.overflow = 'hidden'
    return () => {
      // document.body.style.overflow = 'auto'
    }
  }, [])

  function renderTags (tags: string[]): any[] {
    return tags.map((el, index) => <div onClick={() => {
      setTitleTag(el)
    }}><Tag key={index} color="#f50">{el}</Tag></div>)
  }

  return ReactDOM.createPortal(
        <div className={styles.headerTags} ref={ref}>
            {/* <Divider orientation="left">Custom</Divider> */}
            <Space size={[0, 8]} wrap>
                {renderTags(tags)}
            </Space>
        </div>, document.getElementById('header-options') as HTMLElement)
  // return (
  //       <div className={styles.headerTags} ref={ref}>
  //           {/* <Divider orientation="left">Custom</Divider> */}
  //           <Space size={[0, 8]} wrap>
  //               {renderTags(tags)}
  //           </Space>
  //       </div>)
}

export default HeaderOptions
