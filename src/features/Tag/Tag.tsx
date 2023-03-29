import styles from './Tag.module.css'
const Tag = ({ title, className, setTitleTag, id, setGrade }): any => {
  const setColorClick = (e): void => {
    const els = document.getElementsByClassName(styles.tagActive)
    for (let i = 0; i < els.length; ++i) {
      if (els[i]?.id === e.target.id) { els[i].classList.remove(styles.tagActive) }
    }
    e.target.classList.toggle(styles.tagActive)
    if (+e.target.id === 10) {
      setGrade(title)
      return
    }
    setTitleTag(title)
  }
  // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
  return (<div id={id} onClick = {setColorClick} className={styles.tag + ' ' + className}>{title}</div>)
}

export default Tag
