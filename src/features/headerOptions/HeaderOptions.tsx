/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import styles from '../header/Header.module.css'
import { Space, Tag } from 'antd'
import React, { useEffect, useRef } from 'react'
import ReactDOM from 'react-dom'
import stylesTags from './HeaderOptions.module.css'

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
    return tags.map((el, index) => <div className={stylesTags.tag} onClick={() => {
      setTitleTag(el)
    }}><Tag key={index} color="#3A3A3A">{el}</Tag></div>)
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
