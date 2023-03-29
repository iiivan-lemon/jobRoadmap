import React from 'react'
import styles from './NodeModal.module.css'
const NodeModal = ({ onClose, nodeId, nodeTitle }): JSX.Element => {
  const ref = React.useRef<HTMLDivElement | null>(null)
  React.useEffect(() => {
    const checkIfClickedOutside = (e): void => {
      // eslint-disable-next-line no-debugger
      // debugger
      if (nodeId === -1) {
        onClose()
      }
    }
    document.addEventListener('click', checkIfClickedOutside)
    return () => {
      document.removeEventListener('click', checkIfClickedOutside)
    }
  }, [onClose])

  React.useEffect(() => {
    // document.body.style.overflow = 'hidden'
    return () => {
      // document.body.style.overflow = 'auto'
    }
  }, [])

  return (<div className={styles.nodeModal} ref={ref}>{nodeTitle}</div>)
}

export default NodeModal
