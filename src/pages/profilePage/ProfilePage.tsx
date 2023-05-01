import React, { type FC, useState } from 'react'
import styles from './ProfilePage.module.css'
import './../../App.css'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { getFavs, setFavs, setUnFavs } from '../../models/favs/favsSlice'
import { GraphSelf } from '../../components/graphSelf/graphSelf'
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
        <div style={{ width: '100vw', bottom: '0', position: 'absolute', left: '0' }}>
          <svg style={{ width: '100%', height: 'fit-content', display: 'block' }} id="visual" viewBox="0 0 900 450" width="900" height="450" xmlns="http://www.w3.org/2000/svg" version="1.1"><path d="M0 336L21.5 331.5C43 327 86 318 128.8 313C171.7 308 214.3 307 257.2 312.8C300 318.7 343 331.3 385.8 339.3C428.7 347.3 471.3 350.7 514.2 348.8C557 347 600 340 642.8 333.8C685.7 327.7 728.3 322.3 771.2 323C814 323.7 857 330.3 878.5 333.7L900 337L900 451L878.5 451C857 451 814 451 771.2 451C728.3 451 685.7 451 642.8 451C600 451 557 451 514.2 451C471.3 451 428.7 451 385.8 451C343 451 300 451 257.2 451C214.3 451 171.7 451 128.8 451C86 451 43 451 21.5 451L0 451Z" fill="#2c264e"></path><path d="M0 342L21.5 344.3C43 346.7 86 351.3 128.8 356C171.7 360.7 214.3 365.3 257.2 368.8C300 372.3 343 374.7 385.8 369.3C428.7 364 471.3 351 514.2 348C557 345 600 352 642.8 357.8C685.7 363.7 728.3 368.3 771.2 364.2C814 360 857 347 878.5 340.5L900 334L900 451L878.5 451C857 451 814 451 771.2 451C728.3 451 685.7 451 642.8 451C600 451 557 451 514.2 451C471.3 451 428.7 451 385.8 451C343 451 300 451 257.2 451C214.3 451 171.7 451 128.8 451C86 451 43 451 21.5 451L0 451Z" fill="#292441"></path><path d="M0 366L21.5 367.3C43 368.7 86 371.3 128.8 370.2C171.7 369 214.3 364 257.2 365C300 366 343 373 385.8 374.2C428.7 375.3 471.3 370.7 514.2 371C557 371.3 600 376.7 642.8 374.7C685.7 372.7 728.3 363.3 771.2 358.8C814 354.3 857 354.7 878.5 354.8L900 355L900 451L878.5 451C857 451 814 451 771.2 451C728.3 451 685.7 451 642.8 451C600 451 557 451 514.2 451C471.3 451 428.7 451 385.8 451C343 451 300 451 257.2 451C214.3 451 171.7 451 128.8 451C86 451 43 451 21.5 451L0 451Z" fill="#252134"></path><path d="M0 415L21.5 411.7C43 408.3 86 401.7 128.8 397.5C171.7 393.3 214.3 391.7 257.2 395C300 398.3 343 406.7 385.8 405.5C428.7 404.3 471.3 393.7 514.2 388.8C557 384 600 385 642.8 386.5C685.7 388 728.3 390 771.2 392.3C814 394.7 857 397.3 878.5 398.7L900 400L900 451L878.5 451C857 451 814 451 771.2 451C728.3 451 685.7 451 642.8 451C600 451 557 451 514.2 451C471.3 451 428.7 451 385.8 451C343 451 300 451 257.2 451C214.3 451 171.7 451 128.8 451C86 451 43 451 21.5 451L0 451Z" fill="#201e27"></path><path d="M0 407L21.5 407.3C43 407.7 86 408.3 128.8 411.2C171.7 414 214.3 419 257.2 421.5C300 424 343 424 385.8 424.2C428.7 424.3 471.3 424.7 514.2 421.7C557 418.7 600 412.3 642.8 409.7C685.7 407 728.3 408 771.2 412.3C814 416.7 857 424.3 878.5 428.2L900 432L900 451L878.5 451C857 451 814 451 771.2 451C728.3 451 685.7 451 642.8 451C600 451 557 451 514.2 451C471.3 451 428.7 451 385.8 451C343 451 300 451 257.2 451C214.3 451 171.7 451 128.8 451C86 451 43 451 21.5 451L0 451Z" fill="#1b1b1b"></path></svg>
        </div>
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
