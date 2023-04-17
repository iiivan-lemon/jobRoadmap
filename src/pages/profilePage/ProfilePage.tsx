import React, { type FC, useState } from 'react'
import styles from './ProfilePage.module.css'
import './../../App.css'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { getFavs, setFavs, setUnFavs } from '../../models/favs/favsSlice'
import { GraphSelf } from '../../components/graphSelf/graphSelf'
import { FavJob } from '../../components/favJob/FavJob'
import { loadState } from '../../utils/utils'

const ProfilePage: FC = () => {
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
        // @ts-expect-error adawd
        if (dataJob.payload.errMessage) {
          // @ts-expect-error adawd
          setErrMessage(dataJob.payload.errMessage)
          setLoad(loadState.error)
        } else {
          setLoad(loadState.res)
          // @ts-expect-error adawd
          setFavs(dataJob.payload)
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
  function renderGraphBlock (tags: string[]): any[] {
    return tags.map((el, index) => (<FavJob jobTitle={el}/>))
  }

  return (
      <React.Fragment>
          <div className={styles.profile}>
              {renderGraphBlock(favs)}
          </div>

      </React.Fragment>
  )
}

export default ProfilePage
