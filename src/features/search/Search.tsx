import React, { type FC } from 'react'
import styles from './Search.module.css'
interface SearchProps {
  title?: string
  submit?: any
}

const Search: FC<SearchProps> = ({ submit }) => {
  return (
        <div className={styles.searchBlock}>
            <form className={styles.formSearch} onSubmit={submit}>
                <input className={styles.search} name="searchTerm"/>
            </form>
            {/* <input   type="text" value={this.state.value} onSubmit={sendValue(value)}></input> */}
        </div>
  )
}

export default Search
