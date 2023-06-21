import { PushSpinner } from 'react-spinners-kit'
import { loadState } from '../../utils/utils'
import React from 'react'
import { animationWorker as AnimationWorker } from './typingAnimation'
import './preloader.sass'
export const Preloader = ({ loading, style, tips, className }): JSX.Element => {
  React.useEffect(() => {
    if (loading === loadState.load && window.innerWidth > 1000) {
      const texts = tips
      const input = document.querySelector('#tipsLoader') as HTMLSpanElement
      // @ts-expect-error asdasd
      let aw = (new AnimationWorker(input, texts)).start();

      (input).addEventListener('blur', (e) => {
        // eslint-disable-next-line no-debugger
        // eslint-disable-next-line no-debugger

        aw = new AnimationWorker(input, texts)
        // eslint-disable-next-line @typescript-eslint/no-implied-eval
        // @ts-expect-error asdasd
        // eslint-disable-next-line @typescript-eslint/no-implied-eval
        if ((e.target as HTMLInputElement).value === 'введите профессию или должность') setTimeout(aw.start, 2000)
      })
    }
  }, [loading])

  return (
    <>{loading === loadState.load && <div className={(className) || 'preloader' } style={style}>
      { window.innerWidth > 1000 && <span id='tipsLoader'>загрузка...</span>}
      <PushSpinner
        color="#686769"
        id="preloader"
        loading={loading === loadState.load}
        size={30}
      />
    </div>
}</>
  )
}

Preloader.defaultProps = {
  style: {},
  tips: ['загрузка...'],
  className: ''
}
