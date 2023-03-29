import React from 'react'
import Graph from '../../features/visGraph/Graph'
import styles from './HomePage.module.css'
import './../../App.css'
import { PushSpinner } from 'react-spinners-kit'
// import { useHistory } from 'react-router'
interface HomePageProps {
  data: any[]
  inputData: string
}

const HomePage = ({ data, inputData }: HomePageProps): JSX.Element => {
  // const history = useHistory()
  const [loading, setLoad] = React.useState(true)

  React.useEffect(() => {
    document.body.style.overflow = 'none'
    document.getElementById('header')?.classList.remove('headerFix')
  }, [])
  React.useEffect(() => {
    if (data.length > 0) {
      // eslint-disable-next-line no-debugger
      // debugger
      setTimeout(() => { setLoad(false) }, 5000)
    } else setLoad(true)
  }, [data])

  return (
      <div className={styles.page}>{<div className={styles.preloader}><PushSpinner id = 'preloader' size={30} color="#686769" loading={loading} /></div>}{(data.length > 0 && !loading) && <Graph data={ data } title={ inputData }/>}</div>
  )
}

export default HomePage
