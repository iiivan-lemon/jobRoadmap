import React, { type FC, useEffect, useState } from 'react'
import styles from './Search.module.css'
import HeaderOptions from '../headerOptions/HeaderOptions'
interface SearchProps {
  title?: string
  changeData?: any
  showOptions?: any
}

const Search: FC<SearchProps> = ({ title, changeData, showOptions }) => {
  // const [value, setValue] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [tags] = useState(['python developer', 'frontend developer', 'ML developer', 'UI/UX designer'])
  const [titleTag, setTitleTag] = useState('')
  function sub (event: any): void {
    event?.preventDefault()
    if (changeData != null) {
      const value = (document.getElementById('search') as HTMLInputElement).value
      changeData(value)
      // (document.getElementById('search') as HTMLInputElement).value = ''
    }
  }
  useEffect(() => {
    (document.getElementById('search') as HTMLInputElement).value = titleTag
    if (changeData != null) changeData((document.getElementById('search') as HTMLInputElement).value)
  }, [titleTag])

  return (
      <React.Fragment>
        <div className={styles.searchBlock} onClick={() => { setIsModalOpen(true) }}>
            <form className={styles.formSearch} onSubmit={sub} >
                <input id='search' className={styles.search} name="searchTerm" autoComplete="off"/>
            </form>
            {/* <input   type="text" value={this.state.value} onSubmit={sendValue(value)}></input> */}
        </div>
    {isModalOpen && <HeaderOptions tags={tags} onClose={() => {
      setIsModalOpen(false)
    }} setTitleTag={setTitleTag}/>}
      </React.Fragment>
  )
}

export default Search
