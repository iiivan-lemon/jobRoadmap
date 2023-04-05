import React, { type FC, useState } from 'react'
import styles from './ProfilePage.module.css'
import './../../App.css'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { getFavs, selectDataFavs, setFavs, setUnFavs } from '../../models/favs/favsSlice'

/*
 * Import { userProfile } from '../../models/user/UserSlice'
 * import { useAppDispatch } from '../../app/hooks'
 * import stylesTags from '../../features/headerOptions/HeaderOptions.module.css'
 * import { Tag } from 'antd'
 */
const ProfilePage: FC = () => {
  const dispatch = useAppDispatch()
  const favs = useAppSelector(selectDataFavs)
  console.log(favs)
  React.useEffect(() => {
    void dispatch(getFavs())
  }, [])
  let tags = [
    'python developer',
    'python developer123123',
    'frontend developer',
    'middle ML developer'
  ]
  if (favs.length) { tags = favs.map(el => el.name) }
  const [
    isFavorite,
    setFavorite
  ] = useState(true)

  // const sendFav = () => {
  //   if ((document.getElementById('search') as HTMLInputElement).value !== '') {
  //     // void dispatch(setFavs((document.getElementById('search') as HTMLInputElement).value))
  //     setFavorite(true)
  //   }
  // }
  //
  // const sendUnFav = () => {
  //   if ((document.getElementById('search') as HTMLInputElement).value !== '') {
  //     // void dispatch(setUnFavs((document.getElementById('search') as HTMLInputElement).value))
  //     setFavorite(false)
  //   }
  // }
  function renderGraphBlock (tags: string[]): any[] {
    return tags.map((el, index) => (<div className={styles.saveGraph} >
        {el}
        <div className={isFavorite ? '' : styles.favorite}>
            { isFavorite
              ? <svg
                    fill="none"
                    height="29"
                    // onClick={(e) => { e.stopPropagation(); sendUnFav() }}
                    viewBox="0 0 24 29"
                    width="24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M22.4494 0.630481L22.4562 0.6335L22.4632 0.636309C22.7865 0.766496 23.0348 0.966265 23.2212 1.23987C23.4082 1.51436 23.5 1.81232 23.5 2.14673V26.8533C23.5 27.1877 23.4082 27.4856 23.2212 27.7601C23.0348 28.0337 22.7865 28.2335 22.4632 28.3637L22.4632 28.3636L22.4523 28.3682C22.2889 28.4386 22.0834 28.4808 21.825 28.4808C21.3535 28.4808 20.9582 28.3257 20.6145 28.0062L12.3505 19.884L12 19.5395L11.6495 19.884L3.38523 28.0065C3.02392 28.3434 2.627 28.5 2.175 28.5C1.95634 28.5 1.74967 28.4567 1.55064 28.3695L1.54375 28.3665L1.53678 28.3637C1.2135 28.2335 0.965246 28.0337 0.778844 27.7601C0.591849 27.4856 0.5 27.1877 0.5 26.8533V2.14673C0.5 1.81232 0.591849 1.51436 0.778844 1.23987C0.965246 0.966265 1.2135 0.766496 1.53678 0.636309L1.54375 0.6335L1.55064 0.630481C1.74967 0.543284 1.95634 0.5 2.175 0.5H21.825C22.0437 0.5 22.2503 0.543284 22.4494 0.630481Z"
                        fill="white"
                        stroke="white"
                    />
                </svg>
              : <svg
                    fill="none"
                    height="29"
                    // onClick={(e) => { e.stopPropagation(); sendFav() }}
                    viewBox="0 0 24 29"
                    width="24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M22.2487 1.08846L22.2625 1.09449L22.2764 1.10011C22.5105 1.19437 22.6789 1.33196 22.8079 1.52139C22.9382 1.71256 23 1.91236 23 2.14673V26.8533C23 27.0876 22.9382 27.2874 22.8079 27.4786C22.6789 27.668 22.5105 27.8056 22.2764 27.8999L22.2655 27.9043L22.2546 27.909C22.1652 27.9475 22.0293 27.9808 21.825 27.9808C21.4817 27.9808 21.2093 27.8746 20.9597 27.6444L12.701 19.5274L12 18.8384L11.299 19.5274L3.0397 27.645C2.76741 27.8973 2.49193 28 2.175 28C2.02518 28 1.88685 27.9709 1.75129 27.9115L1.73751 27.9055L1.72355 27.8999C1.48949 27.8056 1.32112 27.668 1.19206 27.4786C1.06182 27.2874 1 27.0876 1 26.8533V2.14673C1 1.91236 1.06182 1.71256 1.19206 1.52139C1.32112 1.33196 1.48949 1.19437 1.72355 1.10011L1.73751 1.09449L1.75129 1.08846C1.88685 1.02907 2.02518 1 2.175 1H21.825C21.9748 1 22.1132 1.02907 22.2487 1.08846Z"
                        stroke="white"
                        strokeWidth="2"
                    />
                </svg>

            }
        </div>
                                    </div>))
  }

  return (
      <React.Fragment>
          <div className={styles.profile}>
              {renderGraphBlock(tags)}
          </div>
      </React.Fragment>
  )
}

export default ProfilePage
