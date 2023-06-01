import styles from './Tag.module.sass'
import React from 'react'
const Tag = ({ style, title, className, setTitleTag, id, setGrade, input }): any => {
  React.useEffect(() => {
    if (input === '') {
      setTitleTag('')
    }
    // eslint-disable-next-line no-debugger
    // setGrade({ begin: 0, end: 4 })
  }, [input])
  const setColorClick = (e): void => {
    const els = document.getElementsByClassName(styles.tagActive)
    for (const el of els) {
      if (el.id === e.target.id && el !== e.target) {
        el.classList.remove(styles.tagActive)
      }
    }
    e.target.classList.toggle(styles.tagActive)

    if (Number(e.target.id) === 10) {
      (e?.target.classList.contains(styles.tagActive)) ? setGrade({ begin: title.id, end: 1 + title.id }) : setGrade({ begin: 0, end: title.id })
      return
    }
    setGrade({ begin: 0, end: 4 });
    (e?.target.classList.contains(styles.tagActive)) ? setTitleTag(title?.profession) : setTitleTag('')
  }
  // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
  return (<div style={style}
      className={`${styles.tag} ${className}`}
      id={id}
      onClick={setColorClick}
          >
      {title.profession || title.title}
          </div>)
}

Tag.defaultProps = {
  style: {},
  setGrade: () => {},
  setTitleTag: () => {},
  input: null
}

export default Tag
