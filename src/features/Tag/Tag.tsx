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

    if (Number(e.target.id) === 10) {
      (e?.target.classList.contains(styles.tagActive)) ? setGrade({ begin: title.id, end: 3 }) : setGrade({ begin: 0, end: 1 })
      return
    }
    (e?.target.classList.contains(styles.tagActive)) ? setTitleTag(title.profession) : setTitleTag('')
  }
  // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
  return (<div
      className={`${styles.tag} ${className}`}
      id={id}
      onClick={setColorClick}
          >
      {title.profession || title.title}
          </div>)
}

export default Tag
