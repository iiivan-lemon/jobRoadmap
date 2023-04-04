import styles from './Tag.module.css'
const Tag = ({ title, className, setTitleTag, id, setGrade }): any => {
  const setColorClick = (e): void => {
    const els = document.getElementsByClassName(styles.tagActive)
    for (const el of els) {
      if (el.id === e.target.id && el !== e.target) {
        el.classList.remove(styles.tagActive)
      }
    }
    e.target.classList.toggle(styles.tagActive)

    if (+e.target.id === 10) {
      (e?.target.classList.contains(styles.tagActive)) ? setGrade({ begin: title.id, end: 1 }) : setGrade({ begin: 0, end: 0 })
      return
    }
    (e?.target.classList.contains(styles.tagActive)) ? setTitleTag(title.title) : setTitleTag(0)
  }
  // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
  return (<div id={id} onClick = {setColorClick} className={styles.tag + ' ' + className}>{title.title}</div>)
}

export default Tag
