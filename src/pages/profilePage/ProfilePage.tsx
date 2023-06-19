import React, { type FC, useState } from 'react'
import styles from './ProfilePage.module.sass'
import '../../App.sass'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { getFavs, setFavs, setUnFavs } from '../../models/favs/favsSlice'
import { FavJob } from '../../components/favJob/FavJob'
import { loadState } from '../../utils/utils'

const ProfilePage = ({ chooseRoadmap }) => {
  const dispatch = useAppDispatch()
  const [errMessage, setErrMessage] = React.useState('что-то пошло не так')
  const [
    loading,
    setLoad
  ] = React.useState(loadState.base)
  const [favs, setFavs] = useState([])
  React.useEffect(() => {
    void dispatch(getFavs()).then(
      dataJob => {
        if (!(dataJob.payload.errMessage)) {
          setLoad(loadState.res)
          setFavs(dataJob.payload)
        } else {
          setErrMessage(dataJob.payload.errMessage)
          setLoad(loadState.error)
        }
      }
    )
      .catch(() => {
        // eslint-disable-next-line no-debugger
        setLoad(loadState.error)
      })
  }, [])

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
  function renderGraphBlock (tags: Array<{ id: number, name: string, count_all: number, count_finished: number }>): any[] {
    return tags.map((el: { id: number, name: string, count_all: number, count_finished: number }, index) => (<FavJob chooseRoadmap={chooseRoadmap} jobTitle={el.name} checkData={{ count_all: el.count_all, count_finished: el.count_finished }}/>))
  }

  return (
      <React.Fragment>
          <div className={styles.profile}>
              { favs.length
                ? renderGraphBlock(favs)
                : <><span style={{ color: 'white', fontSize: '1rem' }}>добавляйте подходящие карты навыков </span><svg
                fill="none"
                height="29"
                viewBox="0 0 24 29"
                width="24"
                xmlns="http://www.w3.org/2000/svg"
                >
                <path
                d="M22.4494 0.630481L22.4562 0.6335L22.4632 0.636309C22.7865 0.766496 23.0348 0.966265 23.2212 1.23987C23.4082 1.51436 23.5 1.81232 23.5 2.14673V26.8533C23.5 27.1877 23.4082 27.4856 23.2212 27.7601C23.0348 28.0337 22.7865 28.2335 22.4632 28.3637L22.4632 28.3636L22.4523 28.3682C22.2889 28.4386 22.0834 28.4808 21.825 28.4808C21.3535 28.4808 20.9582 28.3257 20.6145 28.0062L12.3505 19.884L12 19.5395L11.6495 19.884L3.38523 28.0065C3.02392 28.3434 2.627 28.5 2.175 28.5C1.95634 28.5 1.74967 28.4567 1.55064 28.3695L1.54375 28.3665L1.53678 28.3637C1.2135 28.2335 0.965246 28.0337 0.778844 27.7601C0.591849 27.4856 0.5 27.1877 0.5 26.8533V2.14673C0.5 1.81232 0.591849 1.51436 0.778844 1.23987C0.965246 0.966265 1.2135 0.766496 1.53678 0.636309L1.54375 0.6335L1.55064 0.630481C1.74967 0.543284 1.95634 0.5 2.175 0.5H21.825C22.0437 0.5 22.2503 0.543284 22.4494 0.630481Z"
                fill="white"
                stroke="white"
                />
                </svg></> }
          </div>

      </React.Fragment>
  )
}

export default ProfilePage
