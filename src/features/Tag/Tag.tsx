import styles from './Tag.module.css'
const Tag = ({ title, className, setTitleTag, id, setGrade }): any => {
  const setColorClick = (e): void => {
    // eslint-disable-next-line no-debugger
    const els = document.getElementsByClassName(styles.tagActive)
    for (const el of els) {
      if (el.id === e.target.id && el !== e.target) {
        el.classList.remove(styles.tagActive)
      }
    }
    e.target.classList.toggle(styles.tagActive)
    // eslint-disable-next-line no-debugger
    if (+e.target.id === 10) {
      (e?.target.classList.contains(styles.tagActive)) ? setGrade(title.id) : setGrade(0)
      return
    }
    (e?.target.classList.contains(styles.tagActive)) ? setTitleTag(title.title) : setTitleTag(0)
  }
  // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
  return (<div id={id} onClick = {setColorClick} className={styles.tag + ' ' + className}>{title.title}</div>)
}

export default Tag
