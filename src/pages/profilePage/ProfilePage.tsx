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
        // @ts-expect-error qwdqfwd
        if (!(dataJob.payload.errMessage)) {
          setLoad(loadState.res)
          // @ts-expect-error qwdqfwd
          setFavs(dataJob.payload)
        } else {
          // @ts-expect-error qwdqfwd
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
    return tags.map((el: { id: number, name: string, count_all: number, count_finished: number }, index) => (<FavJob jobTitle={el.name} checkData={{ count_all: el.count_all, count_finished: el.count_finished }}/>))
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
