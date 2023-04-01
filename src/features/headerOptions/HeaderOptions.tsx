/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import styles from '../header/Header.module.css'
import { Space } from 'antd'
import React, { useEffect, useRef }
  from 'react'
import ReactDOM from 'react-dom'
import stylesOps from './HeaderOptions.module.css'
import Tag from '../Tag/Tag'
import stylesTag from './../Tag/Tag.module.css'
const HeaderOptions = ({ onClose, setTitleTag, setGrade }): any => {
  const tags = [{ title: 'python developer' }, { title: 'frontend developer' }, { title: 'ML developer' }, { title: 'UI/UX designer' }]

  const grades = [
    { title: 'нет опыта', id: 0 },
    { title: '0-3 лет', id: 0.25 },
    { title: '3-6 лет', id: 0.5 },
    { title: 'более 6 лет', id: 1 }
  ]
  const ref = useRef<HTMLDivElement | null>(null)
  useEffect(() => {
    const checkIfClickedOutside = (e): void => {
      if (!(document.getElementById('search')?.contains(e.target)) && !(ref.current?.contains(e.target))) {
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

  function renderTags (tags: any[], className: string[]): any[] {
    return tags.map((el, index) => <Tag setGrade={setGrade} setTitleTag={setTitleTag} className={(tags.length === className.length) ? className[index] : className[0] }
                                        title={el} id={(tags.length === className.length) ? 10 : 1 }></Tag>)
  }

  return ReactDOM.createPortal(
      <>
        <svg className={stylesOps.spaceLine} width="1418" height="1" viewBox="0 0 1418 1" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="1418" y="1" width="1418" height="1" transform="rotate(-180 1418 1)" fill="url(#paint0_linear_120_572)"/>
          <defs>
            <linearGradient id="paint0_linear_120_572" x1="3027.87" y1="3.01352" x2="1647.1" y2="1.40684" gradientUnits="userSpaceOnUse">
              <stop stop-color="#D9D9D9"/>
              <stop offset="1" stop-color="#1B1B1B"/>
            </linearGradient>
          </defs>
        </svg>
        <div className={styles.headerTags} ref={ref}>
            {/* <Divider orientation="left">Custom</Divider> */}
            <Space className={stylesOps.headerOpsStrings} size={[0, 8]} wrap>
                {renderTags(tags, [stylesTag.profTag])}
            </Space>

          <Space className={stylesOps.headerOpsStrings} size={[0, 8]} wrap>
            <span className={stylesOps.gradeDesr}>опыт работы</span>
          {renderTags(grades, [stylesTag.zeroTag, stylesTag.junTag, stylesTag.midTag, stylesTag.senTag].map(el => el + ' ' + stylesTag.gradeTag))}
          </Space>
        </div></>, document.getElementById('header-options') as HTMLElement)

  // return (
  //       <div className={styles.headerTags} ref={ref}>
  //           {/* <Divider orientation="left">Custom</Divider> */}
  //           <Space size={[0, 8]} wrap>
  //               {renderTags(tags)}
  //           </Space>
  //       </div>)
}

export default HeaderOptions
