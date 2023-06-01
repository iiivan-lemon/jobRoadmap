import './tagInput.css'
import React, { useEffect, useState } from 'react'
import styles from '../search/Search.module.css'
import { getRecommends, selectDataRecommends } from '../../models/recommend/recommendSlice'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { debounce } from '../../utils/utils'
import { getRecommendsTech, selectDataRecommendsTech } from '../../models/recommendTech/recommendTechSlice'
import { useLocation, useNavigate } from 'react-router-dom'
import { animationWorker as AnimationWorker } from '../search/typingAnimation'
export const TagInput = ({ subJob }) => {
  useEffect(() => {
    setHavRecommends(false)
  }, [])

  React.useEffect(() => {
    const texts = ['react.js', 'python', 'postgres']
    const input = document.querySelector('#tagSearch') as HTMLInputElement
    // @ts-expect-error asdasd
    let aw = (new AnimationWorker(input, texts)).start();

    (input).addEventListener('focusin', (e) => {
      // @ts-expect-error asdasd
      aw.stop()
    });
    (input).addEventListener('blur', (e) => {
      // eslint-disable-next-line no-debugger
      // eslint-disable-next-line no-debugger

      aw = new AnimationWorker(input, texts)
      // eslint-disable-next-line @typescript-eslint/no-implied-eval
      // @ts-expect-error asdasd
      // eslint-disable-next-line @typescript-eslint/no-implied-eval
      if ((e.target as HTMLInputElement).value === 'введите навыки') setTimeout(aw.start, 2000)
    })
  }, [])
  const recommends = useAppSelector(selectDataRecommendsTech)
  const [tags, setTags] = React.useState([] as string[])
  const dispatch = useAppDispatch()
  const [haveRecommends, setHavRecommends] = useState(false)
  useEffect(() => {
    if (recommends.techs.length && (document.getElementById('tagSearch') as HTMLInputElement).value) { setHavRecommends(true) } else setHavRecommends(false)
  }, [recommends])
  const renderRecommends = (recommends) => {
    if (recommends.techs.length) {
      const updRec = [...new Set(recommends.techs.map(el => el.toLowerCase()))] as string[]
      return updRec.map((el: string) => (
        <div className={styles.titleRecommend} onClick={ (e) => {
          takeRecommend(el)
        }}>{el}</div>))
    }
  }
  const sendSearchValue = (e) => {
    if (!e.target.value) { setHavRecommends(false); return }
    void (dispatch(getRecommendsTech(e.target.value)))
  }

  function takeRecommend (value: string) {
    if (tags.length <= 5) {
      setHavRecommends(false)
      setTags([...(new Set([...tags, value.toLowerCase()]))])
      if ((document.getElementById('tagSearch') as HTMLInputElement)) {
        (document.getElementById('tagSearch') as HTMLInputElement).value = ''
      }
    }
  }

  function handleKeyDown (e) {
    // e.target.placeholder = ''
    // if (e.key !== 'Enter') return
    // const value = e.target.value
    // if (!value.trim()) return
    // // if (tags.length <= 5) {
    // //   setTags([...(new Set([...tags, value.toLowerCase()]))])
    // //   setHavRecommends(false)
    // // }
    // e.target.value = ''
  }
  const history = useNavigate()
  const location = useLocation()
  React.useEffect(() => {
    if (location.pathname !== ('/search') && location.pathname !== '/searchjob') {
      setTags([])
    }
  }, [history])

  function removeTag (index) {
    setTags(tags.filter((el, i) => i !== index))
  }

  return (
   <><div id='tags-input-container' className="tags-input-container" onClick={(e) => { e.stopPropagation() }}>
     {/* <label htmlFor="searchTerm">{'поиск по навыкам'}</label> */}
     { tags && [...tags].map((tag, index) => (
        <form className="tag-item" key={index}>
          <span className="text">{tag}</span>
          <span className="close" onClick={() => { removeTag(index) }}>&times;</span>
        </form>
     )) }
     <div style={{ alignSelf: 'center' }}>
      <input autoComplete="off"
             onFocus={() => {
               (document.getElementById('tags-input-container') as HTMLElement).style.background = 'rgba(111, 203, 255, 0.37)'
             }
             }
             onChange={
        debounce(sendSearchValue)
      } onKeyDown={handleKeyDown} type="text" className="tags-input" id='tagSearch' placeholder="введите навыки"></input>
     { haveRecommends && <div className={styles.dropDown}>{renderRecommends(recommends)}</div> }
     </div>
   </div>
  <div className={styles.searchSvg}>
    <svg width='2rem' onClick={() => { setHavRecommends(false); subJob([...tags]) }} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g id="Interface / Search_Magnifying_Glass"> <path id="Vector" d="M15 15L21 21M10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10C17 13.866 13.866 17 10 17Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g> </g></svg>
  </div></>
  )
}
