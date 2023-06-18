import React, { useEffect, useRef, useState } from 'react'
// eslint-disable-next-line import/no-duplicates
import styles from './Search.module.sass'
import HeaderOptions from '../headerOptions/HeaderOptions'
// eslint-disable-next-line import/no-duplicates
import './Search.module.sass'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { getTops } from '../../models/tops/topsSlice'
import { getFavs, setFavs, setUnFavs } from '../../models/favs/favsSlice'
import { clearRecommends, getRecommends, selectDataRecommends } from '../../models/recommend/recommendSlice'
import { selectGrade } from '../../models/gradeFilter/gradeSlice'
import { debounce, loadState } from '../../utils/utils'
import { TagInput } from '../tagInput/TagInput'
import { useLocation } from 'react-router-dom'
import stylesNew from '../../pages/newUserPage/NewUserPage.module.sass'
import { animationWorker as AnimationWorker } from './typingAnimation'

const input = document.querySelector('#search')
/*
 * Interface SearchProps {
 *   title?: string
 *   changeData?: any
 *   setGrade?: any
 * }
 */

const Search = ({ changeData, setGrade, isMainSearch, title }): JSX.Element => {
  const dispatch = useAppDispatch()
  const { isAuth } = useAppSelector(state => state.auth)

  const recommends = useAppSelector(selectDataRecommends)
  // Const [value, setValue] = useState('')
  const [changeAnimation, setChangeAnimation] = React.useState(0)
  const [
    isModalOpen,
    setIsModalOpen
  ] = useState(false)
  const [
    titleTag,
    setTitleTag
  ] = useState('')
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [
    gradeTag,
    setGradeTag
  ] = useState({ begin: 0, end: 3 })

  const [
    isFavorite,
    setFavorite
  ] = useState(false)

  const [
    isTechSearch,
    setSearch
  ] = useState(true)

  React.useEffect(() => {
    // const el = (document.getElementById('spaceLine') as HTMLElement)
    // if (!isTechSearch) {
    //   el.style.visibility = 'visible'
    // }
    if (title && isTechSearch) {
      if ((document.getElementById('search') as HTMLInputElement)) {
        (document.getElementById('search') as HTMLInputElement).value = title
      }
    }
    if (isTechSearch) {
      const texts = ['python developer', 'frontend developer', 'data scientist']
      const input = document.querySelector('#search') as HTMLInputElement
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
        if ((e.target as HTMLInputElement).value === 'введите профессию или должность') setTimeout(aw.start, 2000)
      })
    }
  }, [isTechSearch])

  React.useEffect(() => {
    setSearch(isMainSearch)
  }, [isMainSearch])

  React.useEffect(() => {
    // const el = (document.getElementById('spaceLine') as HTMLElement)
    // if (el) {
    //   (!isModalOpen || !isTechSearch) ? el.style.visibility = 'visible' : el.style.visibility = 'hidden'
    // }
  }, [isModalOpen])
  const sendFav = () => {
    if ((document.getElementById('search') as HTMLInputElement)?.value !== '') {
      void dispatch(setFavs((document.getElementById('search') as HTMLInputElement).value))
        .then((data) => {
          // @ts-expect-error awd
          if (!data.payload.errMessage) {
            // const input: string = (document.getElementById('search') as HTMLInputElement).value
            // setFav([...new Set(...favs, { name: input })])
            setFavorite(true)
          }
        })
    }
  }

  const sendUnFav = () => {
    if ((document.getElementById('search') as HTMLInputElement).value !== '') {
      void dispatch(setUnFavs((document.getElementById('search') as HTMLInputElement).value))
        .then((data) => {
          // @ts-expect-error awd
          if (!data.payload.errMessage) {
            // setFav(favs.filter((el: any) => el.name !== (document.getElementById('search') as HTMLInputElement).value))
            setFavorite(false)
          }
        })
    }
  }

  function sub (event: any): void {
    event?.preventDefault()
    void dispatch(clearRecommends())
    if (changeData != null) {
      const { value } = document.getElementById('search') as HTMLInputElement
      if (!value) {
        return
      }
      changeData({ value, isTechSearch })

      setGrade(gradeTag)
      // (document.getElementById('search') as HTMLInputElement).value = ''
    }
  }

  function subJob (tag: []): void {
    // eslint-disable-next-line no-debugger
    if (changeData != null) {
      if (tag.length) {
        changeData({ value: tag.join(','), isTechSearch })
      }

      // (document.getElementById('search') as HTMLInputElement).value = ''
    }
  }

  const isInFavs = () => {
    if ((document.getElementById('search') as HTMLInputElement)) {
      if (~favs.findIndex((el: any) => el.name === (document.getElementById('search') as HTMLInputElement).value)) {
        setFavorite(true)
      } else {
        setFavorite(false)
      }
    }
  }

  const [favs, setFav] = useState([])
  const location = useLocation()
  React.useEffect(() => {
    if (location.pathname === '/search') {
      void dispatch(getFavs()).then(
        dataJob => {
          if (dataJob.payload.errMessage) {
            // setErrMessage(dataJob.payload.errMessage)
          } else {
            setFav(dataJob.payload)
            isInFavs()
          }
        }
      )
        .catch(() => {
        })
    }
  }, [changeData])

  // React.useEffect(() => {
  //   setFavorite(false)
  // }, [changeData])
  useEffect(() => {
    setHavRecommends(false)

    if ((document.getElementById('search') as HTMLInputElement)) {
      (document.getElementById('search') as HTMLInputElement).value = titleTag
    }

    // If (changeData != null) changeData((document.getElementById('search') as HTMLInputElement).value)
  }, [titleTag])
  useEffect(() => {
    // If (changeData != null) changeData((document.getElementById('search') as HTMLInputElement).value)
  }, [gradeTag])

  const [haveRecommends, setHavRecommends] = useState(false)

  useEffect(() => {
    setHavRecommends(false)
  }, [])
  useEffect(() => {
    if (recommends.professions.length && (document.getElementById('search') as HTMLInputElement)?.value) {
      setHavRecommends(true)
    } else setHavRecommends(false)
  }, [recommends, (document.getElementById('search') as HTMLInputElement)?.value])
  // const [recommends, setRecommends] = useState([])
  const renderRecommends = (recommends) => {
    if (recommends.professions.length) {
      return recommends.professions.map((el) =>
        <div className={styles.titleRecommend} onClick={(e) => {
          if ((document.getElementById('search') as HTMLInputElement)) {
            (document.getElementById('search') as HTMLInputElement).value = el
          }
          sub(e)
        }}>{el}</div>)
    }
  }

  const sendSearchValue = (e) => {
    if (!e.target.value && e.target.value === titleTag) {
      return
    }
    void (dispatch(getRecommends(e.target.value)))
  }
  const refSearchJob = useRef<HTMLInputElement | null>(null)
  const refSearch = useRef<HTMLInputElement | null>(null)
  const [rotate, setRotate] = React.useState(0)
  return (
    <React.Fragment>

          <div
              className={styles.searchBlock}
              onClick={() => { setIsModalOpen(true); document.body.style.overflowX = 'hidden' }}
          >
            <div className={styles.changeIconSearch} data-title='смена поиска'>
              <svg className={rotate ? styles.rotateChangeSearch + ' ' + styles.changeSearch : styles.changeSearch} onClick={ (e) => {
                setRotate(1)
                setHavRecommends(false)
                setSearch(!isTechSearch)
              }
              } onAnimationEnd={() => { setRotate(0) }}
                   fill="#ffffff" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" stroke="#3a3a3a"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M7 12v-2l-4 3 4 3v-2h2.997A6.006 6.006 0 0 0 16 8h-2a4 4 0 0 1-3.996 4H7zM9 2H6.003A6.006 6.006 0 0 0 0 8h2a4 4 0 0 1 3.996-4H9v2l4-3-4-3v2z" fill-rule="evenodd"></path> </g></svg>
            </div>
              {/* <svg  fill="#2663f2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" enable-background="new 0 0 100 100" stroke="#2663f2"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M37.3,31.9h21.8c1.1,0,2-0.9,2-2v-4c0-3.3-2.7-5.9-5.9-5.9H41.3c-3.3,0-5.9,2.7-5.9,5.9v4 C35.3,31,36.2,31.9,37.3,31.9z"></path> <path d="M70,24.9h-2c-0.6,0-1,0.4-1,1v4c0,4.4-3.6,7.9-7.9,7.9H37.3c-4.4,0-7.9-3.6-7.9-7.9v-4c0-0.6-0.4-1-1-1h-2 c-3.3,0-5.9,2.7-5.9,5.9v40.6c0,3.3,2.7,5.9,5.9,5.9h20c2.8,0,3.1-2.3,3.1-3.1V52.8c0-2.3,1.3-2.8,2-2.8h21.6c2.4,0,2.8-2.1,2.8-2.8 V31C76,27.6,73.3,24.9,70,24.9z"></path> <path d="M78.4,60.4H56.6c-0.6,0-1.1-0.5-1.1-1.1v-2.2c0-0.6,0.5-1.1,1.1-1.1h21.8c0.6,0,1.1,0.5,1.1,1.1v2.2 C79.5,59.9,79,60.4,78.4,60.4z M78.4,70.2H56.6c-0.6,0-1.1-0.5-1.1-1.1v-2.2c0-0.6,0.5-1.1,1.1-1.1h21.8c0.6,0,1.1,0.5,1.1,1.1v2.2 C79.5,69.7,79,70.2,78.4,70.2z M78.4,80H56.6c-0.6,0-1.1-0.5-1.1-1.1v-2.2c0-0.6,0.5-1.1,1.1-1.1h21.8c0.6,0,1.1,0.5,1.1,1.1v2.2 C79.5,79.5,79,80,78.4,80z"></path> </g></svg> */}
            {isTechSearch && <>
              <form
                  className={styles.formSearch}
                  onSubmit={sub}
              >
                <div className='input-container'>
                 <label className={styles.labelSearch} htmlFor="searchTerm">{(isTechSearch) ? 'поиск по профессии' : ''}</label>
                <input
                      ref={refSearch}
                      placeholder="введите профессию или должность"
                      autoFocus
                      autoComplete="off"
                      className={styles.searchHead + ' ' + styles.searchHeader + 'search'}
                      id="search"
                      name="searchTerm"
                      onChange= {debounce(sendSearchValue)
                      }
                  />
                <label className={styles.wrapInput + ' ' + styles.base } onClick={(e) => {
                  (document.getElementById('search') as HTMLInputElement).value = ''
                  setHavRecommends(false)
                }}>
                </label>
                </div>
                  <div className={styles.searchSvg}>
                  <svg className={styles.svgS} width='2rem' onClick={sub} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g id="Interface / Search_Magnifying_Glass"> <path id="Vector" d="M15 15L21 21M10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10C17 13.866 13.866 17 10 17Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g> </g></svg>
              </div>
                { isTechSearch && haveRecommends && <div className={styles.dropDown}>{renderRecommends(recommends)}</div> }
              </form>
            </>}
            {!isTechSearch && <>
              <TagInput subJob={subJob}/>
              {/* <input */}
              {/*    ref={refSearchJob} */}
              {/* placeholder="введите навыки или стек технологий" */}
              {/* autoFocus */}
              {/* autoComplete="off" */}
              {/* className={styles.search} */}
              {/* id="searchJob" */}
              {/* name="searchTerm" */}
              {/* /> */}

          {/* <input   type="text" value={this.state.value} onSubmit={sendValue(value)}></input> */}
        </>}
        <div id='favSvg' style={{ display: (location.pathname === '/search') ? 'block' : 'none' }}
             className={styles.favorite} data-title='добавьте роадмап в избранное'>
          <svg
            onClick={(e) => {
              if (isAuth) {
                e.stopPropagation();
                (isFavorite) ? sendUnFav() : sendFav()
              }
            }}
            fill={(isFavorite) ? '#3a3a3a' : 'none'}
            height="29"

            viewBox="0 0 24 29"
            width="24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M22.2487 1.08846L22.2625 1.09449L22.2764 1.10011C22.5105 1.19437 22.6789 1.33196 22.8079 1.52139C22.9382 1.71256 23 1.91236 23 2.14673V26.8533C23 27.0876 22.9382 27.2874 22.8079 27.4786C22.6789 27.668 22.5105 27.8056 22.2764 27.8999L22.2655 27.9043L22.2546 27.909C22.1652 27.9475 22.0293 27.9808 21.825 27.9808C21.4817 27.9808 21.2093 27.8746 20.9597 27.6444L12.701 19.5274L12 18.8384L11.299 19.5274L3.0397 27.645C2.76741 27.8973 2.49193 28 2.175 28C2.02518 28 1.88685 27.9709 1.75129 27.9115L1.73751 27.9055L1.72355 27.8999C1.48949 27.8056 1.32112 27.668 1.19206 27.4786C1.06182 27.2874 1 27.0876 1 26.8533V2.14673C1 1.91236 1.06182 1.71256 1.19206 1.52139C1.32112 1.33196 1.48949 1.19437 1.72355 1.10011L1.73751 1.09449L1.75129 1.08846C1.88685 1.02907 2.02518 1 2.175 1H21.825C21.9748 1 22.1132 1.02907 22.2487 1.08846Z"
              stroke="#3a3a3a"
              strokeWidth="2"
            />
          </svg>
        </div>
        {/* <input   type="text" value={this.state.value} onSubmit={sendValue(value)}></input> */}

      </div>

      {isTechSearch && <>{isModalOpen && <HeaderOptions
        onClose={
          () => {
            setHavRecommends(false)
            setIsModalOpen(false)
          }
        }
        setGrade={setGradeTag}
        setTitleTag={setTitleTag}
      />}</>}

    </React.Fragment>
  )
}

export default Search
