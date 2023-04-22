import './favJob.css'
import React, { useState } from 'react'
import { setFav } from '../../models/favs/favsService'
import { setUnFavs } from '../../models/favs/favsSlice'
import { useAppDispatch } from '../../app/hooks'

export const FavJob = ({ jobTitle, checkData }) => {
  const [
    isFavorite,
    setFavorite
  ] = useState(true)
  const dispatch = useAppDispatch()
  const unSetFav = (title: string) => {
    void dispatch(setUnFavs(title))
  }
  return (
    isFavorite
      // eslint-disable-next-line multiline-ternary
      ? <div className='saveGraph' >

      <div className='dataFav'>
    <span>{jobTitle}</span>
        <span>Изучено навыков: {checkData.count_finished}/{checkData.count_all}</span>
      </div>
    <div className={isFavorite ? '' : 'favorite'}>
      { <svg
          onClick={() => { setFavorite(false); unSetFav(jobTitle) }}
          className='svgFav'
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
      }
    </div>
  </div> : <></>)
}
