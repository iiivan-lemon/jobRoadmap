import './tagInput.css'
import React, { useEffect, useState } from 'react'
import styles from '../search/Search.module.css'
import { getRecommends, selectDataRecommends } from '../../models/recommend/recommendSlice'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { debounce } from '../../utils/utils'
import { getRecommendsTech, selectDataRecommendsTech } from '../../models/recommendTech/recommendTechSlice'
export const TagInput = ({ subJob }) => {
  useEffect(() => {
    setHavRecommends(false)
  }, [])
  const recommends = useAppSelector(selectDataRecommendsTech)
  const [tags, setTags] = React.useState([])
  const dispatch = useAppDispatch()
  const [haveRecommends, setHavRecommends] = useState(false)
  useEffect(() => {
    if (recommends.techs.length) { setHavRecommends(true) } else setHavRecommends(false)
  }, [recommends])
  const renderRecommends = (recommends) => {
    if (recommends.techs.length) {
      return recommends.techs.map((el) =>
        <div className={styles.titleRecommend} onClick={ (e) => {
          takeRecommend(el)
        }}>{el}</div>)
    }
  }
  const sendSearchValue = (e) => {
    if (!e.target.value) { return }
    void (dispatch(getRecommendsTech(e.target.value)))
  }

  function takeRecommend (value: string) {
    if (tags.length <= 5) {
      // @ts-expect-error qwe
      setTags([...tags, value]);
      (document.getElementsByClassName('tags-input')[0] as HTMLInputElement).value = ''
    }
  }

  function handleKeyDown (e) {
    e.target.placeholder = ''
    if (e.key !== 'Enter') return
    const value = e.target.value
    if (!value.trim()) return
    if (tags.length <= 5) {
      // @ts-expect-error qwe
      setTags([...tags, value])
    }
    e.target.value = ''
  }

  function removeTag (index) {
    setTags(tags.filter((el, i) => i !== index))
  }

  return (
   <><div className="tags-input-container" onClick={(e) => { e.stopPropagation() }}>
      { tags.map((tag, index) => (
        <form className="tag-item" key={index}>
          <span className="text">{tag}</span>
          <span className="close" onClick={() => { removeTag(index) }}>&times;</span>
        </form>
      )) }
     <div style={{ alignSelf: 'center' }}>
      <input onChange={
        debounce(sendSearchValue)
      } onKeyDown={handleKeyDown} type="text" className="tags-input" placeholder="введите навыки"></input>
     { haveRecommends && <div className={styles.dropDown}>{renderRecommends(recommends)}</div> }
     </div>
   </div>
  <div className={styles.searchSvg}>
    <svg width='2rem' onClick={() => { setHavRecommends(false); subJob(tags) }} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g id="Interface / Search_Magnifying_Glass"> <path id="Vector" d="M15 15L21 21M10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10C17 13.866 13.866 17 10 17Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g> </g></svg>
  </div></>
  )
}
