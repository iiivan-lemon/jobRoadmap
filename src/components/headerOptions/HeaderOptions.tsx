/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import styles from '../header/Header.module.css'
import { Space } from 'antd'
import React, { useEffect, useRef }
  from 'react'
import ReactDOM from 'react-dom'
import stylesOps from './HeaderOptions.module.css'
import Tag from '../Tag/Tag'
import stylesTag from './../Tag/Tag.module.css'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { selectGrade } from '../../models/gradeFilter/gradeSlice'
import { getTops, selectDataTops } from '../../models/tops/topsSlice'
import { getDataGraph } from '../../models/dataGraph/dataGraphSlice'
import stylesNewPage from '../../pages/newUserPage/NewUserPage.module.css'
const HeaderOptions = ({ onClose, setTitleTag, setGrade }): any => {
  const top = useAppSelector(selectDataTops)

  // const tags = [
  //   { title: 'python developer' },
  //   { title: 'frontend developer' },
  //   { title: 'backend developer' }
  // ]

  const tags = top.professions

  const grades = [
    { title: 'нет опыта', id: 0 },
    { title: '0-3 лет', id: 1 },

    { title: '3-6 лет', id: 2 },
    { title: 'более 6 лет', id: 3 }
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
  }
  , []
  )

  function renderTags (tags: any[], className: string[]): any[] {
    const input = (document.getElementById('search')) as HTMLInputElement
    return tags.map((el, index) => (
      <Tag
        input = {(input) ? input?.value : null}
        className={(tags.length === className.length) ? className[index] : className[0]}
        id={(tags.length === className.length) ? 10 : 1}
        setGrade={setGrade}
        setTitleTag={setTitleTag}
        title={el}
                                    />))
  }

  return ReactDOM.createPortal(<>
      <div
          id='options'
          className={styles.headerTags}
          ref={ref}
      >
          {/* <Divider orientation="left">Custom</Divider> */}
          <Space
              className={stylesOps.headerOpsStrings}
              size={[
                0,
                8
              ]}
              wrap
          >
              {renderTags(tags, [stylesTag.profTag])}
          </Space>

          <Space
              className={stylesOps.headerOpsStrings}
              size={[
                0,
                8
              ]}
              wrap
          >
              <span className={stylesOps.gradeDesr}>
                  опыт работы
              </span>
              {renderTags(grades, [
                stylesTag.zeroTag,
                stylesTag.junTag,
                stylesTag.midTag,
                stylesTag.senTag
              ].map((el) => `${el} ${stylesTag.gradeTag}`))}
          </Space>
      </div>

                               </>, document.getElementById('header-options') as HTMLElement)

  // Return (
  //       <div className={styles.headerTags} ref={ref}>
  //           {/* <Divider orientation="left">Custom</Divider> */}
  //           <Space size={[0, 8]} wrap>
  //               {renderTags(tags)}
  //           </Space>
  //       </div>)
}

export default HeaderOptions
