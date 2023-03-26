import React, { type FC, useState } from 'react'
import Header from '../../features/header/Header'
// import GraphRoadMap from '../../features/graph/Graph'
// import axios from 'axios'
import Graph from '../../features/visGraph/Graph'
import axios from 'axios'
import styles from './HomePage.module.css'
const HomePage: FC = () => {
  const [data, changeData] = useState([{ name: 'python', distance: 1, professionalism: 0 }, { name: 'sqlite', distance: 1, professionalism: 0.5 }, { name: 'django', distance: 0.6, professionalism: 0.4 }, { name: 'selenium', distance: 0.8, professionalism: 0.5 }, { name: 'docker', distance: 0.2, professionalism: 0.8 }, { name: 'c++', distance: 0.1, professionalism: 1 }])
  const [inputData, changeInputData] = useState('')

  // const [network, setNetwork] = useState<Network>(new Network(
  //     container.current as HTMLElement,
  //     { edges, nodes },
  //
  // ))

  function checkStatus (status: number): string {
    switch (Math.round(status / 100)) {
      case 1: {
        return 'Information'
      }
      case 2: {
        return 'Success'
      }
      case 3: {
        return 'Redirect'
      }
      case 4: {
        return 'Client Error'
      }
      case 5: {
        return 'Server Error'
      }
      default: {
        return ''
      }
    }
  }

  function fetchUser (inputData: string): void {
    axios.get('api/v1/technologies?search_text=' + inputData)
      .then((response) => {
        const statusInfo = checkStatus(response.status)
        if (
          statusInfo === 'Client Error' ||
                    statusInfo === 'Server Error' ||
                    statusInfo === 'Undefined'
        ) {
          console.error(statusInfo)
        } else {
          changeData(response?.data?.technologies)
          changeInputData(inputData)
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }

  function change (inputData: string): void {
    if (inputData.includes('python')) {
      fetchUser(inputData)
      return
    }

    // changeData([
    //     {skill: 'python', value: 10},
    //     {skill: 'sql', value: 7},
    //     {skill: 'linux', value: 7},
    //     {skill: 'postgresql', value: 7},
    //     {skill: 'it', value: 4},
    //     {skill: 'git', value: 4},
    //     {skill: 'cicd', value: 4},
    //     {skill: 'data', value: 2},
    //     {skill: 'ml', value: 2},
    //     {skill: 'docker', value: 1}
    // ])
    const arr = [{ name: 'python', distance: 1, professionalism: 0 }, { name: 'sqlite', distance: 1, professionalism: 0.5 }, { name: 'django', distance: 0.6, professionalism: 0.4 }, { name: 'selenium', distance: 0.8, professionalism: 0.5 }, { name: 'docker', distance: 0.2, professionalism: 0.8 }, { name: 'c++', distance: 0.1, professionalism: 1 }]

    changeData(arr)
  }

  return (
        <div className={styles.page}><Header changeData={change}/><Graph data={data} title={inputData}/></div>
  )
}

export default HomePage
